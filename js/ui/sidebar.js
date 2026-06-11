// ui/sidebar.js
// Consolidated sidebar UI - manages hands, health, and future backpack display
// FIXED v2: Proper retry logic with max attempts and better initialization

/* =====================
   SIDEBAR INITIALIZATION
===================== */

// Animation frame counter for floating effect
let sidebarAnimFrame = 0;
let sidebarInitialized = false;
let initRetryCount = 0;
const MAX_INIT_RETRIES = 50; // Max 5 seconds of retries (50 * 100ms)

/**
 * Initialize the sidebar UI
 * Call this once when the game starts
 */
function initializeSidebar() {
    // SAFETY CHECK: Make sure playerInventory exists
    if (typeof playerInventory === 'undefined') {
        initRetryCount++;
        
        if (initRetryCount <= MAX_INIT_RETRIES) {
            // Only log every 10 attempts to reduce console spam
            if (initRetryCount % 10 === 1) {
                console.warn(`⚠️ Waiting for playerInventory... (attempt ${initRetryCount}/${MAX_INIT_RETRIES})`);
            }
            // Retry after a short delay
            setTimeout(initializeSidebar, 100);
            return;
        } else {
            console.error('❌ playerInventory never loaded - sidebar cannot initialize!');
            console.error('   Check that js/systems/inventory.js is loaded and creates playerInventory');
            return;
        }
    }
    
    
    // Initialize health face (Duke Nukem style)
    initializeHealthFace();
    
    // Update all sidebar elements
    updateHandsDisplay();
    updateSidebarHealth();
    
    // Set up click handlers for hands (for future hand swap feature)
    const leftHandSlot = document.getElementById('leftHandSlot');
    const rightHandSlot = document.getElementById('rightHandSlot');
    
    if (leftHandSlot && rightHandSlot) {
        // Click to view item details (future feature)
        leftHandSlot.addEventListener('click', () => handleHandClick('left'));
        rightHandSlot.addEventListener('click', () => handleHandClick('right'));
    }
    
    // Set up backpack unequip button handler
    const backpackUnequipBtn = document.getElementById('backpackUnequipBtn');
    if (backpackUnequipBtn) {
        backpackUnequipBtn.addEventListener('click', () => {
            if (typeof unequipBackpack === 'function') {
                unequipBackpack();
            }
        });
    }
    
    // Start animation loop for floating items (only once)
    if (!sidebarInitialized) {
        startSidebarAnimation();
        sidebarInitialized = true;
    }
    
}

/* =====================
   ANIMATION SYSTEM
===================== */

/**
 * Start the sidebar animation loop
 * Renders item sprites with floating animation
 */
function startSidebarAnimation() {
    function animate() {
        sidebarAnimFrame++;
        
        // SAFETY CHECK: Only render if playerInventory exists
        if (typeof playerInventory !== 'undefined') {
            // Render items in hands (if they have canvases)
            renderHandItem('leftHandSlot', playerInventory.leftHand);
            renderHandItem('rightHandSlot', playerInventory.rightHand);
        }
        
        // Update health face periodically (every 10 frames to reduce CPU)
        if (sidebarAnimFrame % 10 === 0) {
            updateHealthFace();
        }
        
        requestAnimationFrame(animate);
    }
    
    animate();
}

/**
 * Render a single hand's item with pixel art
 */
function renderHandItem(slotId, itemData) {
    const slot = document.getElementById(slotId);
    if (!slot) return;
    
    // Find the canvas in this slot
    const canvas = slot.querySelector('.hand-item-canvas');
    if (!canvas || !itemData) return;
    
    const ctx = canvas.getContext('2d');
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw item sprite using existing draw functions
    const centerX = canvas.width / 2;
    // Center vertically in the canvas (no offset needed - items draw symmetrically)
    const centerY = canvas.height / 2;
    
    if (itemData.type.sprite === 'keys') {
        drawKeysInHand(ctx, centerX, centerY, sidebarAnimFrame);
    } else if (itemData.type.sprite === 'flashlight') {
        drawFlashlightInHand(ctx, centerX, centerY, sidebarAnimFrame);
    } else if (itemData.type.sprite === 'cigarettes') {
        drawCigarettesInHand(ctx, centerX, centerY, sidebarAnimFrame);
    }
}

