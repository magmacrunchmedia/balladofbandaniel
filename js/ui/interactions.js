// interactions.js - Handle player interactions with props and items
// VERSION 9.1 - NO PROMPTS FOR AUTO-PICKUP ITEMS
// FIXED: Completely removed "Press SPACE to pick up" prompts for regular map items

/**
 * Main interaction handler - called when player presses SPACE
 * Priority order: Items > Steering Wheel > Storage Props > Other Props > NPCs
 */
function handleInteraction() {
    
    // If dialogue is already active, advance it or select choice
    if (window.dialogueActive) {
        // If choices are visible, SPACE selects the highlighted choice
        if (typeof dialogueChoices !== 'undefined' && dialogueChoices.style.display === 'block' && dialogueChoicesList.length > 0 && !dialogueChoicesMade) {
            if (typeof selectDialogueChoice === 'function') {
                selectDialogueChoice();
            }
        } else if (typeof advanceDialogue === 'function') {
            advanceDialogue();
        }
        return true;
    }
    
    // Priority 1: Check for items to pick up (including capacity check)
    if (checkItemPickup()) {
        return true;
    }
    
    // Priority 2: Check for steering wheel interaction (HIGHEST PRIORITY PROP)
    if (checkSteeringWheelInteraction()) {
        return true;
    }
    
    // Priority 3: Check for other prop interactions (storage, etc.)
    if (checkPropInteraction()) {
        return true;
    }
    
    // Priority 4: Check for NPC interactions
    if (typeof checkNPCInteraction === 'function') {
        if (checkNPCInteraction()) {
            return true;
        }
    }
    
    return false;
}

/**
 * Check if player can pick up nearby items
 * Returns true if item was picked up, false otherwise
 */
function checkItemPickup() {
    if (!player || !currentMap) return false;
    
    // Get items for current map
    const items = typeof getItemsForMap === 'function' ? getItemsForMap(currentMap) : [];
    
    if (!items || items.length === 0) return false;
    
    // Check each item
    for (const item of items) {
        if (item.collected) continue;
        
        // Calculate distance to item
        const dx = Math.abs(player.x - item.x);
        const dy = Math.abs(player.y - item.y);
        
        // Check if player is close enough (within 1.5 tiles)
        if (dx < 1.5 && dy < 1.5) {
            // ✅ CAPACITY CHECK: Check if inventory is full (Both hands occupied)
            if (typeof playerInventory !== 'undefined') {
                if (playerInventory.leftHand && playerInventory.rightHand) {
                    
                    // Show warning message
                    if (typeof showMessage === 'function') {
                        showMessage(`Hands full! You're holding two items.`);
                    } else {
                        alert(`Hands full! You're holding two items.`);
                    }
                    
                    return false; // Don't pick up
                }
            }
            
            // Pick up the item
            
            // Add to inventory using the inventory method directly to ensure correct hand assignment
            if (typeof playerInventory !== 'undefined' && typeof playerInventory.addItem === 'function') {
                const added = playerInventory.addItem(item);
                
                if (added) {
                    item.collected = true;
                    // Update UI
                    if (typeof updateItemCounter === 'function') {
                        updateItemCounter();
                    }
                    if (typeof updateInventoryDisplay === 'function') {
                        updateInventoryDisplay();
                    }
                    if (typeof updateHandsDisplay === 'function') {
                        updateHandsDisplay();
                    }
                    return true;
                } else {
                    return false;
                }
            } else {
                 // Fallback if addItem isn't available (manual assignment)
                 if (!playerInventory.leftHand) {
                     playerInventory.leftHand = item;
                 } else if (!playerInventory.rightHand) {
                     playerInventory.rightHand = item;
                 }
                 item.collected = true;
                 return true;
            }
        }
    }
    
    return false;
}

/**
 * NEW v9.0: Check for steering wheel interaction
 * This is the HIGHEST PRIORITY prop interaction
 */
