// entities/items-data.js
// Item definitions - MOVED ITEMS CLOSER TO SPAWN

/* =====================================================
   ITEM TYPES
===================================================== */

const ITEM_TYPES = {
    bussy_keys: {
        id: 'bussy_keys',
        name: "da Bussy's Keys",
        description: "Keys to unlock da Bussy.",
        sprite: 'keys',
        required: false,
        canDrop: true,
        canStore: true,
    },
    
    flashlight: {
        id: 'flashlight',
        name: 'Flashlight',
        description: 'A red flashlight.',
        sprite: 'flashlight',
        required: false,
        canDrop: true,
        canStore: true,
    },
    
    backpack_medium: {
        id: 'backpack_medium',
        name: 'Medium Backpack',
        description: 'A well-worn hiking backpack. Holds 6 items.',
        sprite: 'backpack_medium',
        required: false,
        canDrop: true,
        canStore: false,
    },

    cigarettes: {
        id: 'cigarettes',
        name: 'Cigarettes (1 left)',
        description: 'A crumpled pack of cigarettes. Only one left.',
        sprite: 'cigarettes',
        required: false,
        canDrop: true,
        canStore: true,
    },
};

/* =====================================================
   BACKPACK TYPES (for future tiered system)
   ===================================================== */

const BACKPACK_TYPES = {
    backpack_medium: ITEM_TYPES.backpack_medium,
};

/* =====================================================
   ITEM ARRAYS
===================================================== */

// Items for "outside" map
const itemsOutside = [
    {
        type: ITEM_TYPES.bussy_keys,
        // ✅ MOVED CLOSER: 2 tiles right of spawn (30, 40)
        x: 34, 
        y: 40,
        collected: false,
        map: 'outside',
    },
    {
        type: ITEM_TYPES.flashlight,
        // ✅ MOVED CLOSER: 5 tiles right of spawn
        x: 37,
        y: 42,
        collected: false,
        map: 'outside',
    },
    {
        type: ITEM_TYPES.cigarettes,
        // Near the campfire
        x: 19,
        y: 60,
        collected: false,
        map: 'outside',
    },
];

const itemsTentInterior0 = [];
const itemsTentInterior1 = [];
const itemsTentInterior2 = [];
const itemsTentInterior3 = [];
const itemsBussyInterior = [];
// Legacy empty arrays
const itemsHouse = [];
const itemsUpstairs = [];
const itemsTunnel = [];

/* =====================================================
   FUNCTIONS
===================================================== */

function getItemsForMap(mapName) {
    if (mapName === 'outside') return itemsOutside;
    if (mapName === 'tentInterior0') return itemsTentInterior0;
    if (mapName === 'tentInterior1') return itemsTentInterior1;
    if (mapName === 'tentInterior2') return itemsTentInterior2;
    if (mapName === 'tentInterior3') return itemsTentInterior3;
    if (mapName === 'bussyInterior') return itemsBussyInterior;
    return [];
}

function getItemType(itemId) { return ITEM_TYPES[itemId] || null; }
function isQuestItem(itemId) { return ITEM_TYPES[itemId]?.required === true; }
function canDropItem(itemId) { return ITEM_TYPES[itemId]?.canDrop !== false; }
function canStoreItem(itemId) { return ITEM_TYPES[itemId]?.canStore !== false; }

