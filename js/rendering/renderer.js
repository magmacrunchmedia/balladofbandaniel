// renderer.js - Main rendering coordination - with optimized SNES-style Florida forest

let drumAnimFrame = 0;

// PERFORMANCE: Cache the forest background on an off-screen canvas
let forestBackgroundCache = null;
let lastForestCameraX = -999;
let lastForestCameraY = -999;

// Helper function to draw SNES-style pixelated Florida forest background
function drawFloridaForestBackground() {
    // Always redraw on first call OR if camera moved significantly (every ~16 pixels)
    const cameraMoved = !forestBackgroundCache || 
                        Math.abs(camera.x - lastForestCameraX) > 16 || 
                        Math.abs(camera.y - lastForestCameraY) > 16;
    
    if (cameraMoved) {
        // Create cache canvas if needed
        if (!forestBackgroundCache) {
            forestBackgroundCache = document.createElement('canvas');
            forestBackgroundCache.width = canvas.width;
            forestBackgroundCache.height = canvas.height;
        }
        
        const fCtx = forestBackgroundCache.getContext('2d');
        
        // SNES-style dark forest green (limited palette)
        const darkGreen = '#1a3d1f';
        const medGreen = '#2d5a2f';
        const lightGreen = '#3a7a3f';
        const shrubDark = '#15301a';
        
        // Fill base
        fCtx.fillStyle = darkGreen;
        fCtx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Simple pseudo-random function for consistent patterns
        function pseudoRandom(x, y, seed) {
            const n = (x * 374761393 + y * 668265263 + seed * 1013904223);
            return (n ^ (n >> 13)) & 0xFFFF;
        }
        
        // Draw scattered shrubs in background (using actual shrub shapes!)
        for (let i = 0; i < 50; i++) {
            const baseX = ((i * 211 - camera.x * 0.2) % (canvas.width + 80)) - 40;
            const baseY = ((i * 157 - camera.y * 0.2) % (canvas.height + 60)) - 30;
            const x = Math.floor(baseX / 4) * 4;
            const y = Math.floor(baseY / 4) * 4;
            
            // Draw shrub-like shape (similar to drawShrubTile but simpler)
            fCtx.fillStyle = shrubDark;
            
            // Bushy rounded cluster
            fCtx.fillRect(x + 4, y, 16, 4);      // Top
            fCtx.fillRect(x, y + 4, 24, 4);      // Upper middle
            fCtx.fillRect(x, y + 8, 24, 8);      // Middle (thickest)
            fCtx.fillRect(x + 4, y + 16, 16, 4); // Bottom
            
            // Add some lighter highlights on shrubs
            const rand = pseudoRandom(Math.floor(x / 4), Math.floor(y / 4), 10);
            if (rand % 3 === 0) {
                fCtx.fillStyle = medGreen;
                fCtx.fillRect(x + 8, y + 4, 8, 8);
            }
        }
        
        // Add ground texture with larger, more organic patches
        fCtx.fillStyle = medGreen;
        for (let i = 0; i < 40; i++) {
            const baseX = ((i * 127 + camera.x * 0.15) % canvas.width);
            const baseY = ((i * 97 + camera.y * 0.15) % canvas.height);
            const x = Math.floor(baseX / 8) * 8;
            const y = Math.floor(baseY / 8) * 8;
            
            // Draw larger irregular patches
            const size = 16 + (pseudoRandom(i, 0, 4) % 3) * 8;
            fCtx.fillRect(x, y, size, size);
        }
        
        // Add lighter accent patches
        fCtx.fillStyle = lightGreen;
        for (let i = 0; i < 25; i++) {
            const baseX = ((i * 173 + camera.x * 0.1) % canvas.width);
            const baseY = ((i * 139 + camera.y * 0.1) % canvas.height);
            const x = Math.floor(baseX / 8) * 8;
            const y = Math.floor(baseY / 8) * 8;
            
            fCtx.fillRect(x, y, 16, 16);
        }
        
        // Add dense undergrowth/shrubs
        fCtx.fillStyle = shrubDark;
        for (let i = 0; i < 45; i++) {
            const baseX = ((i * 89 + camera.x * 0.2) % canvas.width);
            const baseY = ((i * 67 + camera.y * 0.2) % canvas.height);
            const x = Math.floor(baseX / 8) * 8;
            const y = Math.floor(baseY / 8) * 8;
            
            // Draw bushy cluster
            fCtx.fillRect(x, y, 16, 8);
            fCtx.fillRect(x - 8, y + 8, 24, 8);
            fCtx.fillRect(x, y + 16, 16, 8);
        }
        
        // Add palmetto/fern shapes
        fCtx.fillStyle = '#2a4a2e';
        for (let i = 0; i < 30; i++) {
            const baseX = ((i * 113 + camera.x * 0.25) % canvas.width);
            const baseY = ((i * 151 + camera.y * 0.25) % canvas.height);
            const x = Math.floor(baseX / 4) * 4;
            const y = Math.floor(baseY / 4) * 4;
            
            // Draw fan-shaped fronds
            fCtx.fillRect(x + 8, y + 12, 4, 8);
            fCtx.fillRect(x, y + 4, 20, 4);
            fCtx.fillRect(x + 4, y + 8, 12, 4);
            fCtx.fillRect(x, y + 12, 20, 4);
        }
        
        // SNES-style pixelated tree silhouettes
        fCtx.fillStyle = '#0f1f0f';
        for (let i = 0; i < 8; i++) {
            const baseX = ((i * 211 - camera.x * 0.2) % (canvas.width + 80)) - 40;
            const baseY = ((i * 131 - camera.y * 0.2) % (canvas.height + 60)) - 30;
            
            const x = Math.floor(baseX / 4) * 4;
            const y = Math.floor(baseY / 4) * 4;
            
            // Trunk
            fCtx.fillRect(x + 12, y + 24, 8, 32);
            
            // Canopy
            fCtx.fillRect(x + 4, y + 16, 24, 8);
            fCtx.fillRect(x, y + 24, 32, 8);
            fCtx.fillRect(x + 4, y + 32, 24, 8);
        }
        
        lastForestCameraX = camera.x;
        lastForestCameraY = camera.y;
    }
    
    // Draw cached background
    if (forestBackgroundCache) {
        ctx.drawImage(forestBackgroundCache, 0, 0);
    }
}

