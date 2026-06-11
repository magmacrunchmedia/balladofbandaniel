// camping-props.js - Camping gear sprites for tent interior

/**
 * Draws a modern sleeping bag (rolled up)
 */
function drawSleepingBag(ctx, x, y, tileSize) {
    // Takes up 1 tile
    const centerX = x + tileSize / 2;
    const centerY = y + tileSize / 2;
    
    // Main sleeping bag body (cyan/teal - modern camping color)
    ctx.fillStyle = '#00bcd4';
    ctx.fillRect(x + 2, y + 4, tileSize - 4, 8);
    
    // Darker shade for depth
    ctx.fillStyle = '#0097a7';
    ctx.fillRect(x + 2, y + 8, tileSize - 4, 4);
    
    // Rolled top
    ctx.fillStyle = '#26c6da';
    ctx.fillRect(x + 3, y + 3, tileSize - 6, 2);
    
    // Compression straps (black)
    ctx.fillStyle = '#000000';
    ctx.fillRect(x + 5, y + 5, 1, 7);
    ctx.fillRect(x + tileSize - 6, y + 5, 1, 7);
    
    // Highlight
    ctx.fillStyle = '#4dd0e1';
    ctx.fillRect(x + 3, y + 5, 2, 1);
}

/**
 * Draws a modern camping chair (folding chair)
 */
function drawCampingChair(ctx, x, y, tileSize) {
    // Takes up 1 tile, angled view
    
    // Seat (grey fabric)
    ctx.fillStyle = '#757575';
    ctx.fillRect(x + 3, y + 6, 10, 4);
    
    // Seat highlight
    ctx.fillStyle = '#9e9e9e';
    ctx.fillRect(x + 3, y + 6, 10, 1);
    
    // Backrest
    ctx.fillStyle = '#616161';
    ctx.fillRect(x + 4, y + 2, 8, 5);
    
    // Backrest highlight
    ctx.fillStyle = '#757575';
    ctx.fillRect(x + 4, y + 2, 8, 1);
    
    // Metal frame (silver)
    ctx.fillStyle = '#bdbdbd';
    // Front legs
    ctx.fillRect(x + 3, y + 10, 1, 4);
    ctx.fillRect(x + 12, y + 10, 1, 4);
    // Back legs
    ctx.fillRect(x + 4, y + 6, 1, 8);
    ctx.fillRect(x + 11, y + 6, 1, 8);
    
    // Frame highlights
    ctx.fillStyle = '#e0e0e0';
    ctx.fillRect(x + 3, y + 10, 1, 1);
    ctx.fillRect(x + 12, y + 10, 1, 1);
}

/**
 * Draws a battery-powered camping lantern
 */
function drawCampingLantern(ctx, x, y, tileSize) {
    // Takes up 1 tile
    const centerX = x + tileSize / 2;
    
    // Lantern body (yellow/gold)
    ctx.fillStyle = '#fbc02d';
    ctx.fillRect(x + 5, y + 5, 6, 7);
    
    // Handle (dark grey)
    ctx.fillStyle = '#424242';
    ctx.fillRect(x + 6, y + 3, 4, 1);
    ctx.fillRect(x + 6, y + 3, 1, 2);
    ctx.fillRect(x + 9, y + 3, 1, 2);
    
    // Top cap (dark)
    ctx.fillStyle = '#424242';
    ctx.fillRect(x + 5, y + 4, 6, 1);
    
    // Bottom (dark)
    ctx.fillStyle = '#616161';
    ctx.fillRect(x + 5, y + 12, 6, 1);
    
    // Light glow (bright yellow)
    ctx.fillStyle = '#fff59d';
    ctx.fillRect(x + 6, y + 7, 4, 3);
    
    // Highlight
    ctx.fillStyle = '#ffeb3b';
    ctx.fillRect(x + 6, y + 6, 2, 1);
    
    // Switch/button (red)
    ctx.fillStyle = '#f44336';
    ctx.fillRect(x + 9, y + 10, 1, 1);
}

/**
 * Draws a camping backpack
 */
