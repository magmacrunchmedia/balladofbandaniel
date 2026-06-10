// js/ui/dialogue.js - ROBUST VERSION (with choice support)

const dialogueBox = document.getElementById('dialogueBox');
const dialogueName = document.getElementById('dialogueName');
const dialogueText = document.getElementById('dialogueText');
const dialogueChoices = document.getElementById('dialogueChoices');
const dialogueContinue = document.getElementById('dialogueContinue');

window.dialogueActive = false;
let currentNPC = null;
let lastInteractionTime = 0;
const INTERACTION_COOLDOWN = 300;
let dialogueCloseCallback = null;

// Choice state
let dialogueChoicesList = [];
let dialogueActiveChoice = 0;
let dialogueChoicesMade = false;

window.checkNPCInteraction = function() {
    const now = Date.now();
    
    // 1. If dialogue is already active, advance it
    if (window.dialogueActive) {
        if (now - lastInteractionTime < INTERACTION_COOLDOWN) return true;
        
        // If choices are active, SPACE selects the highlighted choice
        if (dialogueChoicesList.length > 0 && !dialogueChoicesMade) {
            selectDialogueChoice();
            lastInteractionTime = now;
            return true;
        }
        
        advanceDialogue();
        lastInteractionTime = now;
        return true;
    }
    
    // 2. Check for NPC in front
    const npc = getNPCInFront();
    if (npc) {
        if (now - lastInteractionTime < INTERACTION_COOLDOWN) return true;
        // SAFETY CHECK: Only show dialogue if the NPC actually has lines!
        if (!npc.dialogue && !npc.dialogueWithKeys) {
            console.error(`❌ Error: NPC '${npc.name}' exists but has no 'dialogue' property defined in npcs-data.js`);
            return false; // Don't freeze the player
        }
        showDialogue(npc);
        lastInteractionTime = now;
        return true;
    }
    
    return false;
};

function getNPCInFront() {
    if (typeof player === 'undefined' || typeof npcs === 'undefined') return null;
    
    const targetX = player.x + player.facingX;
    const targetY = player.y + player.facingY;
    
    for (let npc of npcs) {
        if (npc.map !== currentMap) continue;
        
        if (npc.type === 'bussy') {
            const busLeft = BUSSY_CONFIG.exterior.x + 8, 
                  busRight = BUSSY_CONFIG.exterior.x + BUSSY_CONFIG.exterior.width + 1, 
                  busTop = BUSSY_CONFIG.exterior.y, 
                  busBottom = BUSSY_CONFIG.exterior.y + BUSSY_CONFIG.exterior.height + 1;
            if (targetX >= busLeft && targetX <= busRight && 
                targetY >= busTop && targetY <= busBottom) return npc;
        } else {
            const dx = npc.x - targetX;
            const dy = npc.y - targetY;
            if ((dx * dx + dy * dy) < 0.8) return npc;
        }
    }
    return null;
}

/**
 * Show dialogue for an NPC
 * @param {Object} npc - NPC object with dialogue property
 * @param {Function} onCloseCallback - Optional callback when dialogue closes
 * @param {Array} choices - Optional array of { label, callback } for choices
 */
function showDialogue(npc, onCloseCallback, choices) {
    if (!npc) return;

    // Store the close callback
    dialogueCloseCallback = onCloseCallback || null;

    // Store choices
    dialogueChoicesList = choices || [];
    dialogueActiveChoice = 0;
    dialogueChoicesMade = false;

    // determine which dialogue to use (Keys vs Standard)
    let rawDialogue = npc.dialogue;
    
    // Check if we have keys (simple check based on inventory)
    if (npc.dialogueWithKeys && typeof playerInventory !== 'undefined') {
        const hasKeys = (playerInventory.leftHand && playerInventory.leftHand.type.id === 'bussy_keys') || 
                        (playerInventory.rightHand && playerInventory.rightHand.type.id === 'bussy_keys');
        if (hasKeys) {
            rawDialogue = npc.dialogueWithKeys;
        }
    }

    // Safety fallback
    if (!rawDialogue) {
        console.warn("No dialogue found for interaction");
        return;
    }

    currentNPC = npc;
    window.dialogueActive = true;
    dialogueName.textContent = npc.name;
    
    // NPC Face Player Logic
    if (npc.type !== 'bussy') {
        const diffX = player.x - npc.x;
        const diffY = player.y - npc.y;
        if (Math.abs(diffX) > Math.abs(diffY)) {
            npc.direction = diffX > 0 ? 'right' : 'left';
        } else {
            npc.direction = diffY > 0 ? 'down' : 'up'; 
        }
    }

    npc.currentDialogue = 0;
    
    // Ensure it's an array
    const lines = Array.isArray(rawDialogue) ? rawDialogue : [rawDialogue];
    dialogueText.textContent = lines[0];
    
    // If there are choices, check if we should show them immediately
    // (if dialogue is only 1 line, show choices right away)
    if (dialogueChoicesList.length > 0 && lines.length <= 1) {
        showDialogueChoices();
    } else {
        dialogueChoices.innerHTML = '';
        dialogueChoices.style.display = 'none';
        dialogueContinue.style.display = 'block';
    }
    
    dialogueBox.classList.add('active');
}

