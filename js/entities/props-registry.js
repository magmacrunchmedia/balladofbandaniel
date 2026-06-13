// entities/props-registry.js
// Central registry that merges all prop sources
// Includes collision generation and helper functions

/* =====================
   MERGE ALL PROP SOURCES
===================== */

// Merge large structures and small props into unified registry
const PROP_POSITIONS = {
    ...LARGE_STRUCTURES,
    ...SMALL_PROPS
};

// Backwards compatibility alias (can remove after all references updated)
const TENT_CAMPING_ITEMS = SMALL_PROPS;

/* =====================
   GENERATE COLLISION TILES FROM PROPS
   Unified function that handles both collision systems:
   - Multi-tile props with solidTiles[] array (trees, tents, buses)
   - Single-tile props with collidable boolean (camping items)
===================== */
function generatePropCollisionTiles() {
    const tiles = [];
    
    for (const [key, prop] of Object.entries(PROP_POSITIONS)) {
        // Skip invisible props (e.g., backpack when equipped)
        if (prop.visible === false) continue;
        
        // CASE 1: Multi-tile props with solidTiles array (complex collision)
        if (prop.solidTiles && prop.solidTiles.length > 0) {
            for (const solidTile of prop.solidTiles) {
                tiles.push({
                    x: prop.x + solidTile.dx,
                    y: prop.y + solidTile.dy,
                    map: prop.map,
                    propType: prop.type
                });
            }
        }
        // CASE 2: Single-tile props with collidable flag (simple collision)
        else if (prop.collidable === true) {
            tiles.push({
                x: prop.x,
                y: prop.y,
                map: prop.map,
                propType: prop.type
            });
        }
    }
    
    return tiles;
}

/**
 * Legacy compatibility function
 * DEPRECATED: Use generatePropCollisionTiles() directly instead
 */
function generateCampingPropCollisionTiles() {
    // Filter to only camping props for backwards compatibility
    return generatePropCollisionTiles().filter(tile => 
        tile.propType === 'campingProp' || tile.propType === 'camping_prop'
    );
}

// Generate prop collision arrays per map
// Now much simpler since generatePropCollisionTiles() handles everything!
let propsOutside = generatePropCollisionTiles()
    .filter(tile => tile.map === 'outside');

let propsTentInterior0 = generatePropCollisionTiles()
    .filter(tile => tile.map === 'tentInterior0');

let propsTentInterior1 = generatePropCollisionTiles()
    .filter(tile => tile.map === 'tentInterior1');

let propsTentInterior2 = generatePropCollisionTiles()
    .filter(tile => tile.map === 'tentInterior2');

let propsTentInterior3 = generatePropCollisionTiles()
    .filter(tile => tile.map === 'tentInterior3');

let propsBussyInterior = generatePropCollisionTiles()
    .filter(tile => tile.map === 'bussyInterior');

let propsPortoLetty1Interior = generatePropCollisionTiles()
    .filter(tile => tile.map === 'portoLetty1Interior');

let propsPortoLetty2Interior = generatePropCollisionTiles()
    .filter(tile => tile.map === 'portoLetty2Interior');

let propsPortoLetty3Interior = generatePropCollisionTiles()
    .filter(tile => tile.map === 'portoLetty3Interior');

/**
 * Regenerate collision arrays (call when prop visibility changes)
 */
function regeneratePropCollisions() {
    propsOutside = generatePropCollisionTiles()
        .filter(tile => tile.map === 'outside');
    propsTentInterior0 = generatePropCollisionTiles()
        .filter(tile => tile.map === 'tentInterior0');
    propsTentInterior1 = generatePropCollisionTiles()
        .filter(tile => tile.map === 'tentInterior1');
    propsTentInterior2 = generatePropCollisionTiles()
        .filter(tile => tile.map === 'tentInterior2');
    propsTentInterior3 = generatePropCollisionTiles()
        .filter(tile => tile.map === 'tentInterior3');
    propsBussyInterior = generatePropCollisionTiles()
        .filter(tile => tile.map === 'bussyInterior');
    propsPortoLetty1Interior = generatePropCollisionTiles()
        .filter(tile => tile.map === 'portoLetty1Interior');
    propsPortoLetty2Interior = generatePropCollisionTiles()
        .filter(tile => tile.map === 'portoLetty2Interior');
    propsPortoLetty3Interior = generatePropCollisionTiles()
        .filter(tile => tile.map === 'portoLetty3Interior');
}

// DEBUG: Log bus interior collision tiles

/**
 * Unified helper function to get all props for a map
 * Automatically passes through all properties from source objects
 * Used by renderer.js and interactions.js
 * 
 * @param {string} mapName - Name of the current map
 * @returns {Array} Array of prop objects for the specified map
 */
function getPropsForMap(mapName) {
    const props = [];
    
    // Get all props from unified PROP_POSITIONS registry
    for (const key in PROP_POSITIONS) {
        const prop = PROP_POSITIONS[key];
        
        // DEBUG: Log the backpack specifically
        if (key === 'bussy_backpack') {
        }
        
        // Only include props for the current map
        if (prop.map === mapName) {
            // Pass through ALL properties, automatically including any new ones added in the future
            const propWithKey = {
                key: key,           // Unique identifier
                name: key,          // Display name (same as key for now)
                ...prop             // Spread all properties from source object
            };
            
            // DEBUG: Log what we're pushing for backpack
            if (key === 'bussy_backpack') {
            }
            
            props.push(propWithKey);
        }
    }
    
    return props;
}

/**
 * Legacy compatibility function - now just calls getPropsForMap()
 * DEPRECATED: Use getPropsForMap() directly instead
 * This exists only for backwards compatibility with existing code
 */
function getCampingPropsForMap(mapName) {
    // Just filter for camping props from the unified function
    return getPropsForMap(mapName).filter(prop => 
        prop.type === 'campingProp' || prop.type === 'camping_prop'
    );
}

/* =====================
   OPTIONAL UTILITY FUNCTIONS
   Use these if you need to filter props by specific criteria
===================== */

/**
 * Get props by type (e.g., all trees, all tents, all camping items)
 * @param {string} mapName - Map to search
 * @param {string} type - Prop type to filter for
 * @returns {Array} Filtered props
 */
function getPropsByType(mapName, type) {
    return getPropsForMap(mapName).filter(prop => prop.type === type);
}

/**
 * Get only interactable props on a map
 * @param {string} mapName - Map to search
 * @returns {Array} Props with interact flag
 */
function getInteractableProps(mapName) {
    return getPropsForMap(mapName).filter(prop => prop.interact === true);
}

/**
 * Get only props with collision
 * @param {string} mapName - Map to search
 * @returns {Array} Props that have solidTiles or are collidable
 */
function getCollidableProps(mapName) {
    return getPropsForMap(mapName).filter(prop => 
        (prop.solidTiles && prop.solidTiles.length > 0) || prop.collidable === true
    );
}