function drawBackpack(ctx, x, y, tileSize) {
    // Takes up 1 tile, larger pack
    
    // Main pack body (olive/army green)
    ctx.fillStyle = '#689f38';
    ctx.fillRect(x + 4, y + 3, 8, 10);
    
    // Darker shade for depth
    ctx.fillStyle = '#558b2f';
    ctx.fillRect(x + 8, y + 3, 4, 10);
    
    // Top flap
    ctx.fillStyle = '#7cb342';
    ctx.fillRect(x + 4, y + 2, 8, 2);
    
    // Front pocket
    ctx.fillStyle = '#7cb342';
    ctx.fillRect(x + 5, y + 7, 6, 4);
    
    // Pocket zipper (black)
    ctx.fillStyle = '#000000';
    ctx.fillRect(x + 5, y + 7, 6, 1);
    
    // Straps (black)
    ctx.fillStyle = '#424242';
    ctx.fillRect(x + 5, y + 4, 1, 8);
    ctx.fillRect(x + 10, y + 4, 1, 8);
    
    // Buckles (silver)
    ctx.fillStyle = '#bdbdbd';
    ctx.fillRect(x + 5, y + 6, 1, 1);
    ctx.fillRect(x + 10, y + 6, 1, 1);
}

/**
 * Draws a large hiking backpack (2 tiles tall)
 * For use as a prop that takes up 2 vertical tiles
 */
function drawLargeBackpack(ctx, x, y, tileSize) {
    // Takes up 1 tile width, 2 tiles tall
    // y is the TOP tile position
    
    // Main pack body - upper section (olive/army green)
    ctx.fillStyle = '#689f38';
    ctx.fillRect(x + 3, y + 2, 10, tileSize);
    
    // Main pack body - lower section
    ctx.fillRect(x + 3, y + tileSize, 10, tileSize - 2);
    
    // Darker shade for depth/side panel (entire height)
    ctx.fillStyle = '#558b2f';
    ctx.fillRect(x + 9, y + 2, 4, tileSize * 2 - 2);
    
    // Top flap/lid
    ctx.fillStyle = '#7cb342';
    ctx.fillRect(x + 3, y + 1, 10, 2);
    
    // Top highlight
    ctx.fillStyle = '#8bc34a';
    ctx.fillRect(x + 4, y + 1, 8, 1);
    
    // Upper front pocket
    ctx.fillStyle = '#7cb342';
    ctx.fillRect(x + 4, y + 8, 8, 5);
    
    // Lower front pocket
    ctx.fillStyle = '#7cb342';
    ctx.fillRect(x + 4, y + tileSize + 2, 8, 6);
    
    // Pocket zippers (black)
    ctx.fillStyle = '#000000';
    ctx.fillRect(x + 4, y + 8, 8, 1);
    ctx.fillRect(x + 4, y + tileSize + 2, 8, 1);
    
    // Main straps (black) - runs full height
    ctx.fillStyle = '#424242';
    ctx.fillRect(x + 5, y + 4, 1, tileSize * 2 - 6);
    ctx.fillRect(x + 11, y + 4, 1, tileSize * 2 - 6);
    
    // Side compression straps (horizontal)
    ctx.fillRect(x + 3, y + 12, 10, 1);
    ctx.fillRect(x + 3, y + tileSize + 4, 10, 1);
    
    // Buckles (silver)
    ctx.fillStyle = '#bdbdbd';
    ctx.fillRect(x + 5, y + 6, 1, 1);
    ctx.fillRect(x + 11, y + 6, 1, 1);
    ctx.fillRect(x + 7, y + 12, 2, 1);
    ctx.fillRect(x + 7, y + tileSize + 4, 2, 1);
    
    // Frame detail at bottom (dark grey)
    ctx.fillStyle = '#424242';
    ctx.fillRect(x + 4, y + tileSize * 2 - 3, 8, 1);
    
    // Sleeping bag straps at bottom (blue/teal)
    ctx.fillStyle = '#00bcd4';
    ctx.fillRect(x + 5, y + tileSize * 2 - 2, 2, 1);
    ctx.fillRect(x + 10, y + tileSize * 2 - 2, 2, 1);
}

/**
 * Draws a cooler/ice chest
 */
function drawCooler(ctx, x, y, tileSize) {
    // Takes up 1 tile
    
    // Main cooler body (blue)
    ctx.fillStyle = '#1976d2';
    ctx.fillRect(x + 2, y + 6, 12, 7);
    
    // Lid (lighter blue)
    ctx.fillStyle = '#2196f3';
    ctx.fillRect(x + 2, y + 4, 12, 3);
    
    // Lid highlight
    ctx.fillStyle = '#42a5f5';
    ctx.fillRect(x + 2, y + 4, 12, 1);
    
    // Handle (black)
    ctx.fillStyle = '#000000';
    ctx.fillRect(x + 5, y + 2, 6, 1);
    ctx.fillRect(x + 5, y + 2, 1, 2);
    ctx.fillRect(x + 10, y + 2, 1, 2);
    
    // Latch (silver)
    ctx.fillStyle = '#bdbdbd';
    ctx.fillRect(x + 7, y + 6, 2, 1);
    
    // Drain plug (dark grey)
    ctx.fillStyle = '#424242';
    ctx.fillRect(x + 3, y + 11, 1, 1);
}

