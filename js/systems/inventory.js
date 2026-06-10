// systems/inventory.js
// MINIMAL INVENTORY SYSTEM - Creates playerInventory object
// This file must load BEFORE sidebar.js

/* =====================================================
   PLAYER INVENTORY OBJECT
===================================================== */

/**
 * Player inventory - tracks items in left and right hands
 * Compatible with the left/right hand system
 */
const playerInventory = {
    leftHand: null,   // Item in left hand (or null if empty)
    rightHand: null,  // Item in right hand (or null if empty)
    backpack: null,   // Equipped backpack type (or null if none)
    storage: [],      // Stored items in backpack (array of item ID strings)
    
    /**
     * Add an item to inventory
     * Automatically places in first empty hand
     * @param {object} item - Item object with type property
     * @returns {boolean} True if added, false if hands full
     */
    addItem: function(item) {
        // Check if left hand is empty
        if (this.leftHand === null) {
            this.leftHand = item;
            return true;
        }
        
        // Check if right hand is empty
        if (this.rightHand === null) {
            this.rightHand = item;
            return true;
        }
        
        // Both hands full
        return false;
    },
    
    /**
     * Remove an item from inventory by ID
     * @param {string} itemId - ID of item to remove
     * @returns {object|null} Removed item or null if not found
     */
    removeItem: function(itemId) {
        // Check left hand
        if (this.leftHand && this.leftHand.type.id === itemId) {
            const removed = this.leftHand;
            this.leftHand = null;
            return removed;
        }
        
        // Check right hand
        if (this.rightHand && this.rightHand.type.id === itemId) {
            const removed = this.rightHand;
            this.rightHand = null;
            return removed;
        }
        
        return null;
    },
    
    /**
     * Check if player has a specific item
     * @param {string} itemId - ID of item to check for
     * @returns {boolean} True if item is in either hand
     */
    hasItem: function(itemId) {
        if (this.leftHand && this.leftHand.type.id === itemId) return true;
        if (this.rightHand && this.rightHand.type.id === itemId) return true;
        return false;
    },
    
    /**
     * Get item from either hand by ID
     * @param {string} itemId - ID of item to get
     * @returns {object|null} Item object or null if not found
     */
    getItem: function(itemId) {
        if (this.leftHand && this.leftHand.type.id === itemId) return this.leftHand;
        if (this.rightHand && this.rightHand.type.id === itemId) return this.rightHand;
        return null;
    },
    
    /**
     * Swap items between hands
     */
    swapHands: function() {
        const temp = this.leftHand;
        this.leftHand = this.rightHand;
        this.rightHand = temp;
    },
    
    /**
     * Get total number of items in hands
     * @returns {number} Number of items (0, 1, or 2)
     */
    getItemCount: function() {
        let count = 0;
        if (this.leftHand !== null) count++;
        if (this.rightHand !== null) count++;
        return count;
    },
    
    /**
     * Check if hands are full
     * @returns {boolean} True if both hands occupied
     */
    isFull: function() {
        return this.leftHand !== null && this.rightHand !== null;
    },
    
    /**
     * Equip a backpack
     * @param {object} backpackType - Backpack type from BACKPACK_TYPES
     */
    equipBackpack: function(backpackType) {
        this.backpack = backpackType;
        this.storage = [];
    },
    
    /**
     * Unequip the backpack
     * @returns {object|null} The backpack type that was equipped (for world drop)
     */
    unequipBackpack: function() {
        const backpack = this.backpack;
        this.backpack = null;
        this.storage = [];
        return backpack;
    },
    
    /**
     * Check if a backpack is equipped
     * @returns {boolean}
     */
    isBackpackEquipped: function() {
        return this.backpack !== null;
    },
    
    /**
     * Get backpack storage capacity
     * @returns {number} Capacity (6 if equipped, 0 if not)
     */
    getBackpackCapacity: function() {
        if (!this.backpack) return 0;
        return 6; // Hardcoded for now, will use this.backpack.capacity later
    },
    
    /**
     * Add an item to backpack storage
     * @param {string} itemId - Item ID to store
     * @returns {boolean} True if added, false if backpack full
     */
    addToStorage: function(itemId) {
        if (this.storage.length >= this.getBackpackCapacity()) return false;
        this.storage.push(itemId);
        return true;
    },
    
    /**
     * Remove an item from backpack storage
     * @param {string} itemId - Item ID to remove
     * @returns {string|null} The removed item ID, or null if not found
     */
    removeFromStorage: function(itemId) {
        const index = this.storage.indexOf(itemId);
        if (index === -1) return null;
        this.storage.splice(index, 1);
        return itemId;
    },
    
    /**
     * Check if backpack storage contains an item
     * @param {string} itemId - Item ID to check
     * @returns {boolean}
     */
    hasInStorage: function(itemId) {
        return this.storage.includes(itemId);
    },
    
    /**
     * Clear all items from inventory (for debugging)
     */
    clear: function() {
        this.leftHand = null;
        this.rightHand = null;
        this.backpack = null;
        this.storage = [];
    },
    
    /**
     * Debug: Print inventory contents
     */
    debugInventory: function() {
    }
};

