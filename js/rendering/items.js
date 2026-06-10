// Render different item types
function drawItem(x, y, itemType, frame) {
    const centerX = x + TILE_SIZE / 2;
    const centerY = y + TILE_SIZE / 2;
    
    if (itemType.sprite === 'keys') {
        drawKeys(centerX, centerY, frame);
    } else if (itemType.sprite === 'flashlight') {
        drawFlashlight(centerX, centerY, frame);
    }
    // Add more item sprite types here
}

function drawKeys(centerX, centerY, frame) {
    // Gentle floating animation
    const floatOffset = Math.sin(frame * 0.5) * 2;
    const y = centerY + floatOffset;
    
    // Key ring
    ctx.strokeStyle = '#c0c0c0';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(centerX - 5, y - 8, 4, 0, Math.PI * 2);
    ctx.stroke();
    
    // Key 1 (larger key - ignition)
    ctx.fillStyle = '#ffd700'; // Gold
    ctx.strokeStyle = '#b8860b';
    ctx.lineWidth = 1;
    
    // Key shaft
    ctx.fillRect(centerX - 3, y - 5, 2, 10);
    ctx.strokeRect(centerX - 3, y - 5, 2, 10);
    
    // Key head (bow)
    ctx.beginPath();
    ctx.arc(centerX - 2, y - 7, 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    
    // Key teeth
    ctx.fillRect(centerX - 3, y + 3, 2, 2);
    ctx.fillRect(centerX - 3, y + 6, 2, 2);
    
    // Key 2 (smaller key - door)
    ctx.fillStyle = '#c0c0c0'; // Silver
    ctx.strokeStyle = '#808080';
    
    // Key shaft
    ctx.fillRect(centerX + 1, y - 3, 1.5, 8);
    ctx.strokeRect(centerX + 1, y - 3, 1.5, 8);
    
    // Key head
    ctx.beginPath();
    ctx.arc(centerX + 1.5, y - 4.5, 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    
    // Key teeth
    ctx.fillRect(centerX + 1, y + 3, 1.5, 1.5);
    
    // Shine effect
    ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
    ctx.beginPath();
    ctx.arc(centerX - 3, y - 8, 1, 0, Math.PI * 2);
    ctx.fill();
    
    // Shadow
    ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
    ctx.beginPath();
    ctx.ellipse(centerX, centerY + 12, 6, 2, 0, 0, Math.PI * 2);
    ctx.fill();
}

function drawFlashlight(centerX, centerY, frame) {
    // Gentle floating animation
    const floatOffset = Math.sin(frame * 0.5) * 2;
    const y = centerY + floatOffset;
    
    // Flashlight body
    ctx.fillStyle = '#ff3333'; // Red flashlight
    ctx.fillRect(centerX - 3, y - 8, 6, 12);
    
    // Handle grip lines
    ctx.strokeStyle = '#cc0000';
    ctx.lineWidth = 1;
    for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        ctx.moveTo(centerX - 3, y - 5 + i * 3);
        ctx.lineTo(centerX + 3, y - 5 + i * 3);
        ctx.stroke();
    }
    
    // Head (lens area)
    ctx.fillStyle = '#666666';
    ctx.fillRect(centerX - 4, y - 10, 8, 3);
    
    // Lens (dark - no batteries)
    ctx.fillStyle = '#333333';
    ctx.beginPath();
    ctx.arc(centerX, y - 8.5, 2.5, 0, Math.PI * 2);
    ctx.fill();
    
    // Lens reflection
    ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.beginPath();
    ctx.arc(centerX - 1, y - 9.5, 1, 0, Math.PI * 2);
    ctx.fill();
    
    // Button
    ctx.fillStyle = '#000000';
    ctx.fillRect(centerX + 2, y - 3, 2, 2);
    
    // Shadow
    ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
    ctx.beginPath();
    ctx.ellipse(centerX, centerY + 12, 5, 2, 0, 0, Math.PI * 2);
    ctx.fill();
}