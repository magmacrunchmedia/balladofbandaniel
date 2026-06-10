// Water animation frame counter (global)
let waterAnimFrame = 0;
let waterAnimCounter = 0;
let campfireAnimFrame = 0;
let campfireAnimCounter = 0;

// Helper function to check if a tile coordinate is water
function isWaterTile(tileX, tileY) {
    if (tileX < 0 || tileX >= MAP_WIDTH || tileY < 0 || tileY >= MAP_HEIGHT) {
        return false;
    }
    return map[tileY][tileX] === TILES.WATER;
}

// ========== SIMPLE TILE RENDERERS ==========

/** Black void for tent/bus interior backgrounds */
function drawVoidTile(ctx, x, y) {
    ctx.fillStyle = '#000000';
    ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE);
}

/** Flower tile - grass background with pink flower on top */
function drawFlowerTile(ctx, x, y, tileX, tileY) {
    drawGrassTile(ctx, x, y, tileX, tileY);
    // Yellow center
    ctx.fillStyle = '#ffeb3b';
    ctx.beginPath();
    ctx.arc(x + TILE_SIZE/2, y + TILE_SIZE/2, 3, 0, Math.PI*2);
    ctx.fill();
    // Pink petals
    ctx.fillStyle = '#f06292';
    for (let i = 0; i < 5; i++) {
        const angle = (i * Math.PI * 2) / 5;
        ctx.beginPath();
        ctx.arc(x + TILE_SIZE/2 + Math.cos(angle)*6, y + TILE_SIZE/2 + Math.sin(angle)*6, 4, 0, Math.PI*2);
        ctx.fill();
    }
}

/** Door tile */
function drawDoorTile(ctx, x, y) {
    ctx.fillStyle = '#8b4513';
    ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE);
    ctx.fillStyle = '#654321';
    ctx.fillRect(x + 4, y + 4, TILE_SIZE - 8, TILE_SIZE - 8);
}

/** Stairs tile */
function drawStairsTile(ctx, x, y) {
    ctx.fillStyle = '#5a5a5a';
    ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE);
    ctx.fillStyle = '#3a3a3a';
    for (let i = 0; i < TILE_SIZE; i += 4) {
        ctx.fillRect(x, y + i, TILE_SIZE, 2);
    }
}

/** Floor tile (for interiors) */
function drawFloorTile(ctx, x, y) {
    ctx.fillStyle = '#5a5a5a';
    ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE);
}

// ========== COMPLEX TILE RENDERERS ==========

/** Wall tile - dispatches to map-specific rendering */
function drawWallTile(ctx, x, y, tileX, tileY) {
    if (currentMap === 'outside') {
        drawCampsiteFence(ctx, x, y, tileX, tileY);
    } else if (currentMap === 'bussyInterior') {
        drawBusInteriorWall(ctx, x, y, tileX, tileY);
    } else if (currentMap.startsWith('tentInterior')) {
        const tentConfig = TENT_CONFIGS.getByInteriorMap(currentMap);
        if (tentConfig && tentConfig.theme) {
            ctx.fillStyle = tentConfig.theme.wallColor;
            ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE);
            ctx.fillStyle = tentConfig.theme.shadowColor;
            ctx.fillRect(x, y, TILE_SIZE, 2);
            ctx.fillRect(x, y, 2, TILE_SIZE);
        } else {
            ctx.fillStyle = TILE_COLORS[TILES.WALL];
            ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE);
        }
    } else {
        ctx.fillStyle = TILE_COLORS[TILES.WALL];
        ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE);
    }
}

/** Carpet tile - dispatches to map-specific rendering */
function drawCarpetTile(ctx, x, y, tileX, tileY) {
    if (currentMap === 'bussyInterior') {
        drawRedShagCarpet(ctx, x, y, tileX, tileY);
    } else {
        ctx.fillStyle = TILE_COLORS[TILES.CARPET];
        ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE);
    }
}

/** Tent door tile (tile 12) - zipper entrance for tent interiors */
function drawTentDoorTile(ctx, x, y, tileX, tileY) {
    if (!currentMap.startsWith('tentInterior')) {
        ctx.fillStyle = '#5a5a5a';
        ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE);
        return;
    }
    const tentConfig = TENT_CONFIGS.getByInteriorMap(currentMap);
    if (!tentConfig || !tentConfig.theme) return;
    
    const relX = tileX - tentConfig.interior.x;
    const isLeftDoor = (relX === 5);
    const isRightDoor = (relX === 6);
    
    if (isLeftDoor) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
        ctx.fillRect(x + TILE_SIZE/2, y, TILE_SIZE/2, TILE_SIZE);
        ctx.fillStyle = tentConfig.theme.shadowColor;
        ctx.fillRect(x, y, 2, TILE_SIZE);
        ctx.fillStyle = '#fdd835';
        for (let i = 0; i < 4; i++) {
            ctx.fillRect(x + TILE_SIZE - 2, y + 2 + i * 4, 2, 2);
        }
    } else if (isRightDoor) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
        ctx.fillRect(x, y, TILE_SIZE/2, TILE_SIZE);
        ctx.fillStyle = '#fdd835';
        for (let i = 0; i < 4; i++) {
            ctx.fillRect(x, y + 2 + i * 4, 2, 2);
        }
    }
}

