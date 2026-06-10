// systems/porto-potty-interaction.js
// Handle entering/exiting port-o-potties

/**
 * Handle interaction with a port-o-potty prop
 * If locked: show dialogue
 * If unlocked: enter the interior
 */
function handlePortOPottyInteraction(propKey) {
    const config = PORTO_POTTY_CONFIGS[propKey];
    if (!config) {
        console.warn('No port-o-potty config found for:', propKey);
        return;
    }
    
    if (config.locked) {
        // Show locked dialogue
        const fakeNPC = {
            name: '',
            dialogue: config.lockedDialogue || ['Occupado!'],
            type: 'portoPotty',
            currentDialogue: 0
        };
        showDialogue(fakeNPC);
        return;
    }
    
    // Enter the port-o-potty
    enterPortOPotty(config);
}
