// js/rendering/sprites/chuck-cherry.js
// CHUCK CHERRY - Rock 'n' roll cherry with leather jacket and attitude
// Named after Chuck Berry, loves rock music

/**
 * Draw CHUCK CHERRY sprite
 * @param {CanvasRenderingContext2D} ctx - Canvas context
 * @param {number} x - Screen X position
 * @param {number} y - Screen Y position
 * @param {string} direction - Direction ('up', 'down', 'left', 'right')
 * @param {number} frame - Animation frame (0 or 1)
 */
function drawChuckCherry(ctx, x, y, direction, frame) {
    const TILE = 16;
    const centerX = x;
    const centerY = y;
    
    // Walk animation offset (slight bob)
    const bobOffset = frame === 1 ? 1 : 0;
    
    // Color palette - cherry red with rock 'n' roll style
    const colors = {
        // Cherry body (bright red)
        cherryRed: '#dc143c',
        cherryLight: '#ff1744',
        cherryDark: '#b71c1c',
        cherryShadow: '#8b0000',
        
        // Stem and leaf
        stemBrown: '#6d4c41',
        leafGreen: '#2e7d32',
        leafLight: '#4caf50',
        
        // Leather jacket (dark, cool)
        jacketBlack: '#1a1a1a',
        jacketDark: '#2c2c2c',
        jacketHighlight: '#424242',
        
        // Sunglasses (aviator style)
        sunglassesDark: '#1a1a1a',
        lensesBlack: '#000000',
        lensesReflection: 'rgba(255, 255, 255, 0.3)',
        
        // Details
        bootBlack: '#0d0d0d',
        jeanBlue: '#1565c0'
    };
    
    ctx.save();
    
    if (direction === 'down') {
        // ===== FACING DOWN (toward camera) =====
        
        // Cherry body (round, glossy)
        ctx.fillStyle = colors.cherryRed;
        ctx.beginPath();
        ctx.arc(centerX, centerY + 2 + bobOffset, 9, 0, Math.PI * 2);
        ctx.fill();
        
        // Glossy highlight (top-left)
        ctx.fillStyle = colors.cherryLight;
        ctx.beginPath();
        ctx.arc(centerX - 3, centerY - 1 + bobOffset, 3, 0, Math.PI * 2);
        ctx.fill();
        
        // Shadow on bottom
        ctx.fillStyle = colors.cherryDark;
        ctx.beginPath();
        ctx.arc(centerX, centerY + 7 + bobOffset, 7, 0, Math.PI);
        ctx.fill();
        
        // Stem on top
        ctx.fillStyle = colors.stemBrown;
        ctx.fillRect(centerX - 1, centerY - 8 + bobOffset, 2, 4);
        
        // Leaf
        ctx.fillStyle = colors.leafGreen;
        ctx.beginPath();
        ctx.ellipse(centerX + 3, centerY - 8 + bobOffset, 3, 2, 0.5, 0, Math.PI * 2);
        ctx.fill();
        
        // Leaf highlight
        ctx.fillStyle = colors.leafLight;
        ctx.beginPath();
        ctx.ellipse(centerX + 3, centerY - 8 + bobOffset, 1.5, 1, 0.5, 0, Math.PI * 2);
        ctx.fill();
        
        // Leather jacket collar (V-neck, open)
        ctx.fillStyle = colors.jacketBlack;
        // Left collar
        ctx.beginPath();
        ctx.moveTo(centerX - 6, centerY + bobOffset);
        ctx.lineTo(centerX - 8, centerY + 4 + bobOffset);
        ctx.lineTo(centerX - 4, centerY + 4 + bobOffset);
        ctx.closePath();
        ctx.fill();
        
        // Right collar
        ctx.beginPath();
        ctx.moveTo(centerX + 6, centerY + bobOffset);
        ctx.lineTo(centerX + 8, centerY + 4 + bobOffset);
        ctx.lineTo(centerX + 4, centerY + 4 + bobOffset);
        ctx.closePath();
        ctx.fill();
        
        // Jacket highlights
        ctx.fillStyle = colors.jacketHighlight;
        ctx.fillRect(centerX - 7, centerY + 1 + bobOffset, 1, 3);
        ctx.fillRect(centerX + 6, centerY + 1 + bobOffset, 1, 3);
        
        // Aviator sunglasses (cool rock star style)
        ctx.fillStyle = colors.sunglassesDark;
        // Left lens
        ctx.beginPath();
        ctx.ellipse(centerX - 4, centerY - 1 + bobOffset, 3, 3, 0, 0, Math.PI * 2);
        ctx.fill();
        // Right lens
        ctx.beginPath();
        ctx.ellipse(centerX + 4, centerY - 1 + bobOffset, 3, 3, 0, 0, Math.PI * 2);
        ctx.fill();
        // Bridge
        ctx.fillRect(centerX - 1, centerY - 1 + bobOffset, 2, 1);
        
        // Dark lenses
        ctx.fillStyle = colors.lensesBlack;
        ctx.beginPath();
        ctx.ellipse(centerX - 4, centerY - 1 + bobOffset, 2, 2, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.ellipse(centerX + 4, centerY - 1 + bobOffset, 2, 2, 0, 0, Math.PI * 2);
        ctx.fill();
        
        // Lens reflections
        ctx.fillStyle = colors.lensesReflection;
        ctx.beginPath();
        ctx.arc(centerX - 5, centerY - 2 + bobOffset, 1, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(centerX + 3, centerY - 2 + bobOffset, 1, 0, Math.PI * 2);
        ctx.fill();
        
        // Cool smirk
        ctx.strokeStyle = colors.cherryShadow;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(centerX - 2, centerY + 4 + bobOffset);
        ctx.quadraticCurveTo(centerX, centerY + 5 + bobOffset, centerX + 2, centerY + 4 + bobOffset);
        ctx.stroke();
        
        // === ELECTRIC GUITAR (held to the side) ===
        // Guitar body (classic electric guitar shape)
        ctx.fillStyle = '#c62828';  // Red guitar
        ctx.beginPath();
        // Upper bout
        ctx.ellipse(centerX + 10, centerY + 3 + bobOffset, 3, 4, 0, 0, Math.PI * 2);
        ctx.fill();
        // Lower bout
        ctx.beginPath();
        ctx.ellipse(centerX + 10, centerY + 9 + bobOffset, 3.5, 5, 0, 0, Math.PI * 2);
        ctx.fill();
        
        // Guitar neck
        ctx.fillStyle = '#5d4037';  // Brown neck
        ctx.fillRect(centerX + 9, centerY - 4 + bobOffset, 2, 7);
        
        // Headstock
        ctx.fillRect(centerX + 8, centerY - 6 + bobOffset, 4, 2);
        
        // Pickguard (white accent)
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(centerX + 10, centerY + 5 + bobOffset, 2, 3);
        
        // Strings
        ctx.strokeStyle = '#b0b0b0';
        ctx.lineWidth = 0.5;
        for (let i = 0; i < 6; i++) {
            ctx.beginPath();
            ctx.moveTo(centerX + 9.5 + (i * 0.3), centerY - 5 + bobOffset);
            ctx.lineTo(centerX + 9.5 + (i * 0.3), centerY + 12 + bobOffset);
            ctx.stroke();
        }
        
        // Pickups (black rectangles)
        ctx.fillStyle = '#000000';
        ctx.fillRect(centerX + 9, centerY + 2 + bobOffset, 2, 1);
        ctx.fillRect(centerX + 9, centerY + 8 + bobOffset, 2, 1);
        
        // Legs (jeans)
        ctx.strokeStyle = colors.jeanBlue;
        ctx.lineWidth = 3;
        if (frame === 0) {
            ctx.beginPath();
            ctx.moveTo(centerX - 3, centerY + 11);
            ctx.lineTo(centerX - 4, centerY + 18);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(centerX + 3, centerY + 11);
            ctx.lineTo(centerX + 2, centerY + 18);
            ctx.stroke();
        } else {
            ctx.beginPath();
            ctx.moveTo(centerX - 3, centerY + 11);
            ctx.lineTo(centerX - 2, centerY + 18);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(centerX + 3, centerY + 11);
            ctx.lineTo(centerX + 4, centerY + 18);
            ctx.stroke();
        }
        
        // Black boots
        ctx.fillStyle = colors.bootBlack;
        if (frame === 0) {
            ctx.fillRect(centerX - 5, centerY + 18, 3, 3);
            ctx.fillRect(centerX + 1, centerY + 18, 3, 3);
        } else {
            ctx.fillRect(centerX - 3, centerY + 18, 3, 3);
            ctx.fillRect(centerX + 3, centerY + 18, 3, 3);
        }
        
    } else if (direction === 'up') {
        // ===== FACING UP (away from camera) =====
        
        // Cherry body (back view)
        ctx.fillStyle = colors.cherryRed;
        ctx.beginPath();
        ctx.arc(centerX, centerY + 2 + bobOffset, 9, 0, Math.PI * 2);
        ctx.fill();
        
        // Back shading
        ctx.fillStyle = colors.cherryDark;
        ctx.beginPath();
        ctx.arc(centerX, centerY + 6 + bobOffset, 7, 0, Math.PI);
        ctx.fill();
        
        // Stem (back view)
        ctx.fillStyle = colors.stemBrown;
        ctx.fillRect(centerX - 1, centerY - 8 + bobOffset, 2, 4);
        
        // Leaf (back view)
        ctx.fillStyle = colors.leafGreen;
        ctx.beginPath();
        ctx.ellipse(centerX - 3, centerY - 8 + bobOffset, 3, 2, -0.5, 0, Math.PI * 2);
        ctx.fill();
        
        // Leather jacket back
        ctx.fillStyle = colors.jacketBlack;
        ctx.fillRect(centerX - 7, centerY + 1 + bobOffset, 14, 8);
        
        // Jacket highlights (back seams)
        ctx.fillStyle = colors.jacketHighlight;
        ctx.fillRect(centerX - 1, centerY + 1 + bobOffset, 2, 8);
        
        // === GUITAR (back view - just the neck sticking up) ===
        ctx.fillStyle = '#5d4037';  // Brown neck
        ctx.fillRect(centerX + 8, centerY - 5 + bobOffset, 2, 10);
        
        // Headstock
        ctx.fillRect(centerX + 7, centerY - 7 + bobOffset, 4, 2);
        
        // Tuning pegs
        ctx.fillStyle = '#9e9e9e';
        ctx.fillRect(centerX + 6, centerY - 6 + bobOffset, 1, 1);
        ctx.fillRect(centerX + 11, centerY - 6 + bobOffset, 1, 1);
        
        // Legs (back view)
        ctx.strokeStyle = colors.jeanBlue;
        ctx.lineWidth = 3;
        if (frame === 0) {
            ctx.beginPath();
            ctx.moveTo(centerX - 3, centerY + 11);
            ctx.lineTo(centerX - 4, centerY + 18);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(centerX + 3, centerY + 11);
            ctx.lineTo(centerX + 2, centerY + 18);
            ctx.stroke();
        } else {
            ctx.beginPath();
            ctx.moveTo(centerX - 3, centerY + 11);
            ctx.lineTo(centerX - 2, centerY + 18);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(centerX + 3, centerY + 11);
            ctx.lineTo(centerX + 4, centerY + 18);
            ctx.stroke();
        }
        
        // Boots
        ctx.fillStyle = colors.bootBlack;
        if (frame === 0) {
            ctx.fillRect(centerX - 5, centerY + 18, 3, 3);
            ctx.fillRect(centerX + 1, centerY + 18, 3, 3);
        } else {
            ctx.fillRect(centerX - 3, centerY + 18, 3, 3);
            ctx.fillRect(centerX + 3, centerY + 18, 3, 3);
        }
        
    } else if (direction === 'right') {
        // ===== FACING RIGHT (side view) =====
        
        // Cherry body (side profile)
        ctx.fillStyle = colors.cherryRed;
        ctx.beginPath();
        ctx.arc(centerX, centerY + 2 + bobOffset, 9, 0, Math.PI * 2);
        ctx.fill();
        
        // Side highlight
        ctx.fillStyle = colors.cherryLight;
        ctx.beginPath();
        ctx.arc(centerX + 2, centerY + bobOffset, 3, 0, Math.PI * 2);
        ctx.fill();
        
        // Shadow
        ctx.fillStyle = colors.cherryDark;
        ctx.beginPath();
        ctx.arc(centerX - 1, centerY + 6 + bobOffset, 7, 0, Math.PI);
        ctx.fill();
        
        // Stem (side angle)
        ctx.fillStyle = colors.stemBrown;
        ctx.beginPath();
        ctx.moveTo(centerX, centerY - 7 + bobOffset);
        ctx.lineTo(centerX + 2, centerY - 10 + bobOffset);
        ctx.lineTo(centerX + 3, centerY - 9 + bobOffset);
        ctx.lineTo(centerX + 1, centerY - 6 + bobOffset);
        ctx.closePath();
        ctx.fill();
        
        // Leaf
        ctx.fillStyle = colors.leafGreen;
        ctx.beginPath();
        ctx.ellipse(centerX + 3, centerY - 9 + bobOffset, 3, 2, 0.3, 0, Math.PI * 2);
        ctx.fill();
        
        // Leather jacket (side)
        ctx.fillStyle = colors.jacketBlack;
        ctx.fillRect(centerX - 6, centerY + 1 + bobOffset, 12, 7);
        
        // Collar edge
        ctx.fillStyle = colors.jacketHighlight;
        ctx.fillRect(centerX + 4, centerY + 1 + bobOffset, 2, 7);
        
        // Sunglasses (side view - one lens)
        ctx.fillStyle = colors.sunglassesDark;
        ctx.beginPath();
        ctx.ellipse(centerX + 1, centerY + bobOffset, 3, 3, 0, 0, Math.PI * 2);
        ctx.fill();
        
        // Temple
        ctx.strokeStyle = colors.sunglassesDark;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(centerX - 2, centerY + bobOffset);
        ctx.lineTo(centerX - 7, centerY + bobOffset);
        ctx.stroke();
        
        // Dark lens
        ctx.fillStyle = colors.lensesBlack;
        ctx.beginPath();
        ctx.ellipse(centerX + 1, centerY + bobOffset, 2, 2, 0, 0, Math.PI * 2);
        ctx.fill();
        
        // Reflection
        ctx.fillStyle = colors.lensesReflection;
        ctx.beginPath();
        ctx.arc(centerX, centerY - 1 + bobOffset, 1, 0, Math.PI * 2);
        ctx.fill();
        
        // Smirk
        ctx.strokeStyle = colors.cherryShadow;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(centerX + 4, centerY + 4 + bobOffset, 2, -0.3, 0.8);
        ctx.stroke();
        
        // === GUITAR (side view - full profile) ===
        // Guitar body
        ctx.fillStyle = '#c62828';
        ctx.beginPath();
        ctx.ellipse(centerX + 11, centerY + 6 + bobOffset, 4, 6, 0, 0, Math.PI * 2);
        ctx.fill();
        
        // Guitar neck
        ctx.fillStyle = '#5d4037';
        ctx.fillRect(centerX + 10, centerY - 4 + bobOffset, 2, 10);
        
        // Headstock
        ctx.fillRect(centerX + 9, centerY - 6 + bobOffset, 4, 2);
        
        // Strings (side view)
        ctx.strokeStyle = '#b0b0b0';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(centerX + 11, centerY - 5 + bobOffset);
        ctx.lineTo(centerX + 11, centerY + 11 + bobOffset);
        ctx.stroke();
        
        // Legs
        ctx.strokeStyle = colors.jeanBlue;
        ctx.lineWidth = 3;
        if (frame === 0) {
            ctx.beginPath();
            ctx.moveTo(centerX - 2, centerY + 11);
            ctx.lineTo(centerX - 4, centerY + 18);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(centerX + 3, centerY + 11);
            ctx.lineTo(centerX + 2, centerY + 18);
            ctx.stroke();
        } else {
            ctx.beginPath();
            ctx.moveTo(centerX - 2, centerY + 11);
            ctx.lineTo(centerX - 1, centerY + 18);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(centerX + 3, centerY + 11);
            ctx.lineTo(centerX + 5, centerY + 18);
            ctx.stroke();
        }
        
        // Boots
        ctx.fillStyle = colors.bootBlack;
        if (frame === 0) {
            ctx.fillRect(centerX - 5, centerY + 18, 3, 3);
            ctx.fillRect(centerX + 1, centerY + 18, 3, 3);
        } else {
            ctx.fillRect(centerX - 2, centerY + 18, 3, 3);
            ctx.fillRect(centerX + 4, centerY + 18, 3, 3);
        }
        
    } else if (direction === 'left') {
        // ===== FACING LEFT (mirrored side view) =====
        
        // Cherry body
        ctx.fillStyle = colors.cherryRed;
        ctx.beginPath();
        ctx.arc(centerX, centerY + 2 + bobOffset, 9, 0, Math.PI * 2);
        ctx.fill();
        
        // Side highlight
        ctx.fillStyle = colors.cherryLight;
        ctx.beginPath();
        ctx.arc(centerX - 2, centerY + bobOffset, 3, 0, Math.PI * 2);
        ctx.fill();
        
        // Shadow
        ctx.fillStyle = colors.cherryDark;
        ctx.beginPath();
        ctx.arc(centerX + 1, centerY + 6 + bobOffset, 7, 0, Math.PI);
        ctx.fill();
        
        // Stem (mirrored)
        ctx.fillStyle = colors.stemBrown;
        ctx.beginPath();
        ctx.moveTo(centerX, centerY - 7 + bobOffset);
        ctx.lineTo(centerX - 2, centerY - 10 + bobOffset);
        ctx.lineTo(centerX - 3, centerY - 9 + bobOffset);
        ctx.lineTo(centerX - 1, centerY - 6 + bobOffset);
        ctx.closePath();
        ctx.fill();
        
        // Leaf
        ctx.fillStyle = colors.leafGreen;
        ctx.beginPath();
        ctx.ellipse(centerX - 3, centerY - 9 + bobOffset, 3, 2, -0.3, 0, Math.PI * 2);
        ctx.fill();
        
        // Leather jacket
        ctx.fillStyle = colors.jacketBlack;
        ctx.fillRect(centerX - 6, centerY + 1 + bobOffset, 12, 7);
        
        // Collar edge
        ctx.fillStyle = colors.jacketHighlight;
        ctx.fillRect(centerX - 6, centerY + 1 + bobOffset, 2, 7);
        
        // Sunglasses (side view - one lens, mirrored)
        ctx.fillStyle = colors.sunglassesDark;
        ctx.beginPath();
        ctx.ellipse(centerX - 1, centerY + bobOffset, 3, 3, 0, 0, Math.PI * 2);
        ctx.fill();
        
        // Temple
        ctx.strokeStyle = colors.sunglassesDark;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(centerX + 2, centerY + bobOffset);
        ctx.lineTo(centerX + 7, centerY + bobOffset);
        ctx.stroke();
        
        // Dark lens
        ctx.fillStyle = colors.lensesBlack;
        ctx.beginPath();
        ctx.ellipse(centerX - 1, centerY + bobOffset, 2, 2, 0, 0, Math.PI * 2);
        ctx.fill();
        
        // Reflection
        ctx.fillStyle = colors.lensesReflection;
        ctx.beginPath();
        ctx.arc(centerX, centerY - 1 + bobOffset, 1, 0, Math.PI * 2);
        ctx.fill();
        
        // Smirk
        ctx.strokeStyle = colors.cherryShadow;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(centerX - 4, centerY + 4 + bobOffset, 2, Math.PI - 0.8, Math.PI + 0.3);
        ctx.stroke();
        
        // === GUITAR (left side view - mirrored) ===
        // Guitar body
        ctx.fillStyle = '#c62828';
        ctx.beginPath();
        ctx.ellipse(centerX - 11, centerY + 6 + bobOffset, 4, 6, 0, 0, Math.PI * 2);
        ctx.fill();
        
        // Guitar neck
        ctx.fillStyle = '#5d4037';
        ctx.fillRect(centerX - 12, centerY - 4 + bobOffset, 2, 10);
        
        // Headstock
        ctx.fillRect(centerX - 13, centerY - 6 + bobOffset, 4, 2);
        
        // Strings (side view)
        ctx.strokeStyle = '#b0b0b0';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(centerX - 11, centerY - 5 + bobOffset);
        ctx.lineTo(centerX - 11, centerY + 11 + bobOffset);
        ctx.stroke();
        
        // Legs
        ctx.strokeStyle = colors.jeanBlue;
        ctx.lineWidth = 3;
        if (frame === 0) {
            ctx.beginPath();
            ctx.moveTo(centerX + 2, centerY + 11);
            ctx.lineTo(centerX + 4, centerY + 18);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(centerX - 3, centerY + 11);
            ctx.lineTo(centerX - 2, centerY + 18);
            ctx.stroke();
        } else {
            ctx.beginPath();
            ctx.moveTo(centerX + 2, centerY + 11);
            ctx.lineTo(centerX + 1, centerY + 18);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(centerX - 3, centerY + 11);
            ctx.lineTo(centerX - 5, centerY + 18);
            ctx.stroke();
        }
        
        // Boots
        ctx.fillStyle = colors.bootBlack;
        if (frame === 0) {
            ctx.fillRect(centerX + 2, centerY + 18, 3, 3);
            ctx.fillRect(centerX - 4, centerY + 18, 3, 3);
        } else {
            ctx.fillRect(centerX, centerY + 18, 3, 3);
            ctx.fillRect(centerX - 6, centerY + 18, 3, 3);
        }
    }
    
    ctx.restore();
}

// Helper function to draw CHUCK CHERRY at tile coordinates
function drawChuckCherryAtTile(ctx, tileX, tileY, direction, frame) {
    const TILE = 16;
    drawChuckCherry(ctx, tileX * TILE, tileY * TILE, direction, frame);
}
