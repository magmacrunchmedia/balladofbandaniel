// sprites/bussy.js
// da Bussy - Anthropomorphic school bus NPC (quest giver)
// SNES-style pixel art - matches BANDANIEL's aesthetic
// Size: ~8 tiles wide (128px) × 3 tiles tall (48px)

function drawBussy(x, y, direction, frame) {
    // Center point for the bus
    const centerX = Math.floor(x);
    const centerY = Math.floor(y);
    
    // Idle animation - subtle 1px bob
    const idleOffset = frame === 1 ? 1 : 0;
    
    // SNES color palette
    const colors = {
        // Bus body yellows
        yellow: '#ffd333',
        yellowDark: '#e6b800',
        yellowLight: '#ffe666',
        
        // Details
        black: '#2c2c2c',
        darkGray: '#1a1a1a',
        gray: '#666666',
        
        // Windows
        windowBlue: '#87ceeb',
        windowDark: '#6ba8cc',
        windowLight: '#a8d8f0',
        
        // Yeti white
        white: '#ffffff',
        whiteOff: '#f0f0f0',
        
        // Lights
        lightYellow: '#fff9e6',
        lightRed: '#ff3333'
    };
    
    // Disable image smoothing for crisp pixels
    ctx.imageSmoothingEnabled = false;
    
    if (direction === 'down' || direction === 'up') {
        // FRONT/BACK VIEW - Angled 3/4 perspective showing side
        const isFront = direction === 'down';
        const flip = isFront ? 1 : -1;
        
        // Draw from top-left corner
        const startX = centerX - 64; // Half of 128px width
        const startY = centerY - 24 + idleOffset; // Half of 48px height
        
        // === MAIN BUS BODY ===
        
        // Side panel (visible at angle)
        ctx.fillStyle = colors.yellow;
        fillPixelRect(ctx, startX + 40, startY + 4, 80, 36);
        
        // Side panel shading
        ctx.fillStyle = colors.yellowDark;
        fillPixelRect(ctx, startX + 40, startY + 32, 80, 8);
        
        // Front face (angled)
        ctx.fillStyle = colors.yellowLight;
        fillPixelRect(ctx, startX + 8, startY + 6, 36, 34);
        
        // === WINDOWS ===
        
        // Windshield (front)
        ctx.fillStyle = colors.windowBlue;
        fillPixelRect(ctx, startX + 12, startY + 10, 28, 16);
        
        // Windshield frame
        ctx.fillStyle = colors.black;
        drawPixelRect(ctx, startX + 12, startY + 10, 28, 16, 2);
        
        // Windshield divider
        fillPixelRect(ctx, startX + 25, startY + 10, 2, 16);
        
        // Side windows (3 visible)
        for (let i = 0; i < 3; i++) {
            const winX = startX + 48 + (i * 24);
            const winY = startY + 8;
            
            // Window glass
            ctx.fillStyle = colors.windowBlue;
            fillPixelRect(ctx, winX, winY, 20, 14);
            
            // Window frame
            ctx.fillStyle = colors.black;
            drawPixelRect(ctx, winX, winY, 20, 14, 2);
        }
        
        // === BLACK STRIPE ===
        ctx.fillStyle = colors.black;
        fillPixelRect(ctx, startX + 10, startY + 2, 110, 4);
        
        // === BUMPER ===
        ctx.fillStyle = colors.black;
        fillPixelRect(ctx, startX + 6, startY + 38, 40, 4);
        
        // === HEADLIGHTS ===
        ctx.fillStyle = colors.lightYellow;
        fillPixelRect(ctx, startX + 14, startY + 34, 6, 4);
        fillPixelRect(ctx, startX + 32, startY + 34, 6, 4);
        
        // Headlight rims
        ctx.fillStyle = colors.black;
        drawPixelRect(ctx, startX + 14, startY + 34, 6, 4, 1);
        drawPixelRect(ctx, startX + 32, startY + 34, 6, 4, 1);
        
        // === WHEELS ===
        
        // Front wheels
        drawWheel(ctx, startX + 16, startY + 42, colors);
        drawWheel(ctx, startX + 32, startY + 42, colors);
        
        // Side wheel (larger, further back)
        drawWheel(ctx, startX + 100, startY + 40, colors);
        
        // === ANTHROPOMORPHIC FACE ===
        
        // Eyes (above windshield)
        ctx.fillStyle = colors.black;
        fillPixelRect(ctx, startX + 16, startY + 4, 6, 4); // Left eye
        fillPixelRect(ctx, startX + 32, startY + 4, 6, 4); // Right eye
        
        // Eye highlights
        ctx.fillStyle = colors.white;
        fillPixelRect(ctx, startX + 18, startY + 4, 2, 2);
        fillPixelRect(ctx, startX + 34, startY + 4, 2, 2);
        
        // Smile (on bumper area)
        ctx.fillStyle = colors.black;
        // Simple pixel smile curve
        fillPixelRect(ctx, startX + 20, startY + 36, 2, 2);
        fillPixelRect(ctx, startX + 24, startY + 38, 2, 2);
        fillPixelRect(ctx, startX + 28, startY + 38, 2, 2);
        fillPixelRect(ctx, startX + 32, startY + 36, 2, 2);
        
        // === YETI PAINTING (on side) ===
        const yetiX = startX + 80;
        const yetiY = startY + 18;
        
        // Yeti body (simple pixel art)
        ctx.fillStyle = colors.whiteOff;
        fillPixelRect(ctx, yetiX, yetiY, 12, 16); // Body
        fillPixelRect(ctx, yetiX + 2, yetiY - 8, 8, 10); // Head
        
        // Yeti arms
        fillPixelRect(ctx, yetiX - 4, yetiY + 4, 4, 8);
        fillPixelRect(ctx, yetiX + 12, yetiY + 4, 4, 8);
        
        // Yeti eyes
        ctx.fillStyle = colors.black;
        fillPixelRect(ctx, yetiX + 4, yetiY - 6, 2, 2);
        fillPixelRect(ctx, yetiX + 8, yetiY - 6, 2, 2);
        
        // Yeti mouth
        fillPixelRect(ctx, yetiX + 5, yetiY - 3, 4, 2);
        
        // === LICENSE PLATE ===
        ctx.fillStyle = colors.white;
        fillPixelRect(ctx, startX + 18, startY + 32, 16, 4);
        
        ctx.fillStyle = colors.black;
        drawPixelRect(ctx, startX + 18, startY + 32, 16, 4, 1);
        
        // "DA BUSSY" text (super tiny)
        ctx.fillStyle = colors.black;
        ctx.font = '3px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('BUSSY', startX + 26, startY + 35);
        
    } else {
        // PURE SIDE VIEW (left or right)
        const isRight = direction === 'right';
        const startX = isRight ? centerX - 64 : centerX - 64;
        const startY = centerY - 24 + idleOffset;
        
        // Main body
        ctx.fillStyle = colors.yellow;
        fillPixelRect(ctx, startX, startY + 8, 128, 32);
        
        // Rounded front
        ctx.fillStyle = colors.yellowLight;
        fillPixelRect(ctx, startX + (isRight ? 110 : 0), startY + 8, 18, 32);
        fillPixelRect(ctx, startX + (isRight ? 116 : -6), startY + 12, 12, 24);
        
        // Black top stripe
        ctx.fillStyle = colors.black;
        fillPixelRect(ctx, startX, startY + 4, 128, 6);
        
        // Windows (4 across)
        for (let i = 0; i < 4; i++) {
            const winX = startX + 8 + (i * 28);
            ctx.fillStyle = colors.windowBlue;
            fillPixelRect(ctx, winX, startY + 12, 20, 14);
            
            ctx.fillStyle = colors.black;
            drawPixelRect(ctx, winX, startY + 12, 20, 14, 2);
        }
        
        // Wheels
        drawWheel(ctx, startX + 20, startY + 40, colors);
        drawWheel(ctx, startX + 108, startY + 40, colors);
        
        // Large yeti painting
        const yetiX = startX + 64;
        const yetiY = startY + 24;
        
        ctx.fillStyle = colors.whiteOff;
        fillPixelRect(ctx, yetiX - 8, yetiY, 16, 20);
        fillPixelRect(ctx, yetiX - 6, yetiY - 10, 12, 12);
        
        // Yeti features
        ctx.fillStyle = colors.black;
        fillPixelRect(ctx, yetiX - 4, yetiY - 8, 2, 2);
        fillPixelRect(ctx, yetiX + 2, yetiY - 8, 2, 2);
        fillPixelRect(ctx, yetiX - 2, yetiY - 4, 4, 2);
    }
    
    // Re-enable smoothing
    ctx.imageSmoothingEnabled = true;
}

