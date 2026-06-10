// ==============================
// Tile / World Constants
// ==============================

const TILE_SIZE = 16;  // Changed from 40
const MAP_WIDTH = 150;  // Updated from 60 for 16px tiles
const MAP_HEIGHT = 112; // Updated from 45 for 16px tiles

// Tile IDs
const TILES = {
    GRASS: 0,
    WATER: 1,
    WALL: 2,
    TREE: 3,
    DOOR: 4,
    FLOOR: 5,
    CARPET: 6,
    SAND: 7,
    FLOWER: 8,
    TUNNEL: 9,
    STAIRS: 10,
    TENT_FLOOR: 11,  // Grey tent floor for interior
    TENT_DOOR: 12    // Tent door tiles (fabric flaps)
};

// Tile colors (used by renderer)
const TILE_COLORS = {
    [TILES.GRASS]: '#7cb342',
    [TILES.WATER]: '#1e88e5',
    [TILES.WALL]: '#5d4037',
    [TILES.TREE]: '#2e7d32',
    [TILES.DOOR]: '#8b4513',
    [TILES.FLOOR]: '#d7ccc8',
    [TILES.CARPET]: '#c62828',
    [TILES.SAND]: '#ddc789',
    [TILES.FLOWER]: '#9ccc65',
    [TILES.TUNNEL]: '#1a1a1a',
    [TILES.STAIRS]: '#8b7355',
    [TILES.TENT_FLOOR]: '#5a5a5a',  // Grey tent floor
    [TILES.TENT_DOOR]: '#5a5a5a'    // Tent doors (same as floor for now)
};

// Tiles the player cannot walk through
// ✅ CRITICAL FIX: Added TILES.TUNNEL (void) to prevent escaping into black areas
const SOLID_TILES = [TILES.WATER, TILES.WALL, TILES.TUNNEL];

// ==============================
// Player / Game Rules
// ==============================

const MAX_HEALTH = 100;
const STARTING_COINS = 0;

// ==============================
// Movement / Timing
// ==============================

const PLAYER_SPEED = 2;

// Optional: useful later if you add animation
const ANIMATION_FRAME_TIME = 150;

// ==============================
// Directions (optional helper)
// ==============================

const DIRECTIONS = {
    UP: 'up',
    DOWN: 'down',
    LEFT: 'left',
    RIGHT: 'right'
};
