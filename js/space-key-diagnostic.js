// space-key-diagnostic.js - Test if SPACE key is connected to handleInteraction
// Add this temporarily to test SPACE key flow

console.log('=== SPACE KEY DIAGNOSTIC ===');

// Test 1: Check if handleInteraction exists
if (typeof handleInteraction === 'function') {
    console.log('✅ handleInteraction function exists');
} else {
    console.log('❌ handleInteraction function NOT FOUND');
}

// Test 2: Check if checkPropInteraction exists
if (typeof checkPropInteraction === 'function') {
    console.log('✅ checkPropInteraction function exists');
} else {
    console.log('❌ checkPropInteraction function NOT FOUND');
}

// Test 3: Add our own SPACE key listener to see if it fires
let spaceKeyCount = 0;
window.addEventListener('keydown', (e) => {
    if (e.key === ' ') {
        spaceKeyCount++;
        console.log(`🔑 SPACE KEY PRESSED (count: ${spaceKeyCount})`);
        
        // Check game state
        console.log('Game state:', {
            gameStarted: typeof gameStarted !== 'undefined' ? gameStarted : 'undefined',
            gamePaused: typeof gamePaused !== 'undefined' ? gamePaused : 'undefined',
            gameOver: typeof gameOver !== 'undefined' ? gameOver : 'undefined'
        });
        
        // Check if handleInteraction exists at the moment SPACE is pressed
        if (typeof handleInteraction === 'function') {
            console.log('✅ handleInteraction is callable');
            
            // Manually call it to test
            console.log('🧪 MANUALLY calling handleInteraction...');
            const result = handleInteraction();
            console.log('Result:', result);
        } else {
            console.log('❌ handleInteraction NOT CALLABLE at time of SPACE press');
        }
    }
});

// Test 4: Check if there are multiple keydown listeners
console.log('📊 Number of keydown listeners:', 
    window.getEventListeners ? 
    window.getEventListeners(window).keydown?.length || 0 : 
    'Cannot check (getEventListeners not available)'
);

console.log('\n💡 INSTRUCTIONS:');
console.log('1. Go near the backpack in da Bussy interior');
console.log('2. Press SPACE');
console.log('3. Watch this console for output');
console.log('4. You should see "🔑 SPACE KEY PRESSED"');
console.log('5. Then you should see handleInteraction being called');
console.log('=================================\n');
