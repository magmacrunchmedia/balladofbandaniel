// js/rendering/bus-interior-walls.js
// SNES-style bus interior wall rendering for da Bussy
// Matches the aesthetic of tent interior walls but with bus-themed details

/**
 * Draw bus interior wall tile - metallic/painted bus interior aesthetic
 * @param {CanvasRenderingContext2D} ctx - Canvas context
 * @param {number} scx - Screen X coordinate
 * @param {number} scy - Screen Y coordinate
 * @param {number} x - Tile X coordinate (world position)
 * @param {number} y - Tile Y coordinate (world position)
 */
function drawBusInteriorWall(ctx, scx, scy, x, y) {
    const TILE = TILE_SIZE || 16;
    
    // Disable smoothing for crisp pixels
    ctx.imageSmoothingEnabled = false;
    
    // SNES-authentic bus interior palette
    // Using warm yellows/oranges for vintage school bus aesthetic
    const colors = BUSSY_CONFIG.theme || {
        baseWall: '#f9a825',      // Bright yellow-orange (bus yellow)
        wallMid: '#f57f17',       // Darker yellow-orange
        wallDark: '#e65100',      // Deep orange (shadows)
        metalTrim: '#616161',     // Dark gray (metal trim)
        metalLight: '#9e9e9e',    // Light gray (metal highlights)
        rivetDark: '#424242',     // Very dark gray (rivets)
        panel: '#fbc02d',         // Lighter yellow (panel highlight)
        shadow: '#bf360c'         // Very dark orange (deep shadows)
    };
    
    // Base wall color
    ctx.fillStyle = colors.baseWall;
    ctx.fillRect(scx, scy, TILE, TILE);
    
    // Determine wall orientation based on position in bus interior
    // Bus interior is 24 wide × 10 tall, starts at (63, 51)
    const busX = BUSSY_CONFIG.interior.x;
    const busY = BUSSY_CONFIG.interior.y;
    const busWidth = BUSSY_CONFIG.interior.width;
    const busHeight = BUSSY_CONFIG.interior.height;
    
    // Calculate relative position within bus
    const relX = x - busX;
    const relY = y - busY;
    
    // TOP WALL (row 0)
    if (relY === 0) {
        drawBusTopWall(ctx, scx, scy, relX, colors);
    }
    // BOTTOM WALL (row 9)
    else if (relY === busHeight - 1) {
        drawBusBottomWall(ctx, scx, scy, relX, colors);
    }
    // LEFT WALL (column 0)
    else if (relX === 0) {
        drawBusLeftWall(ctx, scx, scy, relY, colors);
    }
    // RIGHT WALL (column 23 - driver area)
    else if (relX === busWidth - 1) {
        drawBusRightWall(ctx, scx, scy, relY, colors);
    }
}

/**
 * Draw top wall (ceiling) - horizontal paneling
 */
function drawBusTopWall(ctx, scx, scy, relX, colors) {
    const TILE = TILE_SIZE || 16;
    
    // Darker base for ceiling
    ctx.fillStyle = colors.wallMid;
    ctx.fillRect(scx, scy, TILE, TILE);
    
    // Horizontal panel lines (ceiling panels)
    ctx.fillStyle = colors.wallDark;
    ctx.fillRect(scx, scy + 5, TILE, 2);
    ctx.fillRect(scx, scy + 11, TILE, 2);
    
    // Metal trim at top edge
    ctx.fillStyle = colors.metalTrim;
    ctx.fillRect(scx, scy, TILE, 2);
    
    // Rivets/bolts every few tiles
    if (relX % 3 === 0) {
        ctx.fillStyle = colors.rivetDark;
        ctx.fillRect(scx + 2, scy + 2, 2, 2);
        ctx.fillRect(scx + TILE - 4, scy + 2, 2, 2);
    }
}

/**
 * Draw bottom wall (floor edge/wall junction)
 */
function drawBusBottomWall(ctx, scx, scy, relX, colors) {
    const TILE = TILE_SIZE || 16;
    const doorDx = BUSSY_CONFIG.interior.doorOffset.dx;
    
    // Check if this is a door tile (columns 18-19)
    if (relX === doorDx[0] || relX === doorDx[1]) {
        // Draw door instead of wall
        drawBusDoor(ctx, scx, scy);
        return;
    }
    
    // Regular bottom wall
    ctx.fillStyle = colors.baseWall;
    ctx.fillRect(scx, scy, TILE, TILE);
    
    // Baseboard/kickplate at bottom
    ctx.fillStyle = colors.metalTrim;
    ctx.fillRect(scx, scy + TILE - 3, TILE, 3);
    
    // Shadow line above baseboard
    ctx.fillStyle = colors.wallDark;
    ctx.fillRect(scx, scy + TILE - 5, TILE, 2);
    
    // Vertical panel lines
    if (relX % 2 === 0) {
        ctx.fillStyle = colors.wallMid;
        ctx.fillRect(scx + TILE - 2, scy, 2, TILE);
    }
}