/**
 * Draw keys in hand slot (adapted from items.js)
 * UPDATED: Now 1.5x scale instead of 0.8x for better visibility
 */
function drawKeysInHand(ctx, centerX, centerY, frame) {
    // Gentle floating animation
    const floatOffset = Math.sin(frame * 0.05) * 1.5;  // Slower, smaller float
    const y = centerY + floatOffset;
    
    // ✅ REDUCED SCALE: 1.3x for better fit in canvas
    const scale = 1.3;
    
    ctx.save();
    ctx.translate(centerX, y);
    ctx.scale(scale, scale);
    ctx.translate(-centerX, -y);
    
    // Key ring
    ctx.strokeStyle = '#c0c0c0';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(centerX - 5, y - 8, 4, 0, Math.PI * 2);
    ctx.stroke();
    
    // Key 1 (larger key - ignition)
    ctx.fillStyle = '#ffd700'; // Gold
    ctx.strokeStyle = '#b8860b';
    ctx.lineWidth = 1;
    
    // Key shaft
    ctx.fillRect(centerX - 3, y - 5, 2, 10);
    ctx.strokeRect(centerX - 3, y - 5, 2, 10);
    
    // Key head (bow)
    ctx.beginPath();
    ctx.arc(centerX - 2, y - 7, 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    
    // Key teeth
    ctx.fillRect(centerX - 3, y + 3, 2, 2);
    ctx.fillRect(centerX - 3, y + 6, 2, 2);
    
    // Key 2 (smaller key - door)
    ctx.fillStyle = '#c0c0c0'; // Silver
    ctx.strokeStyle = '#808080';
    
    // Key shaft
    ctx.fillRect(centerX + 1, y - 3, 1.5, 8);
    ctx.strokeRect(centerX + 1, y - 3, 1.5, 8);
    
    // Key head
    ctx.beginPath();
    ctx.arc(centerX + 1.5, y - 4.5, 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    
    // Key teeth
    ctx.fillRect(centerX + 1, y + 3, 1.5, 1.5);
    
    // Shine effect
    ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
    ctx.beginPath();
    ctx.arc(centerX - 3, y - 8, 1, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.restore();
}

/**
 * Draw flashlight in hand slot (adapted from items.js)
 * UPDATED: Now 1.5x scale instead of 0.8x for better visibility
 */
function drawFlashlightInHand(ctx, centerX, centerY, frame) {
    // Gentle floating animation
    const floatOffset = Math.sin(frame * 0.05) * 1.5;  // Slower, smaller float
    const y = centerY + floatOffset;
    
    // ✅ REDUCED SCALE: 1.3x for better fit in canvas
    const scale = 1.3;
    
    ctx.save();
    ctx.translate(centerX, y);
    ctx.scale(scale, scale);
    ctx.translate(-centerX, -y);
    
    // Flashlight body
    ctx.fillStyle = '#ff3333'; // Red flashlight
    ctx.fillRect(centerX - 3, y - 8, 6, 12);
    
    // Handle grip lines
    ctx.strokeStyle = '#cc0000';
    ctx.lineWidth = 1;
    for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        ctx.moveTo(centerX - 3, y - 5 + i * 3);
        ctx.lineTo(centerX + 3, y - 5 + i * 3);
        ctx.stroke();
    }
    
    // Head (lens area)
    ctx.fillStyle = '#666666';
    ctx.fillRect(centerX - 4, y - 10, 8, 3);
    
    // Lens (dark - no batteries)
    ctx.fillStyle = '#333333';
    ctx.beginPath();
    ctx.arc(centerX, y - 8.5, 2.5, 0, Math.PI * 2);
    ctx.fill();
    
    // Lens reflection
    ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.beginPath();
    ctx.arc(centerX - 1, y - 9.5, 1, 0, Math.PI * 2);
    ctx.fill();
    
    // Button
    ctx.fillStyle = '#000000';
    ctx.fillRect(centerX + 2, y - 3, 2, 2);
    
    ctx.restore();
}

/**
 * Draw cigarettes in hand slot (adapted from items.js)
 */
function drawCigarettesInHand(ctx, centerX, centerY, frame) {
    // Gentle floating animation
    const floatOffset = Math.sin(frame * 0.05) * 1.5;
    const y = centerY + floatOffset;

    const scale = 1.3;

    ctx.save();
    ctx.translate(centerX, y);
    ctx.scale(scale, scale);
    ctx.translate(-centerX, -y);

    // Pack body (white with red stripe)
    ctx.fillStyle = '#f5f5f5';
    ctx.fillRect(centerX - 5, y - 4, 10, 8);

    // Red stripe across top
    ctx.fillStyle = '#d32f2f';
    ctx.fillRect(centerX - 5, y - 4, 10, 3);

    // Pack outline
    ctx.strokeStyle = '#9e9e9e';
    ctx.lineWidth = 1;
    ctx.strokeRect(centerX - 5, y - 4, 10, 8);

    // Opening flap
    ctx.fillStyle = '#e0e0e0';
    ctx.fillRect(centerX - 4, y - 5, 8, 2);
    ctx.strokeStyle = '#bdbdbd';
    ctx.strokeRect(centerX - 4, y - 5, 8, 2);

    // Single cigarette sticking out
    ctx.fillStyle = '#fff9c4';
    ctx.fillRect(centerX - 1, y - 9, 2, 5);

    // Cigarette filter
    ctx.fillStyle = '#e65100';
    ctx.fillRect(centerX - 1, y - 9, 2, 2);

    // Cigarette tip
    ctx.fillStyle = '#f5f5f5';
    ctx.fillRect(centerX - 1, y - 4, 2, 1);

    ctx.restore();
}

/* =====================
   HANDS DISPLAY
===================== */

/**
 * Update the hands display to show current inventory
 * Call this whenever inventory changes
 */
function updateHandsDisplay() {
    // SAFETY CHECK
    if (typeof playerInventory === 'undefined') {
        // Don't spam console - just silently return
        return;
    }
    
    const leftHandSlot = document.getElementById('leftHandSlot');
    const rightHandSlot = document.getElementById('rightHandSlot');
    
    if (!leftHandSlot || !rightHandSlot) {
        console.warn('⚠️ Hand slots not found in DOM');
        return;
    }
    
    // Update left hand
    updateHandSlot(leftHandSlot, playerInventory.leftHand, 'left');
    
    // Update right hand
    updateHandSlot(rightHandSlot, playerInventory.rightHand, 'right');
    
    // Update "both full" state for swap hint
    const handsContainer = document.querySelector('.hands-container');
    if (handsContainer) {
        if (playerInventory.leftHand && playerInventory.rightHand) {
            handsContainer.classList.add('both-full');
        } else {
            handsContainer.classList.remove('both-full');
        }
    }
}

/**
 * Update a single hand slot
 */
function updateHandSlot(slotElement, itemData, hand) {
    // Clear previous content
    slotElement.innerHTML = '';
    
    // Add hand label
    const label = document.createElement('div');
    label.className = 'hand-label';
    label.textContent = hand === 'left' ? 'L' : 'R';
    slotElement.appendChild(label);
    
    if (itemData === null) {
        // Empty hand
        slotElement.classList.remove('has-item', 'required', 'optional');
        slotElement.classList.add('empty');
    } else {
        // Hand has item
        slotElement.classList.remove('empty');
        slotElement.classList.add('has-item');
        
        // Add required/optional styling
        if (itemData.type.required) {
            slotElement.classList.add('required');
            slotElement.classList.remove('optional');
        } else {
            slotElement.classList.add('optional');
            slotElement.classList.remove('required');
        }
        
        // Create wrapper for item (this gets the colored border)
        const wrapper = document.createElement('div');
        wrapper.className = 'hand-item-wrapper';
        
        // Add border color class directly to wrapper
        if (itemData.type.required) {
            wrapper.classList.add('required');
        } else {
            wrapper.classList.add('optional');
        }
        
        // Create canvas for pixel art rendering
        const canvas = document.createElement('canvas');
        canvas.className = 'hand-item-canvas';
        canvas.width = 64;
        canvas.height = 64;
        wrapper.appendChild(canvas);
        slotElement.appendChild(wrapper);
        
        // Create item name label (outside wrapper, below it)
        const nameTooltip = document.createElement('div');
        nameTooltip.className = 'hand-item-name';
        nameTooltip.textContent = itemData.type.name;
        slotElement.appendChild(nameTooltip);
        
        // Initial render will happen in animation loop
    }
}

/**
 * Handle click on a hand slot
 * Future: could show item details or allow hand swapping
 */
function handleHandClick(hand) {
    // SAFETY CHECK
    if (typeof playerInventory === 'undefined') {
        return;
    }
    
    const item = hand === 'left' ? playerInventory.leftHand : playerInventory.rightHand;
    
    if (!item) {
        return;
    }
    
    
    // Future: Show item details popup
    // Future: Allow drag-and-drop between hands
    // Future: Quick-drop with right-click
}

/* =====================
   HEALTH DISPLAY (DUKE NUKEM STYLE FACE)
===================== */

/**
 * Initialize the health face canvas
 */
function initializeHealthFace() {
    const healthPanel = document.getElementById('healthPanel');
    if (!healthPanel) return;
    
    // Check if we already have a face container
    let faceContainer = document.getElementById('sidebarHealthFaceContainer');
    
    if (!faceContainer) {
        // Create face container
        faceContainer = document.createElement('div');
        faceContainer.id = 'sidebarHealthFaceContainer';
        
        // Create canvas for face
        const canvas = document.createElement('canvas');
        canvas.id = 'healthFaceCanvas';
        canvas.width = 160;  // Higher resolution for detail
        canvas.height = 80;
        
        faceContainer.appendChild(canvas);
        
        // Insert after the header
        const header = healthPanel.querySelector('.sidebar-panel-header');
        if (header && header.nextSibling) {
            healthPanel.insertBefore(faceContainer, header.nextSibling);
        }
    }
    
    // Initial render
    updateHealthFace();
}

/**
 * Update the health face based on current health
 * Draws BANDANIEL's face with progressive bruising
 */
function updateHealthFace() {
    const canvas = document.getElementById('healthFaceCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const healthText = document.getElementById('sidebarHealthBarText');
    
    if (!healthText) return;
    
    // Get health percentage
    const currentHealth = typeof player !== 'undefined' && player.health !== undefined ? player.health : 100;
    const maxHealth = typeof player !== 'undefined' && player.maxHealth !== undefined ? player.maxHealth : 100;
    const healthPercent = (currentHealth / maxHealth) * 100;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw BANDANIEL's face based on health
    drawBandanielFace(ctx, canvas.width, canvas.height, healthPercent);
    
    // Update text - shows current health / damage taken
    const damageTaken = maxHealth - currentHealth;
    healthText.textContent = `${Math.round(currentHealth)} / ${damageTaken}`;
}

/**
 * Draw BANDANIEL's face with bruising based on health
 * Based on actual sprite from bandaniel.js (facing down view)
 * @param {CanvasRenderingContext2D} ctx - Canvas context
 * @param {number} width - Canvas width
 * @param {number} height - Canvas height
 * @param {number} healthPercent - Health percentage (0-100)
 */
function drawBandanielFace(ctx, width, height, healthPercent) {
    const centerX = width / 2;
    const centerY = height / 2;
    const scale = 2.5;  // Scale up the sprite for the health display
    
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.scale(scale, scale);
    ctx.translate(-centerX, -centerY);
    
    // Banana color based on health (gets darker when damaged)
    const bananaColor = healthPercent > 60 ? '#f1c40f' : 
                        healthPercent > 30 ? '#e8b40f' : 
                        '#d4a017';
    
    // Main banana body (ellipse - longer vertical)
    ctx.fillStyle = bananaColor;
    ctx.beginPath();
    ctx.ellipse(centerX, centerY + 2, 8, 16, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Banana highlight ridge (left side)
    ctx.strokeStyle = '#f39c12';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(centerX - 3, centerY - 10);
    ctx.lineTo(centerX - 3, centerY + 14);
    ctx.stroke();
    
    // Darker edge (right side curve)
    ctx.strokeStyle = '#e8b40f';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(centerX, centerY + 2, 8, 0.3, Math.PI - 0.3);
    ctx.stroke();
    
    // Bottom taper (natural banana end)
    ctx.fillStyle = '#e8b40f';
    ctx.beginPath();
    ctx.ellipse(centerX, centerY + 16, 6, 3, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Stem at top
    ctx.fillStyle = '#8b7355';
    ctx.fillRect(centerX - 2, centerY - 14, 4, 3);
    
    // Sunglasses frame (front view - both lenses visible)
    ctx.fillStyle = '#2c3e50';
    // Left lens frame
    ctx.beginPath();
    ctx.ellipse(centerX - 4, centerY - 3, 3, 2.5, 0, 0, Math.PI * 2);
    ctx.fill();
    // Right lens frame
    ctx.beginPath();
    ctx.ellipse(centerX + 4, centerY - 3, 3, 2.5, 0, 0, Math.PI * 2);
    ctx.fill();
    // Bridge
    ctx.fillRect(centerX - 1, centerY - 3, 2, 1);
    
    // Dark lens glass
    ctx.fillStyle = '#1a1a1a';
    ctx.beginPath();
    ctx.ellipse(centerX - 4, centerY - 3, 2, 1.5, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(centerX + 4, centerY - 3, 2, 1.5, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Reflections on lenses
    ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.beginPath();
    ctx.arc(centerX - 5, centerY - 4, 1, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(centerX + 3, centerY - 4, 1, 0, Math.PI * 2);
    ctx.fill();
    
    // Cigarette (center, sticking out downward)
    // Angle changes based on health - droops when low
    const cigaretteAngle = healthPercent < 30 ? 0.3 : 0;
    ctx.save();
    ctx.translate(centerX, centerY + 3);
    ctx.rotate(cigaretteAngle);
    
    // Cigarette filter (tan)
    ctx.fillStyle = '#d4a574';
    ctx.fillRect(-1, 0, 2, 2);
    
    // Cigarette paper (white)
    ctx.fillStyle = '#ecf0f1';
    ctx.fillRect(-1, 2, 2, 6);
    
    // Cigarette tip (orange/brown)
    ctx.fillStyle = '#e67e22';
    ctx.fillRect(-1, 8, 2, 2);
    
    // Burning glow (red - only if health > 20%)
    if (healthPercent > 20) {
        ctx.fillStyle = '#e74c3c';
        ctx.beginPath();
        ctx.arc(0, 9, 1.5, 0, Math.PI * 2);
        ctx.fill();
    }
    
    ctx.restore();
    
    // BRUISES - Progressive damage based on health
    
    // Light bruise (appears at 80% health)
    if (healthPercent < 80) {
        ctx.fillStyle = 'rgba(139, 69, 19, 0.25)';
        ctx.beginPath();
        ctx.ellipse(centerX - 6, centerY + 8, 4, 3, 0.3, 0, Math.PI * 2);
        ctx.fill();
    }
    
    // Medium bruise (appears at 60% health)
    if (healthPercent < 60) {
        ctx.fillStyle = 'rgba(101, 67, 33, 0.35)';
        ctx.beginPath();
        ctx.ellipse(centerX + 5, centerY + 5, 3.5, 2.5, -0.2, 0, Math.PI * 2);
        ctx.fill();
        
        // Additional small bruise
        ctx.fillStyle = 'rgba(139, 69, 19, 0.3)';
        ctx.beginPath();
        ctx.ellipse(centerX - 2, centerY + 12, 3, 2, 0.5, 0, Math.PI * 2);
        ctx.fill();
    }
    
    // Heavy bruising (appears at 40% health)
    if (healthPercent < 40) {
        ctx.fillStyle = 'rgba(80, 50, 20, 0.45)';
        ctx.beginPath();
        ctx.ellipse(centerX + 3, centerY - 8, 4, 3, 0.4, 0, Math.PI * 2);
        ctx.fill();
        
        // Darker spot on side
        ctx.fillStyle = 'rgba(60, 40, 10, 0.4)';
        ctx.beginPath();
        ctx.ellipse(centerX - 5, centerY - 2, 3, 2.5, -0.3, 0, Math.PI * 2);
        ctx.fill();
    }
    
    // Critical damage (appears at 20% health)
    if (healthPercent < 20) {
        // Very dark bruises - nearly black
        ctx.fillStyle = 'rgba(40, 30, 10, 0.6)';
        ctx.beginPath();
        ctx.ellipse(centerX + 2, centerY + 10, 5, 4, -0.3, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.fillStyle = 'rgba(30, 20, 5, 0.5)';
        ctx.beginPath();
        ctx.ellipse(centerX - 4, centerY + 4, 4, 3, 0.6, 0, Math.PI * 2);
        ctx.fill();
        
        // Crack in left lens
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(centerX - 5, centerY - 5);
        ctx.lineTo(centerX - 3, centerY - 1);
        ctx.stroke();
        
        // Stem starting to wilt/bend
        ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
        ctx.fillRect(centerX - 1, centerY - 14, 2, 3);
    }
    
    ctx.restore();
}

/**
 * Update the sidebar health bar (DEPRECATED - kept for compatibility)
 * Now calls updateHealthFace instead
 */
function updateSidebarHealth() {
    // New system - update face
    updateHealthFace();
    
    // Legacy bar system (hidden but still functional)
    const healthFill = document.getElementById('sidebarHealthBarFill');
    const healthText = document.getElementById('sidebarHealthBarText');
    
    if (!healthText) {
        console.warn('⚠️ Sidebar health elements not found in DOM');
        return;
    }
    
    // Get health percentage (assuming player.health and player.maxHealth exist)
    const currentHealth = typeof player !== 'undefined' && player.health !== undefined ? player.health : 100;
    const maxHealth = typeof player !== 'undefined' && player.maxHealth !== undefined ? player.maxHealth : 100;
    const healthPercent = (currentHealth / maxHealth) * 100;
    
    if (healthFill) {
        // Update fill width
        healthFill.style.width = healthPercent + '%';
        
        // Update health state classes
        healthFill.classList.remove('health-high', 'health-medium', 'health-low');
        if (healthPercent > 60) {
            healthFill.classList.add('health-high');
        } else if (healthPercent > 30) {
            healthFill.classList.add('health-medium');
        } else {
            healthFill.classList.add('health-low');
        }
    }
    
    // Update text - shows current health / damage taken
    const damageTaken = maxHealth - currentHealth;
    healthText.textContent = `${Math.round(currentHealth)} / ${damageTaken}`;
}

/* =====================
   BACKPACK PANEL (Future)
===================== */

/**
 * Toggle backpack overlay visibility
 * Shows/hides based on whether a backpack is equipped
 */
function toggleBackpackPanel() {
    const backpackOverlay = document.getElementById('backpackOverlay');
    if (!backpackOverlay) return;
    
    // Check if backpack is equipped
    if (typeof playerInventory === 'undefined' || !playerInventory.isBackpackEquipped()) {
        backpackOverlay.classList.remove('active');
        return;
    }
    
    // Toggle: if already open, close it
    if (backpackOverlay.classList.contains('active')) {
        backpackOverlay.classList.remove('active');
        return;
    }
    
    // Show backpack overlay and update contents
    backpackOverlay.classList.add('active');
    updateBackpackSlots();
    updateBackpackCapacity();
}

/**
 * Update backpack capacity indicator
 */
function updateBackpackCapacity() {
    // SAFETY CHECK
    if (typeof playerInventory === 'undefined' || !playerInventory.storage) {
        return;
    }
    
    const capacityElement = document.getElementById('backpackCapacityText');
    if (!capacityElement) return;
    
    const stored = playerInventory.storage.length;
    const max = playerInventory.getBackpackCapacity();
    
    capacityElement.textContent = `${stored} / ${max}`;
}

/**
 * Update backpack slots display
 */
function updateBackpackSlots() {
    const slotsContainer = document.getElementById('backpackSlots');
    if (!slotsContainer) return;
    
    // Clear existing slots
    slotsContainer.innerHTML = '';
    
    if (typeof playerInventory === 'undefined' || !playerInventory.isBackpackEquipped()) {
        return;
    }
    
    const capacity = playerInventory.getBackpackCapacity();
    const storage = playerInventory.storage;
    
    // Create slot elements
    for (let i = 0; i < capacity; i++) {
        const slot = document.createElement('div');
        slot.className = 'backpack-slot';
        
        if (i < storage.length) {
            // Slot has an item
            const itemId = storage[i];
            const itemType = typeof getItemType === 'function' ? getItemType(itemId) : null;
            
            if (itemType) {
                slot.innerHTML = `
                    <div class="backpack-slot-item">${itemType.name}</div>
                    <button class="backpack-slot-btn" onclick="handleBackpackRetrieveItem('${itemId}')">Take</button>
                `;
                slot.classList.add('has-item');
            }
        } else {
            // Empty slot
            slot.innerHTML = '<div class="backpack-slot-empty">empty</div>';
            slot.classList.add('empty');
        }
        
        slotsContainer.appendChild(slot);
    }
}

/**
 * Handle retrieving an item from backpack to hand
 * @param {string} itemId - Item ID to retrieve
 */
function handleBackpackRetrieveItem(itemId) {
    if (typeof playerInventory === 'undefined') return;
    
    // Check if hands are full
    if (playerInventory.isFull()) {
        if (typeof showMessage === 'function') {
            showMessage('Hands full! Drop an item first.');
        }
        return;
    }
    
    // Remove from backpack storage
    const removed = playerInventory.removeFromStorage(itemId);
    if (!removed) return;
    
    // Find the item definition
    const itemType = typeof getItemType === 'function' ? getItemType(itemId) : null;
    if (!itemType) return;
    
    // Create a fake item object for the hand
    const item = {
        type: itemType,
        x: 0,
        y: 0,
        collected: false,
        map: currentMap
    };
    
    // Add to hand
    playerInventory.addItem(item);
    
    // Update UI
    updateBackpackSlots();
    updateBackpackCapacity();
    updateHandsDisplay();
    
    if (typeof showMessage === 'function') {
        showMessage(`Took ${itemType.name} from backpack.`);
    }
}

/* =====================
   HELPER FUNCTIONS
===================== */

/**
 * Refresh all sidebar elements
 * Call this after any game state change
 */
function refreshSidebar() {
    updateHandsDisplay();
    updateSidebarHealth();
    updateBackpackCapacity();
}

/**
 * Show notification on sidebar (for item pickup, etc.)
 * Future enhancement: visual feedback
 */
function showSidebarNotification(message, type = 'info') {
    
    // Future: Add a small notification popup near the sidebar
    // For now, just log it
}

/* =====================
   INTEGRATION WITH EXISTING SYSTEMS
===================== */

/**
 * Called when player picks up an item
 * Replaces or supplements existing item counter update
 */
function onItemCollected(item) {
    updateHandsDisplay();
    showSidebarNotification(`Got ${item.type.name}!`, 'success');
}

/**
 * Called when player drops an item
 */
function onItemDropped(item) {
    updateHandsDisplay();
    showSidebarNotification(`Dropped ${item.type.name}`, 'info');
}

/**
 * Called when player stores/retrieves from storage
 */
function onStorageChanged() {
    updateHandsDisplay();
    updateBackpackCapacity();
}

/**
 * Called when player health changes
 */
function onHealthChanged() {
    updateSidebarHealth();
}

/* =====================
   DEPRECATION HELPERS
===================== */

/**
 * Legacy item counter initialization (for backward compatibility)
 * This can replace the old initializeItemCounter function
 */
function initializeItemCounter() {
    initializeSidebar();
}

/**
 * Legacy item counter update (for backward compatibility)
 * This can replace the old updateItemCounter function
 */
function updateItemCounter() {
    // SAFETY CHECK: Only update if playerInventory exists
    if (typeof playerInventory === 'undefined') {
        return;
    }
    
    updateHandsDisplay();
}

