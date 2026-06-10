// js/rendering/sprites/strawberto.js
// STRAWBERTO - Recurring strawberry NPC
// A sophisticated strawberry gentleman with mustache and straw hat

/**
 * Draw STRAWBERTO sprite
 * @param {CanvasRenderingContext2D} ctx - Canvas context
 * @param {number} x - Screen X position
 * @param {number} y - Screen Y position
 * @param {number} direction - Direction string ('up', 'down', 'left', 'right')
 * @param {number} frame - Animation frame (0 or 1)
 * @param {boolean} hasMonocle - Optional: whether to draw monocle (default false)
 */
function drawStrawberto(ctx, x, y, direction, frame, hasMonocle = false) {
    const TILE = 16;
    const centerX = x;
    const centerY = y ;
    
    // Idle animation - gentle sway
    const bobOffset = frame === 1 ? 0.5 : 0;
    
    // Color palette
    const colors = {
        // Strawberry body
        strawberryRed: '#c62828',
        strawberryLight: '#e53935',
        strawberryDark: '#b71c1c',
        seedYellow: '#fdd835',
        
        // Leaf stem/hat
        leafGreen: '#558b2f',
        leafDark: '#33691e',
        leafLight: '#7cb342',
        
        // Mustache
        mustacheBrown: '#4e342e',
        
        // Eyes/monocle
        eyeWhite: '#ffffff',
        eyeBrown: '#3e2723',
        monocleGold: '#ffd700',
        monocleGlass: 'rgba(255, 255, 255, 0.3)'
    };
    
    ctx.save();
    
    if (direction === 'down') {
        // ===== FACING DOWN (toward camera) =====
        
        // Strawberry body - rounded triangular shape
        ctx.fillStyle = colors.strawberryRed;
        ctx.beginPath();
        ctx.moveTo(centerX, centerY - 10 + bobOffset); // Top point
        ctx.quadraticCurveTo(centerX + 10, centerY - 5 + bobOffset, centerX + 9, centerY + 8 + bobOffset);
        ctx.quadraticCurveTo(centerX + 6, centerY + 14 + bobOffset, centerX, centerY + 16 + bobOffset);
        ctx.quadraticCurveTo(centerX - 6, centerY + 14 + bobOffset, centerX - 9, centerY + 8 + bobOffset);
        ctx.quadraticCurveTo(centerX - 10, centerY - 5 + bobOffset, centerX, centerY - 10 + bobOffset);
        ctx.fill();
        
        // Highlight on left side
        ctx.fillStyle = colors.strawberryLight;
        ctx.beginPath();
        ctx.ellipse(centerX - 4, centerY + 2 + bobOffset, 4, 6, 0.3, 0, Math.PI * 2);
        ctx.fill();
        
        // Seeds (scattered dots)
        ctx.fillStyle = colors.seedYellow;
        const seedPositions = [
            [-3, -4], [3, -3], [-5, 2], [0, 4], [5, 3], [-2, 8], [4, 9]
        ];
        seedPositions.forEach(([dx, dy]) => {
            ctx.beginPath();
            ctx.arc(centerX + dx, centerY + dy + bobOffset, 1, 0, Math.PI * 2);
            ctx.fill();
        });
        
        // Green leaf cap (strawberry top)
        ctx.fillStyle = colors.leafGreen;
        ctx.beginPath();
        for (let i = 0; i < 5; i++) {
            const angle = (i * Math.PI * 2 / 5) - Math.PI / 2;
            const px = centerX + Math.cos(angle) * 8;
            const py = centerY - 10 + bobOffset + Math.sin(angle) * 4;
            if (i === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.fill();
        
        // Straw hat (green, wide brim)
        // Hat crown
        ctx.fillStyle = colors.leafGreen;
        ctx.fillRect(centerX - 6, centerY - 18 + bobOffset, 12, 6);
        // Hat brim
        ctx.fillStyle = colors.leafDark;
        ctx.fillRect(centerX - 10, centerY - 12 + bobOffset, 20, 3);
        // Hat texture (horizontal weave lines)
        ctx.strokeStyle = colors.leafDark;
        ctx.lineWidth = 1;
        for (let i = 0; i < 3; i++) {
            ctx.beginPath();
            ctx.moveTo(centerX - 6, centerY - 16 + i * 2 + bobOffset);
            ctx.lineTo(centerX + 6, centerY - 16 + i * 2 + bobOffset);
            ctx.stroke();
        }
        
        // Bushy eyebrows
        ctx.fillStyle = colors.mustacheBrown;
        // Left eyebrow
        ctx.beginPath();
        ctx.ellipse(centerX - 4, centerY - 4 + bobOffset, 3, 1.5, -0.3, 0, Math.PI * 2);
        ctx.fill();
        // Right eyebrow
        ctx.beginPath();
        ctx.ellipse(centerX + 4, centerY - 4 + bobOffset, 3, 1.5, 0.3, 0, Math.PI * 2);
        ctx.fill();
        
        // Eyes
        ctx.fillStyle = colors.eyeWhite;
        // Left eye
        ctx.beginPath();
        ctx.arc(centerX - 3, centerY - 1 + bobOffset, 2, 0, Math.PI * 2);
        ctx.fill();
        // Right eye
        ctx.beginPath();
        ctx.arc(centerX + 3, centerY - 1 + bobOffset, 2, 0, Math.PI * 2);
        ctx.fill();
        // Pupils
        ctx.fillStyle = colors.eyeBrown;
        ctx.beginPath();
        ctx.arc(centerX - 3, centerY - 1 + bobOffset, 1, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(centerX + 3, centerY - 1 + bobOffset, 1, 0, Math.PI * 2);
        ctx.fill();
        
        // Monocle (optional - on right eye)
        if (hasMonocle) {
            ctx.strokeStyle = colors.monocleGold;
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.arc(centerX + 3, centerY - 1 + bobOffset, 3.5, 0, Math.PI * 2);
            ctx.stroke();
            // Chain
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(centerX + 6, centerY - 1 + bobOffset);
            ctx.lineTo(centerX + 8, centerY + 2 + bobOffset);
            ctx.stroke();
            // Glass reflection
            ctx.fillStyle = colors.monocleGlass;
            ctx.beginPath();
            ctx.arc(centerX + 4, centerY - 2 + bobOffset, 1.5, 0, Math.PI * 2);
            ctx.fill();
        }
        
        // Mustache (bushy, walrus-style)
        ctx.fillStyle = colors.mustacheBrown;
        // Left side
        ctx.beginPath();
        ctx.ellipse(centerX - 4, centerY + 3 + bobOffset, 4, 2, -0.2, 0, Math.PI * 2);
        ctx.fill();
        // Right side
        ctx.beginPath();
        ctx.ellipse(centerX + 4, centerY + 3 + bobOffset, 4, 2, 0.2, 0, Math.PI * 2);
        ctx.fill();
        // Center connection
        ctx.fillRect(centerX - 2, centerY + 2 + bobOffset, 4, 2);
        
        // Legs (simple, like BANDANIEL)
        ctx.strokeStyle = colors.strawberryDark;
        ctx.lineWidth = 2;
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
        
    } else if (direction === 'up') {
        // ===== FACING UP (away from camera) =====
        
        // Strawberry body (back view - rounder)
        ctx.fillStyle = colors.strawberryRed;
        ctx.beginPath();
        ctx.ellipse(centerX, centerY + 3 + bobOffset, 9, 14, 0, 0, Math.PI * 2);
        ctx.fill();
        
        // Back highlight
        ctx.fillStyle = colors.strawberryLight;
        ctx.beginPath();
        ctx.ellipse(centerX + 3, centerY + 2 + bobOffset, 3, 8, 0, 0, Math.PI * 2);
        ctx.fill();
        
        // Seeds
        ctx.fillStyle = colors.seedYellow;
        const seedsBack = [
            [-4, -3], [2, -5], [-6, 3], [1, 5], [5, 1], [-3, 9], [4, 8]
        ];
        seedsBack.forEach(([dx, dy]) => {
            ctx.beginPath();
            ctx.arc(centerX + dx, centerY + dy + bobOffset, 1, 0, Math.PI * 2);
            ctx.fill();
        });
        
        // Leaf cap (visible at top)
        ctx.fillStyle = colors.leafGreen;
        ctx.beginPath();
        for (let i = 0; i < 5; i++) {
            const angle = (i * Math.PI * 2 / 5) - Math.PI / 2;
            const px = centerX + Math.cos(angle) * 7;
            const py = centerY - 10 + bobOffset + Math.sin(angle) * 3;
            if (i === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.fill();
        
        // Straw hat (back view - see brim and crown)
        ctx.fillStyle = colors.leafDark;
        ctx.fillRect(centerX - 10, centerY - 19 + bobOffset, 20, 3); // Brim
        ctx.fillStyle = colors.leafGreen;
        ctx.fillRect(centerX - 6, centerY - 18 + bobOffset, 12, 7); // Crown back
        
        // Legs
        ctx.strokeStyle = colors.strawberryDark;
        ctx.lineWidth = 2;
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
        
    } else if (direction === 'right') {
        // ===== FACING RIGHT (side view) =====
        
        // Strawberry body (tapered triangle from side)
        ctx.fillStyle = colors.strawberryRed;
        ctx.beginPath();
        ctx.moveTo(centerX - 6, centerY - 8 + bobOffset); // Top back
        ctx.quadraticCurveTo(centerX + 2, centerY - 10 + bobOffset, centerX + 8, centerY - 6 + bobOffset); // Top front
        ctx.quadraticCurveTo(centerX + 10, centerY + 2 + bobOffset, centerX + 8, centerY + 10 + bobOffset); // Front curve
        ctx.quadraticCurveTo(centerX + 4, centerY + 15 + bobOffset, centerX, centerY + 16 + bobOffset); // Bottom point
        ctx.quadraticCurveTo(centerX - 4, centerY + 14 + bobOffset, centerX - 7, centerY + 8 + bobOffset); // Back curve
        ctx.quadraticCurveTo(centerX - 8, centerY + bobOffset, centerX - 6, centerY - 8 + bobOffset);
        ctx.fill();
        
        // Side highlight
        ctx.fillStyle = colors.strawberryLight;
        ctx.beginPath();
        ctx.ellipse(centerX + 2, centerY + 2 + bobOffset, 3, 6, 0, 0, Math.PI * 2);
        ctx.fill();
        
        // Seeds
        ctx.fillStyle = colors.seedYellow;
        const seedsSide = [
            [0, -4], [4, -2], [-2, 2], [3, 5], [-3, 8], [5, 8]
        ];
        seedsSide.forEach(([dx, dy]) => {
            ctx.beginPath();
            ctx.arc(centerX + dx, centerY + dy + bobOffset, 1, 0, Math.PI * 2);
            ctx.fill();
        });
        
        // Leaf cap
        ctx.fillStyle = colors.leafGreen;
        ctx.beginPath();
        ctx.moveTo(centerX - 5, centerY - 8 + bobOffset);
        ctx.lineTo(centerX - 3, centerY - 12 + bobOffset);
        ctx.lineTo(centerX, centerY - 10 + bobOffset);
        ctx.lineTo(centerX + 3, centerY - 12 + bobOffset);
        ctx.lineTo(centerX + 6, centerY - 9 + bobOffset);
        ctx.lineTo(centerX + 4, centerY - 7 + bobOffset);
        ctx.lineTo(centerX, centerY - 8 + bobOffset);
        ctx.closePath();
        ctx.fill();
        
        // Straw hat (side view - brim visible)
        ctx.fillStyle = colors.leafGreen;
        ctx.fillRect(centerX - 4, centerY - 18 + bobOffset, 10, 6); // Crown
        ctx.fillStyle = colors.leafDark;
        ctx.beginPath();
        ctx.ellipse(centerX + 1, centerY - 12 + bobOffset, 11, 2, 0, 0, Math.PI * 2);
        ctx.fill();
        
        // Bushy eyebrow (one visible)
        ctx.fillStyle = colors.mustacheBrown;
        ctx.beginPath();
        ctx.ellipse(centerX + 2, centerY - 3 + bobOffset, 3, 1.5, 0, 0, Math.PI * 2);
        ctx.fill();
        
        // Eye
        ctx.fillStyle = colors.eyeWhite;
        ctx.beginPath();
        ctx.arc(centerX + 2, centerY + bobOffset, 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = colors.eyeBrown;
        ctx.beginPath();
        ctx.arc(centerX + 2, centerY + bobOffset, 1, 0, Math.PI * 2);
        ctx.fill();
        
        // Monocle (optional)
        if (hasMonocle) {
            ctx.strokeStyle = colors.monocleGold;
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.arc(centerX + 2, centerY + bobOffset, 3.5, 0, Math.PI * 2);
            ctx.stroke();
            ctx.fillStyle = colors.monocleGlass;
            ctx.beginPath();
            ctx.arc(centerX + 3, centerY - 1 + bobOffset, 1.5, 0, Math.PI * 2);
            ctx.fill();
        }
        
        // Mustache (side view - flows forward)
        ctx.fillStyle = colors.mustacheBrown;
        ctx.beginPath();
        ctx.ellipse(centerX + 4, centerY + 3 + bobOffset, 5, 2, 0, 0, Math.PI * 2);
        ctx.fill();
        // Tip curl
        ctx.beginPath();
        ctx.arc(centerX + 8, centerY + 2 + bobOffset, 1.5, 0, Math.PI * 2);
        ctx.fill();
        
        // Legs
        ctx.strokeStyle = colors.strawberryDark;
        ctx.lineWidth = 2;
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
        
    } else if (direction === 'left') {
        // ===== FACING LEFT (mirrored side view) =====
        
        // Strawberry body (mirrored)
        ctx.fillStyle = colors.strawberryRed;
        ctx.beginPath();
        ctx.moveTo(centerX + 6, centerY - 8 + bobOffset);
        ctx.quadraticCurveTo(centerX - 2, centerY - 10 + bobOffset, centerX - 8, centerY - 6 + bobOffset);
        ctx.quadraticCurveTo(centerX - 10, centerY + 2 + bobOffset, centerX - 8, centerY + 10 + bobOffset);
        ctx.quadraticCurveTo(centerX - 4, centerY + 15 + bobOffset, centerX, centerY + 16 + bobOffset);
        ctx.quadraticCurveTo(centerX + 4, centerY + 14 + bobOffset, centerX + 7, centerY + 8 + bobOffset);
        ctx.quadraticCurveTo(centerX + 8, centerY + bobOffset, centerX + 6, centerY - 8 + bobOffset);
        ctx.fill();
        
        // Highlight
        ctx.fillStyle = colors.strawberryLight;
        ctx.beginPath();
        ctx.ellipse(centerX - 2, centerY + 2 + bobOffset, 3, 6, 0, 0, Math.PI * 2);
        ctx.fill();
        
        // Seeds
        ctx.fillStyle = colors.seedYellow;
        seedsSide.forEach(([dx, dy]) => {
            ctx.beginPath();
            ctx.arc(centerX - dx, centerY + dy + bobOffset, 1, 0, Math.PI * 2);
            ctx.fill();
        });
        
        // Leaf cap
        ctx.fillStyle = colors.leafGreen;
        ctx.beginPath();
        ctx.moveTo(centerX + 5, centerY - 8 + bobOffset);
        ctx.lineTo(centerX + 3, centerY - 12 + bobOffset);
        ctx.lineTo(centerX, centerY - 10 + bobOffset);
        ctx.lineTo(centerX - 3, centerY - 12 + bobOffset);
        ctx.lineTo(centerX - 6, centerY - 9 + bobOffset);
        ctx.lineTo(centerX - 4, centerY - 7 + bobOffset);
        ctx.lineTo(centerX, centerY - 8 + bobOffset);
        ctx.closePath();
        ctx.fill();
        
        // Straw hat (mirrored)
        ctx.fillStyle = colors.leafGreen;
        ctx.fillRect(centerX - 6, centerY - 18 + bobOffset, 10, 6);
        ctx.fillStyle = colors.leafDark;
        ctx.beginPath();
        ctx.ellipse(centerX - 1, centerY - 12 + bobOffset, 11, 2, 0, 0, Math.PI * 2);
        ctx.fill();
        
        // Eyebrow
        ctx.fillStyle = colors.mustacheBrown;
        ctx.beginPath();
        ctx.ellipse(centerX - 2, centerY - 3 + bobOffset, 3, 1.5, 0, 0, Math.PI * 2);
        ctx.fill();
        
        // Eye
        ctx.fillStyle = colors.eyeWhite;
        ctx.beginPath();
        ctx.arc(centerX - 2, centerY + bobOffset, 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = colors.eyeBrown;
        ctx.beginPath();
        ctx.arc(centerX - 2, centerY + bobOffset, 1, 0, Math.PI * 2);
        ctx.fill();
        
        // Monocle (optional)
        if (hasMonocle) {
            ctx.strokeStyle = colors.monocleGold;
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.arc(centerX - 2, centerY + bobOffset, 3.5, 0, Math.PI * 2);
            ctx.stroke();
            ctx.fillStyle = colors.monocleGlass;
            ctx.beginPath();
            ctx.arc(centerX - 3, centerY - 1 + bobOffset, 1.5, 0, Math.PI * 2);
            ctx.fill();
        }
        
        // Mustache (mirrored)
        ctx.fillStyle = colors.mustacheBrown;
        ctx.beginPath();
        ctx.ellipse(centerX - 4, centerY + 3 + bobOffset, 5, 2, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(centerX - 8, centerY + 2 + bobOffset, 1.5, 0, Math.PI * 2);
        ctx.fill();
        
        // Legs
        ctx.strokeStyle = colors.strawberryDark;
        ctx.lineWidth = 2;
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
    }
    
    ctx.restore();
}

// Helper function to draw STRAWBERTO at tile coordinates
function drawStrawbertoAtTile(ctx, tileX, tileY, direction, frame, hasMonocle = false) {
    const TILE = 16;
    drawStrawberto(ctx, tileX * TILE, tileY * TILE, direction, frame, hasMonocle);
}