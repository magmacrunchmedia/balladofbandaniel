// core/game.js
// Main game loop and state management - REFACTORED VERSION
// ========== USES CENTRALIZED CONFIGS ==========
// All tent transitions use TENT_CONFIGS
// All bus transitions use BUSSY_CONFIG
// No more hardcoded coordinates!

// NOTE: gameStarted, gamePaused, gameOver are now declared in main.js

// Animation counters
let animationFrame = 0;
let frameCounter = 0;
let coinAnimFrame = 0;
// NOTE: waterAnimFrame, waterAnimCounter, campfireAnimFrame, and campfireAnimCounter
// are defined in tiles.js and updated here

// PERFORMANCE: Frame rate limiting variables
let lastFrameTime = 0;
let accumulatedTime = 0;
const TARGET_FPS = 30; // 30 FPS for performance
const targetFrameTime = 1000 / TARGET_FPS;

function update() {
    if (!gameStarted || gamePaused || gameOver) return;

    // Update water animation
    waterAnimCounter++;
    if (waterAnimCounter >= 15) {  // Slower animation (15 frames = ~250ms at 60fps)
        waterAnimFrame = (waterAnimFrame + 1) % 4;  // 4-frame cycle
        waterAnimCounter = 0;
    }
    
    // ✅ UPDATE CAMPFIRE ANIMATION (faster than water for flickering effect)
    campfireAnimCounter++;
    if (campfireAnimCounter >= 3) {  // Update every 3 frames for fast flickering
        campfireAnimCounter = 0;
        campfireAnimFrame++;  // Continuously increment (campfire code handles modulo)
    }
    
    // Update camera
    updateCamera();
    
    // Update position display
    if (typeof positionDisplay !== 'undefined') {
        positionDisplay.textContent = `${Math.floor(player.x)}, ${Math.floor(player.y)}`;
    }
    
    handleMovement();
    handleCollisions();
    // Transition check now happens INSIDE handleMovement() before movement is applied
    updateNPCs();
    
    // FIX: Call the correct function name from interactions.js
    // Update interaction prompt (shows "Press SPACE" when near NPCs/props)
    if (typeof updateInteractPrompt === 'function') {
        updateInteractPrompt();
    }
}

