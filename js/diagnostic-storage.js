// diagnostic-storage.js - Debug helper for storage system
// Add this script temporarily to test if everything is connected

console.log('=== STORAGE SYSTEM DIAGNOSTICS ===');

// Check if all required components exist
const checks = {
    'PROP_POSITIONS exists': typeof PROP_POSITIONS !== 'undefined',
    'bussy_backpack defined': typeof PROP_POSITIONS !== 'undefined' && PROP_POSITIONS.bussy_backpack !== undefined,
    'playerInventory exists': typeof playerInventory !== 'undefined',
    'playerInventory.items exists': typeof playerInventory !== 'undefined' && playerInventory.items !== undefined,
    'STORAGE_DATA exists': typeof STORAGE_DATA !== 'undefined',
    'getStoredItems function': typeof getStoredItems === 'function',
    'openStorageUI function': typeof openStorageUI === 'function',
    'closeStorageUI function': typeof closeStorageUI === 'function',
    'checkPropInteraction function': typeof checkPropInteraction === 'function',
    'handleInteraction function': typeof handleInteraction === 'function',
    'updateInteractionPrompt function': typeof updateInteractionPrompt === 'function',
    'storagePanel element': document.getElementById('storagePanel') !== null,
    'storageClose button': document.getElementById('storageClose') !== null
};

let allPassed = true;
for (const [check, passed] of Object.entries(checks)) {
    const status = passed ? '✅' : '❌';
    console.log(`${status} ${check}`);
    if (!passed) allPassed = false;
}

if (allPassed) {
    console.log('✅ ALL CHECKS PASSED - Storage system should work!');
} else {
    console.log('❌ SOME CHECKS FAILED - See above for issues');
}

// Additional info
if (typeof PROP_POSITIONS !== 'undefined' && PROP_POSITIONS.bussy_backpack) {
    console.log('\n=== BACKPACK CONFIG ===');
    console.log('Position:', PROP_POSITIONS.bussy_backpack.x, PROP_POSITIONS.bussy_backpack.y);
    console.log('Map:', PROP_POSITIONS.bussy_backpack.map);
    console.log('Storage capacity:', PROP_POSITIONS.bussy_backpack.storageCapacity);
    console.log('Interact enabled:', PROP_POSITIONS.bussy_backpack.interact);
    console.log('Storage item:', PROP_POSITIONS.bussy_backpack.storageItem);
}

if (typeof playerInventory !== 'undefined' && playerInventory.items) {
    console.log('\n=== PLAYER INVENTORY ===');
    console.log('Items count:', playerInventory.items.length);
    console.log('Max carry:', MAX_CARRY_ITEMS);
    if (playerInventory.items.length > 0) {
        console.log('Items:');
        playerInventory.items.forEach((item, i) => {
            console.log(`  ${i + 1}. ${item.type.name} (${item.type.required ? 'REQUIRED' : 'OPTIONAL'})`);
        });
    }
}

console.log('\n=== MANUAL TEST COMMANDS ===');
console.log('To manually test storage:');
console.log('1. openStorageUI("bussy_backpack") - Open storage');
console.log('2. closeStorageUI() - Close storage');
console.log('3. getStorageInfo("bussy_backpack") - Check capacity');
console.log('4. playerInventory.debugInventory() - Show inventory');

console.log('\n=================================\n');

// Helper function to test opening storage manually
window.testStorage = function() {
    console.log('Testing storage UI...');
    openStorageUI('bussy_backpack');
};

// Add keyboard shortcut for testing (Press 'T' to test)
window.addEventListener('keydown', (e) => {
    if (e.key === 't' || e.key === 'T') {
        if (e.ctrlKey) {  // Ctrl+T to test storage
            e.preventDefault();
            console.log('Manual storage test triggered!');
            testStorage();
        }
    }
});

console.log('💡 TIP: Press Ctrl+T to manually test storage UI');
