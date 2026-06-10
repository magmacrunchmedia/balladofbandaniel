// error-wrapper.js - Paste this into console to wrap handleInteraction with error catching

console.log('=== WRAPPING FUNCTIONS WITH ERROR HANDLERS ===');

// Save original functions
const originalHandleInteraction = window.handleInteraction;
const originalCheckPropInteraction = window.checkPropInteraction;

// Wrap handleInteraction
window.handleInteraction = function(...args) {
    console.log('🔵 WRAPPED handleInteraction called');
    try {
        console.log('🔵 Calling original handleInteraction...');
        const result = originalHandleInteraction.apply(this, args);
        console.log('🔵 Original handleInteraction returned:', result);
        return result;
    } catch (error) {
        console.error('🔴 ERROR caught in handleInteraction:', error);
        console.error('🔴 Error name:', error.name);
        console.error('🔴 Error message:', error.message);
        console.error('🔴 Stack trace:', error.stack);
        return false;
    }
};

// Wrap checkPropInteraction
if (typeof originalCheckPropInteraction === 'function') {
    window.checkPropInteraction = function(...args) {
        console.log('🟢 WRAPPED checkPropInteraction called');
        try {
            console.log('🟢 Calling original checkPropInteraction...');
            const result = originalCheckPropInteraction.apply(this, args);
            console.log('🟢 Original checkPropInteraction returned:', result);
            return result;
        } catch (error) {
            console.error('🔴 ERROR caught in checkPropInteraction:', error);
            console.error('🔴 Error name:', error.name);
            console.error('🔴 Error message:', error.message);
            console.error('🔴 Stack trace:', error.stack);
            return false;
        }
    };
}

console.log('✅ Functions wrapped! Now press SPACE and see what error occurs.');
console.log('');