function handleMovement() {
    // ENFORCE position lock if active (after transition)
    if (typeof enforcePositionLock === 'function') {
        enforcePositionLock();
    }

    // This prevents the game from crashing and Bandaniel from moving
    if (window.dialogueActive) {
        player.isWalking = false;
        return; 
    }
    
    // Check if any movement keys are pressed
    const isMovementKeyPressed = keys['arrowup'] || keys['w'] || keys['arrowdown'] || 
                                  keys['s'] || keys['arrowleft'] || keys['a'] || 
                                  keys['arrowright'] || keys['d'];
    
    player.isWalking = isMovementKeyPressed;
    
    // Update walking animation
    if (player.isWalking) {
        frameCounter++;
        if (frameCounter >= 5) {
            animationFrame = (animationFrame + 1) % 2;
            frameCounter = 0;
        }
    } else {
        animationFrame = 0;
        frameCounter = 0;
    }
    
    if (dialogueActive || shopOpen) return;

    // CHECK TRANSITIONS FIRST - before applying any movement
    // This prevents movement from continuing after a transition
    if (checkAutomaticTransitions()) {
        // Transition occurred - skip movement this frame
        return;
    }

    // Direct movement system
    let moveX = 0;
    let moveY = 0;
    const moveSpeed = 0.4;  

    if (keys['arrowup'] || keys['w']) {
        moveY = -moveSpeed;
        player.facingX = 0; player.facingY = -1;
        player.direction = 'up';
    }
    if (keys['arrowdown'] || keys['s']) {
        moveY = moveSpeed;
        player.facingX = 0; player.facingY = 1;
        player.direction = 'down';
    }
    if (keys['arrowleft'] || keys['a']) {
        moveX = -moveSpeed;
        player.facingX = -1; player.facingY = 0;
        player.direction = 'left';
    }
    if (keys['arrowright'] || keys['d']) {
        moveX = moveSpeed;
        player.facingX = 1; player.facingY = 0;
        player.direction = 'right';
    }   

    // Normalize diagonal movement
    if (moveX !== 0 && moveY !== 0) {
        const diagonal = moveSpeed / Math.sqrt(2);
        moveX = moveX > 0 ? diagonal : -diagonal;
        moveY = moveY > 0 ? diagonal : -diagonal;
    }   

    // Calculate new position
    const newX = player.x + moveX;
    const newY = player.y + moveY;

    // Calculate floored values once for consistency
    const floorNewX = Math.floor(newX);
    const floorNewY = Math.floor(newY);
    const floorPlayerX = Math.floor(player.x);
    const floorPlayerY = Math.floor(player.y);

    // Check collision using consistent floor values
    if (moveX !== 0 && moveY !== 0) {
        // Moving diagonally - check all three positions
        const canMoveX = !isSolid(floorNewX, floorPlayerY);
        const canMoveY = !isSolid(floorPlayerX, floorNewY);
        const canMoveDiagonal = !isSolid(floorNewX, floorNewY);
        
        if (canMoveX && canMoveY && canMoveDiagonal) {
            player.x = newX;
            player.y = newY;
        } else if (canMoveX && !canMoveY) {
            // Can only move X
            player.x = newX;
        } else if (canMoveY && !canMoveX) {
            // Can only move Y
            player.y = newY;
        }
        // else: blocked completely, don't move
    } else {
        // Moving in single axis
        if (moveX !== 0 && !isSolid(floorNewX, floorPlayerY)) {
            player.x = newX;
        }
        if (moveY !== 0 && !isSolid(floorPlayerX, floorNewY)) {
            player.y = newY;
        }
    }

    // Double-check using Math.floor to prevent ending up in solid tiles
    if (isSolid(Math.floor(player.x), Math.floor(player.y))) {
        // Undo the movement if we ended up in a solid tile
        player.x -= moveX;
        player.y -= moveY;
    }   

    // Clamp to map boundaries
    const mapWidth = map[0]?.length || 150;
    const mapHeight = map.length || 112;
    player.x = Math.max(1, Math.min(mapWidth - 1, player.x));
    player.y = Math.max(1, Math.min(mapHeight - 1, player.y));
    
    // Automatic door transitions DISABLED - tent requires SPACE bar
    // (Prevents conflicts with manual SPACE bar interaction system)
    player.wasMoving = isMovementKeyPressed;
}

// ========== AUTOMATIC MAP TRANSITIONS ==========
// Centralized transition system - checks all automatic transitions based on current map
function checkAutomaticTransitions() {
    // Decrease transition cooldown
    if (typeof transitionCooldown !== 'undefined' && transitionCooldown > 0) {
        transitionCooldown--;
    }
    
    // Only check transitions if cooldown has expired
    if (typeof transitionCooldown === 'undefined' || transitionCooldown > 0) {
        return false;
    }
    
    const px = Math.floor(player.x);
    const py = Math.floor(player.y);
    
    // Route to appropriate transition checker based on current map
    switch (currentMap) {
        case 'outside':
            return checkOutsideTransitions(px, py);

        case 'tentInterior0':
            return checkTent0Transitions(px, py);            

        case 'tentInterior1':
            return checkTent1Transitions(px, py);
        
        case 'tentInterior2':
            return checkTent2Transitions(px, py);

        case 'tentInterior3':
            return checkTent3Transitions(px, py);
        
        case 'bussyInterior':
            return checkBussyTransitions(px, py);
        
        default:
            return false;
    }
}

// ========== TRANSITION HANDLERS BY MAP ==========

// Outside map - entrances to various interiors
function checkOutsideTransitions(px, py) {
    // Check all tent entrances using configs
    for (const key of ['tent0', 'tent1', 'tent2', 'tent3']) {
        const tent = TENT_CONFIGS[key];
        if (tent.exterior.entranceTiles.some(tile => px === tile.x && py === tile.y)) {
            if (player.direction === 'up') {
                enterTent(tent);
                return true;
            }
        }
    }
    
    // DA BUSSY ENTRANCE
    const bussyExt = BUSSY_CONFIG.exterior;
    if (bussyExt.entranceTiles.some(tile => px === tile.x && py === tile.y)) {
        if (player.direction === 'up') {
            enterBussy();
            return true;
        }
    }
    
    return false;
}

