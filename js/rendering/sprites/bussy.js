// sprites/bussy.js
// da Bussy - Anthropomorphic school bus NPC (quest giver)
// SNES-style pixel art - matches BANDANIEL's aesthetic
// REDESIGNED to match 24-wide × 10-tall interior proportions
// Size: ~12 tiles wide (192px) × 3.5 tiles tall (56px) - more elongated!

function drawBussy(x, y, direction, frame) {
    // Center point for the bus
    const centerX = Math.floor(x);
    const centerY = Math.floor(y);
    
    // Idle animation - subtle 1px bob
    const idleOffset = frame === 1 ? 1 : 0;
    
    // SNES color palette - Robin-egg blue theme
    const colors = {
        // Bus body blues (robin-egg blue)
        yellow: '#7dd3c0',        // Main robin-egg blue
        yellowDark: '#5aa89a',    // Darker robin-egg blue for shadows
        yellowLight: '#a8e6d7',   // Lighter robin-egg blue for highlights
        
        // Details
        black: '#1a1a1a',
        darkGray: '#2c2c2c',
        gray: '#666666',
        lightGray: '#999999',
        
        // Windows
        windowBlue: '#6ba8cc',
        windowDark: '#4a7a99',
        windowLight: '#a8d8f0',
        
        // Yeti white/cream
        white: '#ffffff',
        yetiWhite: '#f5f5dc',
        yetiShadow: '#d4d4c4',
        
        // Lights
        lightYellow: '#fff9cc',
        lightRed: '#ff4444',
        
        // Door red (school bus emergency exit)
        doorRed: '#cc3333'
    };
    
    // Disable image smoothing for crisp pixels
    ctx.imageSmoothingEnabled = false;
    
    if (direction === 'down' || direction === 'up') {
        // FRONT/BACK VIEW - 3/4 perspective showing more side - MIRRORED
        const isFront = direction === 'down';
        
        // Draw from top-left corner
        const startX = centerX - 96; // Half of 192px width
        const startY = centerY - 28 + idleOffset; // Half of 56px height
        
        // === MAIN BUS BODY ===
        
        // Long side panel (visible at angle) - NOW ON LEFT SIDE
        ctx.fillStyle = colors.yellow;
        fillPixelRect(ctx, startX + 4, startY + 6, 140, 40);
        
        // Side panel bottom shading
        ctx.fillStyle = colors.yellowDark;
        fillPixelRect(ctx, startX + 4, startY + 36, 140, 10);
        
        // Front face (angled) - NOW ON RIGHT SIDE
        ctx.fillStyle = colors.yellowLight;
        fillPixelRect(ctx, startX + 140, startY + 8, 44, 38);
        
        // === BLACK STRIPE (top of bus) ===
        ctx.fillStyle = colors.black;
        fillPixelRect(ctx, startX + 4, startY + 2, 180, 5);
        
        // === WINDOWS ===
        
        // Large windshield (front) - NOW ON RIGHT
        ctx.fillStyle = colors.windowBlue;
        fillPixelRect(ctx, startX + 146, startY + 12, 32, 18);
        
        // Windshield frame
        ctx.fillStyle = colors.black;
        drawPixelRect(ctx, startX + 146, startY + 12, 32, 18, 2);
        
        // Windshield vertical divider
        fillPixelRect(ctx, startX + 160, startY + 12, 2, 18);
        
        // Side windows (5 visible - shows bus is longer!) - NOW ON LEFT
        for (let i = 0; i < 4; i++) {
            const winX = startX + 10 + (i * 25);
            const winY = startY + 10;
            
            // Window glass
            ctx.fillStyle = colors.windowBlue;
            fillPixelRect(ctx, winX, winY, 22, 16);
            
            // Window frame
            ctx.fillStyle = colors.black;
            drawPixelRect(ctx, winX, winY, 22, 16, 2);
            
            // Window reflection highlight (top)
            ctx.fillStyle = colors.windowLight;
            fillPixelRect(ctx, winX + 2, winY + 2, 18, 3);
        }
        
        // === FRONT BUMPER - NOW ON RIGHT ===
        ctx.fillStyle = colors.black;
        fillPixelRect(ctx, startX + 138, startY + 44, 48, 5);
        
        // Bumper highlight
        ctx.fillStyle = colors.gray;
        fillPixelRect(ctx, startX + 140, startY + 45, 44, 2);
        
        // === HEADLIGHTS - NOW ON RIGHT ===
        ctx.fillStyle = colors.lightYellow;
        fillPixelRect(ctx, startX + 148, startY + 40, 8, 5);
        fillPixelRect(ctx, startX + 166, startY + 40, 8, 5);
        
        // Headlight rims
        ctx.fillStyle = colors.darkGray;
        drawPixelRect(ctx, startX + 148, startY + 40, 8, 5, 1);
        drawPixelRect(ctx, startX + 166, startY + 40, 8, 5, 1);
        
        // === WHEELS ===
        
        // Front wheels (right side)
        drawWheel(ctx, startX + 150, startY + 50, colors);
        drawWheel(ctx, startX + 168, startY + 50, colors);
        
        // Back wheels (on long side - left)
        drawWheel(ctx, startX + 14, startY + 48, colors);
        drawWheel(ctx, startX + 32, startY + 48, colors);
        
        // === ANTHROPOMORPHIC FACE (SNES RPG style) - NOW ON RIGHT ===
        
        // Eyes (simple black ovals above windshield)
        ctx.fillStyle = colors.black;
        fillPixelRect(ctx, startX + 148, startY + 6, 8, 4); // Left eye
        fillPixelRect(ctx, startX + 166, startY + 6, 8, 4); // Right eye
        
        // Eye highlights (classic SNES sparkle)
        ctx.fillStyle = colors.white;
        fillPixelRect(ctx, startX + 151, startY + 6, 2, 2);
        fillPixelRect(ctx, startX + 169, startY + 6, 2, 2);
        
        // Simple smile (on grille area) - NOW ON RIGHT
        ctx.fillStyle = colors.darkGray;
        // Pixel smile curve
        fillPixelRect(ctx, startX + 154, startY + 38, 2, 2);
        fillPixelRect(ctx, startX + 158, startY + 40, 2, 2);
        fillPixelRect(ctx, startX + 162, startY + 41, 2, 2);
        fillPixelRect(ctx, startX + 166, startY + 40, 2, 2);
        fillPixelRect(ctx, startX + 170, startY + 38, 2, 2);
        
        // === YETI PAINTING (on long side - more prominent) - NOW ON LEFT ===
        const yetiX = startX + 56;
        const yetiY = startY + 22;
        
        // Yeti body (cream/white)
        ctx.fillStyle = colors.yetiWhite;
        fillPixelRect(ctx, yetiX, yetiY, 16, 20); // Body
        fillPixelRect(ctx, yetiX + 3, yetiY - 10, 10, 12); // Head
        
        // Yeti arms
        fillPixelRect(ctx, yetiX - 5, yetiY + 5, 5, 10);
        fillPixelRect(ctx, yetiX + 16, yetiY + 5, 5, 10);
        
        // Yeti shading
        ctx.fillStyle = colors.yetiShadow;
        fillPixelRect(ctx, yetiX + 1, yetiY + 15, 14, 5);
        fillPixelRect(ctx, yetiX + 4, yetiY - 9, 8, 2);
        
        // Yeti face
        ctx.fillStyle = colors.black;
        fillPixelRect(ctx, yetiX + 5, yetiY - 7, 2, 3); // Left eye
        fillPixelRect(ctx, yetiX + 9, yetiY - 7, 2, 3); // Right eye
        fillPixelRect(ctx, yetiX + 6, yetiY - 3, 4, 2); // Mouth
        
        // === BUS ENTRANCE DOOR (large school bus door) - RIGHT SIDE near face ===
        // Door should be 2 tiles wide (32px) and almost full height
        const doorX = startX + 108;  // Near the front face on right side
        const doorY = startY + 6;
        const doorWidth = 32;  // 2 tiles
        const doorHeight = 40; // Almost full bus height
        
        // Door panels (robin-egg blue matching body)
        ctx.fillStyle = colors.yellow;
        fillPixelRect(ctx, doorX, doorY, doorWidth, doorHeight);
        
        // Door frame (black outline)
        ctx.fillStyle = colors.black;
        drawPixelRect(ctx, doorX, doorY, doorWidth, doorHeight, 2);
        
        // Vertical door split (fold line in middle for bi-fold door)
        ctx.fillStyle = colors.black;
        fillPixelRect(ctx, doorX + 15, doorY, 2, doorHeight);
        
        // Horizontal panel lines (3 sections)
        fillPixelRect(ctx, doorX + 2, doorY + 13, doorWidth - 4, 2);
        fillPixelRect(ctx, doorX + 2, doorY + 26, doorWidth - 4, 2);
        
        // Door handle/bar (chrome)
        ctx.fillStyle = colors.lightGray;
        fillPixelRect(ctx, doorX + 24, doorY + doorHeight/2 - 2, 6, 4);
        
        // Handle highlight
        ctx.fillStyle = colors.white;
        fillPixelRect(ctx, doorX + 25, doorY + doorHeight/2 - 1, 4, 1);
        
        // Door windows (two small rectangular windows on upper part)
        ctx.fillStyle = colors.windowBlue;
        fillPixelRect(ctx, doorX + 4, doorY + 6, 10, 8);
        fillPixelRect(ctx, doorX + 18, doorY + 6, 10, 8);
        
        // Window frames
        ctx.fillStyle = colors.black;
        drawPixelRect(ctx, doorX + 4, doorY + 6, 10, 8, 1);
        drawPixelRect(ctx, doorX + 18, doorY + 6, 10, 8, 1);
        
        // === LICENSE PLATE - NOW ON RIGHT ===
        ctx.fillStyle = colors.white;
        fillPixelRect(ctx, startX + 150, startY + 34, 20, 5);
        
        ctx.fillStyle = colors.black;
        drawPixelRect(ctx, startX + 150, startY + 34, 20, 5, 1);
        
        // "BUSSY" text (tiny SNES font style)
        ctx.fillStyle = colors.black;
        ctx.font = '4px "Press Start 2P", monospace';
        ctx.textAlign = 'center';
        ctx.fillText('BUSSY', startX + 160, startY + 38);
        
    } else {
        // PURE SIDE VIEW (left or right) - SHOWS FULL LENGTH
        const isRight = direction === 'right';
        const startX = centerX - 96;
        const startY = centerY - 28 + idleOffset;
        
        // Main body (LONG horizontal rectangle - 24 tiles worth)
        ctx.fillStyle = colors.yellow;
        fillPixelRect(ctx, startX, startY + 10, 192, 36);
        
        // Rounded front/back cap
        const capX = isRight ? startX + 170 : startX - 10;
        ctx.fillStyle = colors.yellowLight;
        fillPixelRect(ctx, capX, startY + 10, 22, 36);
        fillPixelRect(ctx, capX + (isRight ? 6 : -6), startY + 14, 16, 28);
        
        // Bottom shading
        ctx.fillStyle = colors.yellowDark;
        fillPixelRect(ctx, startX, startY + 38, 192, 8);
        
        // Black top stripe
        ctx.fillStyle = colors.black;
        fillPixelRect(ctx, startX, startY + 6, 192, 6);
        
        // === WINDOWS (6 across - shows length!) ===
        for (let i = 0; i < 6; i++) {
            const winX = startX + 10 + (i * 30);
            
            ctx.fillStyle = colors.windowBlue;
            fillPixelRect(ctx, winX, startY + 14, 24, 16);
            
            ctx.fillStyle = colors.black;
            drawPixelRect(ctx, winX, startY + 14, 24, 16, 2);
            
            // Window reflection
            ctx.fillStyle = colors.windowLight;
            fillPixelRect(ctx, winX + 2, startY + 16, 20, 3);
        }
        
        // === EXIT DOORS (LEFT SIDE) - TWO DOORS ===
        const door1X = isRight ? startX + 192 - 40 : startX + 8;
        const door2X = isRight ? startX + 192 - 24 : startX + 24;
        const doorY = startY + 32;
        
        // First door
        ctx.fillStyle = colors.doorRed;
        fillPixelRect(ctx, door1X, doorY, 12, 16);
        ctx.fillStyle = colors.black;
        drawPixelRect(ctx, door1X, doorY, 12, 16, 2);
        
        // Second door
        ctx.fillStyle = colors.doorRed;
        fillPixelRect(ctx, door2X, doorY, 12, 16);
        ctx.fillStyle = colors.black;
        drawPixelRect(ctx, door2X, doorY, 12, 16, 2);
        
        // Door handles
        ctx.fillStyle = colors.darkGray;
        fillPixelRect(ctx, door1X + 8, doorY + 8, 2, 4);
        fillPixelRect(ctx, door2X + 8, doorY + 8, 2, 4);
        
        // === WHEELS ===
        drawWheel(ctx, startX + 24, startY + 50, colors);
        drawWheel(ctx, startX + 168, startY + 50, colors);
        
        // === LARGE YETI PAINTING (centered on side) ===
        const yetiX = startX + 96;
        const yetiY = startY + 26;
        
        ctx.fillStyle = colors.yetiWhite;
        fillPixelRect(ctx, yetiX - 12, yetiY, 24, 24); // Body
        fillPixelRect(ctx, yetiX - 8, yetiY - 14, 16, 16); // Head
        
        // Yeti arms
        fillPixelRect(ctx, yetiX - 18, yetiY + 6, 6, 12);
        fillPixelRect(ctx, yetiX + 12, yetiY + 6, 6, 12);
        
        // Yeti shading
        ctx.fillStyle = colors.yetiShadow;
        fillPixelRect(ctx, yetiX - 10, yetiY + 18, 20, 6);
        
        // Yeti face
        ctx.fillStyle = colors.black;
        fillPixelRect(ctx, yetiX - 5, yetiY - 10, 3, 4); // Left eye
        fillPixelRect(ctx, yetiX + 2, yetiY - 10, 3, 4); // Right eye
        fillPixelRect(ctx, yetiX - 3, yetiY - 4, 6, 3); // Mouth
        
        // === FRONT/BACK DETAILS ===
        if (isRight) {
            // Headlights (front)
            ctx.fillStyle = colors.lightYellow;
            fillPixelRect(ctx, startX + 178, startY + 42, 6, 4);
            fillPixelRect(ctx, startX + 178, startY + 20, 6, 4);
            
            ctx.fillStyle = colors.darkGray;
            drawPixelRect(ctx, startX + 178, startY + 42, 6, 4, 1);
            drawPixelRect(ctx, startX + 178, startY + 20, 6, 4, 1);
        } else {
            // Tail lights (back)
            ctx.fillStyle = colors.lightRed;
            fillPixelRect(ctx, startX + 8, startY + 42, 6, 4);
            fillPixelRect(ctx, startX + 8, startY + 20, 6, 4);
            
            ctx.fillStyle = colors.darkGray;
            drawPixelRect(ctx, startX + 8, startY + 42, 6, 4, 1);
            drawPixelRect(ctx, startX + 8, startY + 20, 6, 4, 1);
        }
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
    // Tire (black outer)
    ctx.fillStyle = colors.black;
    fillPixelRect(ctx, x, y, 10, 8);
    
    // Rim (gray)
    ctx.fillStyle = colors.gray;
    fillPixelRect(ctx, x + 2, y + 2, 6, 4);
    
    // Rim highlight (chrome effect)
    ctx.fillStyle = colors.lightGray;
    fillPixelRect(ctx, x + 3, y + 2, 4, 2);
    
    // Center cap
    ctx.fillStyle = colors.darkGray;
    fillPixelRect(ctx, x + 4, y + 3, 2, 2);
}