/**
 * Draws a camping stove (portable gas stove)
 */
function drawCampingStove(ctx, x, y, tileSize) {
    // Takes up 1 tile
    
    // Base (silver/steel)
    ctx.fillStyle = '#757575';
    ctx.fillRect(x + 3, y + 8, 10, 5);
    
    // Top surface (darker)
    ctx.fillStyle = '#424242';
    ctx.fillRect(x + 3, y + 7, 10, 1);
    
    // Burner grate (black)
    ctx.fillStyle = '#212121';
    ctx.fillRect(x + 5, y + 5, 6, 2);
    
    // Grate lines
    ctx.fillStyle = '#424242';
    ctx.fillRect(x + 6, y + 5, 1, 2);
    ctx.fillRect(x + 8, y + 5, 1, 2);
    ctx.fillRect(x + 10, y + 5, 1, 2);
    
    // Control knob (red)
    ctx.fillStyle = '#f44336';
    ctx.fillRect(x + 11, y + 9, 2, 2);
    
    // Gas canister (green)
    ctx.fillStyle = '#4caf50';
    ctx.fillRect(x + 4, y + 10, 3, 3);
    
    // Canister top (silver)
    ctx.fillStyle = '#9e9e9e';
    ctx.fillRect(x + 4, y + 10, 3, 1);
    
    // Highlights
    ctx.fillStyle = '#9e9e9e';
    ctx.fillRect(x + 4, y + 8, 6, 1);
}

/**
 * Draws a water bottle
 */
function drawWaterBottle(ctx, x, y, tileSize) {
    // Takes up 1 tile
    const centerX = x + tileSize / 2;
    
    // Bottle body (transparent blue tint)
    ctx.fillStyle = '#4fc3f7';
    ctx.fillRect(x + 6, y + 5, 4, 7);
    
    // Water inside (darker blue)
    ctx.fillStyle = '#0288d1';
    ctx.fillRect(x + 6, y + 8, 4, 4);
    
    // Cap (black)
    ctx.fillStyle = '#212121';
    ctx.fillRect(x + 6, y + 4, 4, 1);
    ctx.fillRect(x + 7, y + 3, 2, 1);
    
    // Highlight on bottle
    ctx.fillStyle = '#b3e5fc';
    ctx.fillRect(x + 7, y + 6, 1, 4);
    
    // Bottom
    ctx.fillStyle = '#0277bd';
    ctx.fillRect(x + 6, y + 12, 4, 1);
}

/**
 * Draws a camping mat/pad (rolled up)
 */
function drawCampingMat(ctx, x, y, tileSize) {
    // Takes up 1 tile
    
    // Main mat body (orange/red)
    ctx.fillStyle = '#ff5722';
    ctx.fillRect(x + 2, y + 7, tileSize - 4, 6);
    
    // Darker shade for depth
    ctx.fillStyle = '#e64a19';
    ctx.fillRect(x + 2, y + 10, tileSize - 4, 3);
    
    // Rolled edge
    ctx.fillStyle = '#ff7043';
    ctx.fillRect(x + 3, y + 6, tileSize - 6, 1);
    
    // Straps (black)
    ctx.fillStyle = '#000000';
    ctx.fillRect(x + 5, y + 8, 1, 4);
    ctx.fillRect(x + tileSize - 6, y + 8, 1, 4);
    
    // Highlight
    ctx.fillStyle = '#ff8a65';
    ctx.fillRect(x + 3, y + 8, 2, 1);
}

/**
 * Draws a first aid kit
 */
function drawFirstAidKit(ctx, x, y, tileSize) {
    // Takes up 1 tile
    
    // Case body (white)
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(x + 4, y + 5, 8, 6);
    
    // Case outline/shadow (light grey)
    ctx.fillStyle = '#e0e0e0';
    ctx.fillRect(x + 4, y + 10, 8, 1);
    ctx.fillRect(x + 11, y + 5, 1, 6);
    
    // Red cross - vertical
    ctx.fillStyle = '#f44336';
    ctx.fillRect(x + 7, y + 6, 2, 4);
    
    // Red cross - horizontal
    ctx.fillRect(x + 6, y + 7, 4, 2);
    
    // Handle (grey)
    ctx.fillStyle = '#757575';
    ctx.fillRect(x + 6, y + 3, 4, 1);
    ctx.fillRect(x + 6, y + 3, 1, 2);
    ctx.fillRect(x + 9, y + 3, 1, 2);
}