function advanceDialogue() {
    if (!currentNPC) return;
    
    // determine which dialogue is active again to advance correctly
    let rawDialogue = currentNPC.dialogue;
    if (currentNPC.dialogueWithKeys && typeof playerInventory !== 'undefined') {
         const hasKeys = (playerInventory.leftHand && playerInventory.leftHand.type.id === 'bussy_keys') || 
                        (playerInventory.rightHand && playerInventory.rightHand.type.id === 'bussy_keys');
         if (hasKeys) rawDialogue = currentNPC.dialogueWithKeys;
    }

    const lines = Array.isArray(rawDialogue) ? rawDialogue : [rawDialogue];
    currentNPC.currentDialogue++;
    
    if (currentNPC.currentDialogue >= lines.length) {
        // All text lines shown - if choices exist, show them
        if (dialogueChoicesList.length > 0 && !dialogueChoicesMade) {
            showDialogueChoices();
        } else {
            closeDialogue();
        }
    } else {
        dialogueText.textContent = lines[currentNPC.currentDialogue];
    }
}

/**
 * Render choices in the dialogue box
 */
function showDialogueChoices() {
    dialogueContinue.style.display = 'none';
    dialogueChoices.style.display = 'block';
    dialogueChoices.innerHTML = '';
    
    dialogueChoicesList.forEach((choice, i) => {
        const el = document.createElement('div');
        el.className = 'dialogue-choice' + (i === dialogueActiveChoice ? ' active' : '');
        el.textContent = choice.label;
        dialogueChoices.appendChild(el);
    });
}

/**
 * Move choice highlight up/down
 */
function moveDialogueChoice(direction) {
    if (dialogueChoicesList.length === 0 || dialogueChoicesMade) return;
    
    dialogueActiveChoice += direction;
    if (dialogueActiveChoice < 0) dialogueActiveChoice = dialogueChoicesList.length - 1;
    if (dialogueActiveChoice >= dialogueChoicesList.length) dialogueActiveChoice = 0;
    
    // Update visual highlight
    const choiceEls = dialogueChoices.querySelectorAll('.dialogue-choice');
    choiceEls.forEach((el, i) => {
        el.classList.toggle('active', i === dialogueActiveChoice);
    });
}

/**
 * Select the currently highlighted choice
 */
function selectDialogueChoice() {
    if (dialogueChoicesList.length === 0 || dialogueChoicesMade) return;
    
    dialogueChoicesMade = true;
    const choice = dialogueChoicesList[dialogueActiveChoice];
    closeDialogue();
    
    if (choice && typeof choice.callback === 'function') {
        choice.callback();
    }
}

function closeDialogue() {
    window.dialogueActive = false;
    dialogueBox.classList.remove('active');
    if (currentNPC) currentNPC.currentDialogue = 0;
    currentNPC = null;
    
    // Clear choice state
    dialogueChoicesList = [];
    dialogueActiveChoice = 0;
    dialogueChoicesMade = false;
    dialogueChoices.innerHTML = '';
    dialogueChoices.style.display = 'none';
    dialogueContinue.style.display = 'block';
    
    // Call the close callback if provided
    if (dialogueCloseCallback) {
        const callback = dialogueCloseCallback;
        dialogueCloseCallback = null;
        callback();
    }
}

// Keyboard handler for choice navigation (up/down arrows)
window.addEventListener('keydown', (e) => {
    if (!window.dialogueActive) return;
    if (dialogueChoicesList.length === 0 || dialogueChoicesMade) return;
    
    if (e.key === 'ArrowUp') {
        e.preventDefault();
        moveDialogueChoice(-1);
    } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        moveDialogueChoice(1);
    }
});