// Helper: Draw filled pixel-perfect rectangle
function fillPixelRect(ctx, x, y, w, h) {
    ctx.fillRect(Math.floor(x), Math.floor(y), Math.floor(w), Math.floor(h));
}

// Helper: Draw outlined pixel-perfect rectangle
function drawPixelRect(ctx, x, y, w, h, thickness) {
    const t = thickness || 1;
    ctx.fillRect(Math.floor(x), Math.floor(y), Math.floor(w), t); // Top
    ctx.fillRect(Math.floor(x), Math.floor(y + h - t), Math.floor(w), t); // Bottom
    ctx.fillRect(Math.floor(x), Math.floor(y), t, Math.floor(h)); // Left
    ctx.fillRect(Math.floor(x + w - t), Math.floor(y), t, Math.floor(h)); // Right
}

// Helper: Draw SNES-style wheel
function drawWheel(ctx, x, y, colors) {
    // Tire (black)
    ctx.fillStyle = colors.black;
    fillPixelRect(ctx, x, y, 8, 6);
    
    // Rim (gray)
    ctx.fillStyle = colors.gray;
    fillPixelRect(ctx, x + 2, y + 1, 4, 4);
    
    // Rim highlight
    ctx.fillStyle = colors.white;
    fillPixelRect(ctx, x + 3, y + 2, 2, 1);
}