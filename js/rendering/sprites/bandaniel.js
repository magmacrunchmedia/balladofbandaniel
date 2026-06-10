// sprites/bandaniel.js
// BANDANIEL - Main character sprite

function drawBandaniel(x, y, direction, frame) {
    const centerX = x; //+ TILE_SIZE / 2;
    const centerY = y; //+ TILE_SIZE / 2;
    
    // Walk animation offset (slight bob)
    const bobOffset = frame === 1 ? 1 : 0;
    
    // Check if player has backpack equipped
    const hasBackpack = typeof playerInventory !== 'undefined' && playerInventory.isBackpackEquipped();
    
    if (direction === 'down') {
        // FACING DOWN (toward camera)
        
        // Banana body (curved, upright, LONGER and tapered)
        ctx.fillStyle = '#f1c40f';
        ctx.beginPath();
        ctx.ellipse(centerX, centerY + 2 + bobOffset, 8, 16, 0, 0, Math.PI * 2);
        ctx.fill();
        
        // Banana highlight ridge
        ctx.strokeStyle = '#f39c12';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(centerX - 3, centerY - 10 + bobOffset);
        ctx.lineTo(centerX - 3, centerY + 14 + bobOffset);
        ctx.stroke();
        
        // Darker edge
        ctx.strokeStyle = '#e8b40f';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(centerX, centerY + 2 + bobOffset, 8, 0.3, Math.PI - 0.3);
        ctx.stroke();
        
        // Bottom taper (make banana end naturally)
        ctx.fillStyle = '#e8b40f';
        ctx.beginPath();
        ctx.ellipse(centerX, centerY + 16 + bobOffset, 6, 3, 0, 0, Math.PI * 2);
        ctx.fill();
        
        // Stem at top
        ctx.fillStyle = '#8b7355';
        ctx.fillRect(centerX - 2, centerY - 14 + bobOffset, 4, 3);
        
        // Backpack (drawn BEFORE face - straps behind sunglasses)
        if (hasBackpack) {
            // Left strap (thin, at shoulder edge)
            ctx.fillStyle = '#558b2f';
            ctx.fillRect(centerX - 7, centerY - 6 + bobOffset, 2, 14);
            // Right strap
            ctx.fillRect(centerX + 5, centerY - 6 + bobOffset, 2, 14);
            // Left side peek (tiny sliver at body edge)
            ctx.fillStyle = '#689f38';
            ctx.fillRect(centerX - 8, centerY - 2 + bobOffset, 1, 8);
            // Right side peek
            ctx.fillRect(centerX + 7, centerY - 2 + bobOffset, 1, 8);
            // Top peek behind head
            ctx.fillStyle = '#558b2f';
            ctx.fillRect(centerX - 4, centerY - 12 + bobOffset, 8, 2);
        }
        
        // Sunglasses (front view - both lenses visible)
        ctx.fillStyle = '#2c3e50';
        // Left lens
        ctx.beginPath();
        ctx.ellipse(centerX - 4, centerY - 3 + bobOffset, 3, 2.5, 0, 0, Math.PI * 2);
        ctx.fill();
        // Right lens
        ctx.beginPath();
        ctx.ellipse(centerX + 4, centerY - 3 + bobOffset, 3, 2.5, 0, 0, Math.PI * 2);
        ctx.fill();
        // Bridge
        ctx.fillRect(centerX - 1, centerY - 3 + bobOffset, 2, 1);
        
        // Dark lens glass
        ctx.fillStyle = '#1a1a1a';
        ctx.beginPath();
        ctx.ellipse(centerX - 4, centerY - 3 + bobOffset, 2, 1.5, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.ellipse(centerX + 4, centerY - 3 + bobOffset, 2, 1.5, 0, 0, Math.PI * 2);
        ctx.fill();
        
        // Reflections
        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.beginPath();
        ctx.arc(centerX - 5, centerY - 4 + bobOffset, 1, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(centerX + 3, centerY - 4 + bobOffset, 1, 0, Math.PI * 2);
        ctx.fill();
        
        // Cigarette (center, sticking out)
        ctx.fillStyle = '#ecf0f1';
        ctx.fillRect(centerX - 1, centerY + 3 + bobOffset, 2, 8);
        ctx.fillStyle = '#d4a574';
        ctx.fillRect(centerX - 1, centerY + 3 + bobOffset, 2, 2);
        ctx.fillStyle = '#e67e22';
        ctx.fillRect(centerX - 1, centerY + 10 + bobOffset, 2, 2);
        // Glow
        ctx.fillStyle = '#e74c3c';
        ctx.beginPath();
        ctx.arc(centerX, centerY + 11 + bobOffset, 1.5, 0, Math.PI * 2);
        ctx.fill();
        
        // Legs (walk animation) - NOW attach lower on tapered banana
        ctx.strokeStyle = '#f39c12';
        ctx.lineWidth = 2;
        if (frame === 0) {
            ctx.beginPath();
            ctx.moveTo(centerX - 3, centerY + 18);
            ctx.lineTo(centerX - 4, centerY + 22);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(centerX + 3, centerY + 18);
            ctx.lineTo(centerX + 2, centerY + 22);
            ctx.stroke();
        } else {
            ctx.beginPath();
            ctx.moveTo(centerX - 3, centerY + 18);
            ctx.lineTo(centerX - 2, centerY + 22);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(centerX + 3, centerY + 18);
            ctx.lineTo(centerX + 4, centerY + 22);
            ctx.stroke();
        }
        
    } else if (direction === 'up') {
        // FACING UP (away from camera)
        
        // Banana body (LONGER)
        ctx.fillStyle = '#f1c40f';
        ctx.beginPath();
        ctx.ellipse(centerX, centerY + 2 + bobOffset, 8, 16, 0, 0, Math.PI * 2);
        ctx.fill();
        
        // Back highlight
        ctx.strokeStyle = '#f39c12';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(centerX, centerY - 10 + bobOffset);
        ctx.lineTo(centerX, centerY + 14 + bobOffset);
        ctx.stroke();
        
        // Bottom taper
        ctx.fillStyle = '#e8b40f';
        ctx.beginPath();
        ctx.ellipse(centerX, centerY + 16 + bobOffset, 6, 3, 0, 0, Math.PI * 2);
        ctx.fill();
        
        // Stem (visible from back)
        ctx.fillStyle = '#8b7355';
        ctx.fillRect(centerX - 2, centerY - 14 + bobOffset, 4, 3);
        
        // Sunglasses (SEPARATE temple arms, NOT connected bar)
        ctx.strokeStyle = '#2c3e50';
        ctx.lineWidth = 3;
        // Left temple arm
        ctx.beginPath();
        ctx.moveTo(centerX - 8, centerY - 4 + bobOffset);
        ctx.lineTo(centerX - 10, centerY - 2 + bobOffset);
        ctx.stroke();
        // Right temple arm
        ctx.beginPath();
        ctx.moveTo(centerX + 8, centerY - 4 + bobOffset);
        ctx.lineTo(centerX + 10, centerY - 2 + bobOffset);
        ctx.stroke();
        
        // Optional: tiny bit of frame visible on sides
        ctx.fillStyle = '#2c3e50';
        ctx.fillRect(centerX - 8, centerY - 5 + bobOffset, 2, 2);
        ctx.fillRect(centerX + 6, centerY - 5 + bobOffset, 2, 2);
        
        // Cigarette smoke (visible from back)
        ctx.fillStyle = 'rgba(189, 195, 199, 0.4)';
        ctx.beginPath();
        ctx.arc(centerX - 6, centerY - 8 + bobOffset, 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(centerX - 8, centerY - 11 + bobOffset, 1.5, 0, Math.PI * 2);
        ctx.fill();
        
        // Backpack (drawn AFTER body - visible on the back)
        if (hasBackpack) {
            // Backpack body (wider than body so it peeks out)
            ctx.fillStyle = '#689f38';
            ctx.fillRect(centerX - 7, centerY - 4 + bobOffset, 14, 16);
            // Darker shade for depth (top edge)
            ctx.fillStyle = '#558b2f';
            ctx.fillRect(centerX - 7, centerY - 4 + bobOffset, 14, 3);
            // Darker shade (left edge)
            ctx.fillRect(centerX - 7, centerY - 4 + bobOffset, 3, 16);
            // Lighter highlight (right edge)
            ctx.fillStyle = '#7cb342';
            ctx.fillRect(centerX + 4, centerY - 4 + bobOffset, 3, 16);
            // Strap across back
            ctx.fillStyle = '#558b2f';
            ctx.fillRect(centerX - 4, centerY - 2 + bobOffset, 8, 2);
            // Pocket
            ctx.fillStyle = '#7cb342';
            ctx.fillRect(centerX - 3, centerY + 4 + bobOffset, 6, 5);
            // Pocket clasp
            ctx.fillStyle = '#c0c0c0';
            ctx.fillRect(centerX - 1, centerY + 5 + bobOffset, 2, 2);
        }
        
        // Legs (walk animation) - attach lower
        ctx.strokeStyle = '#f39c12';
        ctx.lineWidth = 2;
        if (frame === 0) {
            ctx.beginPath();
            ctx.moveTo(centerX - 3, centerY + 18);
            ctx.lineTo(centerX - 4, centerY + 22);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(centerX + 3, centerY + 18);
            ctx.lineTo(centerX + 2, centerY + 22);
            ctx.stroke();
        } else {
            ctx.beginPath();
            ctx.moveTo(centerX - 3, centerY + 18);
            ctx.lineTo(centerX - 2, centerY + 22);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(centerX + 3, centerY + 18);
            ctx.lineTo(centerX + 4, centerY + 22);
            ctx.stroke();
        }
        
    } else if (direction === 'right') {
        // FACING RIGHT (side view)
        
        // Banana body (curved from side, LONGER with taper)
        ctx.fillStyle = '#f1c40f';
        ctx.beginPath();
        ctx.moveTo(centerX + 4, centerY - 10 + bobOffset);
        ctx.quadraticCurveTo(centerX - 2, centerY - 8 + bobOffset, centerX - 4, centerY + bobOffset);
        ctx.quadraticCurveTo(centerX - 5, centerY + 8 + bobOffset, centerX - 2, centerY + 16 + bobOffset);
        ctx.lineTo(centerX + 6, centerY + 16 + bobOffset);
        ctx.quadraticCurveTo(centerX + 4, centerY + 8 + bobOffset, centerX + 5, centerY + bobOffset);
        ctx.quadraticCurveTo(centerX + 7, centerY - 8 + bobOffset, centerX + 11, centerY - 10 + bobOffset);
        ctx.closePath();
        ctx.fill();
        
        // Banana ridge
        ctx.strokeStyle = '#f39c12';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(centerX + 6, centerY - 9 + bobOffset);
        ctx.quadraticCurveTo(centerX + 2, centerY + bobOffset, centerX + 3, centerY + 15 + bobOffset);
        ctx.stroke();
        
        // Bottom taper point
        ctx.fillStyle = '#e8b40f';
        ctx.beginPath();
        ctx.ellipse(centerX + 2, centerY + 17 + bobOffset, 5, 2, 0, 0, Math.PI * 2);
        ctx.fill();
        
        // Stem
        ctx.fillStyle = '#8b7355';
        ctx.beginPath();
        ctx.moveTo(centerX + 7, centerY - 10 + bobOffset);
        ctx.lineTo(centerX + 6, centerY - 13 + bobOffset);
        ctx.lineTo(centerX + 8, centerY - 14 + bobOffset);
        ctx.lineTo(centerX + 10, centerY - 11 + bobOffset);
        ctx.closePath();
        ctx.fill();
        
        // Sunglasses (side view - one lens visible)
        ctx.fillStyle = '#2c3e50';
        ctx.beginPath();
        ctx.ellipse(centerX + 1, centerY - 3 + bobOffset, 4, 3, -0.2, 0, Math.PI * 2);
        ctx.fill();
        // Temple arm
        ctx.strokeStyle = '#2c3e50';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(centerX - 3, centerY - 3 + bobOffset);
        ctx.lineTo(centerX - 6, centerY - 4 + bobOffset);
        ctx.stroke();
        // Dark lens
        ctx.fillStyle = '#1a1a1a';
        ctx.beginPath();
        ctx.ellipse(centerX + 1, centerY - 3 + bobOffset, 3, 2, -0.2, 0, Math.PI * 2);
        ctx.fill();
        // Reflection
        ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
        ctx.beginPath();
        ctx.arc(centerX, centerY - 4 + bobOffset, 1, 0, Math.PI * 2);
        ctx.fill();
        
        // Cigarette
        ctx.fillStyle = '#ecf0f1';
        ctx.fillRect(centerX + 3, centerY + 3 + bobOffset, 10, 2);
        ctx.fillStyle = '#d4a574';
        ctx.fillRect(centerX + 3, centerY + 3 + bobOffset, 2, 2);
        ctx.fillStyle = '#e67e22';
        ctx.fillRect(centerX + 13, centerY + 2.5 + bobOffset, 2, 3);
        // Glow
        ctx.fillStyle = '#e74c3c';
        ctx.beginPath();
        ctx.arc(centerX + 14, centerY + 4 + bobOffset, 1.5, 0, Math.PI * 2);
        ctx.fill();
        // Smoke
        ctx.fillStyle = 'rgba(189, 195, 199, 0.3)';
        ctx.beginPath();
        ctx.arc(centerX + 16, centerY + 2 + bobOffset, 1.5, 0, Math.PI * 2);
        ctx.fill();
        
        // Backpack (partially visible from side - on the back)
        if (hasBackpack) {
            // Backpack body peeking from behind
            ctx.fillStyle = '#689f38';
            ctx.fillRect(centerX - 6, centerY - 6 + bobOffset, 4, 12);
            // Darker shade
            ctx.fillStyle = '#558b2f';
            ctx.fillRect(centerX - 6, centerY - 6 + bobOffset, 4, 2);
            ctx.fillRect(centerX - 6, centerY - 6 + bobOffset, 2, 12);
            // Strap
            ctx.fillStyle = '#7cb342';
            ctx.fillRect(centerX - 4, centerY - 4 + bobOffset, 2, 8);
        }
        
        // Legs (walk animation) - attach at bottom taper
        ctx.strokeStyle = '#f39c12';
        ctx.lineWidth = 2;
        if (frame === 0) {
            ctx.beginPath();
            ctx.moveTo(centerX - 2, centerY + 17);
            ctx.lineTo(centerX - 3, centerY + 21);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(centerX + 4, centerY + 17);
            ctx.lineTo(centerX + 3, centerY + 21);
            ctx.stroke();
        } else {
            ctx.beginPath();
            ctx.moveTo(centerX - 2, centerY + 17);
            ctx.lineTo(centerX - 1, centerY + 21);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(centerX + 4, centerY + 17);
            ctx.lineTo(centerX + 5, centerY + 21);
            ctx.stroke();
        }
        
    } else if (direction === 'left') {
        // FACING LEFT (mirrored side view)
        
        // Banana body (LONGER with taper)
        ctx.fillStyle = '#f1c40f';
        ctx.beginPath();
        ctx.moveTo(centerX - 4, centerY - 10 + bobOffset);
        ctx.quadraticCurveTo(centerX + 2, centerY - 8 + bobOffset, centerX + 4, centerY + bobOffset);
        ctx.quadraticCurveTo(centerX + 5, centerY + 8 + bobOffset, centerX + 2, centerY + 16 + bobOffset);
        ctx.lineTo(centerX - 6, centerY + 16 + bobOffset);
        ctx.quadraticCurveTo(centerX - 4, centerY + 8 + bobOffset, centerX - 5, centerY + bobOffset);
        ctx.quadraticCurveTo(centerX - 7, centerY - 8 + bobOffset, centerX - 11, centerY - 10 + bobOffset);
        ctx.closePath();
        ctx.fill();
        
        // Banana ridge
        ctx.strokeStyle = '#f39c12';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(centerX - 6, centerY - 9 + bobOffset);
        ctx.quadraticCurveTo(centerX - 2, centerY + bobOffset, centerX - 3, centerY + 15 + bobOffset);
        ctx.stroke();
        
        // Bottom taper point
        ctx.fillStyle = '#e8b40f';
        ctx.beginPath();
        ctx.ellipse(centerX - 2, centerY + 17 + bobOffset, 5, 2, 0, 0, Math.PI * 2);
        ctx.fill();
        
        // Stem
        ctx.fillStyle = '#8b7355';
        ctx.beginPath();
        ctx.moveTo(centerX - 7, centerY - 10 + bobOffset);
        ctx.lineTo(centerX - 6, centerY - 13 + bobOffset);
        ctx.lineTo(centerX - 8, centerY - 14 + bobOffset);
        ctx.lineTo(centerX - 10, centerY - 11 + bobOffset);
        ctx.closePath();
        ctx.fill();
        
        // Sunglasses (side view - one lens visible)
        ctx.fillStyle = '#2c3e50';
        ctx.beginPath();
        ctx.ellipse(centerX - 1, centerY - 3 + bobOffset, 4, 3, 0.2, 0, Math.PI * 2);
        ctx.fill();
        // Temple arm
        ctx.strokeStyle = '#2c3e50';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(centerX + 3, centerY - 3 + bobOffset);
        ctx.lineTo(centerX + 6, centerY - 4 + bobOffset);
        ctx.stroke();
        // Dark lens
        ctx.fillStyle = '#1a1a1a';
        ctx.beginPath();
        ctx.ellipse(centerX - 1, centerY - 3 + bobOffset, 3, 2, 0.2, 0, Math.PI * 2);
        ctx.fill();
        // Reflection
        ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
        ctx.beginPath();
        ctx.arc(centerX, centerY - 4 + bobOffset, 1, 0, Math.PI * 2);
        ctx.fill();
        
        // Cigarette
        ctx.fillStyle = '#ecf0f1';
        ctx.fillRect(centerX - 13, centerY + 3 + bobOffset, 10, 2);
        ctx.fillStyle = '#d4a574';
        ctx.fillRect(centerX - 5, centerY + 3 + bobOffset, 2, 2);
        ctx.fillStyle = '#e67e22';
        ctx.fillRect(centerX - 15, centerY + 2.5 + bobOffset, 2, 3);
        // Glow
        ctx.fillStyle = '#e74c3c';
        ctx.beginPath();
        ctx.arc(centerX - 14, centerY + 4 + bobOffset, 1.5, 0, Math.PI * 2);
        ctx.fill();
        // Smoke
        ctx.fillStyle = 'rgba(189, 195, 199, 0.3)';
        ctx.beginPath();
        ctx.arc(centerX - 16, centerY + 2 + bobOffset, 1.5, 0, Math.PI * 2);
        ctx.fill();
        
        // Backpack (partially visible from side - on the back)
        if (hasBackpack) {
            // Backpack body peeking from behind (right side when facing left)
            ctx.fillStyle = '#689f38';
            ctx.fillRect(centerX + 2, centerY - 6 + bobOffset, 4, 12);
            // Darker shade
            ctx.fillStyle = '#558b2f';
            ctx.fillRect(centerX + 4, centerY - 6 + bobOffset, 2, 12);
            ctx.fillRect(centerX + 2, centerY - 6 + bobOffset, 4, 2);
            // Strap on front (left side of body)
            ctx.fillStyle = '#7cb342';
            ctx.fillRect(centerX - 4, centerY - 4 + bobOffset, 2, 8);
        }
        
        // Legs (walk animation) - attach at bottom taper
        ctx.strokeStyle = '#f39c12';
        ctx.lineWidth = 2;
        if (frame === 0) {
            ctx.beginPath();
            ctx.moveTo(centerX + 2, centerY + 17);
            ctx.lineTo(centerX + 3, centerY + 21);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(centerX - 4, centerY + 17);
            ctx.lineTo(centerX - 3, centerY + 21);
            ctx.stroke();
        } else {
            ctx.beginPath();
            ctx.moveTo(centerX + 2, centerY + 17);
            ctx.lineTo(centerX + 1, centerY + 21);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(centerX - 4, centerY + 17);
            ctx.lineTo(centerX - 5, centerY + 21);
            ctx.stroke();
        }
    }
}