function checkSteeringWheelInteraction() {
    
    try {
        if (typeof player === 'undefined') {
            console.error('❌ player object not defined!');
            return false;
        }
        
        if (!currentMap) {
            console.error('❌ currentMap not defined!');
            return false;
        }
        
        // Only check steering wheel in da Bussy interior
        if (currentMap !== 'bussyInterior') {
            return false;
        }
        
        
        // Get steering wheel prop
        if (typeof PROP_POSITIONS === 'undefined') {
            console.error('❌ PROP_POSITIONS not defined!');
            return false;
        }
        
        const steeringWheel = PROP_POSITIONS['steeringWheel'];
        
        if (!steeringWheel) {
            return false;
        }
        
        
        // Calculate what tile the player is facing
        const facingX = Math.floor(player.x + player.facingX);
        const facingY = Math.floor(player.y + player.facingY);
        
        // Check if player is facing any part of the steering wheel (2x2 prop)
        let isFacingWheel = false;
        
        if (steeringWheel.width && steeringWheel.height) {
            for (let dy = 0; dy < steeringWheel.height; dy++) {
                for (let dx = 0; dx < steeringWheel.width; dx++) {
                    const wheelTileX = steeringWheel.x + dx;
                    const wheelTileY = steeringWheel.y + dy;
                    
                    if (facingX === wheelTileX && facingY === wheelTileY) {
                        isFacingWheel = true;
                        break;
                    }
                }
                if (isFacingWheel) break;
            }
        } else {
            // Single tile steering wheel (fallback)
            isFacingWheel = (facingX === steeringWheel.x && facingY === steeringWheel.y);
        }
        
        if (isFacingWheel) {
            
            // Call steering wheel interaction handler
            if (typeof interactWithSteeringWheel === 'function') {
                interactWithSteeringWheel();
                return true;
            } else {
                console.error('❌ handleSteeringWheelInteraction function not found!');
                return false;
            }
        } else {
            return false;
        }
        
    } catch (error) {
        console.error('❌ ERROR in checkSteeringWheelInteraction:', error);
        console.error('Stack:', error.stack);
        return false;
    }
}

/**
 * Check if player can interact with nearby props
 * Called when player presses SPACE
 * NOTE: Steering wheel is now checked separately in checkSteeringWheelInteraction()
 */
function checkPropInteraction() {
    
    try {
        // Check if player exists in global scope
        if (typeof player === 'undefined') {
            console.error('❌ player object not defined in global scope!');
            return false;
        }
        
        if (!currentMap) {
            console.error('❌ currentMap not defined!');
            return false;
        }
        
        
        // Get all props for current map
        let props = [];
        let campingProps = [];
        
        // Check if getPropsForMap exists
        if (typeof getPropsForMap === 'function') {
            props = getPropsForMap(currentMap);
        }
        
        // Check if getCampingPropsForMap exists
        if (typeof getCampingPropsForMap === 'function') {
            campingProps = getCampingPropsForMap(currentMap);
        }
        
        const allProps = [...props, ...campingProps];
        
        
        // If no props found, check PROP_POSITIONS directly
        if (allProps.length === 0 && typeof PROP_POSITIONS !== 'undefined') {
            const directProps = Object.entries(PROP_POSITIONS)
                .filter(([key, prop]) => prop.map === currentMap)
                .map(([key, prop]) => ({...prop, key}));
            allProps.push(...directProps);
        }
        
        // Calculate what tile the player is facing
        const facingX = Math.floor(player.x + player.facingX);
        const facingY = Math.floor(player.y + player.facingY);
        
        // For storage items, check BOTH facing AND nearby
        // This makes storage access more forgiving
        
        // FIRST: Check storage items with BOTH proximity AND facing checks
        for (const prop of allProps) {
            if (!prop.storageItem) continue;
            
            // Skip invisible props (e.g., backpack when equipped)
            if (prop.visible === false) continue;
            
            
            // For storage items, check BOTH proximity AND facing direction
            let canInteract = false;
            
            // OPTION 1: Player is facing the prop
            const facingX = Math.floor(player.x + player.facingX);
            const facingY = Math.floor(player.y + player.facingY);
            
            if (prop.width && prop.height) {
                // Multi-tile prop - check if facing any part of it
                for (let dy = 0; dy < prop.height; dy++) {
                    for (let dx = 0; dx < prop.width; dx++) {
                        if (facingX === prop.x + dx && facingY === prop.y + dy) {
                            canInteract = true;
                            break;
                        }
                    }
                    if (canInteract) break;
                }
            } else {
                // Single-tile prop
                if (facingX === prop.x && facingY === prop.y) {
                    canInteract = true;
                }
            }
            
            // OPTION 2: Player is near the prop (within 2 tiles - increased from 1.5)
            if (!canInteract) {
                if (prop.width && prop.height) {
                    // Multi-tile prop - check proximity to any part
                    for (let dy = 0; dy < prop.height; dy++) {
                        for (let dx = 0; dx < prop.width; dx++) {
                            const propTileX = prop.x + dx;
                            const propTileY = prop.y + dy;
                            const distance = Math.abs(player.x - propTileX) + Math.abs(player.y - propTileY);
                            
                            
                            // Allow interaction if within 2 tiles (increased for easier access)
                            if (distance < 2.0) {
                                canInteract = true;
                                break;
                            }
                        }
                        if (canInteract) break;
                    }
                } else {
                    // Single-tile prop
                    const distance = Math.abs(player.x - prop.x) + Math.abs(player.y - prop.y);
                    if (distance < 2.0) {
                        canInteract = true;
                    }
                }
            }
            
            if (canInteract) {
                handleStorageInteraction(prop);
                return true;
            } else {
            }
        }
        
        // SECOND: Check other interactive props (using facing direction)
        for (const prop of allProps) {
            // Skip storage items (already checked above)
            if (prop.storageItem) continue;
            
            // Skip steering wheel (checked separately in checkSteeringWheelInteraction)
            if (prop.key === 'steeringWheel') continue;
            
            // Only check props marked as interactable
            if (!prop.interact) continue;
            
            
            // Check if player is facing this prop
            let isFacingProp = false;
            
            if (prop.width && prop.height) {
                // Multi-tile prop - check if facing ANY tile
                for (let dy = 0; dy < prop.height; dy++) {
                    for (let dx = 0; dx < prop.width; dx++) {
                        const propTileX = prop.x + dx;
                        const propTileY = prop.y + dy;
                        
                        if (facingX === propTileX && facingY === propTileY) {
                            isFacingProp = true;
                            break;
                        }
                    }
                    if (isFacingProp) break;
                }
            } else {
                // Single-tile prop
                isFacingProp = (facingX === prop.x && facingY === prop.y);
            }
            
            if (isFacingProp) {
                
                // Show interact message if available
                if (prop.interactMessage) {
                }
                
                // DEBUG: Log the prop object to see what properties it has
                
                // Call the appropriate interaction handler
                if (prop.interactType === 'portoPotty') {
                    // Handle port-o-potty interaction
                    if (typeof handlePortOPottyInteraction === 'function') {
                        handlePortOPottyInteraction(prop.key);
                    }
                } else if (prop.storageItem) {
                    // Handle storage interaction
                    handleStorageInteraction(prop);
                } else {
                    // For non-storage props, just log for now
                }
                
                return true;
            }
        }
        
        return false;
        
    } catch (error) {
        console.error('❌ ERROR in checkPropInteraction:', error);
        console.error('Stack:', error.stack);
        return false;
    }
}

