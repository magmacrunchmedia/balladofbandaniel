// entities/small-props.js
// Single-tile decorative props (camping items, furniture, decorations)
// These are small props (mostly 1x1) that use simple collision (single tile)
// Use solidTiles: [{dx: 0, dy: 0}] for collision, or solidTiles: [] for passable

const SMALL_PROPS = {
    // =====================
    // TENT #0 INTERIOR CAMPING PROPS (starting yellow tent)
    // =====================
    sleepingBag: {
        x: TENT_CONFIGS.tent0.interior.x + 8,
        y: TENT_CONFIGS.tent0.interior.y + 4,
        type: 'campingProp',
        drawFunction: 'drawSleepingBagUnrolled',
        map: 'tentInterior0',
        name: 'Sleeping Bag',
        description: 'A rolled-out sleeping bag. Looks cozy.'
    },

    // =====================
    // DA BUSSY INTERIOR PROPS
    // =====================

    bussy_cooler: {
        x: 70,
        y: 52,
        type: 'campingProp',
        drawFunction: 'drawCooler',
        map: 'bussyInterior',
        solidTiles: [{dx: 0, dy: 0}],  // SOLID
        name: 'Cooler',
        description: 'A blue cooler. Probably has drinks inside.'
    },  

    bussy_backpack: {
        x: 77,
        y: 52,
        type: 'campingProp',
        drawFunction: 'drawLargeBackpack',
        map: 'bussyInterior',
        solidTiles: [{dx: 0, dy: 0}],  // SOLID
        interact: true,  // ✅ Can interact with this backpack
        interactMessage: 'Press SPACE to access storage',
        storageItem: true,  // ✅ Mark as storage container
        storageCapacity: 5,  // ✅ Can hold 5 items
        visible: true,  // Can be hidden when player equips backpack
        name: 'Backpack',
        description: 'A well-worn hiking backpack. Perfect for storage.'
    },

    bussy_chest: {
        x: 65,
        y: 52,
        type: 'campingProp',
        drawFunction: 'drawChest',
        map: 'bussyInterior',
        solidTiles: [{dx: 0, dy: 0}],  // SOLID
        interact: true,
        interactMessage: 'Press SPACE to access chest',
        storageItem: true,
        storageCapacity: 999,  // Unlimited storage
        name: 'Chest',
        description: 'A sturdy wooden chest. Perfect for long-term storage.'
    },

    // =====================
    // OUTDOOR CAMPING PROPS
    // =====================

    campingChair1: {
        x: 15,
        y: 57,
        type: 'campingProp',
        drawFunction: 'drawCampingChair',
        map: 'outside',
        solidTiles: [{dx: 0, dy: 0}],  // SOLID
        name: 'Camping Chair',
        description: 'A folding chair. Perfect for relaxing.'
    },      
    
    // CAMPFIRE - In front of tent 1 (ELEKTRA's tent)
    campfire: {
        x: 17.5,
        y: 60,
        type: 'campingProp',
        drawFunction: 'drawCampfire',
        map: 'outside',
        solidTiles: [{dx: 0, dy: 0}],  // SOLID
        name: 'Campfire',
        description: 'A crackling campfire. Warm and cozy.'
    },

    // PORT-O-POTTY #1 - Enterable
    portoLetty1: {
        x: 99,
        y: 0,
        width: 2,
        height: 3,
        type: 'campingProp',
        drawFunction: 'drawPortOPotty',
        map: 'outside',
        solidTiles: [
            {dx: 0, dy: 1}, {dx: 1, dy: 1},
            {dx: 0, dy: 2}, {dx: 1, dy: 2}
        ],
        interact: true,
        interactType: 'portoPotty',
        name: 'Port-o-Potty',
        description: 'A portable toilet. Looks unlocked.'
    },
    
    // PORT-O-POTTY #2 - Locked
    portoLetty2: {
        x: 101,
        y: 0,
        width: 2,
        height: 3,
        type: 'campingProp',
        drawFunction: 'drawPortOPotty',
        map: 'outside',
        solidTiles: [
            {dx: 0, dy: 1}, {dx: 1, dy: 1},
            {dx: 0, dy: 2}, {dx: 1, dy: 2}
        ],
        interact: true,
        interactType: 'portoPotty',
        name: 'Port-o-Potty',
        description: 'This one has an "Occupied" sign.'
    },

    // PORT-O-POTTY #3 - Enterable
    portoLetty3: {
        x: 103,
        y: 0,
        width: 2,
        height: 3,
        type: 'campingProp',
        drawFunction: 'drawPortOPotty',
        map: 'outside',
        solidTiles: [
            {dx: 0, dy: 1}, {dx: 1, dy: 1},
            {dx: 0, dy: 2}, {dx: 1, dy: 2}
        ],
        interact: true,
        interactType: 'portoPotty',
        name: 'Port-o-Potty',
        description: 'Another portable toilet. Looks unlocked.'
    },

    // PORT-O-POTTY #4 - Corrected collision boundaries
    portoLetty4: {
        x: 105,
        y: 0,
        width: 2,
        height: 3,
        type: 'campingProp',
        drawFunction: 'drawPortOPotty',
        map: 'outside',
        solidTiles: [
            {dx: 0, dy: 1}, {dx: 1, dy: 1},
            {dx: 0, dy: 2}, {dx: 1, dy: 2}
        ],
        name: 'Port-o-Potty',
        description: 'Another portable toilet. The line is probably long.'
    },

    // PORT-O-POTTY #5 - Corrected collision boundaries
    // NOTE: This one has height: 4, but collision still at rows 1-2
    portoLetty5: {
        x: 106,
        y: 0,
        width: 2,
        height: 3,
        type: 'campingProp',
        drawFunction: 'drawPortOPotty',
        map: 'outside',
        solidTiles: [
            {dx: 0, dy: 1}, {dx: 1, dy: 1},
            {dx: 0, dy: 2}, {dx: 1, dy: 2}
        ],
        name: 'Port-o-Potty',
        description: 'Another portable toilet. The line is probably long.'
    }

};
