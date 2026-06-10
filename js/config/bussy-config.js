// js/config/bussy-config.js
// Centralized da Bussy configuration - single source of truth
// Similar to tent-configs.js but for the bus structure

const BUSSY_CONFIG = (() => {
    // ========== EXTERIOR BUS (on outside map) ==========
    const exteriorX = 26;
    const exteriorY = 1;
    const exteriorWidth = 12;   // Horizontal bus (wide)
    const exteriorHeight = 4;   // Vertical height
    
    // ========== INTERIOR ROOM (on bussyInterior map) ==========
    const interiorX = 63;
    const interiorY = 51;
    const interiorWidth = 24;   // HORIZONTAL layout (24 wide × 10 tall)
    const interiorHeight = 10;  // Matches map layout rows 0-9
    
    // ========== DOOR/EXIT CONFIGURATION ==========
    // EXTERIOR: Door is on the side of the bus (dy: 3, between exterior tiles)
    // Door gap at dx: 8, 9 (columns 8-9 on exterior)
    const exteriorDoorDx = [8, 9];
    const exteriorDoorDy = 3;  // Bottom row of exterior bus
    
    // INTERIOR: Door is on the BOTTOM wall (row 9), columns 18-19
    const interiorDoorDx = [18, 19];
    const interiorDoorDy = 9;      // Bottom wall (visual door row)
    const exitTriggerRow = 8;      // Same row for horizontal layout
    
    // ========== ENTRANCE TILES (exterior - where player enters bus) ==========
    // Door is at dx: 8-9, dy: 3, so entrance is TWO tiles south of that at dy: 5
    // Note: The actual working entrance is offset by 1 from the visual door
    const entranceX = [exteriorX + exteriorDoorDx[0] - 1, exteriorX + exteriorDoorDx[0]];  // [33, 34]
    const entranceY = exteriorDoorDy + 2;  // 5 (two tiles south of door)
    
    // ========== CALCULATED VALUES ==========
    // Interior door center (for spawn positioning)
    const interiorDoorCenterX = interiorX + interiorDoorDx[0] + 0.5;  // 81.5
    const interiorDoorCenterY = interiorY + exitTriggerRow;  // 60
    
    // Exterior entrance center (for exit spawn)
    const entranceCenterX = entranceX[0] + 0.5;  // 33.5
    const entranceCenterY = entranceY;  // 5
    
    // ========== INTERACTION POINT (where player stands to talk/enter) ==========
    // Player stands south of the door to interact
    const interactionX = entranceCenterX;
    const interactionY = entranceY + 1;  // 5 (one more tile south)
    
    return {
        // =====================
        // EXTERIOR (outside map)
        // =====================
        exterior: {
            x: exteriorX,               // 26
            y: exteriorY,               // 1
            width: exteriorWidth,       // 12
            height: exteriorHeight,     // 4
            map: 'outside',
            
            // Door position on exterior
            doorOffset: {
                dx: exteriorDoorDx,     // [8, 9]
                dy: exteriorDoorDy      // 3
            },
            
            // Where player stands to enter (tiles that trigger entry)
            entranceTiles: [
                {x: entranceX[0], y: entranceY},  // (33, 5)
                {x: entranceX[1], y: entranceY}   // (34, 5)
            ],
            
            // Where player stands to interact (talk to/enter bus)
            interactionPoint: {
                x: interactionX,        // 33.5
                y: interactionY         // 6
            }
        },
        
        // =====================
        // INTERIOR (bussyInterior map)
        // =====================
        interior: {
            x: interiorX,               // 63
            y: interiorY,               // 51
            width: interiorWidth,       // 24
            height: interiorHeight,     // 10
            map: 'bussyInterior',
            
            // Door position in interior (exit door on bottom wall)
            doorOffset: {
                dx: interiorDoorDx,     // [18, 19]
                dy: exitTriggerRow      // 9
            },
            
            // EXIT TRIGGER TILES (where collision detection happens for exit)
            doorTiles: [
                {x: interiorX + interiorDoorDx[0], y: interiorY + exitTriggerRow},  // (81, 60)
                {x: interiorX + interiorDoorDx[1], y: interiorY + exitTriggerRow}   // (82, 60)
            ]
        },
        
        // =====================
        // SPAWN POINTS
        // =====================
        spawns: {
            // Where player spawns when entering bus from outside
            onEnter: {
                x: 82,              // Near right side (driver area)
                y: 59,              // One row above bottom wall (row 8)
                facing: 'left'      // Face toward exit on left side
            },
            
            // Where player spawns when exiting bus to outside
            onExit: {
                x: entranceCenterX,     // 33.5 (center between entrance tiles)
                y: entranceY + 1.5,     // 6.5 (one tile south of entrance)
                facing: 'down'          // Face away from bus
            }
        },
        
        // =====================
        // ADDITIONAL METADATA
        // =====================
        type: 'bussy',

        // =====================
        // VISUAL THEME - ROBIN-EGG BLUE
        // =====================
        theme: {
            name: 'robin-egg-blue-bus',
            wallColor: '#7dd3c0',      // Main robin-egg blue (replaces yellow-orange)
            wallMid: '#5aa89a',        // Darker robin-egg blue (replaces mid-tone)
            wallDark: '#4a8a7d',       // Deep teal-blue (replaces deep orange)
            metalTrim: '#616161',      // Dark gray (metal trim - unchanged)
            metalLight: '#9e9e9e',     // Light gray (metal highlights - unchanged)
            rivetDark: '#424242',      // Very dark gray (rivets - unchanged)
            panel: '#a8e6d7',          // Lighter robin-egg blue (replaces panel highlight)
            shadow: '#3a6a60',         // Very dark teal (replaces deep shadows)
            floorColor: '#5a5a5a'      // Gray floor (unchanged - matches tent floors)
        },
        
        // Steering wheel position (interior - for interaction)
        steeringWheel: {
            x: 84,
            y: 52,
            width: 2,
            height: 2
        }
    };
})();