/**
 * Draw textured grass tile with varied blades
 */
function drawGrassTile(ctx, x, y, tileX, tileY) {
    const TILE = 16;
    
    // Base grass color
    ctx.fillStyle = '#7cb342';
    ctx.fillRect(x, y, TILE, TILE);
    
    // Use tile position as seed for consistent but varied grass
    const seed = (tileX * 7 + tileY * 13) % 100;
    
    // Grass blade colors
    const bladeColors = [
        '#6da32c',  // Darker green
        '#8bc34a',  // Lighter green
        '#7cb342'   // Medium green
    ];
    
    // Draw grass blades - 6-8 blades per tile
    const numBlades = 6 + (seed % 3);
    
    for (let i = 0; i < numBlades; i++) {
        // Pseudo-random position based on seed and blade index
        const bladeX = x + ((seed * 3 + i * 17) % TILE);
        const bladeY = y + ((seed * 5 + i * 23) % TILE);
        
        // Blade height (3-5 pixels)
        const height = 3 + ((seed + i * 7) % 3);
        
        // Pick color based on seed
        const colorIdx = (seed + i) % bladeColors.length;
        ctx.fillStyle = bladeColors[colorIdx];
        
        // Draw thin grass blade
        ctx.fillRect(bladeX, bladeY, 1, height);
        
        // Some blades get a second pixel for width variation
        if ((seed + i) % 3 === 0) {
            ctx.fillRect(bladeX + 1, bladeY + 1, 1, height - 1);
        }
    }
    
    // Add some darker spots for depth (3-4 per tile)
    ctx.fillStyle = 'rgba(109, 163, 44, 0.3)';
    const numSpots = 3 + (seed % 2);
    for (let i = 0; i < numSpots; i++) {
        const spotX = x + ((seed * 11 + i * 19) % (TILE - 2));
        const spotY = y + ((seed * 13 + i * 29) % (TILE - 2));
        ctx.fillRect(spotX, spotY, 2, 2);
    }
}

/**
 * Draw Florida native shrub (walkable decoration)
 * Randomly picks from: Saw Palmetto, Beautyberry, or American Holly
 * @param {CanvasRenderingContext2D} ctx - Canvas context
 * @param {number} x - Screen X position
 * @param {number} y - Screen Y position
 * @param {number} tileX - Grid X position (for variation seed)
 * @param {number} tileY - Grid Y position (for variation seed)
 */
function drawShrubTile(ctx, x, y, tileX, tileY) {
    const TILE = 16;
    
    // First draw grass background
    drawGrassTile(ctx, x, y, tileX, tileY);
    
    // Use tile position to determine shrub type (consistent per tile)
    const seed = (tileX * 7 + tileY * 13) % 3;
    
    if (seed === 0) {
        // Saw Palmetto - fan-shaped palm fronds
        drawSawPalmetto(ctx, x, y, tileX, tileY);
    } else if (seed === 1) {
        // Beautyberry - purple berries on branches
        drawBeautyberry(ctx, x, y, tileX, tileY);
    } else {
        // American Holly - evergreen with red berries
        drawAmericanHolly(ctx, x, y, tileX, tileY);
    }
}

/**
 * Draw Saw Palmetto shrub
 */
function drawSawPalmetto(ctx, x, y, tileX, tileY) {
    const TILE = 16;
    const centerX = x + TILE / 2;
    const centerY = y + TILE / 2;
    const seed = (tileX * 11 + tileY * 17) % 100;
    
    // Palm frond colors
    const frondGreen = '#4a6741';
    const frondLight = '#5c7a52';
    
    // Draw 4-6 fan-shaped fronds radiating from center
    const numFronds = 4 + (seed % 3);
    
    for (let i = 0; i < numFronds; i++) {
        const angle = (i / numFronds) * Math.PI * 2 + (seed * 0.1);
        const length = 5 + (seed + i * 7) % 3;
        
        // Draw frond as a wedge
        ctx.fillStyle = i % 2 === 0 ? frondGreen : frondLight;
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(
            centerX + Math.cos(angle - 0.3) * length,
            centerY + Math.sin(angle - 0.3) * length
        );
        ctx.lineTo(
            centerX + Math.cos(angle + 0.3) * length,
            centerY + Math.sin(angle + 0.3) * length
        );
        ctx.closePath();
        ctx.fill();
    }
    
    // Dark center
    ctx.fillStyle = '#3a4a35';
    ctx.fillRect(centerX - 1, centerY - 1, 2, 2);
}