function render() {
    if (gameOver) return;
    
    // Draw cached SNES-style Florida forest background (only for outside map)
    if (currentMap === 'outside') {
        drawFloridaForestBackground();
    }

    // Use floored camera values for tile calculations
    const sx = Math.floor(camera.x / TILE_SIZE);
    const sy = Math.floor(camera.y / TILE_SIZE);
    const ex = sx + Math.ceil(canvas.width / TILE_SIZE) + 2;
    const ey = sy + Math.ceil(canvas.height / TILE_SIZE) + 2;

    // Draw tiles (only within map bounds)
    const mapWidth = map[0]?.length || 150;
    const mapHeight = map.length || 112;
    
    // Tile rendering dispatch table
    const tileRenderers = {
        [9]: drawVoidTile,
        [TILES.WATER]: (ctx, x, y, tx, ty) => drawWaterTile(x, y, tx, ty, waterAnimFrame),
        [TILES.GRASS]: drawGrassTile,
        [TILES.TREE]: drawShrubTile,
        [TILES.FLOWER]: drawFlowerTile,
        [TILES.DOOR]: drawDoorTile,
        [TILES.STAIRS]: drawStairsTile,
        [TILES.FLOOR]: drawFloorTile,
        [TILES.WALL]: drawWallTile,
        [TILES.CARPET]: drawCarpetTile,
        [12]: drawTentDoorTile,
    };
    
    for (let y = Math.max(0, sy); y < Math.min(mapHeight, ey); y++) {
        for (let x = Math.max(0, sx); x < Math.min(mapWidth, ex); x++) {
            const tile = map[y][x];
            const scx = Math.floor(x * TILE_SIZE - camera.x);
            const scy = Math.floor(y * TILE_SIZE - camera.y);

            const renderer = tileRenderers[tile];
            if (renderer) {
                renderer(ctx, scx, scy, x, y);
            } else {
                // Fallback for unknown tiles
                ctx.fillStyle = TILE_COLORS[tile] || '#ffffff';
                ctx.fillRect(scx, scy, TILE_SIZE, TILE_SIZE);
            }
        }
    }

    // Draw dropped items (keys, etc.) from world-items.js
    if (typeof renderWorldItems === 'function') {
        renderWorldItems(ctx, camera.x, camera.y, currentMap);
    }    
    
    // ===== Z-ORDERING SYSTEM =====
    // Collect all entities that need depth sorting
    const renderables = [];
    
    // Add props (trees, tents, da Bussy)
    const currentProps = getPropsForMap(currentMap);
    if (currentProps) {
        for (let i = 0; i < currentProps.length; i++) {
            const prop = currentProps[i];
            const propX = Math.floor(prop.x * TILE_SIZE) - camera.x;
            const propY = Math.floor(prop.y * TILE_SIZE) - camera.y;
            
            // Calculate bottom Y for sorting (bottom of the sprite's footprint)
            // SPECIAL CASES for better depth perception
            let sortY;
            if (prop.type === 'tent') {
                // Tent entrance is at row 3 (bottom row where player walks)
                // Sort at entrance Y so player at entrance appears IN FRONT
                sortY = prop.y + prop.height;
            } else if (prop.type === 'oak_tree') {
                // Oak tree: 7x7 footprint with 3x3 trunk at rows 2-4
                // Sort by bottom of trunk (row 4 = y + 5) not bottom of canopy
                // This allows player to walk "under" the canopy while behind trunk
                sortY = prop.y + 5;
            } else {
                // Regular props - use full bottom
                sortY = prop.y + prop.height;
            }
            
            renderables.push({
                type: 'prop',
                sortY: sortY,
                render: () => {
                    if (prop.type === 'oak_tree') {
                        drawOakTree(ctx, propX, propY, animationFrame);
                    } else if (prop.type === 'bussy') {
                        const centerOffsetX = (prop.width * TILE_SIZE) / 2;
                        const centerOffsetY = (prop.height * TILE_SIZE) / 2;
                        drawBussy(propX + centerOffsetX, propY + centerOffsetY, 'down', animationFrame % 2);
                    } else if (prop.type === 'tent') {  
                        drawTent(prop.x, prop.y, propX, propY, prop.color || 'red');                
                    }
                }
            });
        }
    }

    // Add camping props
    const campingProps = getCampingPropsForMap(currentMap);
    if (campingProps && campingProps.length > 0) {
        for (let i = 0; i < campingProps.length; i++) {
            const prop = campingProps[i];
            
            // Skip invisible props (e.g., backpack when equipped)
            if (prop.visible === false) continue;
            
            const propX = Math.floor(prop.x * TILE_SIZE) - camera.x;
            const propY = Math.floor(prop.y * TILE_SIZE) - camera.y;
            
            renderables.push({
                type: 'camping_prop',
                sortY: prop.y,
                render: () => {
                    // Handle special cases that need animationFrame or custom parameters
                    if (prop.drawFunction === 'drawCampfire') {
                        drawCampfire(ctx, propX, propY, campfireAnimFrame);
                    } else if (prop.drawFunction === 'drawPortOPotty') {
                        // Port-o-potty needs TILE_SIZE parameter
                        drawPortOPotty(ctx, propX, propY, TILE_SIZE);
                    } else if (prop.drawFunction && window.CampingProps && window.CampingProps[prop.drawFunction]) {
                        // All other camping props use the standard CampingProps namespace
                        window.CampingProps[prop.drawFunction](ctx, propX, propY, TILE_SIZE);
                    }
                }
            });
        }
    }

    // Add bus interior props (steering wheel, dashboard, etc.)
    const busProps = getBusPropsForMap(currentMap);
    if (busProps && busProps.length > 0) {
        for (let i = 0; i < busProps.length; i++) {
            const prop = busProps[i];
            const propX = Math.floor(prop.x * TILE_SIZE) - camera.x;
            const propY = Math.floor(prop.y * TILE_SIZE) - camera.y;
            
            renderables.push({
                type: 'bus_prop',
                sortY: prop.y + (prop.height || 2), // Sort based on bottom of prop
                render: () => {
                    if (prop.drawFunction && window.BusProps && window.BusProps[prop.drawFunction]) {
                        // Pass flipped parameter if it exists
                        window.BusProps[prop.drawFunction](ctx, propX, propY, TILE_SIZE, prop.flipped);
                    }
                }
            });
        }
    }

    // Add items
    const currentItems = getItemsForMap(currentMap);
    if (currentItems) {
        for (let item of currentItems) {
            if (!item.collected) {
                const itemX = Math.floor(item.x * TILE_SIZE) - camera.x;
                const itemY = Math.floor(item.y * TILE_SIZE) - camera.y;
                
                renderables.push({
                    type: 'item',
                    sortY: item.y,
                    render: () => {
                        drawItem(itemX, itemY, item.type, coinAnimFrame);
                    }
                });
            }
        }
    }
    
    // Add player
    const playerX = Math.floor(player.x * TILE_SIZE) - camera.x;
    const playerY = Math.floor(player.y * TILE_SIZE) - camera.y;
    
    renderables.push({
        type: 'player',
        sortY: player.y,
        render: () => {
            drawSprite('bandaniel', playerX, playerY, player.direction, animationFrame);
        }
    });

    // Add NPCs
    if (typeof npcs !== 'undefined') {
        for (let npc of npcs) {
            if (npc.map === currentMap) {
                const nx = Math.floor(npc.x * TILE_SIZE) - camera.x;
                const ny = Math.floor(npc.y * TILE_SIZE) - camera.y;
                
                renderables.push({
                    type: 'npc',
                    sortY: npc.y,
                    npcData: npc,
                    screenX: nx,
                    screenY: ny,
                    render: () => {
                        if (npc.type !== 'bussy') {
                            drawSprite(npc.type, nx, ny, 'down', 0, animationFrame);
                        }
                        
                        // Draw interaction prompt
                        if (typeof getNPCInFront === 'function' && getNPCInFront() === npc && !dialogueActive) {
                            ctx.fillStyle = 'rgba(255,255,255,0.8)';
                            ctx.font = '16px Arial';
                            ctx.textAlign = 'center';
                            
                            // Special positioning for da Bussy - show on RIGHT side (near face)
                            if (npc.type === 'bussy') {
                                // Bus is 8 tiles wide, show prompt on right side
                                const busWidth = BUSSY_CONFIG.exterior.width * TILE_SIZE;
                                ctx.fillText('💬', nx + busWidth - TILE_SIZE, ny - 5);
                            } else {
                                // Regular NPCs - center the prompt
                                ctx.fillText('💬', nx + TILE_SIZE/2, ny - 5);
                            }
                        }
                    }
                });
            }
        }
    }
    
    // Sort all renderables by Y position (back to front)
    renderables.sort((a, b) => a.sortY - b.sortY);
    
    // Draw all renderables in sorted order
    for (let renderable of renderables) {
        renderable.render();
    }
}
