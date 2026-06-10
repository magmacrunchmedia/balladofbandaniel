// js/rendering/campfire.js
// SNES-style Pixelated Campfire with animated flames
// Single-tile footprint (1x1) with flames extending upward

/**
 * Draw a pixelated SNES-style campfire with animated flames
 * @param {CanvasRenderingContext2D} ctx - Canvas context
 * @param {number} x - Screen X position (tile position)
 * @param {number} y - Screen Y position (tile position)
 * @param {number} frame - Current game frame for animation
 */
function drawCampfire(ctx, x, y, frame) {
    const TILE = 16;
    
    // Disable smoothing for crisp pixels
    ctx.imageSmoothingEnabled = false;
    
    // Animation cycle: FASTER flickering fire (12 frames, 2 frames each for more obvious animation)
    const animFrame = Math.floor(frame / 2) % 12;
    
    // SNES-authentic color palette (limited colors)
    const colors = {
        // Logs/wood (3 shades)
        woodDarkest: '#2d1b0e',
        woodDark: '#3e2723',
        woodMid: '#5d4037',
        woodLight: '#795548',
        
        // Fire colors (bright, saturated)
        fireWhite: '#fff9e6',      // Hottest center
        fireYellow: '#ffeb3b',     // Bright yellow
        fireOrange: '#ff9800',     // Orange mid
        fireRed: '#f44336',        // Red outer
        fireDark: '#d32f2f',       // Dark red base
        
        // Embers/coals (glowing)
        emberBright: '#ff5722',
        emberMid: '#e64a19',
        emberDark: '#bf360c',
        
        // Smoke (subtle)
        smokeDark: 'rgba(66, 66, 66, 0.4)',
        smokeLight: 'rgba(120, 120, 120, 0.3)'
    };
    
    ctx.save();
    
    // ===== LOGS - Static base =====
    drawCampfireLogs(ctx, x, y, TILE, colors);
    
    // ===== EMBERS/COALS - Gentle pulsing animation =====
    drawCampfireEmbers(ctx, x, y, TILE, animFrame, colors);
    
    // ===== FLAMES - Animated flickering =====
    drawCampfireFlames(ctx, x, y, TILE, animFrame, colors);
    
    // ===== SMOKE - Subtle rising animation =====
    drawCampfireSmoke(ctx, x, y, TILE, animFrame, colors);
    
    // ===== GLOW - Pulsing light effect on ground =====
    drawCampfireGlow(ctx, x, y, TILE, animFrame, colors);
    
    ctx.restore();
}

/**
 * Draw the log arrangement (static)
 */
function drawCampfireLogs(ctx, x, y, TILE, colors) {
    const centerX = x + TILE / 2;
    const centerY = y + TILE / 2;
    
    // Log 1 - Bottom left to top right (diagonal)
    ctx.fillStyle = colors.woodDark;
    ctx.fillRect(x + 2, y + 10, 10, 4);
    // Highlight
    ctx.fillStyle = colors.woodLight;
    ctx.fillRect(x + 2, y + 10, 10, 1);
    // Shadow
    ctx.fillStyle = colors.woodDarkest;
    ctx.fillRect(x + 2, y + 13, 10, 1);
    
    // Log 2 - Bottom right to top left (diagonal, crossed)
    ctx.fillStyle = colors.woodMid;
    ctx.fillRect(x + 4, y + 10, 10, 4);
    // Highlight
    ctx.fillStyle = colors.woodLight;
    ctx.fillRect(x + 4, y + 10, 10, 1);
    // Shadow
    ctx.fillStyle = colors.woodDarkest;
    ctx.fillRect(x + 4, y + 13, 10, 1);
    
    // Log 3 - Front log (horizontal)
    ctx.fillStyle = colors.woodDark;
    ctx.fillRect(x + 3, y + 12, 10, 3);
    // Charred edge
    ctx.fillStyle = colors.woodDarkest;
    ctx.fillRect(x + 3, y + 12, 10, 1);
    
    // Log ends (visible circles)
    ctx.fillStyle = colors.woodMid;
    // Left end
    ctx.fillRect(x + 2, y + 11, 2, 2);
    // Right end
    ctx.fillRect(x + 12, y + 11, 2, 2);
}

/**
 * Draw glowing embers/coals with pulsing animation
 */
function drawCampfireEmbers(ctx, x, y, TILE, animFrame, colors) {
    // STRONGER pulsing brightness (sine wave effect)
    const pulse = Math.sin(animFrame * 0.5) * 0.5 + 0.75; // Range: 0.25 to 1.25 (was 0.4 to 1.0)
    
    // Base ember bed
    ctx.fillStyle = colors.emberDark;
    ctx.fillRect(x + 4, y + 10, 8, 4);
    
    // Brighter ember clusters (MORE of them brighter)
    const emberPositions = [
        {x: 5, y: 11, bright: animFrame % 3 < 2},        // Bright 2/3 of the time
        {x: 7, y: 10, bright: (animFrame + 1) % 2 === 0}, // Bright 1/2 of the time
        {x: 9, y: 12, bright: animFrame % 3 < 2},        // Bright 2/3 of the time
        {x: 11, y: 11, bright: (animFrame + 2) % 3 < 2}  // Bright 2/3 of the time
    ];
    
    emberPositions.forEach(ember => {
        if (ember.bright) {
            ctx.fillStyle = colors.emberBright;
        } else {
            ctx.fillStyle = colors.emberMid;
        }
        ctx.fillRect(x + ember.x, y + ember.y, 2, 2);
        
        // Add extra bright spot on really bright embers
        if (ember.bright && animFrame % 2 === 0) {
            ctx.fillStyle = colors.fireYellow;
            ctx.fillRect(x + ember.x, y + ember.y, 1, 1);
        }
    });
}