/**
 * Draw Beautyberry shrub
 */
function drawBeautyberry(ctx, x, y, tileX, tileY) {
    const TILE = 16;
    const seed = (tileX * 13 + tileY * 19) % 100;
    
    // Leaf green
    const leafGreen = '#4a7c4e';
    const leafDark = '#3a5c3e';
    
    // Draw small leafy bush (irregular blob shape)
    ctx.fillStyle = leafDark;
    ctx.fillRect(x + 5, y + 4, 6, 8);
    ctx.fillStyle = leafGreen;
    ctx.fillRect(x + 4, y + 5, 8, 6);
    ctx.fillRect(x + 6, y + 3, 4, 4);
    
    // Add highlights
    ctx.fillStyle = '#5a8c5e';
    ctx.fillRect(x + 5, y + 5, 2, 3);
    ctx.fillRect(x + 9, y + 7, 2, 2);
    
    // Purple berries clustered on branches
    ctx.fillStyle = '#7b4b94';  // Purple berries
    const numBerries = 4 + (seed % 3);
    
    for (let i = 0; i < numBerries; i++) {
        const berryX = x + 6 + ((seed * 3 + i * 7) % 5);
        const berryY = y + 6 + ((seed * 5 + i * 11) % 5);
        ctx.fillRect(berryX, berryY, 1, 1);
    }
    
    // Lighter berry highlights
    ctx.fillStyle = '#9b6bb4';
    ctx.fillRect(x + 7, y + 7, 1, 1);
    ctx.fillRect(x + 9, y + 9, 1, 1);
}

/**
 * Draw American Holly shrub
 */
function drawAmericanHolly(ctx, x, y, tileX, tileY) {
    const TILE = 16;
    const seed = (tileX * 17 + tileY * 23) % 100;
    
    // Evergreen colors
    const hollyGreen = '#2d5a2d';
    const hollyLight = '#3d6a3d';
    
    // Draw dense evergreen foliage (rounded/spiky shape)
    ctx.fillStyle = hollyGreen;
    
    // Main body - irregular shape
    ctx.fillRect(x + 5, y + 5, 6, 7);
    ctx.fillRect(x + 4, y + 6, 8, 5);
    
    // Spiky edges (holly characteristic)
    ctx.fillRect(x + 3, y + 7, 1, 2);
    ctx.fillRect(x + 12, y + 8, 1, 2);
    ctx.fillRect(x + 7, y + 3, 2, 1);
    
    // Lighter green highlights
    ctx.fillStyle = hollyLight;
    ctx.fillRect(x + 6, y + 6, 3, 4);
    ctx.fillRect(x + 8, y + 8, 2, 2);
    
    // Red berries
    ctx.fillStyle = '#c62828';
    const numBerries = 3 + (seed % 3);
    
    for (let i = 0; i < numBerries; i++) {
        const berryX = x + 6 + ((seed * 5 + i * 9) % 4);
        const berryY = y + 6 + ((seed * 7 + i * 13) % 4);
        ctx.fillRect(berryX, berryY, 1, 1);
        
        // Berry highlight
        if (i % 2 === 0) {
            ctx.fillStyle = '#e53935';
            ctx.fillRect(berryX, berryY, 1, 1);
            ctx.fillStyle = '#c62828';
        }
    }
}

