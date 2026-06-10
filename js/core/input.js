// core/input.js
// Keyboard and input handling
// CORRECTED VERSION - Removed Q/X key handlers (handled by input-handler-additions.js)
// ONLY handles: WASD, Arrow keys, SPACE, ESC, P

const keys = {};
const keysPressed = {};

window.addEventListener('keydown', (e) => {
    if (!gameStarted) return;
    
    // Pause/unpause with ESC or P
    if (e.key === 'Escape' || e.key === 'p' || e.key === 'P') {
        togglePause();
        return;
    }
    
    if (gamePaused || gameOver) return;
    
    if (!keysPressed[e.key.toLowerCase()]) {
        keysPressed[e.key.toLowerCase()] = true;
        if (e.key === ' ') {
            e.preventDefault();
            
            
            // World items are now picked up automatically in handleCollisions()
            // So space bar is only for props/NPCs/storage
            
            // Call handleInteraction for props/NPCs/storage
            if (typeof handleInteraction === 'function') {
                handleInteraction();
            } else {
                console.error('❌ handleInteraction function not found!');
                
                // FALLBACK: Try calling checkPropInteraction directly
                if (typeof checkPropInteraction === 'function') {
                    const propResult = checkPropInteraction();
                    
                    // If no prop interaction, try NPC
                    if (!propResult && typeof checkNPCInteraction === 'function') {
                        checkNPCInteraction();
                    }
                }
            }
        }
    }

    // Movement keys - let game loop handle these
    keys[e.key.toLowerCase()] = true;
});

window.addEventListener('keyup', (e) => {
    if (!gameStarted || gamePaused || gameOver) return;
    keys[e.key.toLowerCase()] = false;
    keysPressed[e.key.toLowerCase()] = false;
});

function togglePause() {
    gamePaused = !gamePaused;
    if (gamePaused) {
        pauseScreen.classList.add('active');
    } else {
        pauseScreen.classList.remove('active');
    }
}

// Pause screen resume button
const pauseScreen = document.getElementById('pauseScreen');
const resumeButton = document.getElementById('resumeButton');

resumeButton.addEventListener('click', () => {
    gamePaused = false;
    pauseScreen.classList.remove('active');
});