/**
 * Draw animated flames (main visual element)
 */
function drawCampfireFlames(ctx, x, y, TILE, animFrame, colors) {
    // Three flame layers with BIGGER animation variations
    
    // FLAME LAYER 1 - Base/outer flames (red-orange) - MORE HEIGHT VARIATION
    drawFlameLayer(ctx, x, y, animFrame, colors, {
        height: [10, 12, 10, 14, 12, 10, 13, 16, 13, 10, 12, 11],  // Increased from 8-10 to 10-16
        width: [10, 11, 10, 12, 11, 10, 11, 12, 11, 12, 10, 11],   // Increased from 8-10 to 10-12
        color: colors.fireRed,
        yOffset: 2
    });
    
    // FLAME LAYER 2 - Mid flames (orange)
    drawFlameLayer(ctx, x, y, animFrame, colors, {
        height: [8, 10, 8, 12, 10, 8, 11, 14, 11, 8, 10, 9],    // Increased from 6-8 to 8-14
        width: [8, 9, 8, 10, 9, 8, 9, 10, 9, 10, 8, 9],         // Increased from 6-8 to 8-10
        color: colors.fireOrange,
        yOffset: 4
    });
    
    // FLAME LAYER 3 - Center flames (yellow)
    drawFlameLayer(ctx, x, y, animFrame, colors, {
        height: [6, 8, 6, 10, 8, 6, 9, 12, 9, 6, 8, 7],         // Increased from 4-6 to 6-12
        width: [6, 7, 6, 8, 7, 6, 7, 8, 7, 8, 6, 7],            // Increased from 4-6 to 6-8
        color: colors.fireYellow,
        yOffset: 6
    });
    
    // FLAME CORE - Hottest center (white) - MORE VARIATION
    const coreHeight = [3, 4, 3, 6, 4, 3, 5, 7, 5, 3, 4, 3][animFrame];  // Increased from 2-4 to 3-7
    const coreY = y + 10 - coreHeight - 6;
    ctx.fillStyle = colors.fireWhite;
    ctx.fillRect(x + 6, coreY, 4, coreHeight);
}

/**
 * Helper: Draw a single flame layer with animation
 */
function drawFlameLayer(ctx, x, y, animFrame, colors, config) {
    const height = config.height[animFrame];
    const width = config.width[animFrame];
    const flameY = y + 10 - height - config.yOffset;
    const flameX = x + (16 - width) / 2;
    
    ctx.fillStyle = config.color;
    
    // Draw flame body (pixelated teardrop shape)
    // Bottom (widest)
    ctx.fillRect(flameX, flameY + height - 2, width, 2);
    // Middle
    const midWidth = Math.max(2, width - 2);
    ctx.fillRect(flameX + 1, flameY + 2, midWidth, height - 4);
    // Top (pointed)
    const topWidth = Math.max(2, width - 4);
    ctx.fillRect(flameX + 2, flameY, topWidth, 2);
}

/**
 * Draw rising smoke
 */
function drawCampfireSmoke(ctx, x, y, TILE, animFrame, colors) {
    // Smoke rises and fades
    const smokeOffset = (animFrame % 12) * 2; // Rises 2 pixels per frame
    
    // Smoke puff 1
    if (animFrame < 8) {
        const opacity = 0.4 - (animFrame / 12) * 0.3;
        ctx.fillStyle = `rgba(66, 66, 66, ${opacity})`;
        ctx.fillRect(x + 5 + (animFrame % 3), y - smokeOffset, 3, 3);
    }
    
    // Smoke puff 2 (offset timing)
    if (animFrame > 4) {
        const opacity = 0.3 - ((animFrame - 4) / 12) * 0.3;
        ctx.fillStyle = `rgba(120, 120, 120, ${opacity})`;
        ctx.fillRect(x + 8 - (animFrame % 2), y - smokeOffset + 8, 4, 4);
    }
}

/**
 * Draw glowing light on ground (pulsing effect)
 */
function drawCampfireGlow(ctx, x, y, TILE, animFrame, colors) {
    // STRONGER pulsing (more noticeable)
    const glowIntensity = 0.2 + Math.sin(animFrame * 0.3) * 0.1; // Range: 0.1 to 0.3 (was 0.1 to 0.2)
    
    // Orange glow on ground
    ctx.fillStyle = `rgba(255, 152, 0, ${glowIntensity})`;
    // Circular-ish glow pattern
    ctx.fillRect(x - 4, y + 12, 24, 4); // Wide glow
    ctx.fillRect(x - 2, y + 10, 20, 2); // Mid glow
    ctx.fillRect(x, y + 8, 16, 2);      // Close glow
}

/**
 * Get collision for campfire (walkable = false for fire safety!)
 * @param {number} tileX - Campfire's grid X position
 * @param {number} tileY - Campfire's grid Y position
 * @returns {Object} Collision data {x, y, walkable}
 */
function getCampfireCollision(tileX, tileY) {
    return {
        x: tileX,
        y: tileY,
        walkable: false
    };
}

// Export for use in rendering pipeline
// (In ES5 modular style - functions are globally available)
