// js/rendering/sprites/kim.js
// KIM - Music festival kiwi with fuzzy brown exterior and green flesh
// Casual festival-goer vibes, friendly and chill

/**
 * Draw KIM sprite
 * @param {CanvasRenderingContext2D} ctx - Canvas context
 * @param {number} x - Screen X position
 * @param {number} y - Screen Y position
 * @param {string} direction - Direction ('up', 'down', 'left', 'right')
 * @param {number} frame - Animation frame (0 or 1)
 */
function drawKim(ctx, x, y, direction, frame) {
    const TILE = 16;
    const centerX = x;
    const centerY = y;
    
    // Walk animation offset (slight bob)
    const bobOffset = frame === 1 ? 1 : 0;
    
    // Color palette - kiwi colors
    const colors = {
        // Brown fuzzy exterior
        brownBase: '#6d4c41',
        brownDark: '#4e342e',
        brownLight: '#8d6e63',
        fuzz: '#5d4037',
        
        // Green flesh interior
        greenFlesh: '#7cb342',
        greenLight: '#9ccc65',
        greenDark: '#558b2f',
        
        // Seeds/details
        seedBlack: '#1a1a1a',
        seedRing: 'rgba(200, 230, 201, 0.4)',
        
        // Festival accessories
        bandanaRed: '#d32f2f',      // Red bandana/headband
        bandanaPattern: '#ffffff',   // White pattern on bandana
        
        // Eyes
        eyeWhite: '#ffffff',
        eyeBlack: '#1a1a1a',
        
        // Smile
        smileBrown: '#3e2723',
    };
    
    ctx.save();
    
    if (direction === 'down') {
        // ===== FACING DOWN (toward camera) =====
        
        // Main kiwi body (oval, fuzzy brown)
        ctx.fillStyle = colors.brownBase;
        ctx.beginPath();
        ctx.ellipse(centerX, centerY + 2 + bobOffset, 8, 10, 0, 0, Math.PI * 2);
        ctx.fill();
        
        // Fuzzy texture (small dots all around)
        ctx.fillStyle = colors.fuzz;
        for (let i = 0; i < 12; i++) {
            const angle = (Math.PI * 2 / 12) * i;
            const radius = 7;
            const dotX = centerX + Math.cos(angle) * radius;
            const dotY = centerY + 2 + bobOffset + Math.sin(angle) * radius * 1.2;
            ctx.beginPath();
            ctx.arc(dotX, dotY, 0.5, 0, Math.PI * 2);
            ctx.fill();
        }
        
        // Dark shading on bottom
        ctx.fillStyle = colors.brownDark;
        ctx.beginPath();
        ctx.ellipse(centerX, centerY + 8 + bobOffset, 7, 3, 0, 0, Math.PI);
        ctx.fill();
        
        // Green flesh "slice" showing (like a cut kiwi - small peek)
        ctx.fillStyle = colors.greenFlesh;
        ctx.beginPath();
        ctx.arc(centerX - 5, centerY + bobOffset, 2.5, 0, Math.PI * 2);
        ctx.fill();
        
        // Light green highlight
        ctx.fillStyle = colors.greenLight;
        ctx.beginPath();
        ctx.arc(centerX - 5.5, centerY - 0.5 + bobOffset, 1, 0, Math.PI * 2);
        ctx.fill();
        
        // Tiny seeds in the green flesh
        ctx.fillStyle = colors.seedBlack;
        for (let i = 0; i < 4; i++) {
            const angle = (Math.PI * 2 / 4) * i;
            const seedX = centerX - 5 + Math.cos(angle) * 1.2;
            const seedY = centerY + bobOffset + Math.sin(angle) * 1.2;
            ctx.beginPath();
            ctx.arc(seedX, seedY, 0.3, 0, Math.PI * 2);
            ctx.fill();
        }
        
        // Red bandana/headband on top
        ctx.fillStyle = colors.bandanaRed;
        ctx.fillRect(centerX - 8, centerY - 8 + bobOffset, 16, 3);
        
        // White pattern on bandana (simple dots)
        ctx.fillStyle = colors.bandanaPattern;
        ctx.beginPath();
        ctx.arc(centerX - 5, centerY - 6.5 + bobOffset, 0.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(centerX, centerY - 6.5 + bobOffset, 0.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(centerX + 5, centerY - 6.5 + bobOffset, 0.5, 0, Math.PI * 2);
        ctx.fill();
        
        // Eyes (friendly and open)
        ctx.fillStyle = colors.eyeWhite;
        // Left eye
        ctx.beginPath();
        ctx.ellipse(centerX - 3, centerY - 2 + bobOffset, 2, 2.5, 0, 0, Math.PI * 2);
        ctx.fill();
        // Right eye
        ctx.beginPath();
        ctx.ellipse(centerX + 3, centerY - 2 + bobOffset, 2, 2.5, 0, 0, Math.PI * 2);
        ctx.fill();
        
        // Pupils
        ctx.fillStyle = colors.eyeBlack;
        ctx.beginPath();
        ctx.arc(centerX - 3, centerY - 1 + bobOffset, 1, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(centerX + 3, centerY - 1 + bobOffset, 1, 0, Math.PI * 2);
        ctx.fill();
        
        // Friendly smile
        ctx.strokeStyle = colors.smileBrown;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(centerX, centerY + 3 + bobOffset, 3, 0.2, Math.PI - 0.2);
        ctx.stroke();
        
        // Legs (festival sandals stance)
        ctx.strokeStyle = colors.brownDark;
        ctx.lineWidth = 2;
        if (frame === 0) {
            ctx.beginPath();
            ctx.moveTo(centerX - 3, centerY + 12);
            ctx.lineTo(centerX - 4, centerY + 18);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(centerX + 3, centerY + 12);
            ctx.lineTo(centerX + 2, centerY + 18);
            ctx.stroke();
        } else {
            ctx.beginPath();
            ctx.moveTo(centerX - 3, centerY + 12);
            ctx.lineTo(centerX - 2, centerY + 18);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(centerX + 3, centerY + 12);
            ctx.lineTo(centerX + 4, centerY + 18);
            ctx.stroke();
        }
        
        // Sandals (simple brown rectangles)
        ctx.fillStyle = colors.brownLight;
        if (frame === 0) {
            ctx.fillRect(centerX - 5, centerY + 18, 3, 2);
            ctx.fillRect(centerX + 1, centerY + 18, 3, 2);
        } else {
            ctx.fillRect(centerX - 3, centerY + 18, 3, 2);
            ctx.fillRect(centerX + 3, centerY + 18, 3, 2);
        }
        
    } else if (direction === 'up') {
        // ===== FACING UP (away from camera) =====
        
        // Main kiwi body (back view)
        ctx.fillStyle = colors.brownBase;
        ctx.beginPath();
        ctx.ellipse(centerX, centerY + 2 + bobOffset, 8, 10, 0, 0, Math.PI * 2);
        ctx.fill();
        
        // Fuzzy texture
        ctx.fillStyle = colors.fuzz;
        for (let i = 0; i < 12; i++) {
            const angle = (Math.PI * 2 / 12) * i;
            const radius = 7;
            const dotX = centerX + Math.cos(angle) * radius;
            const dotY = centerY + 2 + bobOffset + Math.sin(angle) * radius * 1.2;
            ctx.beginPath();
            ctx.arc(dotX, dotY, 0.5, 0, Math.PI * 2);
            ctx.fill();
        }
        
        // Dark shading
        ctx.fillStyle = colors.brownDark;
        ctx.beginPath();
        ctx.ellipse(centerX, centerY + 8 + bobOffset, 7, 3, 0, 0, Math.PI);
        ctx.fill();
        
        // Bandana knot at back
        ctx.fillStyle = colors.bandanaRed;
        ctx.fillRect(centerX - 7, centerY - 7 + bobOffset, 14, 2);
        // Knot tails
        ctx.beginPath();
        ctx.moveTo(centerX, centerY - 7 + bobOffset);
        ctx.lineTo(centerX - 2, centerY - 10 + bobOffset);
        ctx.lineTo(centerX - 1, centerY - 10 + bobOffset);
        ctx.closePath();
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(centerX, centerY - 7 + bobOffset);
        ctx.lineTo(centerX + 2, centerY - 10 + bobOffset);
        ctx.lineTo(centerX + 1, centerY - 10 + bobOffset);
        ctx.closePath();
        ctx.fill();
        
        // Legs (back view)
        ctx.strokeStyle = colors.brownDark;
        ctx.lineWidth = 2;
        if (frame === 0) {
            ctx.beginPath();
            ctx.moveTo(centerX - 3, centerY + 12);
            ctx.lineTo(centerX - 4, centerY + 18);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(centerX + 3, centerY + 12);
            ctx.lineTo(centerX + 2, centerY + 18);
            ctx.stroke();
        } else {
            ctx.beginPath();
            ctx.moveTo(centerX - 3, centerY + 12);
            ctx.lineTo(centerX - 2, centerY + 18);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(centerX + 3, centerY + 12);
            ctx.lineTo(centerX + 4, centerY + 18);
            ctx.stroke();
        }
        
        // Sandals
        ctx.fillStyle = colors.brownLight;
        if (frame === 0) {
            ctx.fillRect(centerX - 5, centerY + 18, 3, 2);
            ctx.fillRect(centerX + 1, centerY + 18, 3, 2);
        } else {
            ctx.fillRect(centerX - 3, centerY + 18, 3, 2);
            ctx.fillRect(centerX + 3, centerY + 18, 3, 2);
        }
        
    } else if (direction === 'right') {
        // ===== FACING RIGHT (side view) =====
        
        // Main kiwi body (side profile)
        ctx.fillStyle = colors.brownBase;
        ctx.beginPath();
        ctx.ellipse(centerX, centerY + 2 + bobOffset, 7, 10, 0, 0, Math.PI * 2);
        ctx.fill();
        
        // Fuzzy texture on visible side
        ctx.fillStyle = colors.fuzz;
        for (let i = 0; i < 10; i++) {
            const angle = (Math.PI * 2 / 10) * i;
            const radius = 6;
            const dotX = centerX + Math.cos(angle) * radius;
            const dotY = centerY + 2 + bobOffset + Math.sin(angle) * radius * 1.4;
            if (dotX > centerX - 2) { // Only show fuzz on right side
                ctx.beginPath();
                ctx.arc(dotX, dotY, 0.5, 0, Math.PI * 2);
                ctx.fill();
            }
        }
        
        // Green flesh showing on left edge
        ctx.fillStyle = colors.greenFlesh;
        ctx.beginPath();
        ctx.ellipse(centerX - 4, centerY + 2 + bobOffset, 3, 8, 0, 0, Math.PI * 2);
        ctx.fill();
        
        // Light green center
        ctx.fillStyle = colors.greenLight;
        ctx.beginPath();
        ctx.ellipse(centerX - 4, centerY + 2 + bobOffset, 2, 6, 0, 0, Math.PI * 2);
        ctx.fill();
        
        // Seeds in green flesh (radiating pattern)
        ctx.fillStyle = colors.seedBlack;
        for (let i = 0; i < 6; i++) {
            const angle = (Math.PI * 2 / 6) * i;
            const seedX = centerX - 4 + Math.cos(angle) * 1.5;
            const seedY = centerY + 2 + bobOffset + Math.sin(angle) * 2;
            ctx.beginPath();
            ctx.arc(seedX, seedY, 0.3, 0, Math.PI * 2);
            ctx.fill();
        }
        
        // Bandana (side view)
        ctx.fillStyle = colors.bandanaRed;
        ctx.fillRect(centerX - 5, centerY - 7 + bobOffset, 10, 3);
        // Bandana pattern
        ctx.fillStyle = colors.bandanaPattern;
        ctx.beginPath();
        ctx.arc(centerX - 2, centerY - 5.5 + bobOffset, 0.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(centerX + 2, centerY - 5.5 + bobOffset, 0.5, 0, Math.PI * 2);
        ctx.fill();
        
        // Eye (one visible from side)
        ctx.fillStyle = colors.eyeWhite;
        ctx.beginPath();
        ctx.ellipse(centerX + 2, centerY - 1 + bobOffset, 2, 2.5, 0, 0, Math.PI * 2);
        ctx.fill();
        
        // Pupil
        ctx.fillStyle = colors.eyeBlack;
        ctx.beginPath();
        ctx.arc(centerX + 2, centerY + bobOffset, 1, 0, Math.PI * 2);
        ctx.fill();
        
        // Smile (side view)
        ctx.strokeStyle = colors.smileBrown;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(centerX + 4, centerY + 3 + bobOffset, 2, -0.3, 0.8);
        ctx.stroke();
        
        // Legs
        ctx.strokeStyle = colors.brownDark;
        ctx.lineWidth = 2;
        if (frame === 0) {
            ctx.beginPath();
            ctx.moveTo(centerX - 2, centerY + 12);
            ctx.lineTo(centerX - 4, centerY + 18);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(centerX + 3, centerY + 12);
            ctx.lineTo(centerX + 2, centerY + 18);
            ctx.stroke();
        } else {
            ctx.beginPath();
            ctx.moveTo(centerX - 2, centerY + 12);
            ctx.lineTo(centerX - 1, centerY + 18);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(centerX + 3, centerY + 12);
            ctx.lineTo(centerX + 5, centerY + 18);
            ctx.stroke();
        }
        
        // Sandals
        ctx.fillStyle = colors.brownLight;
        if (frame === 0) {
            ctx.fillRect(centerX - 5, centerY + 18, 3, 2);
            ctx.fillRect(centerX + 1, centerY + 18, 3, 2);
        } else {
            ctx.fillRect(centerX - 2, centerY + 18, 3, 2);
            ctx.fillRect(centerX + 4, centerY + 18, 3, 2);
        }
        
    } else if (direction === 'left') {
        // ===== FACING LEFT (mirrored side view) =====
        
        // Main kiwi body (side profile, mirrored)
        ctx.fillStyle = colors.brownBase;
        ctx.beginPath();
        ctx.ellipse(centerX, centerY + 2 + bobOffset, 7, 10, 0, 0, Math.PI * 2);
        ctx.fill();
        
        // Fuzzy texture on visible side
        ctx.fillStyle = colors.fuzz;
        for (let i = 0; i < 10; i++) {
            const angle = (Math.PI * 2 / 10) * i;
            const radius = 6;
            const dotX = centerX + Math.cos(angle) * radius;
            const dotY = centerY + 2 + bobOffset + Math.sin(angle) * radius * 1.4;
            if (dotX < centerX + 2) { // Only show fuzz on left side
                ctx.beginPath();
                ctx.arc(dotX, dotY, 0.5, 0, Math.PI * 2);
                ctx.fill();
            }
        }
        
        // Green flesh showing on right edge
        ctx.fillStyle = colors.greenFlesh;
        ctx.beginPath();
        ctx.ellipse(centerX + 4, centerY + 2 + bobOffset, 3, 8, 0, 0, Math.PI * 2);
        ctx.fill();
        
        // Light green center
        ctx.fillStyle = colors.greenLight;
        ctx.beginPath();
        ctx.ellipse(centerX + 4, centerY + 2 + bobOffset, 2, 6, 0, 0, Math.PI * 2);
        ctx.fill();
        
        // Seeds in green flesh
        ctx.fillStyle = colors.seedBlack;
        for (let i = 0; i < 6; i++) {
            const angle = (Math.PI * 2 / 6) * i;
            const seedX = centerX + 4 + Math.cos(angle) * 1.5;
            const seedY = centerY + 2 + bobOffset + Math.sin(angle) * 2;
            ctx.beginPath();
            ctx.arc(seedX, seedY, 0.3, 0, Math.PI * 2);
            ctx.fill();
        }
        
        // Bandana (side view, mirrored)
        ctx.fillStyle = colors.bandanaRed;
        ctx.fillRect(centerX - 5, centerY - 7 + bobOffset, 10, 3);
        // Bandana pattern
        ctx.fillStyle = colors.bandanaPattern;
        ctx.beginPath();
        ctx.arc(centerX - 2, centerY - 5.5 + bobOffset, 0.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(centerX + 2, centerY - 5.5 + bobOffset, 0.5, 0, Math.PI * 2);
        ctx.fill();
        
        // Eye (one visible from side)
        ctx.fillStyle = colors.eyeWhite;
        ctx.beginPath();
        ctx.ellipse(centerX - 2, centerY - 1 + bobOffset, 2, 2.5, 0, 0, Math.PI * 2);
        ctx.fill();
        
        // Pupil
        ctx.fillStyle = colors.eyeBlack;
        ctx.beginPath();
        ctx.arc(centerX - 2, centerY + bobOffset, 1, 0, Math.PI * 2);
        ctx.fill();
        
        // Smile (side view, mirrored)
        ctx.strokeStyle = colors.smileBrown;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(centerX - 4, centerY + 3 + bobOffset, 2, Math.PI - 0.8, Math.PI + 0.3);
        ctx.stroke();
        
        // Legs
        ctx.strokeStyle = colors.brownDark;
        ctx.lineWidth = 2;
        if (frame === 0) {
            ctx.beginPath();
            ctx.moveTo(centerX + 2, centerY + 12);
            ctx.lineTo(centerX + 4, centerY + 18);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(centerX - 3, centerY + 12);
            ctx.lineTo(centerX - 2, centerY + 18);
            ctx.stroke();
        } else {
            ctx.beginPath();
            ctx.moveTo(centerX + 2, centerY + 12);
            ctx.lineTo(centerX + 1, centerY + 18);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(centerX - 3, centerY + 12);
            ctx.lineTo(centerX - 5, centerY + 18);
            ctx.stroke();
        }
        
        // Sandals
        ctx.fillStyle = colors.brownLight;
        if (frame === 0) {
            ctx.fillRect(centerX + 2, centerY + 18, 3, 2);
            ctx.fillRect(centerX - 4, centerY + 18, 3, 2);
        } else {
            ctx.fillRect(centerX, centerY + 18, 3, 2);
            ctx.fillRect(centerX - 6, centerY + 18, 3, 2);
        }
    }
    
    ctx.restore();
}

// Helper function to draw KIM at tile coordinates
function drawKimAtTile(ctx, tileX, tileY, direction, frame) {
    const TILE = 16;
    drawKim(ctx, tileX * TILE, tileY * TILE, direction, frame);
}