/**
 * Handle interaction with storage prop
 * @param {Object} prop - The storage prop
 */
function handleStorageInteraction(prop) {
    
    try {
        const containerKey = prop.key || prop.name;
        
        if (!containerKey) {
            console.error('❌ Storage prop has no key/name');
            return;
        }
        
        // Special handling for backpack - check if it's visible and handle equip
        if (prop.key === 'bussy_backpack' && prop.visible !== false) {
            if (typeof handleBackpackInteraction === 'function') {
                handleBackpackInteraction();
                return;
            }
        }
        
        // Skip if backpack prop is not visible
        if (prop.key === 'bussy_backpack' && prop.visible === false) {
            return;
        }
        
        // Check if openStorageUI exists
        if (typeof openStorageUI !== 'function') {
            console.error('❌ openStorageUI function not found!');
            return;
        }
        
        // Open storage UI
        openStorageUI(containerKey);
        
    } catch (error) {
        console.error('❌ ERROR in handleStorageInteraction:', error);
        console.error('Stack:', error.stack);
    }
}

/**
 * Show interact prompt when near interactable objects
 * UPDATED v9.1: COMPLETELY REMOVED regular map item prompts (they auto-pickup)
 */
function updateInteractPrompt() {
    try {
        if (!player || !currentMap) return;
        
        const interactPrompt = document.getElementById('interactPrompt');
        if (!interactPrompt) return;
        
        let showPrompt = false;
        let promptMessage = 'Press SPACE to interact';
        
        // ❌ REMOVED v9.1: No check for regular map items - they auto-pickup, no prompt needed!
        
        // Check for nearby world items (dropped items - these still need SPACE)
        if (typeof checkWorldItemPickup === 'function') {
            const worldItem = checkWorldItemPickup(player.x, player.y, currentMap);
            if (worldItem) {
                showPrompt = true;
                promptMessage = `Press SPACE to pick up ${worldItem.type.name}`;
                
                // Check if hands are full
                if (typeof playerInventory !== 'undefined') {
                    if (playerInventory.leftHand && playerInventory.rightHand) {
                        promptMessage = `⚠️ Hands full!`;
                    }
                }
            }
        }
        
        // If no items, check for props
        if (!showPrompt) {
            // Get all props for current map
            let props = [];
            let campingProps = [];
            
            if (typeof getPropsForMap === 'function') {
                props = getPropsForMap(currentMap);
            }
            
            if (typeof getCampingPropsForMap === 'function') {
                campingProps = getCampingPropsForMap(currentMap);
            }
            
            const allProps = [...props, ...campingProps];
            
            // If no props from functions, check PROP_POSITIONS directly
            if (allProps.length === 0 && typeof PROP_POSITIONS !== 'undefined') {
                const directProps = Object.entries(PROP_POSITIONS)
                    .filter(([key, prop]) => prop.map === currentMap)
                    .map(([key, prop]) => ({...prop, key}));
                allProps.push(...directProps);
            }
            
            // Check steering wheel FIRST (highest priority)
            if (currentMap === 'bussyInterior') {
        const steeringWheel = PROP_POSITIONS['steeringWheel'];
                if (steeringWheel) {
                    const facingX = Math.floor(player.x + player.facingX);
                    const facingY = Math.floor(player.y + player.facingY);
                    
                    let isFacingWheel = false;
                    
                    if (steeringWheel.width && steeringWheel.height) {
                        for (let dy = 0; dy < steeringWheel.height; dy++) {
                            for (let dx = 0; dx < steeringWheel.width; dx++) {
                                if (facingX === steeringWheel.x + dx && facingY === steeringWheel.y + dy) {
                                    isFacingWheel = true;
                                    break;
                                }
                            }
                            if (isFacingWheel) break;
                        }
                    }
                    
                    if (isFacingWheel) {
                        showPrompt = true;
                        promptMessage = steeringWheel.interactMessage || 'Press SPACE to talk to da Bussy';
                    }
                }
            }
            
            // Check storage items with lenient proximity (same as interaction)
            if (!showPrompt) {
                for (const prop of allProps) {
                    if (prop.storageItem) {
                        // Skip invisible props (e.g., backpack when equipped)
                        if (prop.visible === false) continue;
                        
                        // Check if near storage prop
                        let isNear = false;
                        
                        if (prop.width && prop.height) {
                            for (let dy = 0; dy < prop.height; dy++) {
                                for (let dx = 0; dx < prop.width; dx++) {
                                    const distance = Math.abs(player.x - (prop.x + dx)) + Math.abs(player.y - (prop.y + dy));
                                    if (distance < 1.5) {
                                        isNear = true;
                                        break;
                                    }
                                }
                                if (isNear) break;
                            }
                        } else {
                            const distance = Math.abs(player.x - prop.x) + Math.abs(player.y - prop.y);
                            isNear = distance < 1.5;
                        }
                        
                        if (isNear) {
                            showPrompt = true;
                            promptMessage = prop.interactMessage || 'Press SPACE to access storage';
                            break;
                        }
                    }
                }
            }
            
            // Check other props with facing requirement (skip steering wheel - already checked)
            if (!showPrompt) {
                const facingX = Math.floor(player.x + player.facingX);
                const facingY = Math.floor(player.y + player.facingY);
                
                for (const prop of allProps) {
                    if (!prop.interact || prop.storageItem) continue;
                    
                    // Skip steering wheel (already checked above)
                    if (prop.key === 'steeringWheel') continue;
                    
                    // Check if player is facing this prop
                    let isFacingProp = false;
                    
                    if (prop.width && prop.height) {
                        // Multi-tile prop
                        for (let dy = 0; dy < prop.height; dy++) {
                            for (let dx = 0; dx < prop.width; dx++) {
                                if (facingX === prop.x + dx && facingY === prop.y + dy) {
                                    isFacingProp = true;
                                    break;
                                }
                            }
                            if (isFacingProp) break;
                        }
                    } else {
                        // Single-tile prop
                        isFacingProp = (facingX === prop.x && facingY === prop.y);
                    }
                    
                    if (isFacingProp) {
                        showPrompt = true;
                        promptMessage = prop.interactMessage || 'Press SPACE to interact';
                        break;
                    }
                }
            }
        }
        
        // Show/hide prompt with appropriate message
        if (showPrompt) {
            interactPrompt.textContent = promptMessage;
            interactPrompt.style.display = 'block';
        } else {
            interactPrompt.style.display = 'none';
        }
        
    } catch (error) {
        console.error('❌ ERROR in updateInteractPrompt:', error);
    }
}

// Add storage close button handler
document.addEventListener('DOMContentLoaded', function() {
    const storageClose = document.getElementById('storageClose');
    if (storageClose) {
        storageClose.addEventListener('click', closeStorageUI);
    }
});

