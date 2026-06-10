// props.js - Unified prop system for all maps
// Works with collision arrays already defined in data.js
//
// NOTE: This version does NOT declare collision arrays (they're in data.js)
// It only provides helper functions for prop retrieval and interaction

/* =====================
   PROP RETRIEVAL FUNCTIONS
   These read from PROP_POSITIONS in data.js
===================== */

/**
 * Get all renderable props for a given map
 * Returns props with their drawing functions and collision info
 * @param {string} mapName - Name of the current map
 * @returns {Array} Array of prop objects ready for rendering
 */
function getPropsForMap(mapName) {
    if (typeof PROP_POSITIONS === 'undefined') {
        console.warn('PROP_POSITIONS not defined yet');
        return [];
    }
    
    const props = [];
    
    for (const [key, prop] of Object.entries(PROP_POSITIONS)) {
        // Only include props for the current map
        if (prop.map !== mapName) continue;
        
        // Skip props that are just walls (no visual representation)
        if (prop.type === 'tent_walls' || prop.type === 'bus_walls') {
            continue;
        }
        
        // Include all other props
        props.push({
            key: key,
            x: prop.x,
            y: prop.y,
            width: prop.width,
            height: prop.height,
            type: prop.type,
            drawFunction: prop.drawFunction,
            flipped: prop.flipped || false,
            collision: prop.solidTiles && prop.solidTiles.length > 0,
            solidTiles: prop.solidTiles || [],
            interact: prop.interact || false,
            interactType: prop.interactType,
            interactMessage: prop.interactMessage,
            dialogueKey: prop.dialogueKey,
            color: prop.color,
            visible: prop.visible,
            storageItem: prop.storageItem || false,
            storageCapacity: prop.storageCapacity
        });
    }
    
    return props;
}

/**
 * Get camping props from TENT_CAMPING_ITEMS system AND PROP_POSITIONS
 * This handles both the old TENT_CAMPING_ITEMS and new PROP_POSITIONS camping props
 * @param {string} mapName - Name of the current map
 * @returns {Array} Array of camping prop objects
 */
function getCampingPropsForMap(mapName) {
    const props = [];
    
    // Get camping props from TENT_CAMPING_ITEMS (old system)
    if (typeof TENT_CAMPING_ITEMS !== 'undefined') {
        for (const key in TENT_CAMPING_ITEMS) {
            const item = TENT_CAMPING_ITEMS[key];
            if (item.map === mapName) {
                props.push({
                    name: key,
                    x: item.x,
                    y: item.y,
                    type: item.type,
                    drawFunction: item.drawFunction,
                    collidable: item.collidable,
                    visible: item.visible
                });
            }
        }
    }
    
    // ALSO get camping props from PROP_POSITIONS (new system)
    if (typeof PROP_POSITIONS !== 'undefined') {
        for (const [key, prop] of Object.entries(PROP_POSITIONS)) {
            if (prop.map === mapName && (prop.type === 'campingProp' || prop.type === 'camping_prop')) {
                props.push({
                    key: key,
                    name: key,
                    x: prop.x,
                    y: prop.y,
                    type: prop.type,
                    drawFunction: prop.drawFunction,
                    collidable: prop.solidTiles && prop.solidTiles.length > 0,
                    interact: prop.interact || false,
                    interactType: prop.interactType,
                    interactMessage: prop.interactMessage,
                    storageItem: prop.storageItem || false,
                    storageCapacity: prop.storageCapacity,
                    visible: prop.visible
                });
            }
        }
    }
    
    return props;
}

/**
 * Get bus props from PROP_POSITIONS
 * @param {string} mapName - Name of the current map
 * @returns {Array} Array of bus prop objects
 */
function getBusPropsForMap(mapName) {
    if (typeof PROP_POSITIONS === 'undefined') {
        return [];
    }
    
    const props = [];
    
    for (const [key, prop] of Object.entries(PROP_POSITIONS)) {
        if (prop.map === mapName) {
            if (prop.type === 'steering_wheel' || prop.type === 'bus_prop' || prop.type === 'dashboard') {
                props.push({
                    key: key,
                    x: prop.x,
                    y: prop.y,
                    width: prop.width,
                    height: prop.height,
                    type: prop.type,
                    drawFunction: prop.drawFunction,
                    flipped: prop.flipped || false,
                    solidTiles: prop.solidTiles || [],
                    interact: prop.interact || false,
                    interactMessage: prop.interactMessage,
                    dialogueKey: prop.dialogueKey
                });
            }
        }
    }
    
    return props;
}

