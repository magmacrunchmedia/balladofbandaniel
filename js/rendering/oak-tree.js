// js/rendering/sprites/oak-tree.js
// SNES-style Pixelated Live Oak tree with Spanish moss
// Multi-tile sprite (7x7 footprint, 3x3 solid trunk base)

/**
 * Draw a pixelated SNES-style Live Oak tree with Spanish moss
 * @param {CanvasRenderingContext2D} ctx - Canvas context
 * @param {number} x - Screen X position (top-left of tree footprint)
 * @param {number} y - Screen Y position (top-left of tree footprint)
 * @param {number} frame - Current game frame for animation
 */
function drawOakTree(ctx, x, y, frame) {
    const TILE = 16;
    
    // Disable smoothing for crisp pixels
    ctx.imageSmoothingEnabled = false;
    
    // Animation cycle: VERY slow gentle sway for moss (like hanging Spanish moss/willow)
    const animFrame = Math.floor(frame / 30) % 8; // 8-frame animation, 30 frames each = very slow
    const swayOffset = [0, 0.5, 1, 1.5, 1, 0.5, 0, -0.5][animFrame];
    
    // SNES-authentic color palette (limited colors, no gradients)
    const colors = {
        // Trunk (4 shades only)
        trunkDarkest: '#2d1b0e',
        trunkDark: '#3e2723',
        trunkMid: '#5d4037',
        trunkLight: '#795548',
        
        // Foliage (3 main shades)
        leafDarkest: '#0d3d0d',
        leafDark: '#1b5e20',
        leafMid: '#2e7d32',
        leafLight: '#4caf50',
        
        // Spanish moss (3 shades)
        mossDark: '#607d8b',
        mossMid: '#90a4ae',
        mossLight: '#cfd8dc'
    };
    
    ctx.save();
    
    // ===== CANOPY - Pixelated blob clusters =====
    drawPixelatedCanopy(ctx, x, y, TILE, colors);
    
    // ===== TRUNK - Pixelated bark texture =====
    drawPixelatedTrunk(ctx, x + 2 * TILE, y + 2 * TILE, TILE, colors);
    
    // ===== SPANISH MOSS - Pixelated hanging strands =====
    drawPixelatedMoss(ctx, x, y, TILE, swayOffset, colors);
    
    ctx.restore();
}

/**
 * Draw pixelated canopy using manual pixel placement
 */
function drawPixelatedCanopy(ctx, x, y, TILE, colors) {
    // Define canopy as pixel clusters (y, x, width, color)
    // Top layer - darkest
    const canopyPixels = [
        // Row 0 (top)
        {y: 0, x: 2*TILE, w: TILE*3, h: 4, c: colors.leafDarkest},
        
        // Row 0-1 (upper canopy)
        {y: 4, x: TILE, w: TILE*5, h: 8, c: colors.leafDark},
        {y: 12, x: TILE*0.5, w: TILE*6, h: 8, c: colors.leafDark},
        
        // Row 1-2 (mid canopy) - main mass
        {y: 20, x: TILE*0.5, w: TILE*6, h: 12, c: colors.leafMid},
        {y: 32, x: TILE, w: TILE*5, h: 8, c: colors.leafMid},
        
        // Row 2-3 (lower canopy)
        {y: 40, x: TILE*1.5, w: TILE*4, h: 8, c: colors.leafMid},
        {y: 48, x: TILE*2, w: TILE*3, h: 6, c: colors.leafDark},
        
        // Highlights - lighter pixel clusters
        {y: 8, x: TILE*2, w: 8, h: 8, c: colors.leafLight},
        {y: 24, x: TILE*4.5, w: 10, h: 10, c: colors.leafLight},
        {y: 36, x: TILE*1.5, w: 8, h: 6, c: colors.leafLight},
    ];
    
    // Draw pixel clusters with dithering
    canopyPixels.forEach(pixel => {
        ctx.fillStyle = pixel.c;
        ctx.fillRect(Math.floor(x + pixel.x), Math.floor(y + pixel.y), pixel.w, pixel.h);
    });
    
    // Add dithered shading (checkerboard pattern for depth)
    drawDithering(ctx, x + TILE, y + 16, TILE*4, 20, colors.leafDarkest, 0.3);
    drawDithering(ctx, x + TILE*2, y + 36, TILE*2, 12, colors.leafLight, 0.2);
}

/**
 * Draw pixelated trunk with bark texture
 */
