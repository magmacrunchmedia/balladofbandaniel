// js/rendering/sprites/carl.js
// CARL - The glowing multi-color pineapple NPC
// Psychedelic, retrofuture vibes

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
    
    // Idle animation - gentle float/hover
    const bobOffset = Math.sin(gameFrame * 0.05) * 1.5;
    
    // Psychedelic color cycling for glow
    const glowCycle = gameFrame * 0.03;
    const hue1 = (glowCycle) % 360;
    const hue2 = (glowCycle + 120) % 360;
    const hue3 = (glowCycle + 240) % 360;
    
    // Color palette - multi-colored with glow
    const colors = {
        // Pineapple body - cycling colors
        bodyYellow: `hsl(${hue1}, 80%, 60%)`,
        bodyOrange: `hsl(${hue2}, 80%, 55%)`,
        bodyGold: `hsl(${hue3}, 75%, 50%)`,
        
        // Diamond pattern
        diamondDark: `hsl(${hue1}, 60%, 35%)`,
        diamondLight: `hsl(${hue2}, 70%, 70%)`,
        
        // Crown leaves - also colorful
        leafCyan: `hsl(${(hue1 + 180) % 360}, 70%, 50%)`,
        leafMagenta: `hsl(${(hue2 + 180) % 360}, 70%, 55%)`,
        leafPurple: `hsl(${(hue3 + 180) % 360}, 70%, 45%)`,
        
        // Eyes - bright glowing
        eyeGlow: `hsl(${hue1}, 100%, 80%)`,
        eyeCore: '#ffffff',
        
        // Glow aura
        glowOuter: `hsla(${hue1}, 100%, 60%, 0.4)`,
        glowMid: `hsla(${hue2}, 100%, 65%, 0.3)`,
        glowInner: `hsla(${hue3}, 100%, 70%, 0.2)`
    };
    
    ctx.save();
    
    // Draw outer glow aura first (behind everything)
    const glowRadius = 18 + Math.sin(gameFrame * 0.08) * 2;
    const gradient = ctx.createRadialGradient(centerX, centerY + bobOffset, 0, centerX, centerY + bobOffset, glowRadius);
    gradient.addColorStop(0, colors.glowInner);
    gradient.addColorStop(0.5, colors.glowMid);
    gradient.addColorStop(1, colors.glowOuter);
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(centerX, centerY + bobOffset, glowRadius, 0, Math.PI * 2);
    ctx.fill();
    
    if (direction === 'down') {
        // ===== FACING DOWN (toward camera) =====
        
        // Pineapple body - oval shape
        ctx.fillStyle = colors.bodyYellow;
        ctx.beginPath();
        ctx.ellipse(centerX, centerY + 3 + bobOffset, 9, 13, 0, 0, Math.PI * 2);
        ctx.fill();
        
        // Diamond pattern (pineapple texture)
        ctx.strokeStyle = colors.diamondDark;
        ctx.lineWidth = 1.5;
        // Diagonal lines creating diamond pattern
        for (let row = 0; row < 5; row++) {
            const yPos = centerY - 8 + row * 5 + bobOffset;
            // Left-to-right diagonals
            ctx.beginPath();
            ctx.moveTo(centerX - 8, yPos);
            ctx.lineTo(centerX + 8, yPos);
            ctx.stroke();
        }
        for (let col = -2; col <= 2; col++) {
            const xPos = centerX + col * 4;
            ctx.beginPath();
            ctx.moveTo(xPos, centerY - 8 + bobOffset);
            ctx.lineTo(xPos, centerY + 14 + bobOffset);
            ctx.stroke();
        }
        
        // Highlight spots (glowing segments)
        ctx.fillStyle = colors.diamondLight;
        ctx.globalAlpha = 0.7;
        const highlights = [
            [-4, -4], [4, -2], [-5, 4], [3, 6], [-2, 10]
        ];
        highlights.forEach(([dx, dy]) => {
            ctx.beginPath();
            ctx.arc(centerX + dx, centerY + dy + bobOffset, 2, 0, Math.PI * 2);
            ctx.fill();
        });
        ctx.globalAlpha = 1.0;
        
        // Crown leaves (spiky, colorful)
        const leafCount = 6;
        for (let i = 0; i < leafCount; i++) {
            const angle = (i / leafCount) * Math.PI * 2 - Math.PI / 2;
            const leafColor = i % 3 === 0 ? colors.leafCyan : (i % 3 === 1 ? colors.leafMagenta : colors.leafPurple);
            
            ctx.fillStyle = leafColor;
            ctx.save();
            ctx.translate(centerX, centerY - 10 + bobOffset);
            ctx.rotate(angle);
            
            // Spiky leaf shape
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(-2, -8);
            ctx.lineTo(0, -10);
            ctx.lineTo(2, -8);
            ctx.closePath();
            ctx.fill();
            
            ctx.restore();
        }
        
        // Eyes - glowing bright
        ctx.fillStyle = colors.eyeGlow;
        ctx.shadowColor = colors.eyeGlow;
        ctx.shadowBlur = 6;
        // Left eye
        ctx.beginPath();
        ctx.arc(centerX - 3, centerY - 2 + bobOffset, 2.5, 0, Math.PI * 2);
        ctx.fill();
        // Right eye
        ctx.beginPath();
        ctx.arc(centerX + 3, centerY - 2 + bobOffset, 2.5, 0, Math.PI * 2);
        ctx.fill();
        
        // Eye cores (white centers)
        ctx.shadowBlur = 0;
        ctx.fillStyle = colors.eyeCore;
        ctx.beginPath();
        ctx.arc(centerX - 3, centerY - 2 + bobOffset, 1, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(centerX + 3, centerY - 2 + bobOffset, 1, 0, Math.PI * 2);
        ctx.fill();
        
        // Smile (glowing)
        ctx.strokeStyle = colors.eyeGlow;
        ctx.lineWidth = 1.5;
        ctx.shadowColor = colors.eyeGlow;
        ctx.shadowBlur = 4;
        ctx.beginPath();
        ctx.arc(centerX, centerY + 2 + bobOffset, 4, 0.2, Math.PI - 0.2);
        ctx.stroke();
        ctx.shadowBlur = 0;
        
        // Legs (glowing stick legs)
        ctx.strokeStyle = colors.bodyOrange;
        ctx.lineWidth = 2;
        ctx.shadowColor = colors.bodyOrange;
        ctx.shadowBlur = 3;
        if (frame === 0) {
            ctx.beginPath();
            ctx.moveTo(centerX - 3, centerY + 16);
            ctx.lineTo(centerX - 4, centerY + 20);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(centerX + 3, centerY + 16);
            ctx.lineTo(centerX + 2, centerY + 20);
            ctx.stroke();
        } else {
            ctx.beginPath();
            ctx.moveTo(centerX - 3, centerY + 16);
            ctx.lineTo(centerX - 2, centerY + 20);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(centerX + 3, centerY + 16);
            ctx.lineTo(centerX + 4, centerY + 20);
            ctx.stroke();
        }
        ctx.shadowBlur = 0;
        
    } else if (direction === 'up') {
        // ===== FACING UP (away from camera) =====
        
        // Pineapple body (back view)
        ctx.fillStyle = colors.bodyOrange;
        ctx.beginPath();
        ctx.ellipse(centerX, centerY + 3 + bobOffset, 9, 13, 0, 0, Math.PI * 2);
        ctx.fill();
        
        // Diamond pattern (back)
        ctx.strokeStyle = colors.diamondDark;
        ctx.lineWidth = 1.5;
        for (let row = 0; row < 5; row++) {
            const yPos = centerY - 8 + row * 5 + bobOffset;
            ctx.beginPath();
            ctx.moveTo(centerX - 8, yPos);
            ctx.lineTo(centerX + 8, yPos);
            ctx.stroke();
        }
        for (let col = -2; col <= 2; col++) {
            const xPos = centerX + col * 4;
            ctx.beginPath();
            ctx.moveTo(xPos, centerY - 8 + bobOffset);
            ctx.lineTo(xPos, centerY + 14 + bobOffset);
            ctx.stroke();
        }
        
        // Highlights
        ctx.fillStyle = colors.diamondLight;
        ctx.globalAlpha = 0.6;
        [[2, -3], [-3, 2], [4, 7], [-4, 9]].forEach(([dx, dy]) => {
            ctx.beginPath();
            ctx.arc(centerX + dx, centerY + dy + bobOffset, 2, 0, Math.PI * 2);
            ctx.fill();
        });
        ctx.globalAlpha = 1.0;
        
        // Crown (visible from back)
        const leafCount = 6;
        for (let i = 0; i < leafCount; i++) {
            const angle = (i / leafCount) * Math.PI * 2 - Math.PI / 2;
            const leafColor = i % 3 === 0 ? colors.leafCyan : (i % 3 === 1 ? colors.leafMagenta : colors.leafPurple);
            
            ctx.fillStyle = leafColor;
            ctx.save();
            ctx.translate(centerX, centerY - 10 + bobOffset);
            ctx.rotate(angle);
            
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(-2, -8);
            ctx.lineTo(0, -10);
            ctx.lineTo(2, -8);
            ctx.closePath();
            ctx.fill();
            
            ctx.restore();
        }
        
        // Legs
        ctx.strokeStyle = colors.bodyGold;
        ctx.lineWidth = 2;
        ctx.shadowColor = colors.bodyGold;
        ctx.shadowBlur = 3;
        if (frame === 0) {
            ctx.beginPath();
            ctx.moveTo(centerX - 3, centerY + 16);
            ctx.lineTo(centerX - 4, centerY + 20);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(centerX + 3, centerY + 16);
            ctx.lineTo(centerX + 2, centerY + 20);
            ctx.stroke();
        } else {
            ctx.beginPath();
            ctx.moveTo(centerX - 3, centerY + 16);
            ctx.lineTo(centerX - 2, centerY + 20);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(centerX + 3, centerY + 16);
            ctx.lineTo(centerX + 4, centerY + 20);
            ctx.stroke();
        }
        ctx.shadowBlur = 0;
        
    } else if (direction === 'right') {
        // ===== FACING RIGHT (side view) =====
        
        // Pineapple body (side - slightly oval)
        ctx.fillStyle = colors.bodyGold;
        ctx.beginPath();
        ctx.ellipse(centerX, centerY + 3 + bobOffset, 8, 13, 0, 0, Math.PI * 2);
        ctx.fill();
        
        // Side diamond pattern
        ctx.strokeStyle = colors.diamondDark;
        ctx.lineWidth = 1.5;
        for (let row = 0; row < 5; row++) {
            const yPos = centerY - 8 + row * 5 + bobOffset;
            ctx.beginPath();
            ctx.moveTo(centerX - 7, yPos);
            ctx.lineTo(centerX + 7, yPos);
            ctx.stroke();
        }
        for (let col = -1; col <= 1; col++) {
            const xPos = centerX + col * 5;
            ctx.beginPath();
            ctx.moveTo(xPos, centerY - 8 + bobOffset);
            ctx.lineTo(xPos, centerY + 14 + bobOffset);
            ctx.stroke();
        }
        
        // Highlights
        ctx.fillStyle = colors.diamondLight;
        ctx.globalAlpha = 0.7;
        [[2, -2], [-3, 4], [3, 8]].forEach(([dx, dy]) => {
            ctx.beginPath();
            ctx.arc(centerX + dx, centerY + dy + bobOffset, 2, 0, Math.PI * 2);
            ctx.fill();
        });
        ctx.globalAlpha = 1.0;
        
        // Crown (side view - swept back)
        for (let i = 0; i < 4; i++) {
            const leafColor = i % 3 === 0 ? colors.leafCyan : (i % 3 === 1 ? colors.leafMagenta : colors.leafPurple);
            ctx.fillStyle = leafColor;
            
            const xOffset = -3 + i * 2;
            ctx.beginPath();
            ctx.moveTo(centerX + xOffset, centerY - 10 + bobOffset);
            ctx.lineTo(centerX + xOffset - 1, centerY - 16 + bobOffset);
            ctx.lineTo(centerX + xOffset + 1, centerY - 15 + bobOffset);
            ctx.closePath();
            ctx.fill();
        }
        
        // Eye (one visible from side)
        ctx.fillStyle = colors.eyeGlow;
        ctx.shadowColor = colors.eyeGlow;
        ctx.shadowBlur = 6;
        ctx.beginPath();
        ctx.arc(centerX + 2, centerY - 1 + bobOffset, 2.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.fillStyle = colors.eyeCore;
        ctx.beginPath();
        ctx.arc(centerX + 2, centerY - 1 + bobOffset, 1, 0, Math.PI * 2);
        ctx.fill();
        
        // Smile (side view)
        ctx.strokeStyle = colors.eyeGlow;
        ctx.lineWidth = 1.5;
        ctx.shadowColor = colors.eyeGlow;
        ctx.shadowBlur = 4;
        ctx.beginPath();
        ctx.arc(centerX + 3, centerY + 2 + bobOffset, 3, 0.3, Math.PI - 0.5);
        ctx.stroke();
        ctx.shadowBlur = 0;
        
        // Legs
        ctx.strokeStyle = colors.bodyYellow;
        ctx.lineWidth = 2;
        ctx.shadowColor = colors.bodyYellow;
        ctx.shadowBlur = 3;
        if (frame === 0) {
            ctx.beginPath();
            ctx.moveTo(centerX - 2, centerY + 16);
            ctx.lineTo(centerX - 3, centerY + 20);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(centerX + 3, centerY + 16);
            ctx.lineTo(centerX + 2, centerY + 20);
            ctx.stroke();
        } else {
            ctx.beginPath();
            ctx.moveTo(centerX - 2, centerY + 16);
            ctx.lineTo(centerX - 1, centerY + 20);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(centerX + 3, centerY + 16);
            ctx.lineTo(centerX + 4, centerY + 20);
            ctx.stroke();
        }
        ctx.shadowBlur = 0;
        
    } else if (direction === 'left') {
        // ===== FACING LEFT (mirrored side view) =====
        
        // Body
        ctx.fillStyle = colors.bodyYellow;
        ctx.beginPath();
        ctx.ellipse(centerX, centerY + 3 + bobOffset, 8, 13, 0, 0, Math.PI * 2);
        ctx.fill();
        
        // Diamond pattern
        ctx.strokeStyle = colors.diamondDark;
        ctx.lineWidth = 1.5;
        for (let row = 0; row < 5; row++) {
            const yPos = centerY - 8 + row * 5 + bobOffset;
            ctx.beginPath();
            ctx.moveTo(centerX - 7, yPos);
            ctx.lineTo(centerX + 7, yPos);
            ctx.stroke();
        }
        for (let col = -1; col <= 1; col++) {
            const xPos = centerX + col * 5;
            ctx.beginPath();
            ctx.moveTo(xPos, centerY - 8 + bobOffset);
            ctx.lineTo(xPos, centerY + 14 + bobOffset);
            ctx.stroke();
        }
        
        // Highlights
        ctx.fillStyle = colors.diamondLight;
        ctx.globalAlpha = 0.7;
        [[-2, -2], [3, 4], [-3, 8]].forEach(([dx, dy]) => {
            ctx.beginPath();
            ctx.arc(centerX + dx, centerY + dy + bobOffset, 2, 0, Math.PI * 2);
            ctx.fill();
        });
        ctx.globalAlpha = 1.0;
        
        // Crown (mirrored)
        for (let i = 0; i < 4; i++) {
            const leafColor = i % 3 === 0 ? colors.leafCyan : (i % 3 === 1 ? colors.leafMagenta : colors.leafPurple);
            ctx.fillStyle = leafColor;
            
            const xOffset = 3 - i * 2;
            ctx.beginPath();
            ctx.moveTo(centerX + xOffset, centerY - 10 + bobOffset);
            ctx.lineTo(centerX + xOffset + 1, centerY - 16 + bobOffset);
            ctx.lineTo(centerX + xOffset - 1, centerY - 15 + bobOffset);
            ctx.closePath();
            ctx.fill();
        }
        
        // Eye
        ctx.fillStyle = colors.eyeGlow;
        ctx.shadowColor = colors.eyeGlow;
        ctx.shadowBlur = 6;
        ctx.beginPath();
        ctx.arc(centerX - 2, centerY - 1 + bobOffset, 2.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.fillStyle = colors.eyeCore;
        ctx.beginPath();
        ctx.arc(centerX - 2, centerY - 1 + bobOffset, 1, 0, Math.PI * 2);
        ctx.fill();
        
        // Smile
        ctx.strokeStyle = colors.eyeGlow;
        ctx.lineWidth = 1.5;
        ctx.shadowColor = colors.eyeGlow;
        ctx.shadowBlur = 4;
        ctx.beginPath();
        ctx.arc(centerX - 3, centerY + 2 + bobOffset, 3, -0.3 + Math.PI, Math.PI * 2 - 0.5);
        ctx.stroke();
        ctx.shadowBlur = 0;
        
        // Legs
        ctx.strokeStyle = colors.bodyOrange;
        ctx.lineWidth = 2;
        ctx.shadowColor = colors.bodyOrange;
        ctx.shadowBlur = 3;
        if (frame === 0) {
            ctx.beginPath();
            ctx.moveTo(centerX + 2, centerY + 16);
            ctx.lineTo(centerX + 3, centerY + 20);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(centerX - 3, centerY + 16);
            ctx.lineTo(centerX - 2, centerY + 20);
            ctx.stroke();
        } else {
            ctx.beginPath();
            ctx.moveTo(centerX + 2, centerY + 16);
            ctx.lineTo(centerX + 1, centerY + 20);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(centerX - 3, centerY + 16);
            ctx.lineTo(centerX - 4, centerY + 20);
            ctx.stroke();
        }
        ctx.shadowBlur = 0;
    }
    
    ctx.restore();
}

// Helper function to draw Carl at tile coordinates
function drawCarlAtTile(ctx, tileX, tileY, direction, frame, gameFrame = 0) {
    const TILE = 16;
    drawCarl(ctx, tileX * TILE, tileY * TILE, direction, frame, gameFrame);
}