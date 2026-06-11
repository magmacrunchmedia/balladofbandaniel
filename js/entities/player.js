// player.js - Player health system

// DOM references (may be null if deprecated HUD elements removed)
const healthBarFill = document.getElementById('healthBarFill');
const healthBarText = document.getElementById('healthBarText');

let damageCooldown = 0;

function updateHealthBar() {
    if (typeof player === 'undefined') return;
    const healthPercent = (player.health / player.maxHealth) * 100;
    
    // Update deprecated health bar (if elements exist)
    if (healthBarFill) healthBarFill.style.width = healthPercent + '%';
    if (healthBarText) healthBarText.textContent = `${player.health} / ${player.maxHealth}`;
    
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
    if (player.health <= 0) {
        triggerGameOver();
    }
}

function damagePlayer(amount) {
    player.health = Math.max(0, player.health - amount);
    updateHealthBar();
    if (typeof onHealthChanged === 'function') onHealthChanged();
}

function healPlayer(amount) {
    player.health = Math.min(player.maxHealth, player.health + amount);
    updateHealthBar();
    if (typeof onHealthChanged === 'function') onHealthChanged();
}