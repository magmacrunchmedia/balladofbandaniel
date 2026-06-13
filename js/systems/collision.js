// collision.js - Collision detection
// Uses Math.floor() to match game.js movement code

function isSolid(x, y) {
    const checkX = Math.floor(x);
    const checkY = Math.floor(y);
    
    // Get actual map dimensions dynamically
    const actualMapHeight = map.length;
    const actualMapWidth = map[0] ? map[0].length : MAP_WIDTH;
    
    // Tighter boundary - prevent player from entering fence tiles
    const bottomBoundary = (currentMap === 'outside') ? (actualMapHeight - 2) : (actualMapHeight - 1);

    if (checkX < 1 || checkX >= actualMapWidth - 1 || checkY < 1 || checkY >= bottomBoundary) {
        return true;
    }

    const tile = map[checkY][checkX];
    
    // Check for NPCs with distance-based collision (fixes sub-tile phasing)
    // Instead of checking exact tile match, check if centers are close enough
    for (let i = 0; i < npcs.length; i++) {
        const npc = npcs[i];
        if (npc.map !== currentMap) continue;
        
        // Get NPC dimensions (default to 1x1 for single-tile NPCs)
        const npcWidth = npc.width || 1;
        const npcHeight = npc.height || 1;
        
        // Calculate NPC center position (in tile coordinates)
        const npcCenterX = npc.x + (npcWidth / 2);
        const npcCenterY = npc.y + (npcHeight / 2);
        
        // Calculate player center (x, y are already in tile coordinates with decimals)
        const playerCenterX = x + 0.5;
        const playerCenterY = y + 0.5;
        
        // Calculate distance between centers
        const dx = Math.abs(playerCenterX - npcCenterX);
        const dy = Math.abs(playerCenterY - npcCenterY);
        
        // Collision if centers are within collision radius
        // For a 1x1 NPC, radius is ~0.7 tiles (allows getting close but not overlapping)
        // For larger NPCs, scale accordingly
        const collisionRadius = Math.max(npcWidth, npcHeight) * 0.6;
        
        if (dx < collisionRadius && dy < collisionRadius) {
            return true;
        }
    }
    
    // Check for props (trees, rocks, tent walls, bus walls, etc.)
    let currentProps = [];
    if (currentMap === 'outside') currentProps = propsOutside;
    else if (currentMap === 'tentInterior0') currentProps = propsTentInterior0;    
    else if (currentMap === 'tentInterior1') currentProps = propsTentInterior1;
    else if (currentMap === 'tentInterior2') currentProps = propsTentInterior2;
    else if (currentMap === 'tentInterior3') currentProps = propsTentInterior3;
    else if (currentMap === 'bussyInterior') currentProps = propsBussyInterior;
    else if (currentMap === 'portoLetty1Interior') currentProps = propsPortoLetty1Interior;
    else if (currentMap === 'portoLetty2Interior') currentProps = propsPortoLetty2Interior;
    else if (currentMap === 'portoLetty3Interior') currentProps = propsPortoLetty3Interior;
    
    if (currentMap.startsWith('portoLetty') && currentProps.length === 0) {
        console.error('⚠️ Porto potty collision array is EMPTY for', currentMap);
    }
    
    for (let i = 0; i < currentProps.length; i++) {
        const prop = currentProps[i];
        if (checkX === prop.x && checkY === prop.y) {
            return true;
        }
    }
    
    // DEBUG: Log when player is near bottom wall of port-o-potty
    if (currentMap.startsWith('portoLetty') && checkY >= 57 && checkY <= 58) {
        console.log(`isSolid(${checkX}, ${checkY}) on ${currentMap}: tile=${tile}, props=${currentProps.length}, solid=${SOLID_TILES.includes(tile)}`);
    }
    
    return SOLID_TILES.includes(tile);
}
