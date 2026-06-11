// gameover.js - Game over and restart functionality

const gameOverScreen = document.getElementById('gameOverScreen');
const restartButton = document.getElementById('restartButton');
const finalStats = document.getElementById('finalStats');

function triggerGameOver() {
    gameOver = true;  // CHANGED from gamePaused
    gameOverScreen.classList.add('active');
    
    // Show final stats
    finalStats.textContent = `You collected ${coinsCollected} coins!`;
}

function restartGame() {
    // Reset player health
    player.health = player.maxHealth;
    updateHealthBar();
    if (typeof onHealthChanged === 'function') onHealthChanged();
    
    // Reset player position and movement state
    player.x = player.targetX = 20;
    player.y = player.targetY = 18;
    player.moving = false;  
    player.isWalking = false;  
    player.direction = 'down';  
    player.facingX = 0;  
    player.facingY = 1;  
    
    currentMap = 'upstairs';
    map = mapHouseUpstairs;
    coins = coinsUpstairs;
    
    // Reset coins
    coinsCollected = 0;
    coinCountDisplay.textContent = coinsCollected;
    
    // Reset all coin collected states
    for (let coinArray of [coinsOutside, coinsHouse, coinsUpstairs, coinsTunnel]) {
        for (let coin of coinArray) {
            coin.collected = false;
        }
    }
    
    // Clear inventory
    inventory.length = 0;
    updateInventoryDisplay();
    
    // Clear all pressed keys 
    for (let key in keys) {
        keys[key] = false;
    }
    for (let key in keysPressed) {
        keysPressed[key] = false;
    }
    
    // Hide game over screen
    gameOverScreen.classList.remove('active');
    gameOver = false;
}

// Event listener for restart button
restartButton.addEventListener('click', restartGame);