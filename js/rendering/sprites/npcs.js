// sprites/npcs.js
// NPC sprites (wizard, merchant, cat, etc.)

function drawWizard(x, y) {
    const s = TILE_SIZE / 32;
    ctx.fillStyle = '#9c27b0';
    ctx.fillRect(x+8*s, y+14*s, 16*s, 16*s);
    ctx.fillStyle = '#ffdbac';
    ctx.fillRect(x+11*s, y+8*s, 10*s, 8*s);
    ctx.fillStyle = '#6a1b9a';
    ctx.fillRect(x+11*s, y+4*s, 10*s, 6*s);
    ctx.fillRect(x+9*s, y+9*s, 14*s, 2*s);
    ctx.fillStyle = '#ddd';
    ctx.fillRect(x+11*s, y+14*s, 10*s, 6*s);
    ctx.fillStyle = '#000';
    ctx.fillRect(x+13*s, y+11*s, 2*s, 2*s);
    ctx.fillRect(x+17*s, y+11*s, 2*s, 2*s);
    ctx.fillStyle = '#8b4513';
    ctx.fillRect(x+24*s, y+10*s, 2*s, 18*s);
    ctx.fillStyle = '#ffd700';
    ctx.fillRect(x+23*s, y+8*s, 4*s, 4*s);
}

function drawMerchant(x, y) {
    const s = TILE_SIZE / 32;
    ctx.fillStyle = '#ff9800';
    ctx.fillRect(x+9*s, y+14*s, 14*s, 14*s);
    ctx.fillStyle = '#ffdbac';
    ctx.fillRect(x+11*s, y+8*s, 10*s, 8*s);
    ctx.fillStyle = '#f57c00';
    ctx.fillRect(x+10*s, y+6*s, 12*s, 4*s);
    ctx.fillRect(x+12*s, y+4*s, 8*s, 2*s);
    ctx.fillStyle = '#000';
    ctx.fillRect(x+13*s, y+11*s, 2*s, 2*s);
    ctx.fillRect(x+17*s, y+11*s, 2*s, 2*s);
    ctx.fillRect(x+13*s, y+14*s, 6*s, 1*s);
    ctx.fillStyle = '#fff';
    ctx.fillRect(x+11*s, y+16*s, 10*s, 10*s);
    ctx.fillStyle = '#8b4513';
    ctx.fillRect(x+6*s, y+18*s, 4*s, 6*s);
}

function drawCat(x, y) {
    const s = TILE_SIZE / 32;
    
    // Cat body (orange)
    ctx.fillStyle = '#ff8c42';
    ctx.fillRect(x+10*s, y+18*s, 12*s, 10*s);
    
    // Cat head (orange)
    ctx.fillStyle = '#ff8c42';
    ctx.fillRect(x+11*s, y+10*s, 10*s, 10*s);
    
    // Ears (triangular)
    ctx.fillStyle = '#ff8c42';
    ctx.beginPath();
    ctx.moveTo(x+11*s, y+10*s);
    ctx.lineTo(x+13*s, y+6*s);
    ctx.lineTo(x+15*s, y+10*s);
    ctx.fill();
    
    ctx.beginPath();
    ctx.moveTo(x+17*s, y+10*s);
    ctx.lineTo(x+19*s, y+6*s);
    ctx.lineTo(x+21*s, y+10*s);
    ctx.fill();
    
    // Inner ears (pink)
    ctx.fillStyle = '#ffb3ba';
    ctx.beginPath();
    ctx.moveTo(x+12*s, y+9*s);
    ctx.lineTo(x+13*s, y+7*s);
    ctx.lineTo(x+14*s, y+9*s);
    ctx.fill();
    
    ctx.beginPath();
    ctx.moveTo(x+18*s, y+9*s);
    ctx.lineTo(x+19*s, y+7*s);
    ctx.lineTo(x+20*s, y+9*s);
    ctx.fill();
    
    // Eyes (green)
    ctx.fillStyle = '#4caf50';
    ctx.fillRect(x+13*s, y+13*s, 2*s, 2*s);
    ctx.fillRect(x+17*s, y+13*s, 2*s, 2*s);
    
    // Pupils
    ctx.fillStyle = '#000';
    ctx.fillRect(x+13.5*s, y+13.5*s, 1*s, 1*s);
    ctx.fillRect(x+17.5*s, y+13.5*s, 1*s, 1*s);
    
    // Nose (pink)
    ctx.fillStyle = '#ffb3ba';
    ctx.beginPath();
    ctx.moveTo(x+15*s, y+16*s);
    ctx.lineTo(x+16*s, y+17*s);
    ctx.lineTo(x+17*s, y+16*s);
    ctx.fill();
    
    // Whiskers
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 1;
    // Left whiskers
    ctx.beginPath();
    ctx.moveTo(x+11*s, y+15*s);
    ctx.lineTo(x+7*s, y+14*s);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x+11*s, y+16*s);
    ctx.lineTo(x+7*s, y+16*s);
    ctx.stroke();
    // Right whiskers
    ctx.beginPath();
    ctx.moveTo(x+21*s, y+15*s);
    ctx.lineTo(x+25*s, y+14*s);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x+21*s, y+16*s);
    ctx.lineTo(x+25*s, y+16*s);
    ctx.stroke();
    
    // Stripes on body
    ctx.strokeStyle = '#d96b24';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x+12*s, y+20*s);
    ctx.lineTo(x+20*s, y+20*s);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x+12*s, y+23*s);
    ctx.lineTo(x+20*s, y+23*s);
    ctx.stroke();
    
    // Tail (curled)
    ctx.strokeStyle = '#ff8c42';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(x+22*s, y+24*s);
    ctx.quadraticCurveTo(x+26*s, y+20*s, x+24*s, y+16*s);
    ctx.stroke();
    
    // Legs
    ctx.fillStyle = '#ff8c42';
    ctx.fillRect(x+12*s, y+28*s, 3*s, 4*s);
    ctx.fillRect(x+17*s, y+28*s, 3*s, 4*s);
}

function drawEnemy(x, y, frame) {
    const s = TILE_SIZE / 32;
    
    // Body - dark purple/red
    ctx.fillStyle = '#7b1fa2';
    ctx.fillRect(x+10*s, y+14*s, 12*s, 14*s);
    
    // Head - darker purple
    ctx.fillStyle = '#4a148c';
    ctx.fillRect(x+11*s, y+8*s, 10*s, 8*s);
    
    // Horns
    ctx.fillStyle = '#000';
    ctx.fillRect(x+9*s, y+6*s, 3*s, 4*s);
    ctx.fillRect(x+20*s, y+6*s, 3*s, 4*s);
    
    // Eyes - glowing red
    ctx.fillStyle = '#ff0000';
    ctx.fillRect(x+13*s, y+11*s, 2*s, 2*s);
    ctx.fillRect(x+17*s, y+11*s, 2*s, 2*s);
    
    // Arms
    ctx.fillStyle = '#6a1b9a';
    ctx.fillRect(x+8*s, y+16*s, 3*s, 8*s);
    ctx.fillRect(x+21*s, y+16*s, 3*s, 8*s);
    
    // Legs
    ctx.fillStyle = '#4a148c';
    if (frame === 0) {
        ctx.fillRect(x+11*s, y+28*s, 4*s, 4*s);
        ctx.fillRect(x+17*s, y+28*s, 4*s, 4*s);
    } else {
        ctx.fillRect(x+11*s, y+27*s, 4*s, 5*s);
        ctx.fillRect(x+17*s, y+29*s, 4*s, 3*s);
    }
}