// js/rendering/sprites/carl.js
// CARL - The Psychedelic Pineapple (Fixed V4)
// Features: Psychedelic color cycling, Teardrop shape, Clipped patterns (no artifacts)

/**
 * Draw Carl the Pineapple sprite
 * @param {CanvasRenderingContext2D} ctx - Canvas context
 * @param {number} x - Screen X position
 * @param {number} y - Screen Y position
 * @param {string} direction - Direction ('up', 'down', 'left', 'right')
 * @param {number} frame - Animation frame (0 or 1)
 * @param {number} gameFrame - Global game frame for glow animation
 */
function drawCarl(ctx, x, y, direction, frame, gameFrame = 0) {
    const TILE = 16;
    const centerX = x;
    const centerY = y;
    
    // === ANIMATION CALCULATIONS ===
    
    // 1. Bobbing Motion
    const bobOffset = Math.sin(gameFrame * 0.05) * 2.0;
    
    // 2. Psychedelic Color Cycling
    // We cycle the Hue (0-360) based on the game frame
    const baseHue = (gameFrame * 2) % 360; 
    const oppHue = (baseHue + 180) % 360; // Opposite color for contrast
    
    const colors = {
        // Body: Bright neon cycle
        bodyMain: `hsl(${baseHue}, 90%, 60%)`,
        bodyDark: `hsl(${baseHue}, 100%, 35%)`, // For shading
        
        // Scales: Contrast color
        scaleLines: `hsla(${oppHue}, 80%, 40%, 0.5)`, // Slightly transparent
        scaleDots: `hsl(${oppHue}, 100%, 80%)`,
        
        // Leaves: Cool neon cycle
        leaf1: `hsl(${(baseHue + 90) % 360}, 80%, 50%)`,
        leaf2: `hsl(${(baseHue + 120) % 360}, 80%, 50%)`,
        
        // Aura
        glowOuter: `hsla(${baseHue}, 100%, 60%, 0.2)`,
        glowInner: `hsla(${(baseHue + 40) % 360}, 100%, 70%, 0.4)`,
        
        // Face
        eyes: '#ffffff',
        smile: '#ffffff'
    };

    ctx.save();
    
    // === 1. GLOW AURA (Behind Body) ===
    const pulseSize = Math.sin(gameFrame * 0.1) * 3;
    const glowRadius = 14 + pulseSize;
    
    const glowGradient = ctx.createRadialGradient(
        centerX, centerY + bobOffset, 0,
        centerX, centerY + bobOffset, glowRadius
    );
    glowGradient.addColorStop(0, colors.glowInner);
    glowGradient.addColorStop(0.6, colors.glowOuter);
    glowGradient.addColorStop(1, 'rgba(0,0,0,0)');
    
    ctx.fillStyle = glowGradient;
    ctx.beginPath();
    ctx.arc(centerX, centerY + bobOffset, glowRadius, 0, Math.PI * 2);
    ctx.fill();

    // === 2. BODY & PATTERN ===
    // We define the shape once, fill it, then use it as a clipping mask
    
    ctx.beginPath();
    // The "Teardrop" pineapple shape
    ctx.ellipse(centerX, centerY + 2 + bobOffset, 9, 13, 0, 0, Math.PI * 2);
    
    // A. Draw Base Color
    ctx.fillStyle = colors.bodyMain;
    ctx.fill();
    
    // B. Save context to apply Clipping for the pattern
    ctx.save(); 
    ctx.clip(); // <--- THIS FIXES THE DIAGONAL PLANE ISSUE
    
    // Draw the Diamond Pattern (Now it won't go outside the lines!)
    ctx.strokeStyle = colors.scaleLines;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    // Draw grid of lines larger than the body, but clipped by the body
    for (let i = -10; i <= 10; i++) {
        // Diagonal /
        ctx.moveTo(centerX - 15 + i * 4, centerY - 15 + bobOffset);
        ctx.lineTo(centerX + 5 + i * 4, centerY + 20 + bobOffset);
        
        // Diagonal \
        ctx.moveTo(centerX + 15 - i * 4, centerY - 15 + bobOffset);
        ctx.lineTo(centerX - 5 - i * 4, centerY + 20 + bobOffset);
    }
    ctx.stroke();
    
    // 3D Shading (Glassy look)
    const shineGrad = ctx.createRadialGradient(
        centerX - 3, centerY - 3 + bobOffset, 1,
        centerX, centerY + bobOffset, 12
    );
    shineGrad.addColorStop(0, 'rgba(255,255,255,0.4)');
    shineGrad.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = shineGrad;
    ctx.fill();
    
    ctx.restore(); // Remove clipping so we can draw legs/crown outside the body

    // === 3. SCALE DOTS (The "Eyes" of the pineapple) ===
    // Drawn on top of the body
    ctx.fillStyle = colors.scaleDots;
    const dotPositions = [
        [0, -6], [-5, -2], [5, -2], [0, 2], [-4, 6], [4, 6], [0, 10]
    ];
    
    ctx.beginPath();
    dotPositions.forEach(([dx, dy]) => {
        // Adjust for side view (compress width)
        let xOff = dx;
        if (direction === 'left' || direction === 'right') xOff = dx * 0.4;
        
        // Only draw if inside the general area (simple check)
        ctx.moveTo(centerX + xOff, centerY + dy + bobOffset);
        ctx.arc(centerX + xOff, centerY + dy + bobOffset, 1.5, 0, Math.PI * 2);
    });
    ctx.fill();

    // === 4. THE CROWN (Leaves) ===
    const leafCount = 6;
    for (let i = 0; i < leafCount; i++) {
        ctx.fillStyle = i % 2 === 0 ? colors.leaf1 : colors.leaf2;
        
        const angle = (i / leafCount) * Math.PI * 2 - Math.PI / 2;
        const leafLen = 9 + (i % 2) * 2;
        
        ctx.save();
        ctx.translate(centerX, centerY - 11 + bobOffset);
        
        let rot = angle;
        if (direction === 'right') rot -= 0.5;
        if (direction === 'left') rot += 0.5;
        
        ctx.rotate(rot);
        
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.quadraticCurveTo(-2, -leafLen/2, 0, -leafLen);
        ctx.quadraticCurveTo(2, -leafLen/2, 0, 0);
        ctx.fill();
        ctx.restore();
    }

    // === 5. FACE & LEGS ===
    
    // LEGS
    ctx.strokeStyle = colors.bodyDark;
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    
    const legY = centerY + 15 + bobOffset;
    let lLeg = 0, rLeg = 0;
    
    if (frame === 1) { lLeg = -2; rLeg = 2; }

    ctx.beginPath();
    ctx.moveTo(centerX - 3, legY);
    ctx.lineTo(centerX - 3 + lLeg, legY + 4); 
    ctx.moveTo(centerX + 3, legY);
    ctx.lineTo(centerX + 3 + rLeg, legY + 4); 
    ctx.stroke();

    // FACE
    if (direction !== 'up') {
        ctx.fillStyle = colors.eyes;
        ctx.shadowColor = colors.eyes;
        ctx.shadowBlur = 5; 
        
        let eyeX = centerX;
        if (direction === 'left') eyeX -= 4;
        if (direction === 'right') eyeX += 4;

        if (direction === 'down') {
            // Front
            ctx.beginPath(); ctx.arc(centerX - 3, centerY - 2 + bobOffset, 2.5, 0, Math.PI*2); ctx.fill();
            ctx.beginPath(); ctx.arc(centerX + 3, centerY - 2 + bobOffset, 2.5, 0, Math.PI*2); ctx.fill();
            
            ctx.strokeStyle = colors.smile;
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.arc(centerX, centerY + 1 + bobOffset, 4, 0.2, Math.PI - 0.2);
            ctx.stroke();
        } else {
            // Side
            ctx.beginPath(); 
            ctx.arc(eyeX, centerY - 2 + bobOffset, 2.5, 0, Math.PI*2); 
            ctx.fill();
            
            ctx.strokeStyle = colors.smile;
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.arc(eyeX, centerY + 1 + bobOffset, 3, 0.5, 2.5);
            ctx.stroke();
        }
        ctx.shadowBlur = 0;
    }

    ctx.restore();
}

// Helper function
function drawCarlAtTile(ctx, tileX, tileY, direction, frame, gameFrame = 0) {
    const TILE = 16;
    drawCarl(ctx, tileX * TILE, tileY * TILE, direction, frame, gameFrame);
}