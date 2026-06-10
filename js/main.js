// main.js
// Entry point - initializes game and UI references
// FIXED: Ensures all scripts are loaded before starting game

// ========== GLOBAL GAME STATE ==========
// These must be declared before input.js loads
let gameStarted = false;
let gamePaused = false;
let gameOver = false;

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const positionDisplay = document.getElementById('position');

// Initialize map and items - START IN TUTORIAL GARDEN
let currentMap = 'tentInterior0';
let map = MAPS.tentInterior0;

// Player object - START IN TUTORIAL GARDEN (south of pond)
const player = {
    x: TENT_CONFIGS.tent0.interior.x + 9,
    y: TENT_CONFIGS.tent0.interior.y + 5,
    facingX: 0,
    facingY: 1,
    direction: 'down',
    isWalking: false,
    wasMoving: false,
    // Health system
    health: 60,        // Current health (change this to test: 100, 75, 50, 25, 10)
    maxHealth: 100      // Maximum health
};

// Function to initialize start button (called after scripts load)
function initializeStartButton() {
    
    const startButton = document.getElementById('startButton');
    const startScreen = document.getElementById('startScreen');
    
    if (!startButton || !startScreen) {
        console.error('❌ Start button or screen not found!');
        return;
    }

    startButton.addEventListener('click', () => {
        
        gameStarted = true;
        startScreen.classList.add('hidden');
        
        // Initialize camera to player position (prevents jump at start)
        if (typeof camera !== 'undefined') {
            const targetX = player.x * TILE_SIZE - canvas.width/2 + TILE_SIZE/2;
            const targetY = player.y * TILE_SIZE - canvas.height/2 + TILE_SIZE/2;
            camera.x = Math.round(targetX);
            camera.y = Math.round(targetY);
        }
        
        // Initialize sidebar AFTER game starts
        if (typeof initializeSidebar === 'function') {
            setTimeout(() => {
                initializeSidebar();
            }, 100);
        } else if (typeof initializeItemCounter === 'function') {
            initializeItemCounter();
        }
        
        // ✅ Start the game loop
        if (typeof gameLoop === 'function') {
            gameLoop();
        } else {
            console.error('❌ ERROR: gameLoop is not defined!');
            console.error('Available functions:', Object.keys(window).filter(k => k.includes('game')));
        }
    });
    
}

// Try multiple methods to ensure scripts are loaded

// Method 1: DOMContentLoaded (DOM is ready)
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        // Still wait for all scripts with window.load
        window.addEventListener('load', initializeStartButton);
    });
} else {
    // DOM already loaded, just wait for scripts
    window.addEventListener('load', initializeStartButton);
}

