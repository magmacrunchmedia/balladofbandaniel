// entities/furniture.js
// Studio and house furniture (legacy prototype content)

/* =====================
   Object Positions (Single Source of Truth)
===================== */
const FURNITURE_POSITIONS = {
    // Studio equipment (upstairs)
    drumSet: { x: 13, y: 14, width: 3, height: 2, map: 'upstairs', walkableCenter: true },
    guitar1: { x: 12, y: 12, width: 1, height: 1, map: 'upstairs' },
    guitar2: { x: 13, y: 11, width: 1, height: 1, map: 'upstairs' },
    guitar3: { x: 18, y: 11, width: 1, height: 1, map: 'upstairs' },
    amp1: { x: 11, y: 19, width: 2, height: 2, map: 'upstairs' },
    amp2: { x: 24, y: 19, width: 2, height: 2, map: 'upstairs' },
    microphone: { x: 17, y: 17, width: 1, height: 1, map: 'upstairs' },
    recordingDesk: { x: 18, y: 19, width: 3, height: 2, map: 'upstairs' },
    modularSynth: { x: 22, y: 11, width: 2, height: 2, map: 'upstairs' },
    
    // House furniture
    couch: { x: 11, y: 14, width: 3, height: 2, map: 'house' },
    kitchenCounter: { x: 24, y: 11, width: 3, height: 1, map: 'house' },
    refrigerator: { x: 27, y: 10, width: 1, height: 2, map: 'house' }
};

/* =====================
   Generate Collision Tiles from Positions
===================== */
function generateCollisionTiles() {
    const tiles = [];
    
    for (const [key, pos] of Object.entries(FURNITURE_POSITIONS)) {
        for (let y = 0; y < pos.height; y++) {
            for (let x = 0; x < pos.width; x++) {
                // Special case: drum set center is walkable
                if (pos.walkableCenter && x === 1 && y === 1) {
                    continue;
                }
                tiles.push({ 
                    x: pos.x + x, 
                    y: pos.y + y, 
                    map: pos.map 
                });
            }
        }
    }
    
    return tiles;
}

// Generate the collision arrays
const studioEquipment = generateCollisionTiles().filter(t => t.map === 'upstairs');
const houseFurniture = generateCollisionTiles().filter(t => t.map === 'house');
