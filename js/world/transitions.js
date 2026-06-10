// transitions.js - Map transition functions for tent interiors and da Bussy
// Uses: bus-unlock-system.js for permanent unlock functionality
// Uses: tent-configs.js for all tent positioning

// Transition cooldown (prevents rapid re-entry)
let transitionCooldown = 0;

// ========== GENERIC TENT TRANSITIONS ==========

/**
 * Enter any tent interior from the outside
 * @param {Object} config - TENT_CONFIGS.tentX object
 */
function enterTent(config) {
    transitionCooldown = 30;
    
    currentMap = config.interior.map;
    map = MAPS[config.interior.map];
    
    player.x = config.spawns.onEnter.x;
    player.y = config.spawns.onEnter.y;
    player.facing = config.spawns.onEnter.facing;
    
    player.positionLocked = true;
    camera.x = player.x * TILE_SIZE;
    camera.y = player.y * TILE_SIZE;
    
    setTimeout(() => {
        player.positionLocked = false;
    }, 1);
}

/**
 * Exit any tent interior back to outside
 * @param {Object} config - TENT_CONFIGS.tentX object
 */
function exitTent(config) {
    transitionCooldown = 30;
    
    currentMap = 'outside';
    map = MAPS.outside;
    
    player.x = config.spawns.onExit.x;
    player.y = config.spawns.onExit.y;
    player.facing = config.spawns.onExit.facing;
    
    player.positionLocked = true;
    camera.x = player.x * TILE_SIZE;
    camera.y = player.y * TILE_SIZE;
    
    setTimeout(() => {
        player.positionLocked = false;
    }, 1);
}

/**
 * Check if player is on a tent's exit door tiles
 * @param {Object} config - TENT_CONFIGS.tentX object
 * @param {number} px - Player tile X
 * @param {number} py - Player tile Y
 * @returns {boolean} True if transition happened
 */
function checkTentTransitions(config, px, py) {
    const doors = config.interior.doorTiles;
    if (doors.some(door => px === door.x && py === door.y)) {
        if (player.direction === 'down') {
            exitTent(config);
            return true;
        }
    }
    return false;
}

// ========== DA BUSSY TRANSITIONS ==========

// DA BUSSY Entry - Automatic (uses unlock system)
function enterBussy() {
    const config = BUSSY_CONFIG;
    
    if (typeof canEnterBussy !== 'function') {
        console.error('bus-unlock-system.js not loaded! Cannot check entry permission.');
        return;
    }
    
    if (!canEnterBussy()) {
        transitionCooldown = 30;
        
        if (typeof showBussyLockedMessage === 'function') {
            showBussyLockedMessage();
        } else {
            showLockedDoorNotification();
        }
        return;
    }
    
    if (typeof onEnterBussy === 'function') {
        onEnterBussy();
    }
    
    transitionCooldown = 30;
    
    currentMap = 'bussyInterior';
    map = MAPS[config.interior.map];
    
    player.x = config.spawns.onEnter.x;
    player.y = config.spawns.onEnter.y;
    player.facing = config.spawns.onEnter.facing;
    
    player.positionLocked = true;
    camera.x = player.x * TILE_SIZE;
    camera.y = player.y * TILE_SIZE;
    
    setTimeout(() => {
        player.positionLocked = false;
    }, 1);
}

// Show locked door notification - SNES STYLE (Fallback if unlock system not loaded)
function showLockedDoorNotification() {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: absolute;
        top: 120px;
        left: 50%;
        transform: translateX(-50%);
        background: #5a4a2a;
        color: #ffd700;
        padding: 16px 24px;
        border-radius: 0;
        font-family: 'Press Start 2P', monospace;
        font-size: 11px;
        font-weight: normal;
        text-transform: lowercase;
        letter-spacing: 0;
        z-index: 1000;
        border: none;
        box-shadow: 
            0 0 0 4px #8a7a5a,
            0 0 0 8px #6a5a3a,
            0 0 0 12px #4a3a1a,
            0 12px 0 0 #3a2a0a,
            0 16px 0 0 #2a1a05;
    `;
    
    notification.innerHTML = `
        <div style="text-align: center; line-height: 1.8;">
            <div style="font-size: 9px; margin-bottom: 8px; opacity: 0.8;">locked</div>
            <div style="font-size: 11px;">need da bussy's keys</div>
        </div>
    `;
    
    document.getElementById('gameContainer').appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 2000);
}

// DA BUSSY Exit - Automatic
function exitBussy() {
    const config = BUSSY_CONFIG;
    
    transitionCooldown = 30;
    
    currentMap = 'outside';
    map = MAPS.outside;
    
    player.x = config.spawns.onExit.x;
    player.y = config.spawns.onExit.y;
    player.facing = config.spawns.onExit.facing;
    
    player.positionLocked = true;
    camera.x = player.x * TILE_SIZE;
    camera.y = player.y * TILE_SIZE;
    
    setTimeout(() => {
        player.positionLocked = false;
    }, 1);
}