// Draw animated water tile with automatic shore edges
function drawWaterTile(x, y, tileX, tileY, animFrame) {
    const tileSize = TILE_SIZE;
    
    // Base water color (darker blue)
    ctx.fillStyle = '#1565c0';
    ctx.fillRect(x, y, tileSize, tileSize);
    
    // Mid-tone water layer
    ctx.fillStyle = '#1e88e5';
    ctx.fillRect(x, y, tileSize, tileSize);
    
    // Wave pattern - changes based on animation frame
    const waveOffset = animFrame * 2;
    
    // Darker wave stripes
    ctx.fillStyle = 'rgba(21, 101, 192, 0.6)';
    for (let i = 0; i < 3; i++) {
        const waveY = y + 8 + (i * 12) + (waveOffset % 8);
        ctx.fillRect(x, waveY, tileSize, tileSize);
    }
    
    // Lighter highlights
    ctx.fillStyle = 'rgba(100, 181, 246, 0.5)';
    const highlightOffset = (animFrame * 3) % tileSize;
    ctx.fillRect(x + highlightOffset, y + 5, 8, 2);
    ctx.fillRect(x + ((highlightOffset + 15) % tileSize), y + 18, 6, 2);
    ctx.fillRect(x + ((highlightOffset + 25) % tileSize), y + 30, 10, 2);
    
    // Sparkle effect
    if (animFrame === 0 || animFrame === 2) {
        ctx.fillStyle = 'rgba(187, 222, 251, 0.7)';
        ctx.fillRect(x + 10, y + 8, 3, 1);
        ctx.fillRect(x + 28, y + 24, 3, 1);
    }
    
    // Shore edge detection
    const hasGrassNorth = !isWaterTile(tileX, tileY - 1);
    const hasGrassSouth = !isWaterTile(tileX, tileY + 1);
    const hasGrassWest = !isWaterTile(tileX - 1, tileY);
    const hasGrassEast = !isWaterTile(tileX + 1, tileY);
    
    // Shore colors
    const shoreLight = '#c5e1a5';
    const shoreDark = '#9ccc65';
    
    // Draw shore edges
    if (hasGrassNorth) {
        ctx.fillStyle = shoreLight;
        ctx.fillRect(x, y, tileSize, 3);
        ctx.fillStyle = shoreDark;
        ctx.fillRect(x, y + 3, tileSize, 3);
        ctx.fillStyle = 'rgba(30, 136, 229, 0.3)';
        ctx.fillRect(x, y + 6, tileSize, 2);
    }
    
    if (hasGrassSouth) {
        ctx.fillStyle = shoreDark;
        ctx.fillRect(x, y + tileSize - 6, tileSize, 3);
        ctx.fillStyle = shoreLight;
        ctx.fillRect(x, y + tileSize - 3, tileSize, 3);
        ctx.fillStyle = 'rgba(30, 136, 229, 0.3)';
        ctx.fillRect(x, y + tileSize - 8, tileSize, 2);
    }
    
    if (hasGrassWest) {
        ctx.fillStyle = shoreLight;
        ctx.fillRect(x, y, 3, tileSize);
        ctx.fillStyle = shoreDark;
        ctx.fillRect(x + 3, y, 3, tileSize);
        ctx.fillStyle = 'rgba(30, 136, 229, 0.3)';
        ctx.fillRect(x + 6, y, 2, tileSize);
    }
    
    if (hasGrassEast) {
        ctx.fillStyle = shoreDark;
        ctx.fillRect(x + tileSize - 6, y, 3, tileSize);
        ctx.fillStyle = shoreLight;
        ctx.fillRect(x + tileSize - 3, y, 3, tileSize);
        ctx.fillStyle = 'rgba(30, 136, 229, 0.3)';
        ctx.fillRect(x + tileSize - 8, y, 2, tileSize);
    }
    
    // Corner smoothing
    if (hasGrassNorth && hasGrassWest) {
        ctx.fillStyle = shoreLight;
        ctx.fillRect(x, y, 4, 4);
    }
    if (hasGrassNorth && hasGrassEast) {
        ctx.fillStyle = shoreLight;
        ctx.fillRect(x + tileSize - 4, y, 4, 4);
    }
    if (hasGrassSouth && hasGrassWest) {
        ctx.fillStyle = shoreLight;
        ctx.fillRect(x, y + tileSize - 4, 4, 4);
    }
    if (hasGrassSouth && hasGrassEast) {
        ctx.fillStyle = shoreLight;
        ctx.fillRect(x + tileSize - 4, y + tileSize - 4, 4, 4);
    }
}

// Add this to your tiles.js file

// Draw rustic campsite fence (replaces WALL tiles)
function drawCampsiteFence(ctx, x, y, tileX, tileY) {
    // Weathered wood colors (SNES palette)
    const woodDark = '#5d4037';      // Dark brown (your current wall color)
    const woodMed = '#795548';       // Medium brown
    const woodLight = '#a1887f';     // Light brown/gray (weathered)
    const shadowColor = '#3e2723';   // Very dark for shadows
    
    // Determine fence orientation based on neighboring tiles
    const hasWallLeft = tileX > 0 && map[tileY] && map[tileY][tileX - 1] === TILES.WALL;
    const hasWallRight = tileX < MAP_WIDTH - 1 && map[tileY] && map[tileY][tileX + 1] === TILES.WALL;
    const hasWallUp = tileY > 0 && map[tileY - 1] && map[tileY - 1][tileX] === TILES.WALL;
    const hasWallDown = tileY < MAP_HEIGHT - 1 && map[tileY + 1] && map[tileY + 1][tileX] === TILES.WALL;
    
    const isHorizontal = hasWallLeft || hasWallRight;
    const isVertical = hasWallUp || hasWallDown;
    const isCorner = (hasWallLeft || hasWallRight) && (hasWallUp || hasWallDown);
    
    // Check if on bottom edge (posts should face upward into playable area)
    const isBottomEdge = tileY >= MAP_HEIGHT - 2;
    
    if (isCorner) {
        // Draw corner post (thicker)
        drawFencePost(ctx, x + 4, y + 2, 8, 12, woodDark, woodMed, woodLight, shadowColor);
    } else if (isHorizontal) {
        // Horizontal fence with post
        drawFencePost(ctx, x + 6, y + 2, 4, 12, woodDark, woodMed, woodLight, shadowColor);
        drawHorizontalRails(ctx, x, y, woodDark, woodMed, shadowColor, isBottomEdge);
    } else if (isVertical) {
        // Vertical fence with post
        drawFencePost(ctx, x + 4, y + 4, 8, 8, woodDark, woodMed, woodLight, shadowColor);
        drawVerticalRails(ctx, x, y, woodDark, woodMed, shadowColor);
    } else {
        // Single post (isolated tile)
        drawFencePost(ctx, x + 4, y + 2, 8, 12, woodDark, woodMed, woodLight, shadowColor);
    }
}

