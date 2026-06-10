// steering-wheel-interaction.js
// Special interaction: Give keys to da Bussy's steering wheel
// This unlocks level selection and progression

/* =====================
   GAME STATE
===================== */
let keysGivenToBussy = false;  // Track if keys have been given

/* =====================
   STEERING WHEEL INTERACTION
===================== */

/**
 * Handle interaction with steering wheel prop
 * Called when player presses SPACE near steering wheel
 */
function interactWithSteeringWheel() {
    
    // Check if keys already given
    if (keysGivenToBussy) {
        // Show level selection dialogue
        showLevelSelectionDialogue();
        return;
    }
    
    // Check if player has the keys
    const hasKeys = playerInventory.hasItem('bussy_keys');
    
    if (hasKeys) {
        // Player has keys - offer to give them
        showGiveKeysDialogue();
    } else {
        // Player doesn't have keys yet
        showNoKeysDialogue();
    }
}

/**
 * Show dialogue when player has keys
 */
function showGiveKeysDialogue() {
    const dialogue = [
        "You found my keys!",
        "Give them to me and I'll take you wherever you need to go.",
        "Press SPACE to give keys"
    ];
    
    showSteeringWheelDialogue('da Bussy', dialogue, () => {
        // Callback when dialogue finishes
        // Player can press SPACE again to give keys
    });
}

/**
 * Actually give the keys to da Bussy
 * Removes keys from inventory
 */
function giveKeysToBussy() {
    
    // Find which hand has the keys
    const leftHand = playerInventory.leftHand;
    const rightHand = playerInventory.rightHand;
    
    
    let hand = null;
    if (leftHand && leftHand.type.id === 'bussy_keys') {
        hand = 'left';
    } else if (rightHand && rightHand.type.id === 'bussy_keys') {
        hand = 'right';
    }
    
    if (!hand) {
        console.error('❌ Keys not found in either hand!');
        return false;
    }
    
    
    // Remove keys from hand
    const removed = playerInventory.removeItem(hand);
    
    // Update state
    keysGivenToBussy = true;
    
    // Update UI
    if (typeof updateHandsDisplay === 'function') {
        updateHandsDisplay();
    }
    
    // Show confirmation
    if (typeof showNotification === 'function') {
        showNotification('Gave keys to da Bussy!');
    }
    
    return true;
}

/**
 * Show dialogue when player doesn't have keys
 */
function showNoKeysDialogue() {
    const dialogue = [
        "I need my keys to take you anywhere.",
        "Go find them in the Tutorial Garden!"
    ];
    
    showSteeringWheelDialogue('da Bussy', dialogue);
}

/**
 * Show level selection dialogue (future implementation)
 */
function showLevelSelectionDialogue() {
    const dialogue = [
        "Where do you want to go?",
        "[Level selection menu coming soon...]"
    ];
    
    showSteeringWheelDialogue('da Bussy', dialogue);
    
    // Future: Show level selection UI here
    // showLevelSelectionMenu();
}

/* =====================
   INTEGRATION WITH EXISTING SYSTEMS
===================== */

/**
 * Check if prop is steering wheel and handle interaction
 * Called from checkPropInteraction() in interactions.js
 * 
 * @param {Object} prop - The prop being interacted with
 * @returns {boolean} - True if this was the steering wheel
 */
function checkSteeringWheelInteraction(prop) {
    
    // Check if this is the steering wheel prop
    // Adjust these coordinates to match your actual steering wheel position
    const isSteeringWheel = (
        prop.x === 84 && 
        prop.y === 52 && 
        currentMap === 'bussyInterior'
    );
    
    
    if (!isSteeringWheel) {
        return false;
    }
    
    
    // Simple interaction flow
    if (!keysGivenToBussy) {
        // Keys not given yet
        if (playerInventory.hasItem('bussy_keys')) {
            // Player has keys - give them!
            giveKeysToBussy();
        } else {
            // Player doesn't have keys
            showNoKeysDialogue();
        }
    } else {
        // Keys already given
        showLevelSelectionDialogue();
    }
    
    return true;
}

/* =====================
   SAVE/LOAD SUPPORT
===================== */

/**
 * Get save data for steering wheel state
 */
function getSteeringWheelSaveData() {
    return {
        keysGivenToBussy: keysGivenToBussy
    };
}

/**
 * Load save data for steering wheel state
 */
function loadSteeringWheelSaveData(saveData) {
    if (saveData && saveData.keysGivenToBussy !== undefined) {
        keysGivenToBussy = saveData.keysGivenToBussy;
    }
}

/* =====================
   HELPER: Show Dialogue
   (wrapper for existing dialogue system)
===================== */

function showSteeringWheelDialogue(npcName, messages, callback) {
    const fakeNPC = {
        name: npcName,
        dialogue: messages,
        type: 'bussy',
        currentDialogue: 0
    };
    showDialogue(fakeNPC);
    if (callback) callback();
}

