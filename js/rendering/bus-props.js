// bus-props.js - Props for da Bussy interior

/**
 * Bus interior props namespace
 */
window.BusProps = {
    /**
     * Draw steering wheel / driver console (SIDEWALL MOUNTED)
     * This is where BANDANIEL can talk to da Bussy
     * Can be rotated 180 degrees for opposite wall
     * @param {CanvasRenderingContext2D} ctx - Canvas context
     * @param {number} x - Screen X position (top-left of prop)
     * @param {number} y - Screen Y position (top-left of prop)
     * @param {number} tileSize - Size of a tile (16px)
     * @param {boolean} flipped - If true, flip 180 degrees for opposite wall
     */
    drawSteeringWheel: function(ctx, x, y, tileSize, flipped = false) {
        // This prop is 2 tiles wide × 2 tiles tall
        const width = tileSize * 2;   // 32px
        const height = tileSize * 2;  // 32px
        
        // Calculate center point for rotation
        const centerX = x + width / 2;
        const centerY = y + height / 2;
        
        // Save context state
        ctx.save();
        
        // Apply rotation if flipped
        if (flipped) {
            ctx.translate(centerX, centerY);
            ctx.rotate(Math.PI); // 180 degrees
            ctx.translate(-centerX, -centerY);
        }
        
        // Wall panel (vertical panel on sidewall)
        ctx.fillStyle = '#2a2a2a';
        ctx.fillRect(x, y, 8, height);
        
        // Panel highlight (left edge)
        ctx.fillStyle = '#3a3a3a';
        ctx.fillRect(x, y, 2, height);
        
        // Panel shadow (right edge)
        ctx.fillStyle = '#1a1a1a';
        ctx.fillRect(x + 6, y, 2, height);
        
        // Steering wheel mounting bracket (horizontal arm from wall)
        ctx.fillStyle = '#424242';
        ctx.fillRect(x + 8, y + height/2 - 3, 6, 6);
        
        // Bracket shadow
        ctx.fillStyle = '#2a2a2a';
        ctx.fillRect(x + 8, y + height/2 + 2, 6, 1);
        
        // Steering wheel rim (circular, extending from bracket)
        const wheelCenterX = x + 20;
        const wheelCenterY = y + height/2;
        const wheelRadius = 9;
        
        ctx.strokeStyle = '#616161';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(wheelCenterX, wheelCenterY, wheelRadius, 0, Math.PI * 2);
        ctx.stroke();
        
        // Steering wheel center hub (da Bussy logo area)
        ctx.fillStyle = '#f9a825';  // School bus yellow
        ctx.beginPath();
        ctx.arc(wheelCenterX, wheelCenterY, 5, 0, Math.PI * 2);
        ctx.fill();
        
        // Hub detail (darker center)
        ctx.fillStyle = '#f57f17';
        ctx.beginPath();
        ctx.arc(wheelCenterX, wheelCenterY, 3, 0, Math.PI * 2);
        ctx.fill();
        
        // Steering wheel spokes (3 spokes)
        ctx.strokeStyle = '#757575';
        ctx.lineWidth = 2;
        for (let i = 0; i < 3; i++) {
            const angle = (i / 3) * Math.PI * 2 - Math.PI / 2;
            const innerX = wheelCenterX + Math.cos(angle) * 3;
            const innerY = wheelCenterY + Math.sin(angle) * 3;
            const outerX = wheelCenterX + Math.cos(angle) * wheelRadius;
            const outerY = wheelCenterY + Math.sin(angle) * wheelRadius;
            
            ctx.beginPath();
            ctx.moveTo(innerX, innerY);
            ctx.lineTo(outerX, outerY);
            ctx.stroke();
        }
        
        // Control panel lights on wall (above wheel)
        // Red indicator
        ctx.fillStyle = '#e53935';
        ctx.beginPath();
        ctx.arc(x + 4, y + 6, 2, 0, Math.PI * 2);
        ctx.fill();
        
        // Green indicator
        ctx.fillStyle = '#43a047';
        ctx.beginPath();
        ctx.arc(x + 4, y + 12, 2, 0, Math.PI * 2);
        ctx.fill();
        
        // Blue indicator (below wheel)
        ctx.fillStyle = '#1e88e5';
        ctx.beginPath();
        ctx.arc(x + 4, y + height - 12, 2, 0, Math.PI * 2);
        ctx.fill();
        
        // Yellow indicator
        ctx.fillStyle = '#fdd835';
        ctx.beginPath();
        ctx.arc(x + 4, y + height - 6, 2, 0, Math.PI * 2);
        ctx.fill();
        
        // Restore context state (undo rotation)
        ctx.restore();
    },
    
    /**
     * Draw retro dashboard/radio (alternative to steering wheel)
     * @param {CanvasRenderingContext2D} ctx - Canvas context
     * @param {number} x - Screen X position
     * @param {number} y - Screen Y position
     * @param {number} tileSize - Size of a tile (16px)
     */
    drawDashboard: function(ctx, x, y, tileSize) {
        // This prop is 3 tiles wide × 2 tiles tall
        const width = tileSize * 3;   // 48px
        const height = tileSize * 2;  // 32px
        
        // Main dashboard panel
        ctx.fillStyle = '#2a2a2a';
        ctx.fillRect(x, y, width, height);
        
        // Top highlight
        ctx.fillStyle = '#3a3a3a';
        ctx.fillRect(x, y, width, 3);
        
        // Screen/display area (left side)
        ctx.fillStyle = '#0d47a1';
        ctx.fillRect(x + 3, y + 5, 20, 12);
        
        // Screen glow
        ctx.fillStyle = '#1976d2';
        ctx.fillRect(x + 4, y + 6, 18, 2);
        
        // Screen text lines (pixelated display)
        ctx.fillStyle = '#64b5f6';
        ctx.fillRect(x + 5, y + 9, 12, 1);
        ctx.fillRect(x + 5, y + 12, 16, 1);
        ctx.fillRect(x + 5, y + 15, 8, 1);
        
        // Buttons (right side)
        const buttonColors = ['#e53935', '#43a047', '#fdd835', '#1e88e5'];
        for (let i = 0; i < 4; i++) {
            const buttonX = x + 27 + (i % 2) * 8;
            const buttonY = y + 6 + Math.floor(i / 2) * 8;
            
            ctx.fillStyle = buttonColors[i];
            ctx.fillRect(buttonX, buttonY, 6, 6);
            
            // Button shadow
            ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
            ctx.fillRect(buttonX, buttonY, 6, 1);
            ctx.fillRect(buttonX, buttonY, 1, 6);
        }
        
        // Bottom vent/grille
        ctx.fillStyle = '#1a1a1a';
        for (let i = 0; i < 10; i++) {
            ctx.fillRect(x + 3 + i * 4, y + height - 5, 2, 3);
        }
    }
};

// NOTE: getBusPropsForMap() has been moved to props.js
// This keeps all prop management centralized
