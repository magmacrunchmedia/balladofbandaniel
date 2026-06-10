// world-items.js - System for managing items dropped on the ground
// FIXED VERSION - Updated for left/right hand system

/**
 * Stores items that have been dropped in the world
 * Structure: { mapName: [{ itemId, x, y, type }] }
 */
const WORLD_ITEMS = {};

/**
 * Add an item to the world at a specific position
 * @param {string} itemId - The item's ID
 * @param {number} x - X coordinate
 * @param {number} y - Y coordinate  
 * @param {string} mapName - Which map to place it on
 */
function addWorldItem(itemId, x, y, mapName) {
    
    // Initialize array for this map if needed
    if (!WORLD_ITEMS[mapName]) {
        WORLD_ITEMS[mapName] = [];
    }
    
    // Find the item definition from item data
    const itemDef = findItemDefinition(itemId);
    if (!itemDef) {
        console.error('❌ Could not find item definition for:', itemId);
        return;
    }
    
    
    // Convert tile coordinates to pixels and snap to grid
    const pixelX = Math.floor(x) * TILE_SIZE;
    const pixelY = Math.floor(y) * TILE_SIZE;
    
    // Add to world items
    const worldItem = {
        itemId: itemId,
        x: pixelX,
        y: pixelY,
        type: itemDef,
        picked: false
    };
    
    WORLD_ITEMS[mapName].push(worldItem);
    
}

/**
 * Find item definition from all item arrays
 * @param {string} itemId - The item ID to search for
 * @returns {Object|null} The item type definition
 */
function findItemDefinition(itemId) {
    // Search through all item arrays
    const itemArrays = [
        itemsOutside, 
//        itemsHouse, 
//        itemsUpstairs, 
//        itemsTunnel, 
        itemsTentInterior0, 
        itemsTentInterior1, 
        itemsTentInterior2, 
        itemsTentInterior3,         
        itemsBussyInterior
    ];
    
    for (const itemArray of itemArrays) {
        if (typeof itemArray !== 'undefined') {
            const found = itemArray.find(item => item.type && item.type.id === itemId);
            if (found) return found.type;
        }
    }
    
    console.warn('⚠️ Item definition not found for:', itemId);
    return null;
}

/**
 * Get all world items for the current map
 * @param {string} mapName - The map to get items from
 * @returns {Array} Array of world items
 */
function getWorldItemsForMap(mapName) {
    return WORLD_ITEMS[mapName] || [];
}

/**
 * Check if player can pick up a world item
 * @param {number} playerX - Player's X position (in tiles)
 * @param {number} playerY - Player's Y position (in tiles)
 * @param {string} mapName - Current map name
 * @returns {Object|null} The item if found, null otherwise
 */
function checkWorldItemPickup(playerX, playerY, mapName) {
    const items = getWorldItemsForMap(mapName);
    
    // Convert player position to pixels for comparison
    const playerPixelX = playerX * TILE_SIZE;
    const playerPixelY = playerY * TILE_SIZE;
    
    for (const item of items) {
        if (item.picked) continue;
        
        const dx = Math.abs(playerPixelX - item.x);
        const dy = Math.abs(playerPixelY - item.y);
        
        // Check if player is close enough (within 1.5 tiles)
        if (dx < TILE_SIZE * 1.5 && dy < TILE_SIZE * 1.5) {
            return item;
        }
    }
    
    return null;
}

/**
 * Pick up a world item
 * FIXED: Uses leftHand/rightHand instead of items array
 * @param {Object} worldItem - The world item to pick up
 * @param {string} mapName - Current map name
 * @returns {boolean} True if successful
 */
function pickupWorldItem(worldItem, mapName) {
    // FIXED: Check inventory capacity using isFull() method
    if (playerInventory.isFull()) {
        showMessage(`Hands full! You can only carry ${MAX_CARRY_ITEMS} items.`);
        return false;
    }
    
    // FIXED: Add to inventory using addItem() method (handles left/right hand logic)
    const itemData = {
        x: worldItem.x,
        y: worldItem.y,
        type: worldItem.type,
        picked: false
    };
    
    const success = playerInventory.addItem(itemData);
    
    if (!success) {
        showMessage('Could not pick up item!');
        return false;
    }
    
    // Mark as picked in world items
    worldItem.picked = true;
    
    // Remove from world items array
    const items = WORLD_ITEMS[mapName];
    const index = items.indexOf(worldItem);
    if (index > -1) {
        items.splice(index, 1);
    }
    
    
    // Update UI
    if (typeof updateItemCounter === 'function') {
        updateItemCounter();
    }
    if (typeof updateInventoryDisplay === 'function') {
        updateInventoryDisplay();
    }
    
    return true;
}

/**
 * Render world items (dropped items) on the current map
 * @param {CanvasRenderingContext2D} ctx - Canvas context
 * @param {number} offsetX - Camera offset X (in pixels)
 * @param {number} offsetY - Camera offset Y (in pixels)
 * @param {string} mapName - Current map name
 */
function renderWorldItems(ctx, offsetX, offsetY, mapName) {
    const items = getWorldItemsForMap(mapName);
    
    if (items.length === 0) {
        return;
    }
    
    items.forEach((item) => {
        if (item.picked) return;
        
        const screenX = item.x - offsetX;
        const screenY = item.y - offsetY;
        
        // Use the drawItem function to render the item sprite
        if (typeof drawItem === 'function') {
            const animFrame = typeof coinAnimFrame !== 'undefined' ? coinAnimFrame : 0;
            drawItem(screenX, screenY, item.type, animFrame);
        } else {
            // Fallback rendering if drawItem doesn't exist
            // Draw shadow
            ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
            ctx.beginPath();
            ctx.ellipse(
                screenX + TILE_SIZE / 2, 
                screenY + TILE_SIZE - 4, 
                TILE_SIZE / 3, 
                TILE_SIZE / 6, 
                0, 0, Math.PI * 2
            );
            ctx.fill();
            
            // Draw item box
            ctx.fillStyle = '#8B4513';
            ctx.fillRect(screenX + 8, screenY + 8, TILE_SIZE - 16, TILE_SIZE - 16);
            
            ctx.strokeStyle = '#654321';
            ctx.lineWidth = 2;
            ctx.strokeRect(screenX + 8, screenY + 8, TILE_SIZE - 16, TILE_SIZE - 16);
            
            // Draw sparkle
            const time = Date.now() / 200;
            ctx.fillStyle = `rgba(255, 215, 0, ${0.5 + Math.sin(time) * 0.3})`;
            ctx.beginPath();
            ctx.arc(screenX + TILE_SIZE / 2, screenY + TILE_SIZE / 2, 4, 0, Math.PI * 2);
            ctx.fill();
        }
    });
}

/**
 * Show a temporary message to the player
 * @param {string} message - Message to display
 */
function showMessage(message) {
    // Create message element if it doesn't exist
    let messageEl = document.getElementById('gameMessage');
    
    if (!messageEl) {
        messageEl = document.createElement('div');
        messageEl.id = 'gameMessage';
        messageEl.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(0, 0, 0, 0.9);
            color: #ffd700;
            padding: 20px 40px;
            border-radius: 10px;
            border: 2px solid #ffd700;
            font-size: 18px;
            font-weight: bold;
            z-index: 10000;
            pointer-events: none;
            opacity: 0;
            transition: opacity 0.3s;
        `;
        document.body.appendChild(messageEl);
    }
    
    messageEl.textContent = message;
    messageEl.style.opacity = '1';
    
    // Fade out after 2 seconds
    setTimeout(() => {
        messageEl.style.opacity = '0';
    }, 2000);
}