/**
 * Get oak tree props
 * @param {string} mapName - Name of the current map
 * @returns {Array} Array of oak tree objects
 */
function getOakTreesForMap(mapName) {
    return getPropsForMap(mapName).filter(prop => prop.type === 'oak_tree');
}

/**
 * Get tent props
 * @param {string} mapName - Name of the current map
 * @returns {Array} Array of tent objects
 */
function getTentsForMap(mapName) {
    return getPropsForMap(mapName).filter(prop => prop.type === 'tent');
}

/**
 * Get da Bussy prop
 * @param {string} mapName - Name of the current map
 * @returns {Object|null} da Bussy object or null
 */
function getBussyForMap(mapName) {
    const props = getPropsForMap(mapName).filter(prop => prop.type === 'bussy');
    return props.length > 0 ? props[0] : null;
}

/* =====================
   PROP INTERACTION HELPERS
===================== */

/**
 * Check if a tile position collides with any prop
 * NOTE: This is NOT used by collision.js (which uses the arrays from data.js)
 * This is just a helper function for other systems
 * @param {number} x - Tile X position to check
 * @param {number} y - Tile Y position to check
 * @param {string} mapName - Current map name
 * @returns {boolean} True if position collides with a prop
 */
function checkPropCollision(x, y, mapName) {
    if (typeof PROP_POSITIONS === 'undefined') {
        return false;
    }
    
    for (const [key, prop] of Object.entries(PROP_POSITIONS)) {
        // Skip props not on current map
        if (prop.map !== mapName) continue;
        
        // Skip props with no collision
        if (!prop.solidTiles || prop.solidTiles.length === 0) continue;
        
        // Check each solid tile within this prop
        for (const solidTile of prop.solidTiles) {
            const tileX = prop.x + solidTile.dx;
            const tileY = prop.y + solidTile.dy;
            
            if (tileX === x && tileY === y) {
                return true;  // Collision detected
            }
        }
    }
    
    return false;  // No collision
}

/**
 * Get the prop at a specific tile position (for interactions)
 * @param {number} x - Tile X position
 * @param {number} y - Tile Y position
 * @param {string} mapName - Current map name
 * @returns {Object|null} Prop object if found, null otherwise
 */
function getPropAt(x, y, mapName) {
    if (typeof PROP_POSITIONS === 'undefined') {
        return null;
    }
    
    for (const [key, prop] of Object.entries(PROP_POSITIONS)) {
        if (prop.map !== mapName) continue;
        
        // Check if position is within prop bounds
        if (x >= prop.x && x < prop.x + prop.width &&
            y >= prop.y && y < prop.y + prop.height) {
            return {
                key: key,
                ...prop
            };
        }
    }
    
    return null;
}

/**
 * Get interactable prop in front of player
 * @returns {Object|null} Interactable prop or null
 */
function getInteractablePropInFront() {
    if (typeof player === 'undefined') {
        return null;
    }
    
    // Calculate tile in front of player based on direction
    let checkX = player.x;
    let checkY = player.y;
    
    switch(player.direction) {
        case 'up':
            checkY -= 1;
            break;
        case 'down':
            checkY += 1;
            break;
        case 'left':
            checkX -= 1;
            break;
        case 'right':
            checkX += 1;
            break;
    }
    
    // Round to nearest tile
    checkX = Math.round(checkX);
    checkY = Math.round(checkY);
    
    // Get prop at that position
    const prop = getPropAt(checkX, checkY, currentMap);
    
    // Return prop only if it's interactable
    if (prop && prop.interact) {
        return prop;
    }
    
    return null;
}

/* =====================
   LEGACY FURNITURE DRAWING FUNCTIONS
   These are kept for backwards compatibility
===================== */