// Tent interior - exit back to outside
function checkTent0Transitions(px, py) {
    return checkTentTransitions(TENT_CONFIGS.tent0, px, py);
}

function checkTent1Transitions(px, py) {
    return checkTentTransitions(TENT_CONFIGS.tent1, px, py);
}

function checkTent2Transitions(px, py) {
    return checkTentTransitions(TENT_CONFIGS.tent2, px, py);
}

function checkTent3Transitions(px, py) {
    return checkTentTransitions(TENT_CONFIGS.tent3, px, py);
}

// ========== DA BUSSY INTERIOR - EXIT TRANSITION ==========
function checkBussyTransitions(px, py) {
    const bussyInt = BUSSY_CONFIG.interior;
    
    if (bussyInt.doorTiles.some(door => px === door.x && py === door.y)) {
        if (player.direction === 'down') {
            exitBussy();
            return true;
        }
    }
    return false;
}

function handleCollisions() {
    // Check item collection with proximity detection
    const px = player.x;
    const py = player.y;
    
    const currentItems = getItemsForMap(currentMap);
    
    for (let item of currentItems) {
        if (!item.collected) {
            // Use distance-based detection instead of exact tile matching
            const dx = Math.abs(px - item.x);
            const dy = Math.abs(py - item.y);
            
            // Collect if within 0.8 tiles (gives more forgiveness)
            if (dx < 0.8 && dy < 0.8) {
                const added = playerInventory.addItem(item);
                
                if (added) {
                    item.collected = true;
                    updateInventoryUI();
                    showItemNotification(item.type);
                } else {
                    showInventoryFullNotification();
                }
            }
        }
    }
    
    // Check world item collection (dropped items) with same proximity detection
    if (typeof checkWorldItemPickup === 'function' && typeof pickupWorldItem === 'function') {
        const worldItem = checkWorldItemPickup(px, py, currentMap);
        if (worldItem) {
            // Try to pick up (function checks capacity internally)
            const picked = pickupWorldItem(worldItem, currentMap);
            if (picked) {
                // Show notification for picked up item
                if (typeof showItemNotification === 'function') {
                    showItemNotification(worldItem.type);
                }
            }
            // Note: pickupWorldItem already shows "hands full" message if needed
        }
    }

    // Update damage cooldown
    if (damageCooldown > 0) {
        damageCooldown--;
    }
    
    // Check enemy collisions
    for (let enemy of enemies) {
        if (enemy.map === currentMap) {
            const dx = Math.abs(player.x - enemy.x);
            const dy = Math.abs(player.y - enemy.y);
            if (dx < 1 && dy < 1 && damageCooldown === 0) {
                damagePlayer(enemy.damage);
                damageCooldown = 60;
            }
        }
    }
}

