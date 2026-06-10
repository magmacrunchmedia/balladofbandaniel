// js/config/tent-configs.js
// Centralized tent configuration - single source of truth
// FIXED: Interior Y positions now place bottom wall at y=110 (one row before map edge)

const TENT_CONFIGS = {
    tent0: (() => {
        // ========== EXTERIOR TENT (on outside map) ==========
        const exteriorX = 112;  //bottom right corner
        const exteriorY = 74;
        const exteriorWidth = 6;
        const exteriorHeight = 4;
        
        // ========== INTERIOR ROOM (on tent interior map) ==========
        const interiorX = exteriorX;
        const interiorY = 101;  // Bottom wall will be at 101 + 9 = 110
        const interiorWidth = 12;
        const interiorHeight = 10;
        
        // ========== DOOR/EXIT CONFIGURATION ==========
        const doorDx = [5, 6];
        const exitTriggerRow = 8;
        const doorVisualRow = 9;
        
        const entranceX = [exteriorX + 2, exteriorX + 3];  // [27, 28]
        const entranceY = exteriorY + 3;  // 73
        
        // ========== CALCULATED VALUES ==========
        const doorCenterX = interiorX + doorDx[1];
        const exitTriggerY = interiorY + exitTriggerRow;  // 101 + 8 = 109
        const doorVisualY = interiorY + doorVisualRow;     // 101 + 9 = 110
        const entranceCenterX = entranceX[1]; // (entranceX[0] + entranceX[1]) / 2;
        
        return {
            exterior: {
                x: exteriorX,
                y: exteriorY,
                width: exteriorWidth,
                height: exteriorHeight,
                map: 'outside',
                entranceTiles: [
                    {x: entranceX[0], y: entranceY},
                    {x: entranceX[1], y: entranceY}
                ]
            },
            interior: {
                x: interiorX,
                y: interiorY,
                width: interiorWidth,
                height: interiorHeight,
                map: 'tentInterior0',
                doorOffset: {dx: doorDx, dy: exitTriggerRow},
                // EXIT TRIGGER TILES (where collision detection happens)
                doorTiles: [
                    {x: interiorX + doorDx[0], y: exitTriggerY},  // (30, 109)
                    {x: interiorX + doorDx[1], y: exitTriggerY}   // (31, 109)
                ]
            },
            spawns: {
                onEnter: {
                    x: doorCenterX,
                    y: exitTriggerY - 1,  // 108
                    facing: 'up'
                },
                onExit: {
                    x: entranceCenterX,
                    y: entranceY + 1,
                    facing: 'down'
                }
            },
            // ========== VISUAL THEME ==========
            color: 'yellow',  // ⚠️ BACKWARD COMPATIBILITY: Used by large-props.js for exterior tent rendering
            theme: {
                name: 'yellow',
                wallColor: '#fbc02d',      // Yellow 700 (main wall color)
                shadowColor: '#f57f17',    // Yellow 900 (shading for depth)
                floorColor: '#5a5a5a'      // Gray tent floor
            }
        };
    })(),

    tent1: (() => {
        // ========== EXTERIOR TENT (on outside map) ==========
        const exteriorX = 15;
        const exteriorY = 50;
        const exteriorWidth = 6;
        const exteriorHeight = 4;
        
        // ========== INTERIOR ROOM (on tent interior map) ==========
        const interiorX = exteriorX;
        const interiorY = 101;  // Bottom wall will be at 101 + 9 = 110
        const interiorWidth = 12;
        const interiorHeight = 10;
        
        // ========== DOOR/EXIT CONFIGURATION ==========
        // Door tiles [12,12] are on ROW 9 of tent layout (the wall)
        // Exit trigger is on ROW 8 (the floor tile where player stands)
        const doorDx = [5, 6];  // Door is at columns 5 and 6
        const exitTriggerRow = 8;  // Floor tile where player stands to exit
        const doorVisualRow = 9;   // Wall tile with door graphic
        
        const entranceX = [exteriorX + 2, exteriorX + 3];  // [17, 18]
        const entranceY = exteriorY + 3;  // 53
        
        // ========== CALCULATED VALUES ==========
        const doorCenterX = interiorX + doorDx[1];
        const exitTriggerY = interiorY + exitTriggerRow;  // 101 + 8 = 109
        const doorVisualY = interiorY + doorVisualRow;     // 101 + 9 = 110
        const entranceCenterX = entranceX[1];
        
        return {
            exterior: {
                x: exteriorX,
                y: exteriorY,
                width: exteriorWidth,
                height: exteriorHeight,
                map: 'outside',
                entranceTiles: [
                    {x: entranceX[0], y: entranceY},  // (17, 53)
                    {x: entranceX[1], y: entranceY}   // (18, 53)
                ]
            },
            interior: {
                x: interiorX,
                y: interiorY,
                width: interiorWidth,
                height: interiorHeight,
                map: 'tentInterior1',
                doorOffset: {dx: doorDx, dy: exitTriggerRow},
                // EXIT TRIGGER TILES (where collision detection happens)
                doorTiles: [
                    {x: interiorX + doorDx[0], y: exitTriggerY},  // (20, 109)
                    {x: interiorX + doorDx[1], y: exitTriggerY}   // (21, 109)
                ]
            },
            spawns: {
                onEnter: {
                    x: doorCenterX,     // 20.5
                    y: exitTriggerY - 1,  // 108 (one tile north of exit trigger)
                    facing: 'up'
                },
                onExit: {
                    x: entranceCenterX,  // 17.5
                    y: entranceY + 1,    // 54 (one tile south of entrance)
                    facing: 'down'
                }
            },
            // ========== VISUAL THEME ==========
            color: 'red',  // ⚠️ BACKWARD COMPATIBILITY: Used by large-props.js for exterior tent rendering
            theme: {
                name: 'red',
                wallColor: '#c62828',      // Red (ELEKTRA's tent - main wall color)
                shadowColor: '#8e0000',    // Dark red (shading for depth)
                floorColor: '#5a5a5a'      // Gray tent floor
            }
        };
    })(),
    
    tent2: (() => {
        // ========== EXTERIOR TENT (on outside map) ==========
        const exteriorX = 70;
        const exteriorY = 7;
        const exteriorWidth = 6;
        const exteriorHeight = 4;
        
        // ========== INTERIOR ROOM (on tent interior map) ==========
        const interiorX = exteriorX;
        const interiorY = 101;  // Bottom wall will be at 101 + 9 = 110
        const interiorWidth = 12;
        const interiorHeight = 10;
        
        // ========== DOOR/EXIT CONFIGURATION ==========
        // Door tiles [12,12] are on ROW 9 of tent layout (the wall)
        // Exit trigger is on ROW 8 (the floor tile where player stands)
        const doorDx = [5, 6];  // Door is at columns 5 and 6
        const exitTriggerRow = 8;  // Floor tile where player stands to exit
        const doorVisualRow = 9;   // Wall tile with door graphic
        
        const entranceX = [exteriorX + 2, exteriorX + 3];  // [27, 28]
        const entranceY = exteriorY + 3;  // 53
        
        // ========== CALCULATED VALUES ==========
        const doorCenterX = interiorX + + doorDx[1];
        const exitTriggerY = interiorY + exitTriggerRow;  // 101 + 8 = 109
        const doorVisualY = interiorY + doorVisualRow;     // 101 + 9 = 110
        const entranceCenterX = entranceX[1];
        
        return {
            exterior: {
                x: exteriorX,
                y: exteriorY,
                width: exteriorWidth,
                height: exteriorHeight,
                map: 'outside',
                entranceTiles: [
                    {x: entranceX[0], y: entranceY},  // (27, 53)
                    {x: entranceX[1], y: entranceY}   // (28, 53)
                ]
            },
            interior: {
                x: interiorX,
                y: interiorY,
                width: interiorWidth,
                height: interiorHeight,
                map: 'tentInterior2',
                doorOffset: {dx: doorDx, dy: exitTriggerRow},
                // EXIT TRIGGER TILES (where collision detection happens)
                doorTiles: [
                    {x: interiorX + doorDx[0], y: exitTriggerY},  // (30, 109)
                    {x: interiorX + doorDx[1], y: exitTriggerY}   // (31, 109)
                ]
            },
            spawns: {
                onEnter: {
                    x: doorCenterX,     // 30.5
                    y: exitTriggerY - 1,  // 108 (one tile north of exit trigger)
                    facing: 'up'
                },
                onExit: {
                    x: entranceCenterX,  // 27.5
                    y: entranceY + 1,    // 54 (one tile south of entrance)
                    facing: 'down'
                }
            },
            // ========== VISUAL THEME ==========
            color: 'blue',  // ⚠️ BACKWARD COMPATIBILITY: Used by large-props.js for exterior tent rendering
            theme: {
                name: 'blue',
                wallColor: '#1565c0',      // Dark blue (STRAWBERTO's tent - main wall color)
                shadowColor: '#0d47a1',    // Darker blue (shading for depth)
                floorColor: '#5a5a5a'      // Gray tent floor
            }
        };
    })(),

    tent3: (() => {
        // ========== EXTERIOR TENT (on outside map) ==========
        const exteriorX = 124;  // Position between tent1 and da Bussy
        const exteriorY = 32;
        const exteriorWidth = 6;
        const exteriorHeight = 4;
        
        // ========== INTERIOR ROOM (on tent interior map) ==========
        const interiorX = exteriorX;
        const interiorY = 101;  // Bottom wall will be at 101 + 9 = 110
        const interiorWidth = 12;
        const interiorHeight = 10;
        
        // ========== DOOR/EXIT CONFIGURATION ==========
        const doorDx = [5, 6];
        const exitTriggerRow = 8;
        const doorVisualRow = 9;
        
        const entranceX = [exteriorX + 2, exteriorX + 3];  // [27, 28]
        const entranceY = exteriorY + 3;  // 73
        
        // ========== CALCULATED VALUES ==========
        const doorCenterX = interiorX + doorDx[1];
        const exitTriggerY = interiorY + exitTriggerRow;  // 101 + 8 = 109
        const doorVisualY = interiorY + doorVisualRow;     // 101 + 9 = 110
        const entranceCenterX = entranceX[1];
        
        return {
            exterior: {
                x: exteriorX,
                y: exteriorY,
                width: exteriorWidth,
                height: exteriorHeight,
                map: 'outside',
                entranceTiles: [
                    {x: entranceX[0], y: entranceY},
                    {x: entranceX[1], y: entranceY}
                ]
            },
            interior: {
                x: interiorX,
                y: interiorY,
                width: interiorWidth,
                height: interiorHeight,
                map: 'tentInterior3',
                doorOffset: {dx: doorDx, dy: exitTriggerRow},
                // EXIT TRIGGER TILES (where collision detection happens)
                doorTiles: [
                    {x: interiorX + doorDx[0], y: exitTriggerY},  // (30, 109)
                    {x: interiorX + doorDx[1], y: exitTriggerY}   // (31, 109)
                ]
            },
            spawns: {
                onEnter: {
                    x: doorCenterX,
                    y: exitTriggerY - 1,  // 108
                    facing: 'up'
                },
                onExit: {
                    x: entranceCenterX,
                    y: entranceY + 1,
                    facing: 'down'
                }
            },
            // ========== VISUAL THEME ==========
            color: 'green',  // ⚠️ BACKWARD COMPATIBILITY: Used by large-props.js for exterior tent rendering
            theme: {
                name: 'green',
                wallColor: '#2e7d32',      // Dark green (main wall color)
                shadowColor: '#1b5e20',    // Darker green (shading for depth)
                floorColor: '#5a5a5a'      // Gray tent floor
            }
        };
    })()
    
};

// Helper function to get tent config by interior map name
TENT_CONFIGS.getByInteriorMap = function(mapName) {
    return Object.values(this).find(config => 
        config.interior && config.interior.map === mapName
    );
};

// Helper function to get tent config by exterior map coordinates
TENT_CONFIGS.getByExteriorCoords = function(x, y, mapName = 'outside') {
    return Object.values(this).find(config => {
        if (!config.exterior || config.exterior.map !== mapName) return false;
        const ext = config.exterior;
        return x >= ext.x && x < ext.x + ext.width &&
               y >= ext.y && y < ext.y + ext.height;
    });
};