/**
 * Draws a camping flashlight (prop, not collectible item)
 */
function drawCampingFlashlight(ctx, x, y, tileSize) {
    // Takes up 1 tile
    
    // Body (dark grey/black)
    ctx.fillStyle = '#424242';
    ctx.fillRect(x + 5, y + 6, 6, 5);
    
    // Head (silver)
    ctx.fillStyle = '#9e9e9e';
    ctx.fillRect(x + 5, y + 5, 6, 1);
    ctx.fillRect(x + 6, y + 4, 4, 1);
    
    // Lens (yellow glow)
    ctx.fillStyle = '#fdd835';
    ctx.fillRect(x + 7, y + 3, 2, 1);
    
    // Lens rim (dark)
    ctx.fillStyle = '#212121';
    ctx.fillRect(x + 6, y + 3, 4, 1);
    
    // Button (red)
    ctx.fillStyle = '#f44336';
    ctx.fillRect(x + 9, y + 8, 1, 1);
    
    // Body ridges (lighter grey)
    ctx.fillStyle = '#616161';
    ctx.fillRect(x + 5, y + 7, 6, 1);
    ctx.fillRect(x + 5, y + 9, 6, 1);
    
    // Highlight
    ctx.fillStyle = '#757575';
    ctx.fillRect(x + 6, y + 6, 2, 1);
}

/**
 * Draws an UNROLLED sleeping bag (laid out flat)
 * This is passable - player can walk over it
 * Takes up 2 tiles wide × 3 tiles tall
 */
function drawSleepingBagUnrolled(ctx, x, y, tileSize) {
    // x, y is the TOP-LEFT tile position
    // This will draw across 2 tiles horizontally and 3 tiles vertically
    
    const width = tileSize * 2;
    const height = tileSize * 3;
    
    // Main sleeping bag body (cyan/teal - modern camping color)
    ctx.fillStyle = '#00bcd4';
    ctx.fillRect(x + 2, y + 2, width - 4, height - 4);
    
    // Darker shade for depth/shadow side (right side)
    ctx.fillStyle = '#0097a7';
    ctx.fillRect(x + width - 8, y + 2, 6, height - 4);
    
    // Even darker shade for bottom shadow
    ctx.fillStyle = '#00838f';
    ctx.fillRect(x + 2, y + height - 8, width - 4, 6);
    
    // Pillow area (top, lighter color)
    ctx.fillStyle = '#26c6da';
    ctx.fillRect(x + 4, y + 4, width - 8, tileSize - 2);
    
    // Pillow highlight/puff detail
    ctx.fillStyle = '#4dd0e1';
    ctx.fillRect(x + 6, y + 6, width - 12, 6);
    ctx.fillRect(x + 8, y + 8, width - 16, 3);
    
    // Pillow indent (to show it's puffy)
    ctx.fillStyle = '#00bcd4';
    ctx.fillRect(x + width / 2 - 2, y + 8, 4, 4);
    
    // Zipper line (black, running down the center)
    ctx.fillStyle = '#000000';
    for (let i = tileSize; i < height - 6; i += 3) {
        ctx.fillRect(x + width / 2, y + i, 2, 2);
    }
    
    // Zipper pull (silver)
    ctx.fillStyle = '#bdbdbd';
    ctx.fillRect(x + width / 2 - 1, y + tileSize + 2, 4, 3);
    
    // Fold/quilting lines (subtle texture) - horizontal
    ctx.fillStyle = '#0097a7';
    ctx.fillRect(x + 4, y + tileSize + 4, width - 8, 1);
    ctx.fillRect(x + 4, y + tileSize * 2 - 2, width - 8, 1);
    ctx.fillRect(x + 4, y + tileSize * 2 + 6, width - 8, 1);
    
    // Side seams (vertical lines)
    ctx.fillStyle = '#00838f';
    ctx.fillRect(x + 6, y + tileSize, 1, height - tileSize - 6);
    ctx.fillRect(x + width - 7, y + tileSize, 1, height - tileSize - 6);
    
    // Bottom edge/hem
    ctx.fillStyle = '#006064';
    ctx.fillRect(x + 2, y + height - 4, width - 4, 2);
    
    // Corner highlights
    ctx.fillStyle = '#4dd0e1';
    ctx.fillRect(x + 4, y + tileSize + 2, 4, 2);
    ctx.fillRect(x + width - 8, y + tileSize + 2, 4, 2);
    
    // Label/brand patch (small rectangle on bottom right)
    ctx.fillStyle = '#ffd700';
    ctx.fillRect(x + width - 12, y + height - 10, 6, 4);
    ctx.fillStyle = '#000000';
    ctx.fillRect(x + width - 11, y + height - 9, 4, 2);
}