/**
 * Draw left wall (exit side) - vertical paneling
 */
function drawBusLeftWall(ctx, scx, scy, relY, colors) {
    const TILE = TILE_SIZE || 16;
    
    // Base wall
    ctx.fillStyle = colors.baseWall;
    ctx.fillRect(scx, scy, TILE, TILE);
    
    // Metal edge strip
    ctx.fillStyle = colors.metalTrim;
    ctx.fillRect(scx, scy, 3, TILE);
    
    // Highlight on metal
    ctx.fillStyle = colors.metalLight;
    ctx.fillRect(scx, scy, 1, TILE);
    
    // Vertical paneling
    ctx.fillStyle = colors.wallMid;
    ctx.fillRect(scx + 5, scy, 2, TILE);
    ctx.fillRect(scx + 11, scy, 2, TILE);
    
    // Rivets/bolts
    if (relY % 2 === 1) {
        ctx.fillStyle = colors.rivetDark;
        ctx.fillRect(scx + 3, scy + 2, 2, 2);
        ctx.fillRect(scx + 3, scy + TILE - 4, 2, 2);
    }
}

/**
 * Draw right wall (driver area) - vertical paneling with more detail
 */
function drawBusRightWall(ctx, scx, scy, relY, colors) {
    const TILE = TILE_SIZE || 16;
    
    // Base wall
    ctx.fillStyle = colors.baseWall;
    ctx.fillRect(scx, scy, TILE, TILE);
    
    // Panel highlight (lighter section)
    ctx.fillStyle = colors.panel;
    ctx.fillRect(scx + 2, scy + 2, TILE - 4, TILE - 4);
    
    // Metal edge strip
    ctx.fillStyle = colors.metalTrim;
    ctx.fillRect(scx + TILE - 3, scy, 3, TILE);
    
    // Shadow on metal
    ctx.fillStyle = colors.shadow;
    ctx.fillRect(scx + TILE - 1, scy, 1, TILE);
    
    // Vertical paneling
    ctx.fillStyle = colors.wallMid;
    ctx.fillRect(scx + 3, scy, 2, TILE);
    ctx.fillRect(scx + 9, scy, 2, TILE);
    
    // Rivets/bolts
    if (relY % 2 === 0) {
        ctx.fillStyle = colors.rivetDark;
        ctx.fillRect(scx + TILE - 5, scy + 3, 2, 2);
        ctx.fillRect(scx + TILE - 5, scy + TILE - 5, 2, 2);
    }
}

/**
 * Draw bus door (exit) - SNES-style folding door
 * @param {CanvasRenderingContext2D} ctx - Canvas context
 * @param {number} scx - Screen X coordinate
 * @param {number} scy - Screen Y coordinate
 */
function drawBusDoor(ctx, scx, scy) {
    const TILE = TILE_SIZE || 16;
    
    // Door colors - darker metallic
    const doorColors = {
        doorBase: '#546e7a',      // Blue-gray door
        doorDark: '#37474f',      // Dark shadow
        doorLight: '#78909c',     // Light highlight
        handle: '#fdd835',        // Yellow handle
        handleDark: '#f9a825',    // Handle shadow
        window: '#90caf9',        // Light blue window
        windowDark: '#42a5f5'     // Window shadow
    };
    
    // Door frame (darker outline)
    ctx.fillStyle = doorColors.doorDark;
    ctx.fillRect(scx, scy, TILE, TILE);
    
    // Door panel (main surface)
    ctx.fillStyle = doorColors.doorBase;
    ctx.fillRect(scx + 2, scy + 2, TILE - 4, TILE - 4);
    
    // Vertical seam in middle (folding door)
    ctx.fillStyle = doorColors.doorDark;
    ctx.fillRect(scx + TILE/2 - 1, scy + 2, 2, TILE - 4);
    
    // Door window (top half)
    ctx.fillStyle = doorColors.windowDark;
    ctx.fillRect(scx + 4, scy + 3, TILE - 8, 5);
    ctx.fillStyle = doorColors.window;
    ctx.fillRect(scx + 4, scy + 3, TILE - 8, 3);
    
    // Handle (near middle)
    ctx.fillStyle = doorColors.handleDark;
    ctx.fillRect(scx + TILE - 5, scy + TILE/2, 2, 4);
    ctx.fillStyle = doorColors.handle;
    ctx.fillRect(scx + TILE - 5, scy + TILE/2, 1, 4);
    
    // Highlight edge
    ctx.fillStyle = doorColors.doorLight;
    ctx.fillRect(scx + 2, scy + 2, 1, TILE - 4);
    ctx.fillRect(scx + 2, scy + 2, TILE - 4, 1);
}

