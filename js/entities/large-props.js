// entities/large-props.js
// Multi-tile structures (trees, tents, buses, walls)
// These are props with width/height > 1 and complex collision systems

const LARGE_STRUCTURES = {
    // =====================
    // OAK TREES
    // =====================
    
    oakTree1: { 
        x: 4,        // Top-left tile X
        y: 4,        // Top-left tile Y
        width: 7,    // Tiles wide
        height: 7,   // Tiles tall
        type: 'oak_tree',
        map: 'outside',
        // Collision: only center 3x3 trunk is solid
        solidTiles: [
            // Relative positions within the 7x7 footprint
            {dx: 2, dy: 2}, {dx: 3, dy: 2}, {dx: 4, dy: 2},
            {dx: 2, dy: 3}, {dx: 3, dy: 3}, {dx: 4, dy: 3},
            {dx: 2, dy: 4}, {dx: 3, dy: 4}, {dx: 4, dy: 4}
        ]
    },
    oakTree2: { 
        x: 53, 
        y: 4, 
        width: 7, 
        height: 7, 
        type: 'oak_tree',
        map: 'outside',
        solidTiles: [
            {dx: 2, dy: 2}, {dx: 3, dy: 2}, {dx: 4, dy: 2},
            {dx: 2, dy: 3}, {dx: 3, dy: 3}, {dx: 4, dy: 3},
            {dx: 2, dy: 4}, {dx: 3, dy: 4}, {dx: 4, dy: 4}
        ]
    },
    oakTree3: { 
        x: 4, 
        y: 44, 
        width: 7, 
        height: 7, 
        type: 'oak_tree',
        map: 'outside',
        solidTiles: [
            {dx: 2, dy: 2}, {dx: 3, dy: 2}, {dx: 4, dy: 2},
            {dx: 2, dy: 3}, {dx: 3, dy: 3}, {dx: 4, dy: 3},
            {dx: 2, dy: 4}, {dx: 3, dy: 4}, {dx: 4, dy: 4}
        ]
    },
    oakTree4: { 
        x: 102, 
        y: 54, 
        width: 7, 
        height: 7, 
        type: 'oak_tree',
        map: 'outside',
        solidTiles: [
            {dx: 2, dy: 2}, {dx: 3, dy: 2}, {dx: 4, dy: 2},
            {dx: 2, dy: 3}, {dx: 3, dy: 3}, {dx: 4, dy: 3},
            {dx: 2, dy: 4}, {dx: 3, dy: 4}, {dx: 4, dy: 4}
        ]
    },

    // =====================
    // VEHICLES
    // =====================
    
    // da Bussy - Anthropomorphic bus (quest giver + obstacle)
    daBussy: {
        x: BUSSY_CONFIG.exterior.x,
        y: BUSSY_CONFIG.exterior.y,
        width: BUSSY_CONFIG.exterior.width,
        height: BUSSY_CONFIG.exterior.height,
        type: 'bussy',
        map: 'outside',
        solidTiles: [
            // ROW 0 (roof)
            {dx: 0, dy: 0}, {dx: 1, dy: 0}, {dx: 2, dy: 0}, {dx: 3, dy: 0}, {dx: 4, dy: 0}, {dx: 5, dy: 0},
            {dx: 6, dy: 0}, {dx: 7, dy: 0}, {dx: 8, dy: 0}, {dx: 9, dy: 0}, {dx: 10, dy: 0}, {dx: 11, dy: 0},
            
            // ROW 1 (windows)
            {dx: 0, dy: 1}, {dx: 1, dy: 1}, {dx: 2, dy: 1}, {dx: 3, dy: 1}, {dx: 4, dy: 1}, {dx: 5, dy: 1},
            {dx: 6, dy: 1}, {dx: 7, dy: 1}, {dx: 8, dy: 1}, {dx: 9, dy: 1}, {dx: 10, dy: 1}, {dx: 11, dy: 1},
            // DOOR GAP: dx: 8, 9
            
            // ROW 2 (body)
            {dx: 0, dy: 2}, {dx: 1, dy: 2}, {dx: 2, dy: 2}, {dx: 3, dy: 2}, {dx: 4, dy: 2}, {dx: 5, dy: 2},
            {dx: 6, dy: 2}, {dx: 7, dy: 2}, {dx: 8, dy: 2}, {dx: 9, dy: 2}, {dx: 10, dy: 2}, {dx: 11, dy: 2},
            
            // ROW 3 (bottom)
            {dx: 0, dy: 3}, {dx: 1, dy: 3}, {dx: 2, dy: 3}, {dx: 3, dy: 3}, {dx: 4, dy: 3}, {dx: 5, dy: 3},
            // DOOR GAP: dx: 8, 9
            {dx: 6, dy: 3}, {dx: 7, dy: 3}, {dx: 8, dy: 3}, {dx: 9, dy: 3}, {dx: 10, dy: 3}, {dx: 11, dy: 3}
        ],
        
        // ✅ INTERACTION POINT: Where player stands to talk to/enter bus
        interactionPoint: BUSSY_CONFIG.exterior.interactionPoint
    },

    // =====================
    // TENTS (EXTERIOR)
    // =====================
    
    // Camping Tent #0 - starting tent
    campingTent0: {
        x: TENT_CONFIGS.tent0.exterior.x,
        y: TENT_CONFIGS.tent0.exterior.y,
        width: TENT_CONFIGS.tent0.exterior.width,
        height: TENT_CONFIGS.tent0.exterior.height,
        type: 'tent',
        map: 'outside',
        color: 'yellow',  // YELLOW TENT
        solidTiles: [
            // ROW 0 (y=50): Top peak - block center dome, guy ropes walkable
            {dx: 2, dy: 0}, {dx: 3, dy: 0},
            {dx: 0, dy: 1}, {dx: 1, dy: 1}, {dx: 2, dy: 1}, {dx: 3, dy: 1}, {dx: 4, dy: 1}, {dx: 5, dy: 1},
            {dx: 0, dy: 2}, {dx: 1, dy: 2}, {dx: 2, dy: 2}, {dx: 3, dy: 2}, {dx: 4, dy: 2}, {dx: 5, dy: 2}//,
            //{dx: 0, dy: 3}, {dx: 1, dy: 3},
            // 
            //{dx: 4, dy: 3}, {dx: 5, dy: 3}
        ]
    },    

    // Camping Tent #1 - ELEKTRA's red tent
    campingTent1: {
        x: TENT_CONFIGS.tent1.exterior.x,
        y: TENT_CONFIGS.tent1.exterior.y,
        width: TENT_CONFIGS.tent1.exterior.width,
        height: TENT_CONFIGS.tent1.exterior.height,
        type: 'tent',
        map: 'outside',
        solidTiles: [
            // ROW 0 (y=50): Top peak - block center dome, guy ropes walkable
            {dx: 2, dy: 0}, {dx: 3, dy: 0},
            {dx: 0, dy: 1}, {dx: 1, dy: 1}, {dx: 2, dy: 1}, {dx: 3, dy: 1}, {dx: 4, dy: 1}, {dx: 5, dy: 1},
            {dx: 0, dy: 2}, {dx: 1, dy: 2}, {dx: 2, dy: 2}, {dx: 3, dy: 2}, {dx: 4, dy: 2}, {dx: 5, dy: 2}//,
            //{dx: 0, dy: 3}, {dx: 1, dy: 3},
            // 
            //{dx: 4, dy: 3}, {dx: 5, dy: 3}
        ]
    },

    // Camping Tent #2 - STRAWBERTO's blue tent
    campingTent2: {
        x: TENT_CONFIGS.tent2.exterior.x,
        y: TENT_CONFIGS.tent2.exterior.y,
        width: TENT_CONFIGS.tent2.exterior.width,
        height: TENT_CONFIGS.tent2.exterior.height,
        type: 'tent',
        map: 'outside',
        color: 'blue',  // BLUE TENT
        solidTiles: [
            // Same collision pattern as tent 1
            {dx: 2, dy: 0}, {dx: 3, dy: 0},
            {dx: 0, dy: 1}, {dx: 1, dy: 1}, {dx: 2, dy: 1}, {dx: 3, dy: 1}, {dx: 4, dy: 1}, {dx: 5, dy: 1},
            {dx: 0, dy: 2}, {dx: 1, dy: 2}, {dx: 2, dy: 2}, {dx: 3, dy: 2}, {dx: 4, dy: 2}, {dx: 5, dy: 2}//,
            //{dx: 0, dy: 3}, {dx: 1, dy: 3},
            // 
            //{dx: 4, dy: 3}, {dx: 5, dy: 3}
        ]
    },

    // Camping Tent #3 - Green tent
    campingTent3: {
        x: TENT_CONFIGS.tent3.exterior.x,
        y: TENT_CONFIGS.tent3.exterior.y,
        width: TENT_CONFIGS.tent3.exterior.width,
        height: TENT_CONFIGS.tent3.exterior.height,
        type: 'tent',
        map: 'outside',
        color: 'green',
        solidTiles: [
            {dx: 2, dy: 0}, {dx: 3, dy: 0},
            {dx: 0, dy: 1}, {dx: 1, dy: 1}, {dx: 2, dy: 1}, {dx: 3, dy: 1}, {dx: 4, dy: 1}, {dx: 5, dy: 1},
            {dx: 0, dy: 2}, {dx: 1, dy: 2}, {dx: 2, dy: 2}, {dx: 3, dy: 2}, {dx: 4, dy: 2}, {dx: 5, dy: 2}
        ]
    },

    // =====================
    // INTERIOR WALLS
    // =====================

    // Tent #0 Interior Walls
    tentInterior0Walls: {
        x: TENT_CONFIGS.tent0.interior.x,
        y: TENT_CONFIGS.tent0.interior.y,
        width: TENT_CONFIGS.tent0.interior.width,
        height: TENT_CONFIGS.tent0.interior.height,
        type: 'tent_walls',
        map: 'tentInterior0',
        solidTiles: [
            // Top wall
            {dx: 0, dy: 0}, {dx: 1, dy: 0}, {dx: 2, dy: 0}, {dx: 3, dy: 0}, {dx: 4, dy: 0}, {dx: 5, dy: 0},
            {dx: 6, dy: 0}, {dx: 7, dy: 0}, {dx: 8, dy: 0}, {dx: 9, dy: 0}, {dx: 10, dy: 0}, {dx: 11, dy: 0},
            
            // Left wall (column 0)
            {dx: 0, dy: 1}, {dx: 0, dy: 2}, {dx: 0, dy: 3}, {dx: 0, dy: 4}, {dx: 0, dy: 5}, 
            {dx: 0, dy: 6}, {dx: 0, dy: 7}, {dx: 0, dy: 8}, {dx: 0, dy: 9},
            
            // Right wall (column 11)
            {dx: 11, dy: 1}, {dx: 11, dy: 2}, {dx: 11, dy: 3}, {dx: 11, dy: 4}, {dx: 11, dy: 5},
            {dx: 11, dy: 6}, {dx: 11, dy: 7}, {dx: 11, dy: 8}, {dx: 11, dy: 9},
            
            // Bottom wall - block everything except door
            {dx: 0, dy: 8}, {dx: 1, dy: 8}, {dx: 2, dy: 8}, {dx: 3, dy: 8}, {dx: 4, dy: 8},
            // Door at dx: 5, 6 - WALKABLE
            {dx: 7, dy: 8}, {dx: 8, dy: 8}, {dx: 9, dy: 8}, {dx: 10, dy: 8}, {dx: 11, dy: 8},
            
            // Row 9 (bottom edge) - fully blocked
            {dx: 0, dy: 9}, {dx: 1, dy: 9}, {dx: 2, dy: 9}, {dx: 3, dy: 9}, {dx: 4, dy: 9}, {dx: 5, dy: 9},
            {dx: 6, dy: 9}, {dx: 7, dy: 9}, {dx: 8, dy: 9}, {dx: 9, dy: 9}, {dx: 10, dy: 9}, {dx: 11, dy: 9}
        ]
    },

    // Tent #1 Interior Walls
    tentInterior1Walls: {
        x: TENT_CONFIGS.tent1.interior.x,
        y: TENT_CONFIGS.tent1.interior.y,
        width: TENT_CONFIGS.tent1.interior.width,
        height: TENT_CONFIGS.tent1.interior.height,
        type: 'tent_walls',
        map: 'tentInterior1',
        solidTiles: [
            // Top wall
            {dx: 0, dy: 0}, {dx: 1, dy: 0}, {dx: 2, dy: 0}, {dx: 3, dy: 0}, {dx: 4, dy: 0}, {dx: 5, dy: 0},
            {dx: 6, dy: 0}, {dx: 7, dy: 0}, {dx: 8, dy: 0}, {dx: 9, dy: 0}, {dx: 10, dy: 0}, {dx: 11, dy: 0},
            
            // Left wall (column 0)
            {dx: 0, dy: 1}, {dx: 0, dy: 2}, {dx: 0, dy: 3}, {dx: 0, dy: 4}, {dx: 0, dy: 5}, 
            {dx: 0, dy: 6}, {dx: 0, dy: 7}, {dx: 0, dy: 8}, {dx: 0, dy: 9},
            
            // Right wall (column 11)
            {dx: 11, dy: 1}, {dx: 11, dy: 2}, {dx: 11, dy: 3}, {dx: 11, dy: 4}, {dx: 11, dy: 5},
            {dx: 11, dy: 6}, {dx: 11, dy: 7}, {dx: 11, dy: 8}, {dx: 11, dy: 9},
            
            // Bottom wall - block everything except door
            {dx: 0, dy: 8}, {dx: 1, dy: 8}, {dx: 2, dy: 8}, {dx: 3, dy: 8}, {dx: 4, dy: 8},
            // Door at dx: 5, 6 - WALKABLE
            {dx: 7, dy: 8}, {dx: 8, dy: 8}, {dx: 9, dy: 8}, {dx: 10, dy: 8}, {dx: 11, dy: 8},
            
            // Row 9 (bottom edge) - fully blocked
            {dx: 0, dy: 9}, {dx: 1, dy: 9}, {dx: 2, dy: 9}, {dx: 3, dy: 9}, {dx: 4, dy: 9}, {dx: 5, dy: 9},
            {dx: 6, dy: 9}, {dx: 7, dy: 9}, {dx: 8, dy: 9}, {dx: 9, dy: 9}, {dx: 10, dy: 9}, {dx: 11, dy: 9}
        ]
    },

    // Tent #2 Interior Walls - STRAWBERTO's blue tent (12×10 room)
    tentInterior2Walls: {
        x: TENT_CONFIGS.tent2.interior.x,
        y: TENT_CONFIGS.tent2.interior.y,
        width: TENT_CONFIGS.tent2.interior.width,
        height: TENT_CONFIGS.tent2.interior.height,
        type: 'tent_walls',
        map: 'tentInterior2',
        solidTiles: [
            // Top wall
            {dx: 0, dy: 0}, {dx: 1, dy: 0}, {dx: 2, dy: 0}, {dx: 3, dy: 0}, {dx: 4, dy: 0}, {dx: 5, dy: 0},
            {dx: 6, dy: 0}, {dx: 7, dy: 0}, {dx: 8, dy: 0}, {dx: 9, dy: 0}, {dx: 10, dy: 0}, {dx: 11, dy: 0},
            
            // Left wall (column 0)
            {dx: 0, dy: 1}, {dx: 0, dy: 2}, {dx: 0, dy: 3}, {dx: 0, dy: 4}, {dx: 0, dy: 5}, 
            {dx: 0, dy: 6}, {dx: 0, dy: 7}, {dx: 0, dy: 8}, {dx: 0, dy: 9},
            
            // Right wall (column 11)
            {dx: 11, dy: 1}, {dx: 11, dy: 2}, {dx: 11, dy: 3}, {dx: 11, dy: 4}, {dx: 11, dy: 5},
            {dx: 11, dy: 6}, {dx: 11, dy: 7}, {dx: 11, dy: 8}, {dx: 11, dy: 9},
            
            // Bottom wall - block everything except door
            {dx: 0, dy: 8}, {dx: 1, dy: 8}, {dx: 2, dy: 8}, {dx: 3, dy: 8}, {dx: 4, dy: 8},
            // Door at dx: 5, 6 - WALKABLE
            {dx: 7, dy: 8}, {dx: 8, dy: 8}, {dx: 9, dy: 8}, {dx: 10, dy: 8}, {dx: 11, dy: 8},
            
            // Row 9 (bottom edge) - fully blocked
            {dx: 0, dy: 9}, {dx: 1, dy: 9}, {dx: 2, dy: 9}, {dx: 3, dy: 9}, {dx: 4, dy: 9}, {dx: 5, dy: 9},
            {dx: 6, dy: 9}, {dx: 7, dy: 9}, {dx: 8, dy: 9}, {dx: 9, dy: 9}, {dx: 10, dy: 9}, {dx: 11, dy: 9}
        ]
    },

    // Tent #3 Interior Walls - Green tent
    tentInterior3Walls: {
        x: TENT_CONFIGS.tent3.interior.x,
        y: TENT_CONFIGS.tent3.interior.y,
        width: TENT_CONFIGS.tent3.interior.width,
        height: TENT_CONFIGS.tent3.interior.height,
        type: 'tent_walls',
        map: 'tentInterior3',
        solidTiles: [
            // Top wall
            {dx: 0, dy: 0}, {dx: 1, dy: 0}, {dx: 2, dy: 0}, {dx: 3, dy: 0}, {dx: 4, dy: 0}, {dx: 5, dy: 0},
            {dx: 6, dy: 0}, {dx: 7, dy: 0}, {dx: 8, dy: 0}, {dx: 9, dy: 0}, {dx: 10, dy: 0}, {dx: 11, dy: 0},
            
            // Left wall (column 0)
            {dx: 0, dy: 1}, {dx: 0, dy: 2}, {dx: 0, dy: 3}, {dx: 0, dy: 4}, {dx: 0, dy: 5}, 
            {dx: 0, dy: 6}, {dx: 0, dy: 7}, {dx: 0, dy: 8}, {dx: 0, dy: 9},
            
            // Right wall (column 11)
            {dx: 11, dy: 1}, {dx: 11, dy: 2}, {dx: 11, dy: 3}, {dx: 11, dy: 4}, {dx: 11, dy: 5},
            {dx: 11, dy: 6}, {dx: 11, dy: 7}, {dx: 11, dy: 8}, {dx: 11, dy: 9},
            
            // Bottom wall - block everything except door
            {dx: 0, dy: 8}, {dx: 1, dy: 8}, {dx: 2, dy: 8}, {dx: 3, dy: 8}, {dx: 4, dy: 8},
            // Door at dx: 5, 6 - WALKABLE
            {dx: 7, dy: 8}, {dx: 8, dy: 8}, {dx: 9, dy: 8}, {dx: 10, dy: 8}, {dx: 11, dy: 8},
            
            // Row 9 (bottom edge) - fully blocked
            {dx: 0, dy: 9}, {dx: 1, dy: 9}, {dx: 2, dy: 9}, {dx: 3, dy: 9}, {dx: 4, dy: 9}, {dx: 5, dy: 9},
            {dx: 6, dy: 9}, {dx: 7, dy: 9}, {dx: 8, dy: 9}, {dx: 9, dy: 9}, {dx: 10, dy: 9}, {dx: 11, dy: 9}
        ]
    },

    // da Bussy Interior Walls (24×10 horizontal layout)
    bussyInteriorWalls: {
        x: BUSSY_CONFIG.interior.x,
        y: BUSSY_CONFIG.interior.y,
        width: BUSSY_CONFIG.interior.width,
        height: BUSSY_CONFIG.interior.height,
        type: 'bus_walls',
        map: 'bussyInterior',
        solidTiles: [
            // Top wall (row 0 = world y 51) - ALL 24 tiles
            {dx: 0, dy: 0}, {dx: 1, dy: 0}, {dx: 2, dy: 0}, {dx: 3, dy: 0}, {dx: 4, dy: 0},
            {dx: 5, dy: 0}, {dx: 6, dy: 0}, {dx: 7, dy: 0}, {dx: 8, dy: 0}, {dx: 9, dy: 0},
            {dx: 10, dy: 0}, {dx: 11, dy: 0}, {dx: 12, dy: 0}, {dx: 13, dy: 0}, {dx: 14, dy: 0}, {dx: 15, dy: 0},
            {dx: 16, dy: 0}, {dx: 17, dy: 0}, {dx: 18, dy: 0}, {dx: 19, dy: 0}, {dx: 20, dy: 0}, {dx: 21, dy: 0},
            {dx: 22, dy: 0}, {dx: 23, dy: 0},
            
            // Bottom wall (row 8 = world y 15) - ALL tiles EXCEPT doors at columns 18-19
            {dx: 0, dy: 8}, {dx: 1, dy: 8}, {dx: 2, dy: 8}, {dx: 3, dy: 8}, {dx: 4, dy: 8},
            {dx: 5, dy: 8}, {dx: 6, dy: 8}, {dx: 7, dy: 8}, {dx: 8, dy: 8}, {dx: 9, dy: 8},
            {dx: 10, dy: 8}, {dx: 11, dy: 8}, {dx: 12, dy: 8}, {dx: 13, dy: 8}, {dx: 14, dy: 8}, {dx: 15, dy: 8},
            {dx: 16, dy: 8}, {dx: 17, dy: 8}, 
            // SKIP {dx: 18, dy: 8} - DOOR at world (81, 59)
            // SKIP {dx: 19, dy: 8} - DOOR at world (82, 59)
            {dx: 20, dy: 8}, {dx: 21, dy: 8},
            {dx: 22, dy: 8}, {dx: 23, dy: 8},
            
            // Left wall (column 0 = exit side) - rows 1-8 (all middle rows)
            {dx: 0, dy: 1}, {dx: 0, dy: 2}, {dx: 0, dy: 3}, {dx: 0, dy: 4}, {dx: 0, dy: 5},
            {dx: 0, dy: 6}, {dx: 0, dy: 7}, {dx: 0, dy: 8},
            
            // Right wall (column 23 = driver area) - rows 1-8 (all middle rows)
            {dx: 23, dy: 1}, {dx: 23, dy: 2}, {dx: 23, dy: 3}, {dx: 23, dy: 4}, {dx: 23, dy: 5},
            {dx: 23, dy: 6}, {dx: 23, dy: 7}, {dx: 23, dy: 8}
        ]
    },

    // =====================
    // BUS INTERIOR PROPS
    // =====================

    // Steering wheel - Interactive prop for talking to da Bussy
    steeringWheel: {
        x: BUSSY_CONFIG.steeringWheel.x,
        y: BUSSY_CONFIG.steeringWheel.y,
        width: BUSSY_CONFIG.steeringWheel.width,
        height: BUSSY_CONFIG.steeringWheel.height,
        type: 'steering_wheel',
        drawFunction: 'drawSteeringWheel',
        map: 'bussyInterior',
        solidTiles: [
            {dx: 0, dy: 0}, {dx: 1, dy: 0},
            {dx: 0, dy: 1}, {dx: 1, dy: 1}
        ],
        interact: true,
        interactMessage: 'Talk to da Bussy',
        dialogueKey: 'daBussy'  // Links to NPC dialogue system
    },

    // =====================
    // PORT-O-POTTY INTERIOR WALLS (collision only, no visual)
    // =====================

    // PortoLetty1 Interior Walls
    portoLetty1InteriorWalls: {
        x: 73, y: 54, width: 4, height: 5,
        type: 'porto_potty_walls',
        map: 'portoLetty1Interior',
        solidTiles: [
            // Top wall (dy=0)
            {dx:0,dy:0}, {dx:1,dy:0}, {dx:2,dy:0}, {dx:3,dy:0},
            // Left wall (dx=0)
            {dx:0,dy:1}, {dx:0,dy:2}, {dx:0,dy:3}, {dx:0,dy:4},
            // Right wall (dx=3)
            {dx:3,dy:1}, {dx:3,dy:2}, {dx:3,dy:3}, {dx:3,dy:4},
            // Bottom wall (dy=4) — fully blocked, door exit is at dy=3 via trigger
            {dx:0,dy:4}, {dx:1,dy:4}, {dx:2,dy:4}, {dx:3,dy:4}
        ]
    },

    // PortoLetty2 Interior Walls
    portoLetty2InteriorWalls: {
        x: 73, y: 54, width: 4, height: 5,
        type: 'porto_potty_walls',
        map: 'portoLetty2Interior',
        solidTiles: [
            // Top wall (dy=0)
            {dx:0,dy:0}, {dx:1,dy:0}, {dx:2,dy:0}, {dx:3,dy:0},
            // Left wall (dx=0)
            {dx:0,dy:1}, {dx:0,dy:2}, {dx:0,dy:3}, {dx:0,dy:4},
            // Right wall (dx=3)
            {dx:3,dy:1}, {dx:3,dy:2}, {dx:3,dy:3}, {dx:3,dy:4},
            // Bottom wall (dy=4) — fully blocked
            {dx:0,dy:4}, {dx:1,dy:4}, {dx:2,dy:4}, {dx:3,dy:4}
        ]
    },

    // PortoLetty3 Interior Walls
    portoLetty3InteriorWalls: {
        x: 73, y: 54, width: 4, height: 5,
        type: 'porto_potty_walls',
        map: 'portoLetty3Interior',
        solidTiles: [
            // Top wall (dy=0)
            {dx:0,dy:0}, {dx:1,dy:0}, {dx:2,dy:0}, {dx:3,dy:0},
            // Left wall (dx=0)
            {dx:0,dy:1}, {dx:0,dy:2}, {dx:0,dy:3}, {dx:0,dy:4},
            // Right wall (dx=3)
            {dx:3,dy:1}, {dx:3,dy:2}, {dx:3,dy:3}, {dx:3,dy:4},
            // Bottom wall (dy=4) — fully blocked
            {dx:0,dy:4}, {dx:1,dy:4}, {dx:2,dy:4}, {dx:3,dy:4}
        ]
    }


};