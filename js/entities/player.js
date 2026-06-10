// player.js - Player health system

// DOM references (may be null if deprecated HUD elements removed)
const healthBarFill = document.getElementById('healthBarFill');
const healthBarText = document.getElementById('healthBarText');

// Player stats
let playerHealth = 100;
const maxHealth = 100;
let damageCooldown = 0;

function updateHealthBar() {
    const healthPercent = (playerHealth / maxHealth) * 100;
    
    // Update deprecated health bar (if elements exist)
    if (healthBarFill) healthBarFill.style.width = healthPercent + '%';
    if (healthBarText) healthBarText.textContent = `${playerHealth} / ${maxHealth}`;
    
    // Change color based on health
    if (healthBarFill) {
        if (healthPercent > 60) {
            healthBarFill.style.background = 'linear-gradient(90deg, #4caf50, #66bb6a)';
        } else if (healthPercent > 30) {
            healthBarFill.style.background = 'linear-gradient(90deg, #ff9800, #ffb74d)';
        } else {
            healthBarFill.style.background = 'linear-gradient(90deg, #e53935, #ff5252)';
        }
    }
    
    // Check for game over
    if (playerHealth <= 0) {
        triggerGameOver();
    }
}

function damagePlayer(amount) {
    playerHealth = Math.max(0, playerHealth - amount);
    updateHealthBar();
}

function healPlayer(amount) {
    playerHealth = Math.min(maxHealth, playerHealth + amount);
    updateHealthBar();
}