// Draw a wooden fence post with weathered texture
function drawFencePost(ctx, x, y, width, height, darkColor, medColor, lightColor, shadowColor) {
    // Main post body
    ctx.fillStyle = medColor;
    ctx.fillRect(x, y, width, height);
    
    // Left edge shadow
    ctx.fillStyle = shadowColor;
    ctx.fillRect(x, y, 1, height);
    
    // Right edge highlight
    ctx.fillStyle = lightColor;
    ctx.fillRect(x + width - 1, y, 1, height);
    
    // Wood grain texture (pixelated lines)
    ctx.fillStyle = darkColor;
    for (let i = 0; i < height; i += 3) {
        ctx.fillRect(x + 1, y + i, width - 2, 1);
    }
    
    // Weathered spots (lighter patches)
    ctx.fillStyle = lightColor;
    ctx.fillRect(x + 2, y + 2, 2, 1);
    ctx.fillRect(x + 1, y + height - 3, 2, 1);
}

// Draw horizontal fence rails
function drawHorizontalRails(ctx, x, y, darkColor, medColor, shadowColor, isBottomEdge) {
    if (isBottomEdge) {
        // Bottom edge: posts face INTO playable area (rails higher)
        // Top rail (higher position)
        ctx.fillStyle = medColor;
        ctx.fillRect(x, y + 1, 16, 2);
        ctx.fillStyle = shadowColor;
        ctx.fillRect(x, y + 1, 16, 1);
        
        // Bottom rail (higher position)
        ctx.fillStyle = medColor;
        ctx.fillRect(x, y + 6, 16, 2);
        ctx.fillStyle = shadowColor;
        ctx.fillRect(x, y + 6, 16, 1);
    } else {
        // Normal: standard rail position
        // Top rail
        ctx.fillStyle = medColor;
        ctx.fillRect(x, y + 3, 16, 3);
        ctx.fillStyle = shadowColor;
        ctx.fillRect(x, y + 3, 16, 1);
        
        // Bottom rail
        ctx.fillStyle = medColor;
        ctx.fillRect(x, y + 10, 16, 3);
        ctx.fillStyle = shadowColor;
        ctx.fillRect(x, y + 10, 16, 1);
    }
}

// Draw vertical fence rails
function drawVerticalRails(ctx, x, y, darkColor, medColor, shadowColor) {
    // Left rail
    ctx.fillStyle = medColor;
    ctx.fillRect(x + 3, y, 3, 16);
    ctx.fillStyle = shadowColor;
    ctx.fillRect(x + 3, y, 1, 16); // Left shadow
    
    // Right rail
    ctx.fillStyle = medColor;
    ctx.fillRect(x + 10, y, 3, 16);
    ctx.fillStyle = shadowColor;
    ctx.fillRect(x + 10, y, 1, 16); // Left shadow
}

/**
 * Draw red shag carpet tile (for da Bussy interior aisle)
 * Psychedelic 70's style with deep pile texture
 * @param {CanvasRenderingContext2D} ctx - Canvas context
 * @param {number} x - Screen X position
 * @param {number} y - Screen Y position
 * @param {number} tileX - Grid X position (for variation seed)
 * @param {number} tileY - Grid Y position (for variation seed)
 */