function drawPixelatedTrunk(ctx, trunkX, trunkY, TILE, colors) {
    const trunkWidth = 3 * TILE;
    const trunkHeight = 3 * TILE;
    
    // Base trunk color
    ctx.fillStyle = colors.trunkMid;
    ctx.fillRect(trunkX, trunkY, trunkWidth, trunkHeight);
    
    // Bark texture - vertical pixel strips
    ctx.fillStyle = colors.trunkDark;
    for (let i = 0; i < trunkWidth; i += 6) {
        const stripX = trunkX + i;
        // Irregular bark lines
        ctx.fillRect(stripX, trunkY, 2, trunkHeight);
        ctx.fillRect(stripX + 3, trunkY + 8, 2, trunkHeight - 16);
    }
    
    // Dark crevices - pixel clusters
    ctx.fillStyle = colors.trunkDarkest;
    ctx.fillRect(trunkX + 4, trunkY + 12, 4, 8);
    ctx.fillRect(trunkX + trunkWidth - 8, trunkY + 20, 4, 10);
    ctx.fillRect(trunkX + 16, trunkY + trunkHeight - 12, 6, 6);
    
    // Light highlights - left edge
    ctx.fillStyle = colors.trunkLight;
    ctx.fillRect(trunkX, trunkY + 4, 3, trunkHeight - 8);
    ctx.fillRect(trunkX + 8, trunkY + 16, 4, 12);
    
    // Dithered shading on right side
    drawDithering(ctx, trunkX + trunkWidth - 12, trunkY + 8, 10, trunkHeight - 16, colors.trunkDarkest, 0.4);
}

/**
 * Draw pixelated Spanish moss strands (willow-like, long and wispy)
 */
function drawPixelatedMoss(ctx, x, y, TILE, sway, colors) {
    // Moss strand positions - longer, thinner, more willow-like
    // (x offset, y offset, length in pixels, thickness)
    const mossStrands = [
        {x: 1.5*TILE, y: 2*TILE, len: 48, thicc: 2},      // Long left strand
        {x: 2*TILE, y: 2.5*TILE, len: 36, thicc: 2},      
        {x: 2.5*TILE, y: 1.8*TILE, len: 52, thicc: 3},    // Extra long
        {x: 3*TILE, y: 1.5*TILE, len: 56, thicc: 2},      // Longest center
        {x: 3.5*TILE, y: 2*TILE, len: 44, thicc: 3},      
        {x: 4*TILE, y: 2.5*TILE, len: 40, thicc: 2},      
        {x: 4.5*TILE, y: 1.8*TILE, len: 50, thicc: 2},    // Long
        {x: 5*TILE, y: 2*TILE, len: 46, thicc: 2},        
        {x: 5.5*TILE, y: 2.8*TILE, len: 38, thicc: 2}     // Right strand
    ];
    
    mossStrands.forEach((strand, index) => {
        // Different sway amount for each strand (more organic/willow-like)
        const strandSway = sway * (0.3 + (index % 5) * 0.15);
        drawPixelMossStrand(ctx, x + strand.x, y + strand.y, strand.len, strand.thicc, strandSway, colors);
    });
}

/**
 * Draw a single pixelated moss strand
 */
function drawPixelMossStrand(ctx, x, y, length, thickness, sway, colors) {
    const segments = Math.floor(length / 6);
    
    for (let i = 0; i < segments; i++) {
        const segY = y + (i * 6);
        const segSway = Math.floor(sway * (i / segments)); // Pixel-perfect sway
        const segWidth = Math.max(1, thickness - Math.floor(i / 3)); // Taper
        
        // Color progression: dark -> mid -> light
        let color;
        if (i < segments * 0.3) {
            color = colors.mossDark;
        } else if (i < segments * 0.6) {
            color = colors.mossMid;
        } else {
            color = colors.mossLight;
        }
        
        // Draw moss segment as pixel cluster
        ctx.fillStyle = color;
        ctx.fillRect(Math.floor(x + segSway), Math.floor(segY), segWidth, 5);
        
        // Add light pixel highlights (not every segment)
        if (i > 2 && i % 2 === 0) {
            ctx.fillStyle = colors.mossLight;
            ctx.fillRect(Math.floor(x + segSway + segWidth), Math.floor(segY + 1), 1, 3);
        }
    }
}

/**
 * Draw dithered shading pattern (checkerboard for SNES-style depth)
 * STATIC pattern - does NOT animate
 */
function drawDithering(ctx, x, y, width, height, color, density = 0.5) {
    ctx.fillStyle = color;
    
    // Static checkerboard dithering pattern (NOT random, NOT animated)
    for (let py = 0; py < height; py += 2) {
        for (let px = 0; px < width; px += 2) {
            // Deterministic pattern based on position
            if ((Math.floor(px/2) + Math.floor(py/2)) % 2 === 0) {
                ctx.fillRect(Math.floor(x + px), Math.floor(y + py), 2, 2);
            }
        }
    }
}

/**
 * Get collision map for oak tree
 * Returns array of {x, y, walkable} for each tile in footprint
 * @param {number} tileX - Tree's grid X position (top-left)
 * @param {number} tileY - Tree's grid Y position (top-left)
 * @returns {Array} Collision data for tree tiles
 */
function getOakTreeCollision(tileX, tileY) {
    const collision = [];
    
    // 7x7 footprint
    for (let dy = 0; dy < 7; dy++) {
        for (let dx = 0; dx < 7; dx++) {
            const gridX = tileX + dx;
            const gridY = tileY + dy;
            
            // Trunk tiles (3x3 centered at 2,2) are solid
            const isTrunk = (dx >= 2 && dx <= 4) && (dy >= 2 && dy <= 4);
            
            collision.push({
                x: gridX,
                y: gridY,
                walkable: !isTrunk
            });
        }
    }
    
    return collision;
}

// Export for use in rendering pipeline
// (In ES5 modular style - functions are globally available)