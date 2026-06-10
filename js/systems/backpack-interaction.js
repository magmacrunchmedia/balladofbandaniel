// backpack-interaction.js
// Handle backpack equip/unequip interaction in da Bussy

/**
 * Handle interaction with the backpack prop in da Bussy
 * If no backpack equipped: show dialogue with yes/no choice
 * If backpack already equipped: open storage UI
 */
function handleBackpackInteraction() {
    // Check if player already has a backpack equipped
    if (playerInventory.isBackpackEquipped()) {
        // Already wearing backpack - open storage UI
        if (typeof openStorageUI === 'function') {
            openStorageUI('bussy_backpack');
        }
        return;
    }
    
    // Not wearing backpack - show dialogue with choice
    showPutOnBackpackDialogue();
}

/**
 * Show dialogue asking player to put on the backpack
 * Uses the choice system for yes/no selection
 */
function showPutOnBackpackDialogue() {
    const dialogue = [
        "A well-worn hiking backpack.",
        "Put it on to carry more items?"
    ];
    
    const choices = [
        { 
            label: 'Put it on', 
            callback: () => { equipBackpack(); }
        },
        { 
            label: 'Leave it', 
            callback: () => { /* do nothing - just close */ }
        }
    ];
    
    showBackpackDialogue('Backpack', dialogue, choices);
}

/**
 * Actually equip the backpack
 * Removes the prop from the world and adds backpack to player
 */
function equipBackpack() {
    // Equip the backpack
    playerInventory.equipBackpack(BACKPACK_TYPES.backpack_medium);
    
    // Hide the backpack prop from the world
    const backpackProp = PROP_POSITIONS['bussy_backpack'];
    if (backpackProp) {
        backpackProp.visible = false;
    }
    
    // Regenerate collision arrays (backpack is no longer solid)
    if (typeof regeneratePropCollisions === 'function') {
        regeneratePropCollisions();
    }
    
    // Update UI
    if (typeof updateHandsDisplay === 'function') {
        updateHandsDisplay();
    }
    
    // Show notification
    if (typeof showMessage === 'function') {
        showMessage('Put on backpack! Press B to look inside.');
    }
    
    // Trigger sidebar refresh
    if (typeof onStorageChanged === 'function') {
        onStorageChanged();
    }
}

/**
 * Unequip the backpack and drop it at player's feet
 */
function unequipBackpack() {
    if (!playerInventory.isBackpackEquipped()) return;
    
    // Get the backpack type before unequipping
    const backpackType = playerInventory.backpack;
    
    // Unequip
    playerInventory.unequipBackpack();
    
    // Drop backpack at player's feet (like dropping an item)
    if (typeof player !== 'undefined' && typeof addWorldItem === 'function') {
        const dropX = Math.floor(player.x + player.facingX * 2);
        const dropY = Math.floor(player.y + player.facingY * 2);
        addWorldItem(backpackType.id, dropX, dropY, currentMap);
    }
    
    // Update UI
    if (typeof updateHandsDisplay === 'function') {
        updateHandsDisplay();
    }
    
    // Show notification
    if (typeof showMessage === 'function') {
        showMessage('Took off backpack. It fell at your feet.');
    }
    
    // Trigger sidebar refresh
    if (typeof onStorageChanged === 'function') {
        onStorageChanged();
    }
}

/* =====================
   HELPER: Show Dialogue
   (wrapper for existing dialogue system)
   ===================== */

function showBackpackDialogue(npcName, messages, choices) {
    const fakeNPC = {
        name: npcName,
        dialogue: messages,
        type: 'backpack',
        currentDialogue: 0
    };
    showDialogue(fakeNPC, null, choices);
}