function drawRedShagCarpet(ctx, x, y, tileX, tileY) {
    const TILE = 16;
    
    // Red shag carpet color palette (SNES-style)
    const carpetBase = '#b71c1c';      // Deep red base
    const carpetDark = '#7f0000';      // Very dark red (shadows)
    const carpetMid = '#d32f2f';       // Medium red
    const carpetLight = '#e57373';     // Light red (highlights)
    const carpetBright = '#ef5350';    // Bright red (shag tips)
    
    // Use tile position as seed for consistent but varied texture
    const seed = (tileX * 11 + tileY * 17) % 100;
    
    // Base carpet color
    ctx.fillStyle = carpetBase;
    ctx.fillRect(x, y, TILE, TILE);
    
    // Add mid-tone layer with irregular pattern
    ctx.fillStyle = carpetMid;
    ctx.fillRect(x + 2, y + 1, TILE - 4, TILE - 2);
    ctx.fillRect(x + 1, y + 3, TILE - 2, TILE - 6);
    
    // Shag pile texture - create deep, fuzzy appearance
    // Dark shadows (deep pile valleys)
    ctx.fillStyle = carpetDark;
    const numDarkFibers = 8 + (seed % 4);
    for (let i = 0; i < numDarkFibers; i++) {
        const fiberX = x + ((seed * 7 + i * 13) % TILE);
        const fiberY = y + ((seed * 11 + i * 19) % TILE);
        const fiberLen = 2 + ((seed + i) % 3);
        
        // Vertical fiber strands
        ctx.fillRect(fiberX, fiberY, 1, fiberLen);
        
        // Some horizontal variation for shag texture
        if ((seed + i) % 3 === 0) {
            ctx.fillRect(fiberX - 1, fiberY + 1, 2, 1);
        }
    }
    
    // Medium pile (main texture)
    ctx.fillStyle = carpetMid;
    const numMidFibers = 10 + (seed % 5);
    for (let i = 0; i < numMidFibers; i++) {
        const fiberX = x + ((seed * 5 + i * 17) % TILE);
        const fiberY = y + ((seed * 13 + i * 23) % TILE);
        const fiberLen = 1 + ((seed + i * 3) % 2);
        
        ctx.fillRect(fiberX, fiberY, 1, fiberLen);
        
        // Clumping effect (shag clumps together)
        if ((seed + i) % 2 === 0) {
            ctx.fillRect(fiberX + 1, fiberY, 1, fiberLen);
        }
    }
    
    // Light highlights (shag tips catching light)
    ctx.fillStyle = carpetLight;
    const numLightFibers = 6 + (seed % 3);
    for (let i = 0; i < numLightFibers; i++) {
        const fiberX = x + ((seed * 3 + i * 29) % TILE);
        const fiberY = y + ((seed * 7 + i * 31) % TILE);
        
        ctx.fillRect(fiberX, fiberY, 1, 1);
        
        // Occasional longer highlight strand
        if ((seed + i) % 4 === 0) {
            ctx.fillRect(fiberX, fiberY + 1, 1, 1);
        }
    }
    
    // Bright sparkle highlights (psychedelic sheen)
    ctx.fillStyle = carpetBright;
    const numBrightSpots = 3 + (seed % 2);
    for (let i = 0; i < numBrightSpots; i++) {
        const spotX = x + ((seed * 13 + i * 37) % (TILE - 1));
        const spotY = y + ((seed * 17 + i * 41) % (TILE - 1));
        
        ctx.fillRect(spotX, spotY, 1, 1);
    }
    
    // Add diagonal striation for "crushed pile" effect
    // (where people have walked on the carpet)
    ctx.fillStyle = 'rgba(127, 0, 0, 0.3)';
    const striationOffset = (seed % 4);
    for (let i = 0; i < TILE; i += 2) {
        const striationX = x + i;
        const striationY = y + ((i + striationOffset) % TILE);
        ctx.fillRect(striationX, striationY, 1, 1);
    }
    
    // Occasional deep pile clumps (darker spots)
    ctx.fillStyle = carpetDark;
    if (seed % 5 === 0) {
        const clumpX = x + ((seed * 19) % (TILE - 3));
        const clumpY = y + ((seed * 23) % (TILE - 3));
        ctx.fillRect(clumpX, clumpY, 2, 2);
        ctx.fillRect(clumpX + 1, clumpY + 1, 1, 1);
    }
    
    // Edge darkening for depth
    ctx.fillStyle = 'rgba(127, 0, 0, 0.2)';
    ctx.fillRect(x, y, TILE, 1);           // Top edge
    ctx.fillRect(x, y, 1, TILE);           // Left edge
    ctx.fillRect(x, y + TILE - 1, TILE, 1); // Bottom edge
    ctx.fillRect(x + TILE - 1, y, 1, TILE); // Right edge
}

/**
 * Draw textured bus floor tile (for da Bussy interior)
 * School bus yellow with worn linoleum texture
 * @param {CanvasRenderingContext2D} ctx - Canvas context
 * @param {number} x - Screen X position
 * @param {number} y - Screen Y position
 * @param {number} tileX - Grid X position (for variation seed)
 * @param {number} tileY - Grid Y position (for variation seed)
 */