// Show item notifications - SNES STYLE
function showItemNotification(itemType) {
    
    // Create floating notification
    const notification = document.createElement('div');
    
    // SNES-style colors based on item type
    const isRequired = itemType.required;
    const bgColor = isRequired ? '#3a4466' : '#2a5a3a';  // Dark blue for required, dark green for optional
    const textColor = isRequired ? '#ffd700' : '#7fff7f';  // Gold for required, light green for optional
    const borderLight = isRequired ? '#6a7a9a' : '#5a8a5a';
    const borderMid = isRequired ? '#4a5a7a' : '#3a6a3a';
    const borderDark = isRequired ? '#2a3a5a' : '#1a4a1a';
    const shadowDark = isRequired ? '#1a2a4a' : '#0a3a0a';
    const shadowDeep = isRequired ? '#0a1a3a' : '#052a05';
    
    notification.style.cssText = `
        position: absolute;
        top: 120px;
        left: 50%;
        transform: translateX(-50%);
        background: ${bgColor};
        color: ${textColor};
        padding: 16px 24px;
        border-radius: 0;
        font-family: 'Press Start 2P', monospace;
        font-size: 11px;
        font-weight: normal;
        text-transform: lowercase;
        letter-spacing: 0;
        z-index: 1000;
        border: none;
        
        /* Chunky SNES-style border (matching your button pattern) */
        box-shadow: 
            0 0 0 4px ${borderLight},
            0 0 0 8px ${borderMid},
            0 0 0 12px ${borderDark},
            0 12px 0 0 ${shadowDark},
            0 16px 0 0 ${shadowDeep};
    `;
    
    // Text without emoji - SNES style uses text labels
    const itemLabel = isRequired ? 'required item' : 'found item';
    notification.innerHTML = `
        <div style="text-align: center; line-height: 1.8;">
            <div style="font-size: 9px; margin-bottom: 8px; opacity: 0.8;">${itemLabel}</div>
            <div style="font-size: 12px;">${itemType.name}</div>
        </div>
    `;
    
    // Append to game container
    document.getElementById('gameContainer').appendChild(notification);
    
    // Remove after 2.5 seconds (no fancy animations - instant SNES style)
    setTimeout(() => {
        notification.remove();
    }, 2500);
}

// Show inventory full warning - SNES STYLE
function showInventoryFullNotification() {
    
    // Create floating notification
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: absolute;
        top: 120px;
        left: 50%;
        transform: translateX(-50%);
        background: #5a2a2a;
        color: #ffaaaa;
        padding: 16px 24px;
        border-radius: 0;
        font-family: 'Press Start 2P', monospace;
        font-size: 11px;
        font-weight: normal;
        text-transform: lowercase;
        letter-spacing: 0;
        z-index: 1000;
        border: none;
        
        /* Chunky SNES-style border (red/danger theme) */
        box-shadow: 
            0 0 0 4px #9a5a5a,
            0 0 0 8px #7a3a3a,
            0 0 0 12px #5a1a1a,
            0 12px 0 0 #4a0a0a,
            0 16px 0 0 #3a0505;
    `;
    
    // Text without emoji - SNES style
    notification.innerHTML = `
        <div style="text-align: center; line-height: 1.8;">
            <div style="font-size: 9px; margin-bottom: 8px;">warning!</div>
            <div style="font-size: 11px;">inventory full!</div>
            <div style="font-size: 9px; margin-top: 8px; opacity: 0.9;">store items in da bussy</div>
        </div>
    `;
    
    // Append to game container
    document.getElementById('gameContainer').appendChild(notification);
    
    // Remove after 3 seconds (no fancy animations)
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Update inventory UI
function updateInventoryUI() {
    updateItemCounter();
    // If inventory is open, refresh it
    if (inventoryOpen) {
        updateInventoryDisplay();
    }
}

function updateNPCs() {
    // Update enemies
    for (let enemy of enemies) {
        if (enemy.map === currentMap) {
            enemy.moveCounter++;
            if (enemy.moveCounter >= enemy.moveSpeed) {
                enemy.moveCounter = 0;
                const nextX = enemy.x + enemy.direction;
                
                if (!isSolid(nextX, enemy.y) && Math.abs(nextX - enemy.startX) <= enemy.patrolRange) {
                    enemy.x = nextX;
                } else {
                    enemy.direction *= -1;
                }
            }
        }
    }
}

// PERFORMANCE: Optimized game loop with frame rate limiting
function gameLoop(currentTime = 0) {
    requestAnimationFrame(gameLoop);
    
    // Calculate delta time
    if (!lastFrameTime) {
        lastFrameTime = currentTime;
    }
    
    const deltaTime = currentTime - lastFrameTime;
    accumulatedTime += deltaTime;
    
    // Only update at target frame rate (prevents running at unlimited FPS)
    if (accumulatedTime >= targetFrameTime) {
        accumulatedTime = accumulatedTime % targetFrameTime;
        
        update();
        // Clear canvas before rendering
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // Only render if game has started
        if (gameStarted) {
            render();
        }        
    }
    
    lastFrameTime = currentTime;
}
