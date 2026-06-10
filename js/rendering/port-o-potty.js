// js/rendering/port-o-potty.js
// SNES-style Pixelated Port-o-Potty - LARGER SIZE (1.5x scale)
// Same design, just bigger so Bandaniel fits inside

/**
 * Draw a pixelated SNES-style port-o-potty (SCALED UP)
 * @param {CanvasRenderingContext2D} ctx - Canvas context
 * @param {number} x - Screen X position (top-left tile position)
 * @param {number} y - Screen Y position (top-left tile position)
 * @param {number} TILE_SIZE - Tile size (default 16)
 */
function drawPortOPotty(ctx, x, y, TILE_SIZE) {
    const TILE = TILE_SIZE || 16;
    
    // Disable smoothing for crisp pixels
    ctx.imageSmoothingEnabled = false;
    
    // SNES-authentic color palette
    const colors = {
        // Top/roof
        topLight: '#80cbc4',
        topMid: '#4db6ac',
        topDark: '#26a69a',
        
        // Body walls
        bodyLight: '#26a69a',
        bodyMid: '#00897b',
        bodyDark: '#00695c',
        bodyDarkest: '#004d40',
        
        // Base/ground connection
        baseDark: '#004d40',
        baseMid: '#00695c',
        
        // Roof vent
        ventDark: '#004d40',
        ventMid: '#00695c',
        
        // Door
        doorDarkest: '#01579b',
        doorDark: '#0277bd',
        doorMid: '#0288d1',
        doorLight: '#03a9f4',
        
        // Handle/details
        handleDark: '#1a1a1a',
        handleMid: '#616161',
        
        // Symbols
        symbolWhite: '#ffffff',
        symbolBlack: '#000000',
        
        // Shadow
        shadowColor: 'rgba(0, 0, 0, 0.4)'
    };
    
    ctx.save();
    
    // SCALED UP: width from 14 to 21 (1.5x)
    const baseX = x + 1;  // Adjusted for larger size
    const baseY = y;
    const width = 21;  // Was 14, now 21 (1.5x)
    
    // ===== DRAW LAYERS (all dimensions scaled 1.5x) =====
    
    // 1. TOP/ROOF
    drawTopSection(ctx, baseX, baseY, width, colors);
    
    // 2. DIVIDING LINE
    ctx.fillStyle = colors.bodyDarkest;
    ctx.fillRect(baseX, baseY + 6, width, 2);  // 4 -> 6, height 1 -> 2
    
    // 3. MAIN BODY/FRONT FACE
    drawFrontSection(ctx, baseX, baseY + 8, width, colors);  // 5 -> 8
    
    // 4. BASE/GROUND CONNECTION
    drawBaseSection(ctx, baseX, baseY + 40, width, colors);  // 26 -> 40
    
    // 5. SHADOW
    drawGroundShadow(ctx, baseX, baseY + 46, width, colors);  // 30 -> 46
    
    ctx.restore();
}

/**
 * Draw the top/roof section (SCALED 1.5x)
 */
function drawTopSection(ctx, x, y, width, colors) {
    const height = 6;  // Was 4, now 6
    
    // Main top surface
    ctx.fillStyle = colors.topMid;
    ctx.fillRect(x, y, width, height);
    
    // Left edge (lighter)
    ctx.fillStyle = colors.topLight;
    ctx.fillRect(x, y, 4, height);  // Was 3, now 4
    
    // Right edge (darker)
    ctx.fillStyle = colors.topDark;
    ctx.fillRect(x + width - 3, y, 3, height);  // Was 2, now 3
    
    // Vent bump
    ctx.fillStyle = colors.ventMid;
    ctx.fillRect(x + 6, y + 2, 9, 3);  // Was (4, 1, 6, 2), now scaled
    
    // Vent slot
    ctx.fillStyle = colors.ventDark;
    ctx.fillRect(x + 7, y + 3, 6, 2);  // Was (5, 2, 4, 1), now scaled
}

/**
 * Draw the main front face (SCALED 1.5x)
 */
