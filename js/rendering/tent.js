// rendering/tent.js - Modern camping tent sprite (SNES-style, pixelated)

/**
 * Draw a modern dome camping tent
 * SNES-authentic pixelated style with configurable color scheme
 * Larger size to match interior space (6 tiles wide × 4 tiles tall)
 * 
 * @param {number} x - Top-left tile X position
 * @param {number} y - Top-left tile Y position
 * @param {number} screenX - Screen X coordinate
 * @param {number} screenY - Screen Y coordinate
 * @param {string} color - Tent color: 'red' or 'blue' (default: 'red')
 */
function drawTent(x, y, screenX, screenY, color = 'red') {
    const tileSize = TILE_SIZE;
    
    // Tent dimensions: 6 tiles wide × 4 tiles tall (larger modern tent)
    const tentWidth = tileSize * 6;
    const tentHeight = tileSize * 4;
    
    // SNES-style limited color palette
    let tentMain, tentDark, tentHighlight;
    
    if (color === 'blue') {
        // Blue tent color scheme (STRAWBERTO's tent)
        tentMain = '#1976d2';       // Bright blue (main body)
        tentDark = '#0d47a1';       // Dark blue (shadows)
        tentHighlight = '#42a5f5';  // Light blue (highlights)
    } else if (color === 'green') {
        // Green tent color scheme
        tentMain = '#388e3c';       // Bright green
        tentDark = '#1b5e20';       // Dark green
        tentHighlight = '#66bb6a';  // Light green
    } else if (color === 'yellow') {
        // Green tent color scheme
        tentMain = '#fbc02d';       // Yellow 700 (main) // tentMain = '#f9a825'; // Yellow 800 — more grounded (alternative)
        tentDark = '#f57f17';       // Yellow 900 (dark)
        tentHighlight = '#ffee58';  // Yellow 400 (highlight)        
    } else {
        // Red tent color scheme (ELEKTRA's tent - default)
        tentMain = '#d32f2f';       // Bright red (main body)
        tentDark = '#b71c1c';       // Dark red (shadows)
        tentHighlight = '#ef5350';  // Light red (highlights)
    }
    
    const poleGray = '#616161';          // Gray poles
    const darkGray = '#424242';          // Dark details
    const zipperGold = '#fdd835';        // Zipper
    const grassBase = '#7cb342';         // Grass
    const stakeBlack = '#212121';        // Stakes
    
    // ===== BASE GRASS (under tent) =====
    ctx.fillStyle = grassBase;
    //ctx.fillRect(screenX, screenY + tentHeight - tileSize, tentWidth, tileSize);
    
    // ===== MAIN TENT BODY (Modern dome shape) =====
    // Draw in 4-pixel increments for SNES-style pixelation
    
    // Bottom foundation (dark tent base)
    ctx.fillStyle = tentDark;
    ctx.fillRect(screenX + tileSize * 0.5, screenY + tentHeight - tileSize * 1.5, tileSize * 5, tileSize * 0.5);
    
    // Build dome shape layer by layer (pixelated dome curve)
    const domeRows = [
        { y: 0, width: tileSize * 2, offset: tileSize * 2 },      // Top peak
        { y: tileSize * 0.5, width: tileSize * 3, offset: tileSize * 1.5 },
        { y: tileSize * 1, width: tileSize * 4, offset: tileSize * 1 },
        { y: tileSize * 1.5, width: tileSize * 5, offset: tileSize * 0.5 },
        { y: tileSize * 2, width: tileSize * 5, offset: tileSize * 0.5 },
        { y: tileSize * 2.5, width: tileSize * 5, offset: tileSize * 0.5 }
    ];
    
    // Draw left half (bright tent color)
    ctx.fillStyle = tentMain;
    for (let i = 0; i < domeRows.length; i++) {
        const row = domeRows[i];
        const leftHalfWidth = Math.floor(row.width / 2);
        ctx.fillRect(
            screenX + row.offset,
            screenY + row.y,
            leftHalfWidth,
            tileSize * 0.5
        );
    }
    
    // Draw right half (dark tent color for shadow)
    ctx.fillStyle = tentDark;
    for (let i = 0; i < domeRows.length; i++) {
        const row = domeRows[i];
        const leftHalfWidth = Math.floor(row.width / 2);
        const rightHalfWidth = row.width - leftHalfWidth;
        ctx.fillRect(
            screenX + row.offset + leftHalfWidth,
            screenY + row.y,
            rightHalfWidth,
            tileSize * 0.5
        );
    }
    
    // ===== TENT HIGHLIGHTS (top ridge) =====
    ctx.fillStyle = tentHighlight;
    // Top peak highlight
    ctx.fillRect(screenX + tileSize * 2, screenY, tileSize * 2, tileSize * 0.25);
    // Left slope highlight
    ctx.fillRect(screenX + tileSize * 1.5, screenY + tileSize * 0.5, tileSize * 0.5, tileSize * 2);
    
    // ===== ENTRANCE FLAP (front) =====
    const flapCenterX = screenX + tentWidth / 2;
    const flapBottomY = screenY + tentHeight - tileSize;
    
    // Dark entrance opening (pixelated arch)
    ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
    
    // Build entrance arch in pixel rows
    const entranceRows = [
        { y: 0, width: tileSize * 0.5, offset: tileSize * 0.75 },
        { y: tileSize * 0.25, width: tileSize * 1, offset: tileSize * 0.5 },
        { y: tileSize * 0.5, width: tileSize * 1.25, offset: tileSize * 0.375 },
        { y: tileSize * 0.75, width: tileSize * 1.25, offset: tileSize * 0.375 },
        { y: tileSize * 1, width: tileSize * 1.25, offset: tileSize * 0.375 }
    ];
    
    for (let i = 0; i < entranceRows.length; i++) {
        const row = entranceRows[i];
        ctx.fillRect(
            flapCenterX - row.width / 2,
            flapBottomY - tileSize * 1.25 + row.y,
            row.width,
            tileSize * 0.25
        );
    }
    
    // ===== ZIPPER (bright yellow detail) =====
    ctx.fillStyle = zipperGold;
    // Vertical zipper line
    for (let i = 0; i < 5; i++) {
        ctx.fillRect(
            flapCenterX - 2,
            flapBottomY - tileSize * 1.25 + i * 4,
            4,
            2
        );
    }
    
    // ===== TENT POLES (visible ends) =====
    ctx.fillStyle = poleGray;
    
    // Left pole
    ctx.fillRect(screenX + tileSize * 0.5, screenY + tentHeight - tileSize * 1.25, 4, tileSize * 1.25);
    
    // Right pole
    ctx.fillRect(screenX + tentWidth - tileSize * 0.5 - 4, screenY + tentHeight - tileSize * 1.25, 4, tileSize * 1.25);
    
    // ===== STAKES & GUY LINES =====
    ctx.strokeStyle = stakeBlack;
    ctx.lineWidth = 2;
    
    // Left stake
    const leftStakeX = screenX + tileSize * 0.25;
    const stakeY = screenY + tentHeight - 4;
    ctx.beginPath();
    ctx.moveTo(leftStakeX, stakeY - 8);
    ctx.lineTo(leftStakeX, stakeY);
    ctx.stroke();
    
    // Left guy line
    ctx.beginPath();
    ctx.moveTo(screenX + tileSize * 0.75, screenY + tentHeight - tileSize * 1.5);
    ctx.lineTo(leftStakeX, stakeY - 4);
    ctx.stroke();
    
    // Right stake
    const rightStakeX = screenX + tentWidth - tileSize * 0.25;
    ctx.beginPath();
    ctx.moveTo(rightStakeX, stakeY - 8);
    ctx.lineTo(rightStakeX, stakeY);
    ctx.stroke();
    
    // Right guy line
    ctx.beginPath();
    ctx.moveTo(screenX + tentWidth - tileSize * 0.75, screenY + tentHeight - tileSize * 1.5);
    ctx.lineTo(rightStakeX, stakeY - 4);
    ctx.stroke();
    
    // ===== TENT SEAMS (detail lines) =====
    ctx.strokeStyle = 'rgba(139, 0, 0, 0.5)';
    ctx.lineWidth = 1;
    
    // Horizontal seams across dome
    for (let i = 1; i < 4; i++) {
        const seamY = screenY + i * tileSize * 0.75;
        const seamRow = domeRows[Math.min(i, domeRows.length - 1)];
        
        ctx.beginPath();
        ctx.moveTo(screenX + seamRow.offset, seamY);
        ctx.lineTo(screenX + seamRow.offset + seamRow.width, seamY);
        ctx.stroke();
    }
    
    // Vertical center seam
    ctx.beginPath();
    ctx.moveTo(flapCenterX, screenY);
    ctx.lineTo(flapCenterX, screenY + tentHeight - tileSize);
    ctx.stroke();
    
    // ===== RAIN FLY OVERHANG (subtle detail) =====
    ctx.fillStyle = tentHighlight;
    // Small overhang at top
    ctx.fillRect(screenX + tileSize * 1.75, screenY - 2, tileSize * 2.5, 4);
}