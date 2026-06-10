// storage.js - Item storage system for da Bussy backpack
// UPDATED VERSION v6 - Bus Unlock System Integration
// Keys can be stored ONLY after bus is unlocked

// Storage data - items stored in containers
const STORAGE_DATA = {
    bussy_backpack: [],  // Array of stored item IDs
    bussy_chest: []      // Array of stored item IDs (unlimited capacity)
};

/**
 * Get stored items for a container
 * @param {string} containerKey - Key of the storage container (e.g., 'bussy_backpack')
 * @returns {Array} Array of stored items
 */
function getStoredItems(containerKey) {
    if (!STORAGE_DATA[containerKey]) {
        STORAGE_DATA[containerKey] = [];
    }
    return STORAGE_DATA[containerKey];
}

/**
 * Store an item in a container
 * @param {string} containerKey - Key of the storage container
 * @param {string} itemId - ID of the item to store
 * @returns {boolean} True if successful, false if storage full
 */
function storeItem(containerKey, itemId) {
    const storage = getStoredItems(containerKey);
    
    // Check storage capacity
    const container = PROP_POSITIONS[containerKey];
    const capacity = container ? container.storageCapacity : 10;
    
    // Handle unlimited capacity (999 or higher)
    if (capacity < 999 && storage.length >= capacity) {
        return false;
    }
    
    if (typeof playerInventory === 'undefined') {
        console.error('Player inventory not found');
        return false;
    }
    
    // Find the item in player's hands
    let itemToStore = null;
    let handUsed = null;

    if (playerInventory.leftHand && playerInventory.leftHand.type.id === itemId) {
        itemToStore = playerInventory.leftHand;
        handUsed = 'leftHand';
    } else if (playerInventory.rightHand && playerInventory.rightHand.type.id === itemId) {
        itemToStore = playerInventory.rightHand;
        handUsed = 'rightHand';
    }

    if (!itemToStore) {
        return false;
    }
    
    // ✅ SPECIAL HANDLING FOR KEYS
    if (itemToStore.type.id === 'bussy_keys') {
        // Check if bus is unlocked (from bus-unlock-system.js)
        if (typeof BUS_STATE !== 'undefined' && !BUS_STATE.isUnlocked) {
            alert("You can't store da Bussy's keys until you've unlocked the bus!");
            return false;
        }
    }
    
    // Only allow optional items to be stored (keys are now optional after unlock)
    if (itemToStore.type.required) {
        return false;
    }
    
    // Remove from inventory (clear the hand)
    playerInventory[handUsed] = null;
    
    // Add to storage
    storage.push(itemId);
    
    
    // Update the inventory display
    if (typeof updateItemCounter === 'function') {
        updateItemCounter();
    }
    // Update inventory UI if open
    if (typeof updateInventoryDisplay === 'function') {
        updateInventoryDisplay();
    }
    
    return true;
}

/**
 * Retrieve an item from storage
 * @param {string} containerKey - Key of the storage container
 * @param {string} itemId - ID of the item to retrieve
 * @returns {boolean} True if successful, false otherwise
 */
