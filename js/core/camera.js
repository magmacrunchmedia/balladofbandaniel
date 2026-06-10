// core/camera.js
// Camera system - follows player with smooth interpolation
// FIXED: Improved smoothing value to reduce choppiness at 30 FPS

const camera = { 
    x: 0, 
    y: 0,
    targetX: 0,
    targetY: 0
};

function updateCamera() {
    // Calculate target camera position (where we want to be)
    const targetX = player.x * TILE_SIZE - canvas.width/2 + TILE_SIZE/2;
    const targetY = player.y * TILE_SIZE - canvas.height/2 + TILE_SIZE/2;
    
    // Smooth interpolation (lerp) - IMPROVED from 0.2 to 0.3
    // 0.3 = snappier camera with less lag (better at 30 FPS)
    // Lower = smoother but more lag, Higher = snappier but less smooth
    const smoothing = 0.3;
    
    camera.x += (targetX - camera.x) * smoothing;
    camera.y += (targetY - camera.y) * smoothing;
    
    // Round to prevent sub-pixel gaps in tile rendering
    camera.x = Math.round(camera.x);
    camera.y = Math.round(camera.y);
}
