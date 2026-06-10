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
    
    // Show notification via dialogue
    showBackpackNotification('You put on the backpack. Press B to look inside.');
    
    // Trigger sidebar refresh
    if (typeof onStorageChanged === 'function') {
        onStorageChanged();
    }
}

/**
 * Unequip the backpack and place it near the player
 */
function unequipBackpack() {
    if (!playerInventory.isBackpackEquipped()) return;
    
    // Unequip
    playerInventory.unequipBackpack();
    
    // Re-show the backpack prop near the player
    const backpackProp = PROP_POSITIONS['bussy_backpack'];
    if (backpackProp && typeof player !== 'undefined') {
        backpackProp.x = Math.floor(player.x + player.facingX * 2);
        backpackProp.y = Math.floor(player.y + player.facingY * 2);
        backpackProp.visible = true;
    }
    
    // Regenerate collision arrays (backpack is solid again)
    if (typeof regeneratePropCollisions === 'function') {
        regeneratePropCollisions();
    }
    
    // Update UI
    if (typeof updateHandsDisplay === 'function') {
        updateHandsDisplay();
    }
    
    // Close backpack overlay if open
    const backpackOverlay = document.getElementById('backpackOverlay');
    if (backpackOverlay) {
        backpackOverlay.classList.remove('active');
    }
    
    // Show notification via dialogue
    showBackpackNotification('You took off the backpack. It\'s at your feet.');
    
    // Trigger sidebar refresh
    if (typeof onStorageChanged === 'function') {
        onStorageChanged();
    }
}

/* =====================
   HELPERS
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

/**
 * Show a brief notification using the dialogue box (not showMessage)
 */
function showBackpackNotification(text) {
    const fakeNPC = {
        name: '',
        dialogue: [text],
        type: 'backpack',
        currentDialogue: 0
    };
    showDialogue(fakeNPC);
}