function retrieveItem(containerKey, itemId) {
    const storage = getStoredItems(containerKey);
    
    // Check if item is in storage
    const storageIndex = storage.indexOf(itemId);
    if (storageIndex === -1) {
        return false;
    }
    
    if (typeof playerInventory === 'undefined') {
        console.error('Player inventory not found');
        return false;
    }
    
    // Check if inventory has space (Check if both hands are full)
    if (playerInventory.leftHand && playerInventory.rightHand) {
        alert(`Hands full! You can only carry 2 items at once.`);
        return false;
    }
    
    // Find the item definition (same logic as before to find source data)
    const mapItems = typeof getItemsForMap === 'function' ? getItemsForMap(currentMap) : [];
    let itemData = mapItems.find(item => item.type && item.type.id === itemId);
    
    // If not found in current map, search all map item arrays
    if (!itemData) {
        const allMapArrays = [itemsOutside, itemsTentInterior0, itemsTentInterior1, itemsTentInterior2, itemsTentInterior3, itemsBussyInterior];
        for (const mapArray of allMapArrays) {
            if (typeof mapArray !== 'undefined') {
                itemData = mapArray.find(item => item.type && item.type.id === itemId);
                if (itemData) break;
            }
        }
    }
    
    if (!itemData) {
        console.error('Item definition not found for:', itemId);
        return false;
    }
    
    // Remove from storage
    storage.splice(storageIndex, 1);

    // Add to inventory (Use addItem if available, otherwise manual fallback)
    if (typeof playerInventory.addItem === 'function') {
        playerInventory.addItem(itemData);
    } else {
        // Fallback: manually assign to empty hand
        if (!playerInventory.leftHand) {
            playerInventory.leftHand = itemData;
        } else {
            playerInventory.rightHand = itemData;
        }
    }
    
    
    // Update the inventory display
    if (typeof updateItemCounter === 'function') {
        updateItemCounter();
    }
    if (typeof updateInventoryDisplay === 'function') {
        updateInventoryDisplay();
    }
    
    return true;
}

/**
 * Get storage capacity info for a container
 * @param {string} containerKey - Key of the storage container
 * @returns {Object} Object with current and max capacity
 */
function getStorageInfo(containerKey) {
    const storage = getStoredItems(containerKey);
    const container = PROP_POSITIONS[containerKey];
    const capacity = container ? container.storageCapacity : 10;
    
    // Handle unlimited capacity (999 or higher)
    const isUnlimited = capacity >= 999;
    
    return {
        current: storage.length,
        max: isUnlimited ? '∞' : capacity,
        isFull: isUnlimited ? false : storage.length >= capacity
    };
}

/**
 * Open storage UI for a container
 * @param {string} containerKey - Key of the storage container
 */
function openStorageUI(containerKey) {
    const container = PROP_POSITIONS[containerKey];
    if (!container || !container.storageItem) {
        return;
    }
    
    // Show storage panel
    const storagePanel = document.getElementById('storagePanel');
    if (!storagePanel) {
        console.error('Storage panel not found in HTML');
        return;
    }
    
    // Set current container
    window.currentStorageContainer = containerKey;
    
    // Update UI
    updateStorageUI();
    
    // Show panel
    storagePanel.style.display = 'block';
    
    // Pause game
    if (typeof window.gamePaused !== 'undefined') {
        window.gameWasPaused = window.gamePaused;  // Remember previous state
        window.gamePaused = true;
    }
    
}

/**
 * Close storage UI
 */
function closeStorageUI() {
    const storagePanel = document.getElementById('storagePanel');
    if (storagePanel) {
        storagePanel.style.display = 'none';
    }
    
    window.currentStorageContainer = null;
    
    // Restore previous pause state
    if (typeof window.gamePaused !== 'undefined' && typeof window.gameWasPaused !== 'undefined') {
        window.gamePaused = window.gameWasPaused;
        window.gameWasPaused = undefined;
    } else if (typeof window.gamePaused !== 'undefined') {
        window.gamePaused = false;
    }
    
}

/**
 * Update storage UI with current items
 */
