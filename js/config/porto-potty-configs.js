// config/porto-potty-configs.js
// Configuration for enterable port-o-potties

const PORTO_POTTY_CONFIGS = {
        portoLetty1: {
        exterior: { x: 99, y: 0, width: 2, height: 3, map: 'outside' },
        interior: { x: 73, y: 54, width: 4, height: 4, map: 'portoLetty1Interior' },
        doorTiles: [{ x: 75, y: 57 }],
        spawns: {
            onEnter: { x: 75, y: 56, facing: 'up' },
            onExit: { x: 100, y: 3, facing: 'down' }
        },
        locked: false
    },
    portoLetty2: {
        exterior: { x: 101, y: 0, width: 2, height: 3, map: 'outside' },
        interior: { x: 73, y: 54, width: 4, height: 4, map: 'portoLetty2Interior' },
        doorTiles: [{ x: 75, y: 57 }],
        spawns: {
            onEnter: { x: 75, y: 56, facing: 'up' },
            onExit: { x: 102, y: 3, facing: 'down' }
        },
        locked: true,
        lockedDialogue: ['Occupado!']
    },
    portoLetty3: {
        exterior: { x: 103, y: 0, width: 2, height: 3, map: 'outside' },
        interior: { x: 73, y: 54, width: 4, height: 4, map: 'portoLetty3Interior' },
        doorTiles: [{ x: 75, y: 57 }],
        spawns: {
            onEnter: { x: 75, y: 56, facing: 'up' },
            onExit: { x: 104, y: 3, facing: 'down' }
        },
        locked: false
    }
};

/**
 * Find port-o-potty config by exterior coordinates
 */
PORTO_POTTY_CONFIGS.getByExterior = function(x, y, mapName) {
    for (const [key, config] of Object.entries(PORTO_POTTY_CONFIGS)) {
        if (typeof config !== 'function' && config.exterior && config.exterior.map === mapName) {
            const ext = config.exterior;
            if (x >= ext.x && x < ext.x + ext.width && y >= ext.y && y < ext.y + ext.height) {
                return { key, config };
            }
        }
    }
    return null;
};

/**
 * Find port-o-potty config by interior map name
 */
PORTO_POTTY_CONFIGS.getByInteriorMap = function(mapName) {
    for (const [key, config] of Object.entries(PORTO_POTTY_CONFIGS)) {
        if (typeof config !== 'function' && config.interior && config.interior.map === mapName) {
            return { key, config };
        }
    }
    return null;
};
