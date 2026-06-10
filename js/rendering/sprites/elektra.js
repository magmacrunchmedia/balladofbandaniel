// js/rendering/sprites/elektra.js
// ELEKTRA - Cool poetry chick orange with round sunglasses
// Beatnik/bohemian vibes, artsy and laid-back

/**
 * Draw ELEKTRA sprite
 * @param {CanvasRenderingContext2D} ctx - Canvas context
 * @param {number} x - Screen X position
 * @param {number} y - Screen Y position
 * @param {string} direction - Direction ('up', 'down', 'left', 'right')
 * @param {number} frame - Animation frame (0 or 1)
 */
function drawElektra(ctx, x, y, direction, frame) {
    const TILE = 16;
    const centerX = x;
    const centerY = y;
    
    // Walk animation offset (slight bob)
    const bobOffset = frame === 1 ? 1 : 0;
    
    // Color palette - electric orange colors
    const colors = {
        // Orange body (bright, vibrant)
        orangeBase: '#ff6f00',
        orangeLight: '#ff8f00',
        orangeHighlight: '#ffa726',
        orangeDark: '#e65100',
        orangeShadow: '#bf360c',
        
        // Round sunglasses (John Lennon style)
        sunglassesFrame: '#2c2c2c',      // Dark frame
        sunglassesLens: 'rgba(40, 40, 80, 0.7)', // Dark blue-tinted lenses
        sunglassesReflection: 'rgba(200, 200, 255, 0.3)', // Subtle lens reflection
        
        // Details
        stem: '#8d6e63',                 // Brown stem
        lipColor: '#d84315',             // Subtle orange-red lips
        
        // Optional accessories
        turtleneckBlack: '#1a1a1a',      // Black turtleneck (poetry chick aesthetic)
    };
    
    ctx.save();
    
    if (direction === 'down') {
        // ===== FACING DOWN (toward camera) =====
        
        // Orange body - spherical
        ctx.fillStyle = colors.orangeBase;
        ctx.beginPath();
        ctx.arc(centerX, centerY + 2 + bobOffset, 9, 0, Math.PI * 2);
        ctx.fill();
        
        // Highlight (top-left shine)
        ctx.fillStyle = colors.orangeHighlight;
        ctx.beginPath();
        ctx.arc(centerX - 3, centerY - 2 + bobOffset, 3, 0, Math.PI * 2);
        ctx.fill();
        
        // Smaller highlight
        ctx.fillStyle = colors.orangeLight;
        ctx.beginPath();
        ctx.arc(centerX + 2, centerY + bobOffset, 2, 0, Math.PI * 2);
        ctx.fill();
        
        // Shadow/dimension on bottom
        ctx.fillStyle = colors.orangeDark;
        ctx.beginPath();
        ctx.arc(centerX, centerY + 6 + bobOffset, 7, 0, Math.PI);
        ctx.fill();
        
        // Stem at top
        ctx.fillStyle = colors.stem;
        ctx.beginPath();
        ctx.moveTo(centerX - 1, centerY - 7 + bobOffset);
        ctx.lineTo(centerX + 1, centerY - 7 + bobOffset);
        ctx.lineTo(centerX + 2, centerY - 10 + bobOffset);
        ctx.lineTo(centerX - 2, centerY - 10 + bobOffset);
        ctx.closePath();
        ctx.fill();
        
        // Small leaf on stem
        ctx.fillStyle = '#558b2f';
        ctx.beginPath();
        ctx.ellipse(centerX + 2, centerY - 9 + bobOffset, 2, 1, 0.5, 0, Math.PI * 2);
        ctx.fill();
        
        // Round sunglasses (John Lennon style)
        // Left lens
        ctx.fillStyle = colors.sunglassesLens;
        ctx.beginPath();
        ctx.arc(centerX - 3, centerY + bobOffset, 3, 0, Math.PI * 2);
        ctx.fill();
        
        // Right lens
        ctx.beginPath();
        ctx.arc(centerX + 3, centerY + bobOffset, 3, 0, Math.PI * 2);
        ctx.fill();
        
        // Frames
        ctx.strokeStyle = colors.sunglassesFrame;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(centerX - 3, centerY + bobOffset, 3, 0, Math.PI * 2);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(centerX + 3, centerY + bobOffset, 3, 0, Math.PI * 2);
        ctx.stroke();
        
        // Bridge
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(centerX - 0.5, centerY + bobOffset);
        ctx.lineTo(centerX + 0.5, centerY + bobOffset);
        ctx.stroke();
        
        // Lens reflections
        ctx.fillStyle = colors.sunglassesReflection;
        ctx.beginPath();
        ctx.arc(centerX - 4, centerY - 1 + bobOffset, 1, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(centerX + 2, centerY - 1 + bobOffset, 1, 0, Math.PI * 2);
        ctx.fill();
        
        // Subtle smile
        ctx.strokeStyle = colors.lipColor;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(centerX, centerY + 4 + bobOffset, 3, 0.2, Math.PI - 0.2);
        ctx.stroke();
        
        // Black turtleneck (peeking out from bottom)
        ctx.fillStyle = colors.turtleneckBlack;
        ctx.fillRect(centerX - 7, centerY + 10 + bobOffset, 14, 4);
        ctx.fillRect(centerX - 6, centerY + 14 + bobOffset, 12, 2);
        
        // Legs (simple, relaxed stance)
        ctx.strokeStyle = colors.orangeShadow;
        ctx.lineWidth = 2;
        if (frame === 0) {
            ctx.beginPath();
            ctx.moveTo(centerX - 3, centerY + 16);
            ctx.lineTo(centerX - 4, centerY + 22);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(centerX + 3, centerY + 16);
            ctx.lineTo(centerX + 2, centerY + 22);
            ctx.stroke();
        } else {
            ctx.beginPath();
            ctx.moveTo(centerX - 3, centerY + 16);
            ctx.lineTo(centerX - 2, centerY + 22);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(centerX + 3, centerY + 16);
            ctx.lineTo(centerX + 4, centerY + 22);
            ctx.stroke();
        }
        
    } else if (direction === 'up') {
        // ===== FACING UP (away from camera) =====
        
        // Orange body (back view)
        ctx.fillStyle = colors.orangeBase;
        ctx.beginPath();
        ctx.arc(centerX, centerY + 2 + bobOffset, 9, 0, Math.PI * 2);
        ctx.fill();
        
        // Back shading
        ctx.fillStyle = colors.orangeDark;
        ctx.beginPath();
        ctx.arc(centerX, centerY + 5 + bobOffset, 7, 0, Math.PI);
        ctx.fill();
        
        // Stem (back view)
        ctx.fillStyle = colors.stem;
        ctx.fillRect(centerX - 1.5, centerY - 7 + bobOffset, 3, 4);
        
        // Sunglasses temples visible from back
        ctx.strokeStyle = colors.sunglassesFrame;
        ctx.lineWidth = 1.5;
        // Left temple
        ctx.beginPath();
        ctx.moveTo(centerX - 7, centerY + bobOffset);
        ctx.lineTo(centerX - 9, centerY + bobOffset);
        ctx.stroke();
        // Right temple
        ctx.beginPath();
        ctx.moveTo(centerX + 7, centerY + bobOffset);
        ctx.lineTo(centerX + 9, centerY + bobOffset);
        ctx.stroke();
        
        // Black turtleneck (back view)
        ctx.fillStyle = colors.turtleneckBlack;
        ctx.fillRect(centerX - 7, centerY + 10 + bobOffset, 14, 4);
        ctx.fillRect(centerX - 6, centerY + 14 + bobOffset, 12, 2);
        
        // Legs
        ctx.strokeStyle = colors.orangeShadow;
        ctx.lineWidth = 2;
        if (frame === 0) {
            ctx.beginPath();
            ctx.moveTo(centerX - 3, centerY + 16);
            ctx.lineTo(centerX - 4, centerY + 22);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(centerX + 3, centerY + 16);
            ctx.lineTo(centerX + 2, centerY + 22);
            ctx.stroke();
        } else {
            ctx.beginPath();
            ctx.moveTo(centerX - 3, centerY + 16);
            ctx.lineTo(centerX - 2, centerY + 22);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(centerX + 3, centerY + 16);
            ctx.lineTo(centerX + 4, centerY + 22);
            ctx.stroke();
        }
        
    } else if (direction === 'right') {
        // ===== FACING RIGHT (side view) =====
        
        // Orange body (side - slightly oval)
        ctx.fillStyle = colors.orangeBase;
        ctx.beginPath();
        ctx.ellipse(centerX, centerY + 2 + bobOffset, 8, 9, 0, 0, Math.PI * 2);
        ctx.fill();
        
        // Side highlight
        ctx.fillStyle = colors.orangeLight;
        ctx.beginPath();
        ctx.arc(centerX + 2, centerY + bobOffset, 2.5, 0, Math.PI * 2);
        ctx.fill();
        
        // Shadow
        ctx.fillStyle = colors.orangeDark;
        ctx.beginPath();
        ctx.arc(centerX - 1, centerY + 6 + bobOffset, 6, 0, Math.PI);
        ctx.fill();
        
        // Stem (side angle)
        ctx.fillStyle = colors.stem;
        ctx.beginPath();
        ctx.moveTo(centerX, centerY - 7 + bobOffset);
        ctx.lineTo(centerX + 2, centerY - 10 + bobOffset);
        ctx.lineTo(centerX + 3, centerY - 9 + bobOffset);
        ctx.lineTo(centerX + 1, centerY - 6 + bobOffset);
        ctx.closePath();
        ctx.fill();
        
        // Round sunglasses (side view)
        // One lens visible
        ctx.fillStyle = colors.sunglassesLens;
        ctx.beginPath();
        ctx.arc(centerX + 1, centerY + bobOffset, 3, 0, Math.PI * 2);
        ctx.fill();
        
        // Frame
        ctx.strokeStyle = colors.sunglassesFrame;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(centerX + 1, centerY + bobOffset, 3, 0, Math.PI * 2);
        ctx.stroke();
        
        // Temple extending back
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(centerX + 4, centerY + bobOffset);
        ctx.lineTo(centerX - 7, centerY + bobOffset);
        ctx.stroke();
        
        // Reflection
        ctx.fillStyle = colors.sunglassesReflection;
        ctx.beginPath();
        ctx.arc(centerX, centerY - 1 + bobOffset, 1, 0, Math.PI * 2);
        ctx.fill();
        
        // Smile
        ctx.strokeStyle = colors.lipColor;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(centerX + 4, centerY + 4 + bobOffset, 2, -0.3, 0.8);
        ctx.stroke();
        
        // Turtleneck
        ctx.fillStyle = colors.turtleneckBlack;
        ctx.fillRect(centerX - 6, centerY + 10 + bobOffset, 12, 4);
        ctx.fillRect(centerX - 5, centerY + 14 + bobOffset, 10, 2);
        
        // Legs
        ctx.strokeStyle = colors.orangeShadow;
        ctx.lineWidth = 2;
        if (frame === 0) {
            ctx.beginPath();
            ctx.moveTo(centerX - 2, centerY + 16);
            ctx.lineTo(centerX - 4, centerY + 22);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(centerX + 3, centerY + 16);
            ctx.lineTo(centerX + 2, centerY + 22);
            ctx.stroke();
        } else {
            ctx.beginPath();
            ctx.moveTo(centerX - 2, centerY + 16);
            ctx.lineTo(centerX - 1, centerY + 22);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(centerX + 3, centerY + 16);
            ctx.lineTo(centerX + 5, centerY + 22);
            ctx.stroke();
        }
        
    } else if (direction === 'left') {
        // ===== FACING LEFT (mirrored side view) =====
        
        // Orange body (side - slightly oval, mirrored)
        ctx.fillStyle = colors.orangeBase;
        ctx.beginPath();
        ctx.ellipse(centerX, centerY + 2 + bobOffset, 8, 9, 0, 0, Math.PI * 2);
        ctx.fill();
        
        // Side highlight
        ctx.fillStyle = colors.orangeLight;
        ctx.beginPath();
        ctx.arc(centerX - 2, centerY + bobOffset, 2.5, 0, Math.PI * 2);
        ctx.fill();
        
        // Shadow
        ctx.fillStyle = colors.orangeDark;
        ctx.beginPath();
        ctx.arc(centerX + 1, centerY + 6 + bobOffset, 6, 0, Math.PI);
        ctx.fill();
        
        // Stem (side angle, mirrored)
        ctx.fillStyle = colors.stem;
        ctx.beginPath();
        ctx.moveTo(centerX, centerY - 7 + bobOffset);
        ctx.lineTo(centerX - 2, centerY - 10 + bobOffset);
        ctx.lineTo(centerX - 3, centerY - 9 + bobOffset);
        ctx.lineTo(centerX - 1, centerY - 6 + bobOffset);
        ctx.closePath();
        ctx.fill();
        
        // Round sunglasses (side view, mirrored)
        // One lens visible
        ctx.fillStyle = colors.sunglassesLens;
        ctx.beginPath();
        ctx.arc(centerX - 1, centerY + bobOffset, 3, 0, Math.PI * 2);
        ctx.fill();
        
        // Frame
        ctx.strokeStyle = colors.sunglassesFrame;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(centerX - 1, centerY + bobOffset, 3, 0, Math.PI * 2);
        ctx.stroke();
        
        // Temple extending back
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(centerX - 4, centerY + bobOffset);
        ctx.lineTo(centerX + 7, centerY + bobOffset);
        ctx.stroke();
        
        // Reflection
        ctx.fillStyle = colors.sunglassesReflection;
        ctx.beginPath();
        ctx.arc(centerX, centerY - 1 + bobOffset, 1, 0, Math.PI * 2);
        ctx.fill();
        
        // Smile
        ctx.strokeStyle = colors.lipColor;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(centerX - 4, centerY + 4 + bobOffset, 2, Math.PI - 0.8, Math.PI + 0.3);
        ctx.stroke();
        
        // Turtleneck
        ctx.fillStyle = colors.turtleneckBlack;
        ctx.fillRect(centerX - 6, centerY + 10 + bobOffset, 12, 4);
        ctx.fillRect(centerX - 5, centerY + 14 + bobOffset, 10, 2);
        
        // Legs
        ctx.strokeStyle = colors.orangeShadow;
        ctx.lineWidth = 2;
        if (frame === 0) {
            ctx.beginPath();
            ctx.moveTo(centerX + 2, centerY + 16);
            ctx.lineTo(centerX + 4, centerY + 22);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(centerX - 3, centerY + 16);
            ctx.lineTo(centerX - 2, centerY + 22);
            ctx.stroke();
        } else {
            ctx.beginPath();
            ctx.moveTo(centerX + 2, centerY + 16);
            ctx.lineTo(centerX + 1, centerY + 22);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(centerX - 3, centerY + 16);
            ctx.lineTo(centerX - 5, centerY + 22);
            ctx.stroke();
        }
    }
    
    ctx.restore();
}

// Helper function to draw ELEKTRA at tile coordinates
function drawElektraAtTile(ctx, tileX, tileY, direction, frame) {
    const TILE = 16;
    drawElektra(ctx, tileX * TILE, tileY * TILE, direction, frame);
}