function drawBusFloor(ctx, x, y, tileX, tileY) {
    const TILE = 16;
    
    // School bus floor color palette (worn linoleum)
    const floorBase = '#f9a825';      // Bright school bus yellow
    const floorDark = '#f57f17';      // Dark yellow-orange
    const floorMid = '#ffb74d';       // Medium yellow
    const floorLight = '#ffc947';     // Light yellow
    const scuffDark = '#8d6e63';      // Brown scuff marks
    const scuffLight = '#a1887f';     // Light brown
    
    // Use tile position as seed for consistent variation
    const seed = (tileX * 11 + tileY * 17) % 100;
    
    // Base floor color
    ctx.fillStyle = floorBase;
    ctx.fillRect(x, y, TILE, TILE);
    
    // Add subtle color variation (worn areas)
    ctx.fillStyle = floorMid;
    const numPatches = 2 + (seed % 3);
    for (let i = 0; i < numPatches; i++) {
        const patchX = x + ((seed * 7 + i * 13) % (TILE - 4));
        const patchY = y + ((seed * 11 + i * 19) % (TILE - 4));
        const patchSize = 3 + ((seed + i * 5) % 4);
        ctx.fillRect(patchX, patchY, patchSize, patchSize);
    }
    
    // Darker wear patterns (high traffic areas)
    ctx.fillStyle = floorDark;
    if (seed % 3 === 0) {
        const wearX = x + ((seed * 5) % (TILE - 6));
        const wearY = y + ((seed * 7) % (TILE - 2));
        ctx.fillRect(wearX, wearY, 6, 2);
    }
    
    // Light highlights (shiny spots on linoleum)
    ctx.fillStyle = floorLight;
    const numHighlights = 3 + (seed % 3);
    for (let i = 0; i < numHighlights; i++) {
        const hlX = x + ((seed * 3 + i * 17) % (TILE - 1));
        const hlY = y + ((seed * 13 + i * 23) % (TILE - 1));
        ctx.fillRect(hlX, hlY, 1, 1);
        
        // Some highlights are 2 pixels for variety
        if ((seed + i) % 3 === 0) {
            ctx.fillRect(hlX + 1, hlY, 1, 1);
        }
    }
    
    // Scuff marks (dark brown wear from shoes)
    ctx.fillStyle = scuffDark;
    const numScuffs = 1 + (seed % 3);
    for (let i = 0; i < numScuffs; i++) {
        const scuffX = x + ((seed * 19 + i * 29) % (TILE - 4));
        const scuffY = y + ((seed * 23 + i * 31) % (TILE - 2));
        
        // Diagonal scuff mark
        ctx.fillRect(scuffX, scuffY, 3, 1);
        ctx.fillRect(scuffX + 1, scuffY + 1, 2, 1);
    }
    
    // Light scuffs (aged wear)
    ctx.fillStyle = scuffLight;
    if (seed % 5 === 0) {
        const lightScuffX = x + ((seed * 17) % (TILE - 3));
        const lightScuffY = y + ((seed * 13) % (TILE - 2));
        ctx.fillRect(lightScuffX, lightScuffY, 4, 1);
    }
    
    // Subtle texture noise for linoleum grain
    ctx.fillStyle = 'rgba(255, 183, 77, 0.3)';
    const numGrains = 8 + (seed % 6);
    for (let i = 0; i < numGrains; i++) {
        const grainX = x + ((seed * 2 + i * 7) % TILE);
        const grainY = y + ((seed * 4 + i * 11) % TILE);
        ctx.fillRect(grainX, grainY, 1, 1);
    }
    
    // Very subtle darkening on edges for depth (no harsh lines!)
    ctx.fillStyle = 'rgba(245, 127, 23, 0.05)';
    ctx.fillRect(x, y, TILE, 1);           // Top - very subtle
    ctx.fillRect(x, y, 1, TILE);           // Left - very subtle
}

/**
 * Draw tent exit door
 * Simple fabric tent flap door - each tile draws its half
 * Left and right tiles mirror each other to form complete door
 * @param {CanvasRenderingContext2D} ctx - Canvas context
 * @param {number} x - Screen X position
 * @param {number} y - Screen Y position
 * @param {number} tileX - Grid X position
 * @param {number} tileY - Grid Y position
 */