/**
 * Draws a wooden chest/crate for storage
 */
function drawChest(ctx, x, y, tileSize) {
    // Wooden chest body
    ctx.fillStyle = '#8b4513';
    ctx.fillRect(x + 1, y + 4, tileSize - 2, tileSize - 5);
    
    // Lighter wood grain
    ctx.fillStyle = '#a0522d';
    ctx.fillRect(x + 2, y + 5, tileSize - 4, 2);
    ctx.fillRect(x + 2, y + 9, tileSize - 4, 2);
    
    // Darker bottom
    ctx.fillStyle = '#654321';
    ctx.fillRect(x + 1, y + tileSize - 3, tileSize - 2, 2);
    
    // Metal bands
    ctx.fillStyle = '#4a4a4a';
    ctx.fillRect(x + 1, y + 4, tileSize - 2, 2);
    ctx.fillRect(x + 1, y + tileSize - 5, tileSize - 2, 2);
    
    // Metal clasp/lock
    ctx.fillStyle = '#c0c0c0';
    ctx.fillRect(x + tileSize/2 - 2, y + 6, 4, 4);
    ctx.fillStyle = '#808080';
    ctx.fillRect(x + tileSize/2 - 1, y + 7, 2, 2);
    
    // Highlight
    ctx.fillStyle = '#cd853f';
    ctx.fillRect(x + 2, y + 5, 2, tileSize - 7);
}

/**
 * Draws a long bus bench (5 tiles wide × 1 tile tall)
 */
function drawBusBench(ctx, x, y, tileSize) {
    const totalWidth = tileSize * 5;
    
    // Metal frame/legs (dark grey)
    ctx.fillStyle = '#424242';
    // Left leg
    ctx.fillRect(x + 2, y + 12, 2, 4);
    // Right leg
    ctx.fillRect(x + totalWidth - 4, y + 12, 2, 4);
    // Middle legs
    ctx.fillRect(x + tileSize * 2 + 7, y + 12, 2, 4);
    ctx.fillRect(x + tileSize * 3 + 7, y + 12, 2, 4);
    
    // Metal frame rail (silver)
    ctx.fillStyle = '#9e9e9e';
    ctx.fillRect(x + 2, y + 11, totalWidth - 4, 1);
    
    // Seat cushion (dark vinyl blue-grey)
    ctx.fillStyle = '#455a64';
    ctx.fillRect(x + 1, y + 5, totalWidth - 2, 6);
    
    // Seat cushion highlight (lighter)
    ctx.fillStyle = '#546e7a';
    ctx.fillRect(x + 1, y + 5, totalWidth - 2, 2);
    
    // Seat cushion stitching lines (subtle vertical)
    ctx.fillStyle = '#37474f';
    for (let i = 1; i < 5; i++) {
        ctx.fillRect(x + tileSize * i, y + 5, 1, 6);
    }
    
    // Backrest (darker vinyl)
    ctx.fillStyle = '#37474f';
    ctx.fillRect(x + 1, y + 1, totalWidth - 2, 5);
    
    // Backrest highlight
    ctx.fillStyle = '#455a64';
    ctx.fillRect(x + 1, y + 1, totalWidth - 2, 1);
    
    // Backrest stitching lines
    ctx.fillStyle = '#2c3e50';
    for (let i = 1; i < 5; i++) {
        ctx.fillRect(x + tileSize * i, y + 1, 1, 5);
    }
    
    // Armrests on ends (metal)
    ctx.fillStyle = '#757575';
    ctx.fillRect(x, y + 3, 2, 3);
    ctx.fillRect(x + totalWidth - 2, y + 3, 2, 3);
    
    // Armrest highlights
    ctx.fillStyle = '#9e9e9e';
    ctx.fillRect(x, y + 3, 2, 1);
    ctx.fillRect(x + totalWidth - 2, y + 3, 2, 1);
    
    // Bottom edge shadow
    ctx.fillStyle = '#263238';
    ctx.fillRect(x + 1, y + 11, totalWidth - 2, 1);
}

// Export all camping prop drawing functions
window.CampingProps = {
    drawSleepingBag,
    drawSleepingBagUnrolled,
    drawCampingChair,
    drawCampingLantern,
    drawBackpack,
    drawLargeBackpack,
    drawCooler,
    drawCampingStove,
    drawWaterBottle,
    drawCampingMat,
    drawFirstAidKit,
    drawCampingFlashlight,
    drawChest,
    drawBusBench
};