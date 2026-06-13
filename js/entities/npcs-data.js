// entities/npcs-data.js
// NPC definitions and dialogue

/* =====================
   QUEST STATE
===================== */
const STRAWBERTO_QUEST = { monocleReturned: false };

/* =====================
   NPCs
===================== */
const npcs = [
    {
        x: BUSSY_CONFIG.exterior.x,
        y: BUSSY_CONFIG.exterior.y,
        width: 1,        // ADDED: Multi-tile width for collision
        height: 1,       // ADDED: Multi-tile height for collision
        name: "da Bussy",
        type: 'bussy',
        map: 'outside',
        direction: 'down',  // ADDED: Default facing direction
        dialogue: [
            "Hey! BANDANIEL! I heard you're tryna get back to Smack Dab, PA! That's where home is, right?",
            "You know what? I was about to hit the road, and I can take you! ...but I seems to have lost my keys. Find them for me, will ya?" 
        ],
        // Special dialogue when player has found the keys (array for multiple lines)
        dialogueWithKeys: [
            "OH HELL YEAH, you found my keys! Thanks, BANDANIEL!",
            "Hop on board and let's hit the road!",
            "I have to play a few shows on the way, but I'll get you home!"
        ],
        currentDialogue: 0,
        isShop: false
    },
    {
        id: 'strawberto',
        x: 78,           // Right side of tent 2 interior
        y: 103,           // Roughly centered vertically in the tent
        width: 1,
        height: 1,
        name: 'STRAWBERTO',
        type: 'strawberto',
        map: 'tentInterior2',  // Inside his blue tent!
        direction: 'right',    // Faces toward player spawn point
        dialogue: [
            "Oh hello BANDANIEL, do come in - please.",
            "I find a well-organized camping setup quite essential for comfort.",
            "Have you seen my monocle about? I seem to have misplaced it somewhere."
        ],
        dialogueWithMonocle: [
            "Oh! My monocle! You found it! Thank you, BANDANIEL!",
            "*puts on monocle* Ahh, much better. Now I can see properly.",
            "The keys? I saw da Bussy's keys locked in the port-o-potty with the 'Occupado' sign. Strange place for keys..."
        ],
        currentDialogue: 0,
        isShop: false
    },
    {
        id: 'carl',
        x: 110,
        y: 60,
        width: 1,        // ADDED: Single-tile NPC
        height: 1,       // ADDED: Single-tile NPC
        name: 'Carl',
        type: 'carl',
        map: 'outside',
        direction: 'down',  // ADDED: Default facing direction
        dialogue: [
            "Whoooa dude... I'm Carl. The pineapple, man.",
            "Everything's like... glowing and beautiful, you know?",
            "Have you ever really LOOKED at your hands? Wild."
        ],
        currentDialogue: 0,
        isShop: false
    },
    {
        id: 'plantain-jane',
        x: 110,
        y: 85,
        width: 1,        // ADDED: Single-tile NPC
        height: 1,       // ADDED: Single-tile NPC
        name: 'PLANTAIN JANE',
        type: 'plantain-jane',
        map: 'outside',
        direction: 'down',  // ADDED: Default facing direction
        dialogue: [
            "Oh hey BANDANIEL... you look like trash! What the hell happened to you?",
            "Why are you wondring around like this? What, are you looking for something?",
            "I just work here, man... I don't know, how about you stop staring at me??"
        ],
        currentDialogue: 0,
        isShop: false
    },
    {
        id: 'elektra',
        x: 18,           // MOVED LEFT - Inside tent interior
        y: 104,           // Near the top of the tent room
        width: 1,        // Single-tile NPC
        height: 1,       // Single-tile NPC
        name: 'ELEKTRA',
        type: 'elektra',
        map: 'tentInterior1',  // She's inside the tent!
        direction: 'down',
        dialogue: [
            "Hey... the universe is like, electric, you know?",
            "I'm working on a poem about citrus and consciousness.",
            "This tent... it's a good vibe for writing. Very grounded."
        ],
        currentDialogue: 0,
        isShop: false
    },
    {
        id: 'kim',
        x: 12,           // MOVED LEFT - Inside tent interior
        y: 80,           // Near the top of the tent room
        width: 1,        // Single-tile NPC
        height: 1,       // Single-tile NPC
        name: 'KIWI KIM',
        type: 'kim',
        map: 'outside',  // She's inside the tent!
        direction: 'down',
        dialogue: [
            "Hi! I'm Kim."
        ],
        currentDialogue: 0,
        isShop: false
    },

        {
        id: 'chuck-cherry',
        x: 95,  // Your desired position
        y: 40,
        width: 1,
        height: 1,
        name: 'Chuck Cherry',
        type: 'chuck-cherry',
        map: 'outside',
        direction: 'down',
        dialogue: [
            "Hey man, I'm Chuck Cherry. ROCK 'N' ROLL BAYBY!",
            "I'm playin' a set at the festival later. See you out there, kid!"
        ],
        currentDialogue: 0,
        isShop: false
    },

    // =====================
    // COFFEE BOOTH NPCs
    // =====================

    // Barista - trades cigarettes for coffee
    {
        id: 'coffee-guy',
        x: 49,
        y: 21,
        width: 1,
        height: 1,
        name: 'COFFEE GUY',
        type: 'coffee-guy',
        map: 'outside',
        direction: 'down',
        dialogue: [
            "Welcome! What can I get you?",
            "Hmm, no cigarettes? There's a pack somewhere near the campfire. Bring it back and we'll talk."
        ],
        dialogueWithCigarettes: [
            "Welcome! What can I get you?"
        ],
        currentDialogue: 0,
        isShop: false
    },

    // Queue NPC 1 - impatient
    {
        id: 'queue-npc-1',
        x: 48,
        y: 25,
        width: 1,
        height: 1,
        name: 'BERRY',
        type: 'blueberry',
        map: 'outside',
        direction: 'up',
        dialogue: [
            "Man, I've been waiting forever...",
            "Is this line moving or what?"
        ],
        currentDialogue: 0,
        isShop: false
    },

    // Queue NPC 2 - excited
    {
        id: 'queue-npc-2',
        x: 49,
        y: 25,
        width: 1,
        height: 1,
        name: 'GRAPE GARY',
        type: 'grape',
        map: 'outside',
        direction: 'up',
        dialogue: [
            "I heard the coffee here is amazing.",
            "Worth the wait!"
        ],
        currentDialogue: 0,
        isShop: false
    }
];