function drawTentDoor(ctx, x, y, tileX, tileY) {
    const TILE = 16;
    
    // Check if there's a door tile to the right (this is the left door)
    const isLeftDoor = (tileX + 1 < MAP_WIDTH && map[tileY] && map[tileY][tileX + 1] === 12);
    // Check if there's a door tile to the left (this is the right door)
    const isRightDoor = (tileX - 1 >= 0 && map[tileY] && map[tileY][tileX - 1] === 12);
    
    // Grey tent floor background (same as TENT_FLOOR)
    ctx.fillStyle = '#5a5a5a';
    ctx.fillRect(x, y, TILE, TILE);
    
    if (isLeftDoor) {
        // LEFT HALF of the door
        
        // Left tent fabric
        ctx.fillStyle = '#3a3a3a';
        ctx.fillRect(x, y, 12, TILE);
        
        // Left side of opening slit (near center)
        ctx.fillStyle = '#1a1a1a';  // Very dark (opening to outside)
        ctx.fillRect(x + 12, y + 2, 4, TILE - 4);
        
        // Fabric folds on left
        ctx.fillStyle = '#2a2a2a';
        ctx.fillRect(x + 4, y, 1, TILE);
        ctx.fillRect(x + 8, y, 1, TILE);
        
    } else if (isRightDoor) {
        // RIGHT HALF of the door (mirror of left)
        
        // Right side of opening slit (near center)
        ctx.fillStyle = '#1a1a1a';  // Very dark (opening to outside)
        ctx.fillRect(x, y + 2, 4, TILE - 4);
        
        // Right tent fabric
        ctx.fillStyle = '#3a3a3a';
        ctx.fillRect(x + 4, y, 12, TILE);
        
        // Fabric folds on right (mirrored)
        ctx.fillStyle = '#2a2a2a';
        ctx.fillRect(x + 7, y, 1, TILE);
        ctx.fillRect(x + 11, y, 1, TILE);
        
    } else {
        // Single door tile (no neighbor) - draw simple centered door
        ctx.fillStyle = '#3a3a3a';
        ctx.fillRect(x + 3, y, 10, TILE);
        
        ctx.fillStyle = '#1a1a1a';
        ctx.fillRect(x + 7, y + 2, 2, TILE - 4);
        
        ctx.fillStyle = '#2a2a2a';
        ctx.fillRect(x + 5, y, 1, TILE);
        ctx.fillRect(x + 10, y, 1, TILE);
    }
}

/**
 * Draw interior bus door (for da Bussy exit)
 * Simple school bus door - each tile draws its half
 * Left and right tiles mirror each other to form complete door
 * @param {CanvasRenderingContext2D} ctx - Canvas context
 * @param {number} x - Screen X position
 * @param {number} y - Screen Y position
 * @param {number} tileX - Grid X position (for variation)
 * @param {number} tileY - Grid Y position (for variation)
 */
function drawBusDoor(ctx, x, y, tileX, tileY) {
    const TILE = 16;
    
    // Check if there's a door tile to the right (this is the left door)
    const isLeftDoor = (tileX + 1 < MAP_WIDTH && map[tileY] && map[tileY][tileX + 1] === 4);
    // Check if there's a door tile to the left (this is the right door)
    const isRightDoor = (tileX - 1 >= 0 && map[tileY] && map[tileY][tileX - 1] === 4);
    
    // Background (floor continues under door)
    drawBusFloor(ctx, x, y, tileX, tileY);
    
    if (isLeftDoor) {
        // LEFT HALF of the door
        
        // Gray frame
        ctx.fillStyle = '#616161';
        ctx.fillRect(x, y, TILE, TILE);
        
        // Yellow door panel (left side)
        ctx.fillStyle = '#f9a825';
        ctx.fillRect(x + 2, y + 2, TILE - 3, TILE - 4);
        
        // Window strip (left half)
        ctx.fillStyle = '#90caf9';
        ctx.fillRect(x + 3, y + 4, TILE - 4, 2);
        
        // Handle (left half)
        ctx.fillStyle = '#212121';
        ctx.fillRect(x + 3, y + 8, TILE - 4, 1);
        
        // Center divider line
        ctx.fillStyle = '#424242';
        ctx.fillRect(x + TILE - 1, y + 2, 1, TILE - 4);
        
    } else if (isRightDoor) {
        // RIGHT HALF of the door (mirror of left)
        
        // Gray frame
        ctx.fillStyle = '#616161';
        ctx.fillRect(x, y, TILE, TILE);
        
        // Center divider line
        ctx.fillStyle = '#424242';
        ctx.fillRect(x, y + 2, 1, TILE - 4);
        
        // Yellow door panel (right side)
        ctx.fillStyle = '#f9a825';
        ctx.fillRect(x + 1, y + 2, TILE - 3, TILE - 4);
        
        // Window strip (right half)
        ctx.fillStyle = '#90caf9';
        ctx.fillRect(x + 1, y + 4, TILE - 4, 2);
        
        // Handle (right half)
        ctx.fillStyle = '#212121';
        ctx.fillRect(x + 1, y + 8, TILE - 4, 1);
        
    } else {
        // Single door tile (no neighbor) - draw simple centered door
        ctx.fillStyle = '#616161';
        ctx.fillRect(x, y, TILE, TILE);
        
        ctx.fillStyle = '#f9a825';
        ctx.fillRect(x + 2, y + 2, TILE - 4, TILE - 4);
        
        ctx.fillStyle = '#90caf9';
        ctx.fillRect(x + 3, y + 4, TILE - 6, 2);
        
        ctx.fillStyle = '#212121';
        ctx.fillRect(x + 3, y + 8, TILE - 6, 1);
    }
}