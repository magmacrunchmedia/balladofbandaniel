// js/rendering/sprites/plantain-jane.js
// PLANTAIN JANE - 1950s bad girl/femme fatale plantain
// Red cat-eye sunglasses, smoking cigarette, dangerous allure

/**
 * Draw PLANTAIN JANE sprite
 * @param {CanvasRenderingContext2D} ctx - Canvas context
 * @param {number} x - Screen X position
 * @param {number} y - Screen Y position
 * @param {string} direction - Direction ('up', 'down', 'left', 'right')
 * @param {number} frame - Animation frame (0 or 1)
 */
function drawPlantainJane(ctx, x, y, direction, frame) {
    const TILE = 16;
    const centerX = x;
    const centerY = y;
    
    // Walk animation offset (slight bob)
    const bobOffset = frame === 1 ? 1 : 0;
    
    // Color palette - plantain colors (greener, more yellow-green)
    const colors = {
        // Plantain body (greener than banana)
        plantainYellow: '#d4c04a',
        plantainGreen: '#b8a84f',
        plantainHighlight: '#e8d85f',
        plantainDark: '#9a8a3a',
        plantainEdge: '#8a7a2a',
        stem: '#7a6a30',
        
        // 1950s Bad Girl Accessories
        catEyeFrameRed: '#d32f2f',        // Classic red cat-eye frames
        catEyeLens: 'rgba(20, 20, 20, 0.85)', // Dark tinted/black lenses
        catEyeGoldAccent: '#ffd700',      // Gold temple detail
        cigarette: '#f5f5f5',             // Cigarette paper
        cigaretteFilter: '#ffb74d',       // Orange filter tip
        smoke: 'rgba(200, 200, 200, 0.6)', // Smoke wisps
        
        // Optional accessories (kept from original)
        lipstickRed: '#c62828',           // Darker, more dramatic red
        earringGold: '#ffd700',
        
        // Eyes (behind sunglasses)
        eyeWhite: '#ffffff',
        eyeBrown: '#3e2723',
        eyelashBlack: '#000000'
    };
    
    ctx.save();
    
    if (direction === 'down') {
        // ===== FACING DOWN (toward camera) =====
        
        // Plantain body - taller, more angular than banana
        ctx.fillStyle = colors.plantainYellow;
        ctx.beginPath();
        ctx.ellipse(centerX, centerY + 3 + bobOffset, 7, 18, 0, 0, Math.PI * 2);
        ctx.fill();
        
        // Highlight ridge (plantains have more defined ridges)
        ctx.strokeStyle = colors.plantainHighlight;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(centerX - 3, centerY - 12 + bobOffset);
        ctx.lineTo(centerX - 3, centerY + 18 + bobOffset);
        ctx.stroke();
        
        // Side ridge
        ctx.strokeStyle = colors.plantainGreen;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(centerX + 3, centerY - 10 + bobOffset);
        ctx.lineTo(centerX + 3, centerY + 16 + bobOffset);
        ctx.stroke();
        
        // Darker edge
        ctx.strokeStyle = colors.plantainEdge;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(centerX, centerY + 3 + bobOffset, 7, 0.3, Math.PI - 0.3);
        ctx.stroke();
        
        // Bottom taper
        ctx.fillStyle = colors.plantainDark;
        ctx.beginPath();
        ctx.ellipse(centerX, centerY + 19 + bobOffset, 5, 3, 0, 0, Math.PI * 2);
        ctx.fill();
        
        // Stem at top
        ctx.fillStyle = colors.stem;
        ctx.fillRect(centerX - 2, centerY - 15 + bobOffset, 4, 3);
        
        // Cat-eye sunglasses (1950s style)
        // Left lens with dramatic cat-eye wing
        ctx.fillStyle = colors.catEyeLens;
        ctx.beginPath();
        ctx.ellipse(centerX - 3, centerY - 1 + bobOffset, 3.5, 2.5, -0.3, 0, Math.PI * 2);
        ctx.fill();
        
        // Right lens with cat-eye wing
        ctx.beginPath();
        ctx.ellipse(centerX + 3, centerY - 1 + bobOffset, 3.5, 2.5, 0.3, 0, Math.PI * 2);
        ctx.fill();
        
        // Red cat-eye frames
        ctx.strokeStyle = colors.catEyeFrameRed;
        ctx.lineWidth = 1.5;
        // Left frame
        ctx.beginPath();
        ctx.ellipse(centerX - 3, centerY - 1 + bobOffset, 3.5, 2.5, -0.3, 0, Math.PI * 2);
        ctx.stroke();
        // Right frame
        ctx.beginPath();
        ctx.ellipse(centerX + 3, centerY - 1 + bobOffset, 3.5, 2.5, 0.3, 0, Math.PI * 2);
        ctx.stroke();
        
        // Dramatic cat-eye wings
        ctx.strokeStyle = colors.catEyeFrameRed;
        ctx.lineWidth = 2;
        // Left wing
        ctx.beginPath();
        ctx.moveTo(centerX - 6, centerY - 2 + bobOffset);
        ctx.lineTo(centerX - 8, centerY - 3 + bobOffset);
        ctx.stroke();
        // Right wing
        ctx.beginPath();
        ctx.moveTo(centerX + 6, centerY - 2 + bobOffset);
        ctx.lineTo(centerX + 8, centerY - 3 + bobOffset);
        ctx.stroke();
        
        // Gold temple accents
        ctx.strokeStyle = colors.catEyeGoldAccent;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(centerX - 6, centerY - 1 + bobOffset);
        ctx.lineTo(centerX - 8, centerY - 1 + bobOffset);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(centerX + 6, centerY - 1 + bobOffset);
        ctx.lineTo(centerX + 8, centerY - 1 + bobOffset);
        ctx.stroke();
        
        // Bridge of sunglasses
        ctx.strokeStyle = colors.catEyeFrameRed;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(centerX - 0.5, centerY - 1 + bobOffset);
        ctx.lineTo(centerX + 0.5, centerY - 1 + bobOffset);
        ctx.stroke();
        
        // Lipstick smile (slightly smirking)
        ctx.fillStyle = colors.lipstickRed;
        ctx.beginPath();
        ctx.ellipse(centerX - 1, centerY + 4 + bobOffset, 3, 1.5, 0, 0, Math.PI);
        ctx.fill();
        // Shine on lips
        ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.beginPath();
        ctx.ellipse(centerX - 2, centerY + 3.5 + bobOffset, 1, 0.5, 0, 0, Math.PI);
        ctx.fill();
        
        // Cigarette in corner of mouth (like BANDANIEL)
        ctx.fillStyle = colors.cigarette;
        ctx.fillRect(centerX + 2, centerY + 3 + bobOffset, 7, 1.5);
        // Orange filter tip
        ctx.fillStyle = colors.cigaretteFilter;
        ctx.fillRect(centerX + 2, centerY + 3 + bobOffset, 2, 1.5);
        // Cigarette end detail
        ctx.fillStyle = '#d0d0d0';
        ctx.fillRect(centerX + 8.5, centerY + 3 + bobOffset, 0.5, 1.5);
        
        // Smoke wisp
        ctx.strokeStyle = colors.smoke;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(centerX + 9, centerY + 3 + bobOffset);
        ctx.quadraticCurveTo(centerX + 10, centerY + bobOffset, centerX + 11, centerY - 2 + bobOffset);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(centerX + 10, centerY + 2 + bobOffset);
        ctx.quadraticCurveTo(centerX + 12, centerY, centerX + 12, centerY - 3 + bobOffset);
        ctx.stroke();
        
        // Legs (confident stride)
        ctx.strokeStyle = colors.plantainDark;
        ctx.lineWidth = 2;
        if (frame === 0) {
            ctx.beginPath();
            ctx.moveTo(centerX - 3, centerY + 21);
            ctx.lineTo(centerX - 5, centerY + 26);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(centerX + 3, centerY + 21);
            ctx.lineTo(centerX + 2, centerY + 26);
            ctx.stroke();
        } else {
            ctx.beginPath();
            ctx.moveTo(centerX - 3, centerY + 21);
            ctx.lineTo(centerX - 2, centerY + 26);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(centerX + 3, centerY + 21);
            ctx.lineTo(centerX + 5, centerY + 26);
            ctx.stroke();
        }
        
    } else if (direction === 'up') {
        // ===== FACING UP (away from camera) =====
        
        // Plantain body (back view)
        ctx.fillStyle = colors.plantainYellow;
        ctx.beginPath();
        ctx.ellipse(centerX, centerY + 3 + bobOffset, 7, 18, 0, 0, Math.PI * 2);
        ctx.fill();
        
        // Back ridge
        ctx.strokeStyle = colors.plantainGreen;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(centerX, centerY - 12 + bobOffset);
        ctx.lineTo(centerX, centerY + 18 + bobOffset);
        ctx.stroke();
        
        // Bottom taper
        ctx.fillStyle = colors.plantainDark;
        ctx.beginPath();
        ctx.ellipse(centerX, centerY + 19 + bobOffset, 5, 3, 0, 0, Math.PI * 2);
        ctx.fill();
        
        // Stem
        ctx.fillStyle = colors.stem;
        ctx.fillRect(centerX - 2, centerY - 15 + bobOffset, 4, 3);
        
        // Cat-eye sunglasses (back view - temples visible)
        ctx.strokeStyle = colors.catEyeFrameRed;
        ctx.lineWidth = 1.5;
        // Left temple
        ctx.beginPath();
        ctx.moveTo(centerX - 7, centerY - 5 + bobOffset);
        ctx.lineTo(centerX - 9, centerY - 5 + bobOffset);
        ctx.stroke();
        // Right temple
        ctx.beginPath();
        ctx.moveTo(centerX + 7, centerY - 5 + bobOffset);
        ctx.lineTo(centerX + 9, centerY - 5 + bobOffset);
        ctx.stroke();
        
        // Gold temple accents
        ctx.strokeStyle = colors.catEyeGoldAccent;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(centerX - 7, centerY - 4 + bobOffset);
        ctx.lineTo(centerX - 9, centerY - 4 + bobOffset);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(centerX + 7, centerY - 4 + bobOffset);
        ctx.lineTo(centerX + 9, centerY - 4 + bobOffset);
        ctx.stroke();
        
        // Cigarette smoke rising (back view)
        ctx.strokeStyle = colors.smoke;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(centerX + 5, centerY + 5 + bobOffset);
        ctx.quadraticCurveTo(centerX + 7, centerY + 2 + bobOffset, centerX + 8, centerY - 1 + bobOffset);
        ctx.stroke();
        
        // Legs
        ctx.strokeStyle = colors.plantainDark;
        ctx.lineWidth = 2;
        if (frame === 0) {
            ctx.beginPath();
            ctx.moveTo(centerX - 3, centerY + 21);
            ctx.lineTo(centerX - 5, centerY + 26);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(centerX + 3, centerY + 21);
            ctx.lineTo(centerX + 2, centerY + 26);
            ctx.stroke();
        } else {
            ctx.beginPath();
            ctx.moveTo(centerX - 3, centerY + 21);
            ctx.lineTo(centerX - 2, centerY + 26);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(centerX + 3, centerY + 21);
            ctx.lineTo(centerX + 5, centerY + 26);
            ctx.stroke();
        }
        
    } else if (direction === 'right') {
        // ===== FACING RIGHT (side view) =====
        
        // Plantain body (side - taller, more angular curve)
        ctx.fillStyle = colors.plantainYellow;
        ctx.beginPath();
        ctx.moveTo(centerX + 4, centerY - 11 + bobOffset);
        ctx.quadraticCurveTo(centerX - 2, centerY - 10 + bobOffset, centerX - 4, centerY + bobOffset);
        ctx.quadraticCurveTo(centerX - 5, centerY + 10 + bobOffset, centerX - 2, centerY + 19 + bobOffset);
        ctx.lineTo(centerX + 5, centerY + 19 + bobOffset);
        ctx.quadraticCurveTo(centerX + 4, centerY + 10 + bobOffset, centerX + 5, centerY + bobOffset);
        ctx.quadraticCurveTo(centerX + 7, centerY - 10 + bobOffset, centerX + 10, centerY - 11 + bobOffset);
        ctx.closePath();
        ctx.fill();
        
        // Plantain ridge
        ctx.strokeStyle = colors.plantainHighlight;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(centerX + 6, centerY - 10 + bobOffset);
        ctx.quadraticCurveTo(centerX + 2, centerY + bobOffset, centerX + 3, centerY + 18 + bobOffset);
        ctx.stroke();
        
        // Bottom taper
        ctx.fillStyle = colors.plantainDark;
        ctx.beginPath();
        ctx.ellipse(centerX + 1.5, centerY + 20 + bobOffset, 4, 2, 0, 0, Math.PI * 2);
        ctx.fill();
        
        // Stem
        ctx.fillStyle = colors.stem;
        ctx.beginPath();
        ctx.moveTo(centerX + 7, centerY - 11 + bobOffset);
        ctx.lineTo(centerX + 6, centerY - 14 + bobOffset);
        ctx.lineTo(centerX + 8, centerY - 15 + bobOffset);
        ctx.lineTo(centerX + 10, centerY - 12 + bobOffset);
        ctx.closePath();
        ctx.fill();
        
        // Cat-eye sunglasses (side view)
        // Lens
        ctx.fillStyle = colors.catEyeLens;
        ctx.beginPath();
        ctx.ellipse(centerX + 1, centerY - 1 + bobOffset, 3.5, 2.5, -0.2, 0, Math.PI * 2);
        ctx.fill();
        
        // Red frame
        ctx.strokeStyle = colors.catEyeFrameRed;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.ellipse(centerX + 1, centerY - 1 + bobOffset, 3.5, 2.5, -0.2, 0, Math.PI * 2);
        ctx.stroke();
        
        // Cat-eye wing extending back
        ctx.strokeStyle = colors.catEyeFrameRed;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(centerX + 4, centerY - 2.5 + bobOffset);
        ctx.lineTo(centerX + 6, centerY - 3.5 + bobOffset);
        ctx.stroke();
        
        // Temple going back
        ctx.strokeStyle = colors.catEyeFrameRed;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(centerX + 4, centerY - 1 + bobOffset);
        ctx.lineTo(centerX - 5, centerY - 1 + bobOffset);
        ctx.stroke();
        
        // Gold accent on temple
        ctx.strokeStyle = colors.catEyeGoldAccent;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(centerX + 3, centerY - 0.5 + bobOffset);
        ctx.lineTo(centerX - 4, centerY - 0.5 + bobOffset);
        ctx.stroke();
        
        // Lips (side profile with cigarette)
        ctx.fillStyle = colors.lipstickRed;
        ctx.beginPath();
        ctx.arc(centerX + 4, centerY + 4 + bobOffset, 1.5, -0.5, 0.5);
        ctx.fill();
        
        // Cigarette in mouth (side view)
        ctx.fillStyle = colors.cigarette;
        ctx.fillRect(centerX + 5, centerY + 3.5 + bobOffset, 7, 1.5);
        // Orange filter
        ctx.fillStyle = colors.cigaretteFilter;
        ctx.fillRect(centerX + 5, centerY + 3.5 + bobOffset, 2, 1.5);
        // Cigarette end
        ctx.fillStyle = '#d0d0d0';
        ctx.fillRect(centerX + 11.5, centerY + 3.5 + bobOffset, 0.5, 1.5);
        
        // Smoke wisp
        ctx.strokeStyle = colors.smoke;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(centerX + 12, centerY + 4 + bobOffset);
        ctx.quadraticCurveTo(centerX + 14, centerY + 1 + bobOffset, centerX + 15, centerY - 2 + bobOffset);
        ctx.stroke();
        
        // Legs
        ctx.strokeStyle = colors.plantainDark;
        ctx.lineWidth = 2;
        if (frame === 0) {
            ctx.beginPath();
            ctx.moveTo(centerX - 2, centerY + 20);
            ctx.lineTo(centerX - 4, centerY + 25);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(centerX + 3, centerY + 20);
            ctx.lineTo(centerX + 2, centerY + 25);
            ctx.stroke();
        } else {
            ctx.beginPath();
            ctx.moveTo(centerX - 2, centerY + 20);
            ctx.lineTo(centerX - 1, centerY + 25);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(centerX + 3, centerY + 20);
            ctx.lineTo(centerX + 5, centerY + 25);
            ctx.stroke();
        }
        
    } else if (direction === 'left') {
        // ===== FACING LEFT (mirrored side view) =====
        
        // Plantain body (mirrored)
        ctx.fillStyle = colors.plantainYellow;
        ctx.beginPath();
        ctx.moveTo(centerX - 4, centerY - 11 + bobOffset);
        ctx.quadraticCurveTo(centerX + 2, centerY - 10 + bobOffset, centerX + 4, centerY + bobOffset);
        ctx.quadraticCurveTo(centerX + 5, centerY + 10 + bobOffset, centerX + 2, centerY + 19 + bobOffset);
        ctx.lineTo(centerX - 5, centerY + 19 + bobOffset);
        ctx.quadraticCurveTo(centerX - 4, centerY + 10 + bobOffset, centerX - 5, centerY + bobOffset);
        ctx.quadraticCurveTo(centerX - 7, centerY - 10 + bobOffset, centerX - 10, centerY - 11 + bobOffset);
        ctx.closePath();
        ctx.fill();
        
        // Ridge
        ctx.strokeStyle = colors.plantainHighlight;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(centerX - 6, centerY - 10 + bobOffset);
        ctx.quadraticCurveTo(centerX - 2, centerY + bobOffset, centerX - 3, centerY + 18 + bobOffset);
        ctx.stroke();
        
        // Bottom taper
        ctx.fillStyle = colors.plantainDark;
        ctx.beginPath();
        ctx.ellipse(centerX - 1.5, centerY + 20 + bobOffset, 4, 2, 0, 0, Math.PI * 2);
        ctx.fill();
        
        // Stem
        ctx.fillStyle = colors.stem;
        ctx.beginPath();
        ctx.moveTo(centerX - 7, centerY - 11 + bobOffset);
        ctx.lineTo(centerX - 6, centerY - 14 + bobOffset);
        ctx.lineTo(centerX - 8, centerY - 15 + bobOffset);
        ctx.lineTo(centerX - 10, centerY - 12 + bobOffset);
        ctx.closePath();
        ctx.fill();
        
        // Cat-eye sunglasses (side view - mirrored)
        // Lens
        ctx.fillStyle = colors.catEyeLens;
        ctx.beginPath();
        ctx.ellipse(centerX - 1, centerY - 1 + bobOffset, 3.5, 2.5, 0.2, 0, Math.PI * 2);
        ctx.fill();
        
        // Red frame
        ctx.strokeStyle = colors.catEyeFrameRed;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.ellipse(centerX - 1, centerY - 1 + bobOffset, 3.5, 2.5, 0.2, 0, Math.PI * 2);
        ctx.stroke();
        
        // Cat-eye wing extending back
        ctx.strokeStyle = colors.catEyeFrameRed;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(centerX - 4, centerY - 2.5 + bobOffset);
        ctx.lineTo(centerX - 6, centerY - 3.5 + bobOffset);
        ctx.stroke();
        
        // Temple going back
        ctx.strokeStyle = colors.catEyeFrameRed;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(centerX - 4, centerY - 1 + bobOffset);
        ctx.lineTo(centerX + 5, centerY - 1 + bobOffset);
        ctx.stroke();
        
        // Gold accent on temple
        ctx.strokeStyle = colors.catEyeGoldAccent;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(centerX - 3, centerY - 0.5 + bobOffset);
        ctx.lineTo(centerX + 4, centerY - 0.5 + bobOffset);
        ctx.stroke();
        
        // Lips (side profile with cigarette - mirrored)
        ctx.fillStyle = colors.lipstickRed;
        ctx.beginPath();
        ctx.arc(centerX - 4, centerY + 4 + bobOffset, 1.5, Math.PI - 0.5, Math.PI + 0.5);
        ctx.fill();
        
        // Cigarette in mouth (side view - mirrored)
        ctx.fillStyle = colors.cigarette;
        ctx.fillRect(centerX - 12, centerY + 3.5 + bobOffset, 7, 1.5);
        // Orange filter
        ctx.fillStyle = colors.cigaretteFilter;
        ctx.fillRect(centerX - 7, centerY + 3.5 + bobOffset, 2, 1.5);
        // Cigarette end
        ctx.fillStyle = '#d0d0d0';
        ctx.fillRect(centerX - 12.5, centerY + 3.5 + bobOffset, 0.5, 1.5);
        
        // Smoke wisp (mirrored)
        ctx.strokeStyle = colors.smoke;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(centerX - 12, centerY + 4 + bobOffset);
        ctx.quadraticCurveTo(centerX - 14, centerY + 1 + bobOffset, centerX - 15, centerY - 2 + bobOffset);
        ctx.stroke();
        
        // Legs
        ctx.strokeStyle = colors.plantainDark;
        ctx.lineWidth = 2;
        if (frame === 0) {
            ctx.beginPath();
            ctx.moveTo(centerX + 2, centerY + 20);
            ctx.lineTo(centerX + 4, centerY + 25);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(centerX - 3, centerY + 20);
            ctx.lineTo(centerX - 2, centerY + 25);
            ctx.stroke();
        } else {
            ctx.beginPath();
            ctx.moveTo(centerX + 2, centerY + 20);
            ctx.lineTo(centerX + 1, centerY + 25);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(centerX - 3, centerY + 20);
            ctx.lineTo(centerX - 5, centerY + 25);
            ctx.stroke();
        }
    }
    
    ctx.restore();
}

// Helper function to draw PLANTAIN JANE at tile coordinates
function drawPlantainJaneAtTile(ctx, tileX, tileY, direction, frame) {
    const TILE = 16;
    drawPlantainJane(ctx, tileX * TILE, tileY * TILE, direction, frame);
}