function updateStorageUI() {
    const containerKey = window.currentStorageContainer;
    if (!containerKey) return;
    
    const storage = getStoredItems(containerKey);
    const info = getStorageInfo(containerKey);
    
    // Update capacity display
    const capacityDisplay = document.getElementById('storageCapacity');
    if (capacityDisplay) {
        capacityDisplay.textContent = `${info.current} / ${info.max}`;
        capacityDisplay.style.color = info.isFull ? '#ff5555' : '#2ecc71';
    }
    
    if (typeof playerInventory === 'undefined') {
        console.error('Player inventory not found');
        return;
    }
    
    // Update inventory list (items player has - only optional items)
    const inventoryList = document.getElementById('storageInventoryList');
    if (inventoryList) {
        inventoryList.innerHTML = '';
        
        // Construct array from hands (New System)
        const currentItems = [];
        if (playerInventory.leftHand) currentItems.push(playerInventory.leftHand);
        if (playerInventory.rightHand) currentItems.push(playerInventory.rightHand);

        // Filter to only storable items
        const storableItems = currentItems.filter(item => {
            // Always block required items
            if (item.type.required) return false;
            
            // ✅ Special handling for keys
            if (item.type.id === 'bussy_keys') {
                // Only allow if bus is unlocked
                return typeof BUS_STATE !== 'undefined' && BUS_STATE.isUnlocked;
            }
            
            // Other optional items are always storable
            return true;
        });
        
        if (storableItems.length === 0) {
            // Check if user has keys but bus not unlocked
            const hasKeys = currentItems.some(item => item.type.id === 'bussy_keys');
            if (hasKeys && (typeof BUS_STATE === 'undefined' || !BUS_STATE.isUnlocked)) {
                inventoryList.innerHTML = '<div class="storage-empty">Unlock da Bussy first to store keys!</div>';
            } else {
                inventoryList.innerHTML = '<div class="storage-empty">No items to store</div>';
            }
        } else {
            storableItems.forEach(item => {
                const itemDiv = document.createElement('div');
                itemDiv.className = 'storage-item';
                itemDiv.innerHTML = `
                    <span class="storage-item-name">${item.type.name}</span>
                    <button class="storage-action-btn" onclick="handleStoreItem('${item.type.id}')">Store →</button>
                `;
                inventoryList.appendChild(itemDiv);
            });
        }
    }
    
    // Update stored items list
    const storedList = document.getElementById('storageStoredList');
    if (storedList) {
        storedList.innerHTML = '';
        
        if (storage.length === 0) {
            storedList.innerHTML = '<div class="storage-empty">Storage is empty</div>';
        } else {
            // Get all items from the map
            const mapItems = typeof getItemsForMap === 'function' ? getItemsForMap(currentMap) : [];
            
            storage.forEach(itemId => {
                // Try to find item in map items first
                let item = mapItems.find(i => i.type && i.type.id === itemId);
                
                // If not found, search all map arrays
                if (!item) {
                    const allMapArrays = [itemsOutside, itemsTentInterior0, itemsTentInterior1, itemsTentInterior2, itemsTentInterior3, itemsBussyInterior];
                    for (const mapArray of allMapArrays) {
                        if (typeof mapArray !== 'undefined') {
                            item = mapArray.find(i => i.type && i.type.id === itemId);
                            if (item) break;
                        }
                    }
                }
                
                if (item) {
                    const itemDiv = document.createElement('div');
                    itemDiv.className = 'storage-item';
                    itemDiv.innerHTML = `
                        <button class="storage-action-btn" onclick="handleRetrieveItem('${item.type.id}')">← Take</button>
                        <span class="storage-item-name">${item.type.name}</span>
                    `;
                    storedList.appendChild(itemDiv);
                } else {
                    console.warn('Could not find item definition for stored item:', itemId);
                }
            });
        }
    }
}

/**
 * Handle storing an item (called from UI button)
 */
function handleStoreItem(itemId) {
    const containerKey = window.currentStorageContainer;
    if (!containerKey) return;
    
    if (storeItem(containerKey, itemId)) {
        updateStorageUI();
        if (typeof updateInventoryDisplay === 'function') {
            updateInventoryDisplay();
        }
    } else {
        const info = getStorageInfo(containerKey);
        if (info.isFull) {
            alert('Storage is full! Maximum capacity: ' + info.max + ' items');
        }
    }
}

/**
 * Handle retrieving an item (called from UI button)
 */
function handleRetrieveItem(itemId) {
    const containerKey = window.currentStorageContainer;
    if (!containerKey) return;
    
    if (retrieveItem(containerKey, itemId)) {
        updateStorageUI();
        if (typeof updateInventoryDisplay === 'function') {
            updateInventoryDisplay();
        }
    }
}

