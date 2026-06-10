// ui/input-handler-additions.js
// Hand swapping and item dropping with CONFIGURABLE KEY BINDINGS

/* =====================================================
   🎮 KEY BINDINGS - CHANGE THESE TO REASSIGN BUTTONS
===================================================== */

const KEY_BINDINGS = {
    SWAP_HANDS: 'q',      // Change to any key (e.g., 'tab', 'c', 'r', etc.)
    DROP_LEFT: 'x',       // Change to any key (e.g., '1', 'z', 'v', etc.)
    DROP_RIGHT: 'e',      // Change to any key (e.g., '2', 'c', 'f', etc.)
    TOGGLE_BACKPACK: 'b', // Toggle backpack UI
};

/* ===================================================== */

function handleSwapHands() {
    
    if (typeof playerInventory === 'undefined') {
        console.error('❌ playerInventory not found!');
        return;
    }
    
    const leftHand = playerInventory.leftHand;
    const rightHand = playerInventory.rightHand;
    
    if (!leftHand && !rightHand) {
        if (typeof showNotification === 'function') {
            showNotification('Both hands are empty!');
        }
        return;
    }
    
    playerInventory.leftHand = rightHand;
    playerInventory.rightHand = leftHand;
    
    
    if (typeof updateHandsDisplay === 'function') {
        updateHandsDisplay();
    }
    
    if (typeof showNotification === 'function') {
        showNotification('Swapped hands!');
    }
    
}

function handleDropItem() {
    
    if (typeof playerInventory === 'undefined') {
        console.error('❌ playerInventory not found!');
        return;
    }
    
    const leftHand = playerInventory.leftHand;
    const rightHand = playerInventory.rightHand;
    
    if (leftHand) {
        handleDropFromLeftHand();
        return;
    }
    
    if (rightHand) {
        handleDropFromRightHand();
        return;
    }
    
    if (typeof showNotification === 'function') {
        showNotification('Nothing to drop!');
    }
}

function handleDropFromLeftHand() {
    
    if (typeof playerInventory === 'undefined') {
        console.error('❌ playerInventory not found!');
        return;
    }
    
    const leftHand = playerInventory.leftHand;
    
    if (!leftHand) {
        if (typeof showNotification === 'function') {
            showNotification('Left hand is empty!');
        }
        return;
    }
    
    if (leftHand.type.canDrop === false) {
        if (typeof showNotification === 'function') {
            showNotification(`Cannot drop ${leftHand.type.name}!`);
        }
        return;
    }
    
    if (typeof player === 'undefined') {
        console.error('❌ player not found!');
        return;
    }
    
    const dropX = Math.floor(player.x + player.facingX * 2);
    const dropY = Math.floor(player.y + player.facingY * 2);
    
    
    // FIX: Pass item type ID string, not the entire type object
    if (typeof addWorldItem === 'function') {
        addWorldItem(leftHand.type.id, dropX, dropY, currentMap);
    } else {
        console.error('❌ addWorldItem function not found!');
        return;
    }
    
    playerInventory.leftHand = null;
    
    if (typeof updateHandsDisplay === 'function') {
        updateHandsDisplay();
    }
    
    if (typeof showNotification === 'function') {
        showNotification(`Dropped ${leftHand.type.name} from LEFT hand`);
    }
    
}

function handleDropFromRightHand() {
    
    if (typeof playerInventory === 'undefined') {
        console.error('❌ playerInventory not found!');
        return;
    }
    
    const rightHand = playerInventory.rightHand;
    
    if (!rightHand) {
        if (typeof showNotification === 'function') {
            showNotification('Right hand is empty!');
        }
        return;
    }
    
    if (rightHand.type.canDrop === false) {
        if (typeof showNotification === 'function') {
            showNotification(`Cannot drop ${rightHand.type.name}!`);
        }
        return;
    }
    
    if (typeof player === 'undefined') {
        console.error('❌ player not found!');
        return;
    }
    
    const dropX = Math.floor(player.x + player.facingX * 2);
    const dropY = Math.floor(player.y + player.facingY * 2);
    
    
    // FIX: Pass item type ID string, not the entire type object
    if (typeof addWorldItem === 'function') {
        addWorldItem(rightHand.type.id, dropX, dropY, currentMap);
    } else {
        console.error('❌ addWorldItem function not found!');
        return;
    }
    
    playerInventory.rightHand = null;
    
    if (typeof updateHandsDisplay === 'function') {
        updateHandsDisplay();
    }
    
    if (typeof showNotification === 'function') {
        showNotification(`Dropped ${rightHand.type.name} from RIGHT hand`);
    }
    
}

function setupInventoryKeyHandlers() {
    
    window.addEventListener('keydown', (e) => {
        if (typeof gameStarted !== 'undefined' && !gameStarted) return;
        if (typeof gamePaused !== 'undefined' && gamePaused) return;
        if (typeof gameOver !== 'undefined' && gameOver) return;
        
        const key = e.key.toLowerCase();
        
        // Swap hands
        if (key === KEY_BINDINGS.SWAP_HANDS) {
            e.preventDefault();
            handleSwapHands();
            return;
        }
        
        // Drop from right hand
        if (key === KEY_BINDINGS.DROP_RIGHT) {
            e.preventDefault();
            handleDropFromRightHand();
            return;
        }
        
        // Drop from left hand (or first item if left is empty)
        if (key === KEY_BINDINGS.DROP_LEFT) {
            e.preventDefault();
            handleDropItem();
            return;
        }
        
        // Toggle backpack UI
        if (key === KEY_BINDINGS.TOGGLE_BACKPACK) {
            e.preventDefault();
            if (typeof toggleBackpackPanel === 'function') {
                toggleBackpackPanel();
            }
            return;
        }
    });
    
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupInventoryKeyHandlers);
} else {
    setupInventoryKeyHandlers();
}