function drawFrontSection(ctx, x, y, width, colors) {
    const height = 32;  // Was 21, now 32 (1.5x)
    
    // Main front wall
    ctx.fillStyle = colors.bodyMid;
    ctx.fillRect(x, y, width, height);
    
    // Left panel (lighter)
    ctx.fillStyle = colors.bodyLight;
    ctx.fillRect(x, y, 3, height);  // Was 2, now 3
    
    // Right panel (darker)
    ctx.fillStyle = colors.bodyDark;
    ctx.fillRect(x + width - 3, y, 3, height);  // Was 2, now 3
    
    // Horizontal seams
    ctx.fillStyle = colors.bodyDarkest;
    ctx.fillRect(x, y + 15, width, 2);  // Was (y+10, height 1), now scaled
    
    // === DOOR (SCALED 1.5x) ===
    const doorX = x + 4;  // Was 3, now 4
    const doorY = y + 3;  // Was 2, now 3
    const doorWidth = width - 9;  // Was width-6, now width-9
    const doorHeight = 28;  // Was 19, now 28 (1.5x)
    
    // Door frame
    ctx.fillStyle = colors.bodyDarkest;
    ctx.fillRect(doorX - 2, doorY - 2, doorWidth + 4, doorHeight + 4);  // Thicker frame
    
    // Door surface
    ctx.fillStyle = colors.doorMid;
    ctx.fillRect(doorX, doorY, doorWidth, doorHeight);
    
    // Door panels (4 panels, all scaled)
    ctx.fillStyle = colors.doorDark;
    ctx.fillRect(doorX + 2, doorY + 3, doorWidth - 4, 4);   // Upper (was +2, height 3)
    ctx.fillRect(doorX + 2, doorY + 10, doorWidth - 4, 5);  // Upper-mid (was +7, height 3)
    ctx.fillRect(doorX + 2, doorY + 18, doorWidth - 4, 5);  // Lower-mid (was +12, height 3)
    ctx.fillRect(doorX + 2, doorY + 24, doorWidth - 4, 3);  // Lower (was +16, height 2)
    
    // Door highlight
    ctx.fillStyle = colors.doorLight;
    ctx.fillRect(doorX + 2, doorY + 2, 2, doorHeight - 4);  // Thicker highlight
    
    // === HANDLE (SCALED 1.5x) ===
    const handleX = doorX + doorWidth;
    const handleY = doorY + 13;  // Was 9, now 13
    
    ctx.fillStyle = colors.handleDark;
    ctx.fillRect(handleX, handleY, 3, 6);  // Was (2, 4), now (3, 6)
    
    ctx.fillStyle = colors.handleMid;
    ctx.fillRect(handleX, handleY, 2, 6);  // Was (1, 4), now (2, 6)
    
    // === VACANT SIGN (SCALED 1.5x) ===
    const signX = doorX + 3;  // Was 2, now 3
    const signY = y;
    
    ctx.fillStyle = colors.symbolWhite;
    ctx.fillRect(signX, signY, 6, 3);  // Was (4, 2), now (6, 3)
    
    ctx.strokeStyle = colors.symbolBlack;
    ctx.lineWidth = 1;
    ctx.strokeRect(signX, signY, 6, 3);
    
    ctx.fillStyle = '#4caf50';
    ctx.fillRect(signX + 2, signY + 1, 3, 1);  // Scaled indicator
    
    // === STICK FIGURE (SCALED 1.5x) ===
    ctx.fillStyle = colors.symbolWhite;
    const iconX = doorX + 5;  // Was 3, now 5
    const iconY = doorY + 9;  // Was 6, now 9
    
    ctx.fillRect(iconX, iconY, 3, 3);      // Head (was 2x2, now 3x3)
    ctx.fillRect(iconX, iconY + 3, 3, 6);  // Body (was 2x4, now 3x6)
    ctx.fillRect(iconX - 2, iconY + 6, 6, 2); // Arms (was -1, width 4, height 1)
    ctx.fillRect(iconX - 2, iconY + 9, 2, 5); // Left leg (was -1, width 1, height 3)
    ctx.fillRect(iconX + 3, iconY + 9, 2, 5); // Right leg (was +2, width 1, height 3)
}

/**
 * Draw the base section (SCALED 1.5x)
 */
function drawBaseSection(ctx, x, y, width, colors) {
    const height = 6;  // Was 4, now 6
    
    // Base panel
    ctx.fillStyle = colors.baseDark;
    ctx.fillRect(x, y, width, height);
    
    // Top edge
    ctx.fillStyle = colors.baseMid;
    ctx.fillRect(x, y, width, 2);  // Was 1, now 2
    
    // Left edge
    ctx.fillStyle = colors.bodyMid;
    ctx.fillRect(x, y, 3, height);  // Was 2, now 3
    
    // Right edge
    ctx.fillStyle = colors.bodyDarkest;
    ctx.fillRect(x + width - 3, y, 3, height);  // Was 2, now 3
}

/**
 * Draw shadow on ground (SCALED 1.5x)
 */
function drawGroundShadow(ctx, x, y, width, colors) {
    ctx.fillStyle = colors.shadowColor;
    ctx.fillRect(x - 2, y, width + 4, 3);  // Was (-1, width+2, height 2)
    ctx.fillRect(x + 2, y + 3, width - 2, 2);  // Was (+1, width-2, height 1)
}

/**
 * Get collision for port-o-potty (2×2 footprint for the solid base)
 * 
 * Visual breakdown:
 * - Row 0 (tileY): Top/roof section (walkable - player can walk behind)
 * - Row 1 (tileY+1): Main body/door section (SOLID - collision starts here)
 * - Row 2 (tileY+2): Base/ground connection (SOLID - collision ends here)
 * 
 * The visual sprite draws from tileY but the actual solid collision is at tileY+1 and tileY+2
 */
function getPortOPottyCollision(tileX, tileY) {
    return [
        // Middle row - where the door/body is (offset by +1 from visual top)
        {x: tileX, y: tileY + 1, walkable: false},
        {x: tileX + 1, y: tileY + 1, walkable: false},
        // Bottom row - where the base/ground connection is (offset by +2 from visual top)
        {x: tileX, y: tileY + 2, walkable: false},
        {x: tileX + 1, y: tileY + 2, walkable: false}
    ];
}
