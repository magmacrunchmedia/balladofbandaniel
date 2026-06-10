// world/bus-unlock-system.js
// Handles permanent unlocking of da Bussy after first entry with keys
// FIXED: showBussyLockedMessage now sends a proper object to showDialogue

/* =====================================================
   BUS UNLOCK STATE - Persistent Game State
===================================================== */

const BUS_STATE = {
    isUnlocked: false,
    hasEnteredBefore: false,
};

function playerHasKeys() {
    if (typeof playerInventory === 'undefined') {
        return false;
    }
    const leftHand = playerInventory.leftHand;
    const rightHand = playerInventory.rightHand;
    const hasKeysInLeft = leftHand && leftHand.type && leftHand.type.id === 'bussy_keys';
    const hasKeysInRight = rightHand && rightHand.type && rightHand.type.id === 'bussy_keys';
    
    return hasKeysInLeft || hasKeysInRight;
}

function canEnterBussy() {
    if (BUS_STATE.isUnlocked) return true;
    return playerHasKeys();
}

function onEnterBussy() {
    BUS_STATE.hasEnteredBefore = true;
    if (!BUS_STATE.isUnlocked) {
        BUS_STATE.isUnlocked = true;
        // Optional: Save to localStorage
        // localStorage.setItem('bandaniel_bus_unlocked', 'true');
    }
}

/**
 * Show message when player tries to enter locked bus without keys
 * FIXED: Constructs a temporary object for the dialogue system
 */
function showBussyLockedMessage() {
    
    const message = "da Bussy is locked! You need da Bussy's Keys to enter.";
    
    if (typeof showDialogue === 'function') {
        // Pass an object, NOT a string!
        // The dialogue system expects { name, dialogue: [] }
        const tempBusNPC = {
            name: "da Bussy",
            dialogue: [message], // Must be an array
            direction: 'down'
        };
        showDialogue(tempBusNPC);
    } else if (typeof showNotification === 'function') {
        showNotification(message);
    } else {
        alert(message);
    }
}

// Load bus state (Optional persistence)
// try {
//     if (localStorage.getItem('bandaniel_bus_unlocked') === 'true') BUS_STATE.isUnlocked = true;
// } catch(e) {}