function drawCouch(x, y) {
    // Couch (3x2 tiles)
    const w = TILE_SIZE * 3;
    const h = TILE_SIZE * 2;
    
    // Couch base (brown)
    ctx.fillStyle = '#8b6f47';
    ctx.fillRect(x, y + h * 0.4, w, h * 0.6);
    ctx.strokeStyle = '#5d4a2f';
    ctx.lineWidth = 2;
    ctx.strokeRect(x, y + h * 0.4, w, h * 0.6);
    
    // Backrest
    ctx.fillStyle = '#8b6f47';
    ctx.fillRect(x + w * 0.1, y, w * 0.8, h * 0.45);
    ctx.strokeStyle = '#5d4a2f';
    ctx.lineWidth = 2;
    ctx.strokeRect(x + w * 0.1, y, w * 0.8, h * 0.45);
    
    // Armrests
    ctx.fillStyle = '#8b6f47';
    ctx.fillRect(x, y + h * 0.2, w * 0.15, h * 0.5);
    ctx.fillRect(x + w * 0.85, y + h * 0.2, w * 0.15, h * 0.5);
    ctx.strokeRect(x, y + h * 0.2, w * 0.15, h * 0.5);
    ctx.strokeRect(x + w * 0.85, y + h * 0.2, w * 0.15, h * 0.5);
    
    // Cushions
    ctx.fillStyle = '#a0826d';
    for (let i = 0; i < 3; i++) {
        ctx.fillRect(x + w * 0.17 + i * (w * 0.22), y + h * 0.45, w * 0.2, h * 0.25);
    }
    
    // Legs
    ctx.fillStyle = '#3e2723';
    ctx.fillRect(x + 5, y + h - 8, 6, 8);
    ctx.fillRect(x + w - 11, y + h - 8, 6, 8);
}

function drawKitchenCounter(x, y) {
    // Kitchen counter (3x1 tiles)
    const w = TILE_SIZE * 3;
    const h = TILE_SIZE;
    
    // Counter base (wood)
    ctx.fillStyle = '#8b7355';
    ctx.fillRect(x, y + h * 0.3, w, h * 0.7);
    ctx.strokeStyle = '#5d4a37';
    ctx.lineWidth = 2;
    ctx.strokeRect(x, y + h * 0.3, w, h * 0.7);
    
    // Countertop (marble)
    ctx.fillStyle = '#d4d4d4';
    ctx.fillRect(x, y + h * 0.3, w, h * 0.15);
    ctx.strokeStyle = '#999';
    ctx.lineWidth = 1;
    ctx.strokeRect(x, y + h * 0.3, w, h * 0.15);
    
    // Sink
    ctx.fillStyle = '#c0c0c0';
    ctx.fillRect(x + w * 0.4, y + h * 0.32, w * 0.2, h * 0.1);
    ctx.strokeStyle = '#888';
    ctx.lineWidth = 1;
    ctx.strokeRect(x + w * 0.4, y + h * 0.32, w * 0.2, h * 0.1);
    
    // Faucet
    ctx.strokeStyle = '#c0c0c0';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(x + w * 0.5, y + h * 0.25);
    ctx.lineTo(x + w * 0.5, y + h * 0.1);
    ctx.lineTo(x + w * 0.53, y + h * 0.15);
    ctx.stroke();
    
    // Cabinet doors
    ctx.strokeStyle = '#5d4a37';
    ctx.lineWidth = 2;
    for (let i = 0; i < 3; i++) {
        ctx.strokeRect(x + 5 + i * (w / 3), y + h * 0.5, w / 3 - 10, h * 0.4);
    }
    
    // Door knobs
    ctx.fillStyle = '#ffd700';
    for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        ctx.arc(x + 25 + i * (w / 3), y + h * 0.7, 2, 0, Math.PI * 2);
        ctx.fill();
    }
}

function drawRefrigerator(x, y) {
    // Refrigerator (1x2 tiles)
    const w = TILE_SIZE;
    const h = TILE_SIZE * 2;
    
    // Fridge body (white)
    ctx.fillStyle = '#f5f5f5';
    ctx.fillRect(x, y, w, h);
    ctx.strokeStyle = '#ccc';
    ctx.lineWidth = 3;
    ctx.strokeRect(x, y, w, h);
    
    // Freezer door (top)
    ctx.strokeStyle = '#bbb';
    ctx.lineWidth = 2;
    ctx.strokeRect(x + 3, y + 3, w - 6, h * 0.35);
    
    // Fridge door (bottom)
    ctx.strokeRect(x + 3, y + h * 0.4, w - 6, h * 0.55);
    
    // Handles
    ctx.fillStyle = '#888';
    ctx.fillRect(x + w - 8, y + h * 0.15, 3, 12);
    ctx.fillRect(x + w - 8, y + h * 0.6, 3, 12);
    
    // Magnets/decorations
    ctx.fillStyle = '#ff4444';
    ctx.fillRect(x + 8, y + h * 0.5, 6, 6);
    ctx.fillStyle = '#4444ff';
    ctx.fillRect(x + 8, y + h * 0.6, 6, 6);
}