/* =====================================================
   INVENTORY OPEN/CLOSE FUNCTIONS
===================================================== */

let inventoryOpen = false;

/**
 * Open the full inventory panel
 */
function openInventory() {
    const inventoryPanel = document.getElementById('inventoryPanel');
    if (!inventoryPanel) {
        console.warn('Inventory panel not found in HTML');
        return;
    }
    
    inventoryOpen = true;
    inventoryPanel.style.display = 'flex';
    
    // Pause game
    if (typeof gamePaused !== 'undefined') {
        gamePaused = true;
    }
    
    // Update display
    updateInventoryDisplay();
    
}

/**
 * Close the inventory panel
 */
function closeInventory() {
    const inventoryPanel = document.getElementById('inventoryPanel');
    if (inventoryPanel) {
        inventoryPanel.style.display = 'none';
    }
    
    inventoryOpen = false;
    
    // Unpause game
    if (typeof gamePaused !== 'undefined') {
        gamePaused = false;
    }
    
}

/**
 * Update the full inventory panel display
 */
function updateInventoryDisplay() {
    const inventoryList = document.getElementById('inventoryList');
    if (!inventoryList) return;
    
    inventoryList.innerHTML = '';
    
    // Count items
    const itemCount = playerInventory.getItemCount();
    
    if (itemCount === 0) {
        inventoryList.innerHTML = '<p style="color: #999;">No items in inventory</p>';
        return;
    }
    
    // Show left hand item
    if (playerInventory.leftHand) {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'inventory-item';
        itemDiv.innerHTML = `
            <strong>Left Hand:</strong> ${playerInventory.leftHand.type.name}<br>
            <span style="font-size: 12px; color: #aaa;">${playerInventory.leftHand.type.description || ''}</span>
        `;
        inventoryList.appendChild(itemDiv);
    }
    
    // Show right hand item
    if (playerInventory.rightHand) {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'inventory-item';
        itemDiv.innerHTML = `
            <strong>Right Hand:</strong> ${playerInventory.rightHand.type.name}<br>
            <span style="font-size: 12px; color: #aaa;">${playerInventory.rightHand.type.description || ''}</span>
        `;
        inventoryList.appendChild(itemDiv);
    }
}

/* =====================================================
   INVENTORY BUTTON HANDLERS
===================================================== */

// Set up inventory button click handler
document.addEventListener('DOMContentLoaded', () => {
    // Inventory open button
    const inventoryButton = document.getElementById('inventoryButton');
    if (inventoryButton) {
        inventoryButton.addEventListener('click', openInventory);
    }
    
    // Inventory close button
    const inventoryClose = document.getElementById('inventoryClose');
    if (inventoryClose) {
        inventoryClose.addEventListener('click', closeInventory);
    }
});

