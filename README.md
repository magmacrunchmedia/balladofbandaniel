# THE BALLAD OF BANDANIEL - "Just Trying to Get Home"

## 🌟 Project Overview
A browser-based top-down adventure RPG featuring **BANDANIEL**, an anthropomorphic banana on a quest to get home. Built with vanilla HTML5 Canvas and JavaScript, the game features tile-based grid movement, a large explorable Tutorial Garden map, NPC interactions, collectibles, puzzle-solving mechanics, tent interiors, and authentic SNES-style UI.

**Theme:** "80's, but future" - A retrofuture aesthetic combining neon colors, geometric patterns, synthwave vibes, and retro-futuristic technology.

**Current Status:** Phase 9 - Crinkly Tent Floor Texture (February 6, 2026)

---

## 🎮 Game Concept

### Story
BANDANIEL is just trying to get home, but he needs help from **da Bussy**, an anthropomorphic bus, to reach each new location. Each level requires finding specific items to unlock the next area and progress on the journey home.

### Main Characters

#### BANDANIEL (Player Character) ✅ IMPLEMENTED
- Anthropomorphic banana with sunglasses and cigarette/joint
- Cool, slouched vibe inspired by 80's aesthetics
- 4-directional sprite with 2-frame walk animation
- **Status:** Fully functional

#### da Bussy (Quest Giver NPC & Enterable Interior) ✅ IMPLEMENTED
- Anthropomorphic school bus with yeti painted on the side
- Multi-tile sprite (~8 tiles wide, ~3 tiles tall)
- Gives objectives and checks for required items
- **Context-aware dialogue:** Different messages before/after finding keys
- **Enterable interior:** 16×10 tile horizontal bus layout with psychedelic retrofuture aesthetic
- **Status:** Sprite complete, dialogue system working, interior accessible with keys, multi-line special dialogue

#### Supporting NPCs ✅ IMPLEMENTED
- **STRAWBERTO** - Gentleman strawberry with monocle, resides in blue tent
- **ELEKTRA** - Cool poetry chick orange with round John Lennon-style sunglasses, resides in red tent
- **Carl** - Laid-back pineapple with chill vibes
- **PLANTAIN JANE** - 1950s bad girl/femme fatale plantain with red cat-eye sunglasses and cigarette

---

## 🗺️ World Structure

### Current Maps

#### Tutorial Garden (Level 1) ✅ IMPLEMENTED
- **Size:** 150 tiles wide × 40 tiles tall (16px SNES-style tiles)
- **Central Feature:** Large pond that players must navigate around
- **Geography:** Florida-inspired with water feature
- **Terrain:** Grass paths, rustic campsite fence, oak trees, flowers
- **Background:** Dense SNES-style Florida forest with parallax scrolling
- **Safety:** No enemies - safe learning environment
- **Objective:** Find da Bussy's keys
- **Explorable:** Two camping tent interiors (red and blue) + da Bussy interior

#### Tent Interior 1 (ELEKTRA's Red Tent) ✅ IMPLEMENTED
- **Size:** 10×8 tile room (centered in 150×112 padded map)
- **Entry:** Walk onto entrance tiles at (17, 53) or (18, 53) in Tutorial Garden
- **Exit:** Walk onto exit door tiles at (74, 57) or (75, 57) inside tent
- **Transitions:** Automatic walk-in/walk-out (no SPACE bar needed)
- **Features:** Red modern tent aesthetic with crinkly grey tarp floor, red tent walls, black void exterior
- **Color Scheme:** Red (#d32f2f main, #b71c1c dark, #ef5350 highlight)
- **Camping Props:** 8 SNES-style camping items (sleeping bags, lantern, backpack, water bottle, first aid kit, cooler, chair)
- **Animated Campfire:** Flickering flames with animated embers, smoke, and ground glow (outside tent at 22, 52)
- **NPC:** ELEKTRA (poetry chick orange) resides inside at position (72, 54)

#### Tent Interior 2 (STRAWBERTO's Blue Tent) ✅ IMPLEMENTED
- **Size:** 12×10 tile room (centered in 150×112 padded map) - LARGER than tent 1
- **Entry:** Walk onto entrance tiles at (45, 6) or (46, 6) in Tutorial Garden
- **Exit:** Walk onto exit door tiles at (95, 58) or (96, 58) inside tent
- **Transitions:** Automatic walk-in/walk-out (no SPACE bar needed)
- **Features:** Blue modern tent aesthetic with crinkly grey tarp floor, blue tent walls, black void exterior
- **Color Scheme:** Blue (#1976d2 main, #0d47a1 dark, #42a5f5 highlight)
- **Camping Props:** 6 SNES-style camping items (sleeping bag, lantern, backpack, water bottle, cooler, chair)
- **NPC:** STRAWBERTO (gentleman strawberry with monocle) at position (93, 54)

#### da Bussy Interior (Mobile Home Base) ✅ IMPLEMENTED
- **Size:** 24×10 tile room (centered in 150×112 padded map) - HORIZONTAL bus layout
- **Entry:** Walk onto entrance tiles at (34, 4) or (35, 4) in Tutorial Garden (requires da Bussy's Keys)
- **Exit:** Walk onto exit door tiles at (81, 60) or (82, 60) inside bus (BOTTOM wall)
- **Transitions:** Automatic walk-in/walk-out (no SPACE bar needed)
- **Features:** Vintage school bus interior with rendered walls, floor tiles, carpet aisle, black void exterior
- **Color Scheme:** School bus yellows (#f9a825 base, #f57f17 shadows), metal trim (#616161)
- **Wall Rendering:** Position-aware SNES-style walls with:
  - Ceiling: Horizontal panels with metal trim and rivets
  - Floor edge: Metal baseboard with vertical paneling
  - Left wall: Metal edge strips (exit side)
  - Right wall: Detailed paneling (driver area)
  - Exit door: Blue-gray folding door with window and yellow handle
- **Layout:** Driver area on RIGHT, exit doors on BOTTOM wall, center aisle
- **Props:** 
  - Sidewall-mounted steering wheel for talking to da Bussy (2×2 tiles at 84, 52)
  - Storage backpack (1×1 tile at 77, 52) - Interactive storage container
  - Cooler (1×1 tile at 70, 52)
- **Storage System:** 5-item capacity storage accessible via backpack
- **Configuration:** Uses centralized BUSSY_CONFIG (bussy-config.js)
- **Future:** Level selection system via steering wheel, psychedelic decorations, resting spot

### Disabled Maps (Prototype Content - NOT IN USE)
- **House (Ground Floor)** - Original prototype map, disabled
- **Upstairs (Recording Studio)** - Original prototype map, disabled  
- **Tunnel (Underground)** - Original prototype map, disabled

**Note:** Map transitions enabled for tents and da Bussy interior. Game focuses on Tutorial Garden exploration.

---

## 🎨 Visual Style: "80's, but Future"

### Current Aesthetic - SNES-Style UI ✅ IMPLEMENTED

#### Game World
- **Grass terrain:** Bright green (#7cb342) with pixel texture
- **Water (pond):** Blue (#1e88e5) with animated ripples
- **Campsite fence:** Weathered brown wood (auto-oriented)
- **Oak trees:** SNES-style pixelated Florida oaks (7×7 tiles)
- **Flowers:** Pink/yellow decorative sprites
- **Forest background:** Cached parallax scrolling with organic layers
- **Tent 1 (exterior):** Modern red dome tent (SNES pixelated, 6×4 tiles at 15, 50)
- **Tent 1 (interior):** Crinkly grey tarp floor with fabric wrinkles, red tent walls (#c62828), black void exterior (#1a1a1a)
- **Tent 2 (exterior):** Modern blue dome tent (SNES pixelated, 6×4 tiles at 43, 3) 
- **Tent 2 (interior):** Crinkly grey tarp floor with fabric wrinkles, blue tent walls (#1565c0), black void exterior (#1a1a1a)
- **da Bussy (exterior):** Anthropomorphic school bus sprite (12×4 tiles at 26, 1) with yeti painting
- **da Bussy (interior):** Horizontal bus layout (24×10 tiles at 63, 51) with:
  - SNES-style rendered walls (yellow/orange #f9a825 base with metal trim)
  - Position-aware wall rendering (ceiling, floor edge, left/right walls)
  - Industrial rivets and panel details
  - Blue-gray folding exit door with window
  - Floor tiles, carpet aisle, black void exterior

#### UI/UX - Authentic SNES RPG Style ✅ IMPLEMENTED
- **Font:** Press Start 2P (pixel-perfect retro font)
- **Color Palette:** 
  - Windows: Blue-gray SNES menu colors (#3a4466 base)
  - Accents: Gold (#ffd700), Cyan (#00d4ff), Green (#2ecc71)
- **Borders:** Multi-layered box-shadow borders (no modern CSS)
  - Chunky 4-8px borders with depth shadows
  - No border-radius (sharp corners only)
- **Windows:** Classic SNES RPG menu aesthetic
  - Dark blue-gray backgrounds
  - Layered borders for 3D depth effect
  - No smooth transitions (instant state changes)
- **Buttons:** SNES controller button style
  - Chunky borders with press-down effect
  - Gold text on dark backgrounds
  - Hover states without smooth transitions
- **Dialogue Boxes:** Classic RPG text boxes
  - Character name plates
  - Continue prompt with blink animation
  - Support for multi-line context-aware dialogue
- **Inventory Panel:** Grid-based with SNES window
  - Item rarity borders (gold for required, cyan for optional)
  - Pixel-perfect item display
  - Close button with SNES styling
- **Storage Panel:** Two-column layout (inventory | stored items)
  - Capacity counter (Space: X / 5)
  - Drag-free click-to-store/retrieve interface
  - Required items protected from storage
- **HUD Elements:**
  - **Consolidated Sidebar (right side):**
    - **Hands Panel** - Shows left/right hand inventory (2 items)
    - Item sprites with colored borders (gold for required, cyan for optional)
    - Item names displayed below each slot
    - Compact 60×80px slots with proper item centering
  - **Health Panel** - Duke Nukem-style BANDANIEL face with progressive damage
  - Faces show health via bruising, cigarette state, sunglasses damage
  - Health number display (e.g., "75 / 100")
  - Sidebar panels use SNES-style borders with 3D depth effect
- **Interact Prompt:** Shows "Press SPACE" with blink animation
- **Screens:** Title, Pause, Game Over
  - ASCII art title screen
  - SNES-style pause menu
  - Red danger theme for game over

**CSS Package:** Comprehensive SNES-style CSS with modular imports
- `css/base.css` - Color variables, utilities
- `css/ui/` - HUD, dialogue, inventory, storage, controls
- `css/screens/` - Start, pause, game over screens
- Full documentation in `CSS_README.md`

---

## 🕹️ Gameplay Mechanics

### Core Systems ✅ WORKING
- **Free movement** - Smooth, responsive WASD/Arrow keys
- **4-directional sprites** - Proper facing for player and NPCs
- **Walk animation** - 2-frame cycle with bobbing
- **Camera system** - Smooth interpolated following (30 FPS optimized)
- **Collision detection** - Water, walls, trees, props, multi-tile NPCs, tent walls, bus walls
- **Pause system** - ESC/P to pause
- **Item collection** - Required and optional items with 2-item carry limit (two hands)
- **Inventory system** - Visual UI with descriptions and close button
- **Drop system** - Press **X** to drop items (appears 2 tiles in front, auto-pickup when walking over)
- **Storage system** - 5-item capacity in da Bussy interior, accessible via backpack
- **NPC dialogue** - Context-aware conversations with multi-line support
- **Tent entry/exit** - Automatic walk-in transitions with position locking
- **Bus entry/exit** - Key-based entry, automatic transitions
- **Interaction system** - SPACE to interact with NPCs and props (facing-based detection)

### Item Collection System ✅ IMPLEMENTED
- **Required Items:** Must collect to progress (da Bussy's Keys)
- **Optional Items:** Exploration bonuses (Flashlight)
- **Carry Limit:** 3 items maximum in inventory
- **Storage System:** 5 additional slots in da Bussy's backpack
- **Inventory Panel:** Click 📦 to view collected items, click Close button to exit
- **Storage Panel:** Click backpack in bus to access storage (two-column layout)
- **Item Counter:** Shows progress (🔑 Items: 0 / 1)
- **Notifications:** Gold border (required), blue border (optional)

### Controls
| Input | Action |
|-------|--------|
| Arrow Keys / WASD | Move BANDANIEL |
| SPACE | Interact with NPCs and props |
| X | Quick-drop first item (drops 2 tiles ahead) |
| ESC / P | Pause/unpause |
| Click 📦 Inventory | Open inventory |
| Click Backpack (in bus) | Open storage |
| Click Close | Close panels |
| ? Button | Toggle controls help |

**Note:** 
- Tent/bus entry/exit is automatic - just walk onto the entrance tiles
- Interactions require facing the object (no diagonal interactions)
- Storage only accessible inside da Bussy interior
- Dropped items auto-pickup when walking over them
- Cannot drop required quest items

---

## 📁 Project Structure

### Current Organization (February 2026)
```
project/
├── index.html
├── README.md               # This file
├── CSS_README.md           # SNES UI style guide
├── css/
│   ├── main.css            # Main entry (imports all)
│   ├── base.css            # Variables, utilities, pixel rendering
│   ├── ui/
│   │   ├── hud.css         # Health, items, buttons
│   │   ├── dialogue.css    # NPC dialogue boxes
│   │   ├── inventory.css   # Inventory panel
│   │   ├── storage.css     # Storage panel
│   │   └── controls.css    # Controls help menu
│   └── screens/
│       ├── start.css       # Title screen
│       ├── pause.css       # Pause menu
│       └── gameover.css    # Game over screen
│
└── js/
    ├── config/
    │   └── constants.js    # Tile IDs, colors, dimensions
    │
    ├── core/
    │   ├── game.js         # Game loop, movement, collisions
    │   ├── input.js        # Keyboard handling
    │   └── camera.js       # Camera following
    │
    ├── world/
    │   ├── maps.js         # Tutorial Garden + tent interiors + bus interior
    │   └── transitions.js  # Tent/bus entry/exit (unified system)
    │
    ├── entities/
    │   ├── player.js       # Health system
    │   ├── prop-positions.js   # All props (trees, tents, walls, camping items, bus props)
    │   ├── items-data.js       # Items, inventory, item positions
    │   ├── npcs-data.js        # NPC definitions and dialogue
    │   ├── furniture.js        # (NOT IN USE - studio/house furniture from prototype)
    │   ├── coins.js            # (NOT IN USE - coin collectibles)
    │   └── enemies.js          # (NOT IN USE - enemy system disabled)
    │
    ├── systems/
    │   ├── collision.js    # Collision detection
    │   ├── inventory.js    # Item management UI
    │   ├── storage.js      # Storage system
    │   └── shop.js         # (NOT IN USE - shop system disabled)
    │
    ├── rendering/
    │   ├── renderer.js     # Main coordinator with Y-sorting
    │   ├── tiles.js        # Tile rendering (grass, water, walls, doors)
    │   ├── sprites.js      # Sprite router
    │   ├── oak-tree.js     # Oak tree sprite (7×7 tiles)
    │   ├── tent.js         # Tent sprite (red/blue, 6×4 tiles)
    │   ├── camping-props.js    # Camping equipment sprites
    │   ├── bus-props.js        # Bus interior props (steering wheel)
    │   ├── sprites/            # Character sprites
    │   │   ├── bandaniel.js    # Player character (4 directions)
    │   │   ├── npcs.js         # NPC sprite router
    │   │   ├── bussy.js        # da Bussy sprite (8×3 tiles)
    │   │   ├── strawberto.js   # Strawberry NPC
    │   │   ├── carl.js         # Pineapple NPC
    │   │   ├── plantain-jane.js    # Plantain NPC
    │   │   └── elektra.js      # Orange NPC
    │   │   └── kim.js      # Kiwi NPC
    │   ├── items.js        # Item sprites (keys, flashlight)
    │   └── props.js        # (NOT IN USE - prototype furniture sprites)
    │
    ├── ui/
    │   ├── dialogue.js         # NPC dialogue system (multi-line support)
    │   ├── interactions.js     # Prop/NPC interaction detection (facing-based)
    │   ├── integration.js      # Storage UI bridge
    │   ├── screens.js          # Start/pause/game over screens
    │   ├── controls-toggle.js  # Controls help toggle
    │   └── title-background.js # Animated title background
    │
    ├── theme/
    │   └── studio/         # (NOT IN USE - prototype studio theme)
    │
    ├── main.js             # Entry point
    │
    └── diagnostic/         # Debug scripts (can be removed)
        ├── diagnostic-storage.js
        ├── space-key-diagnostic.js
        └── error-wrapper.js
```

### Files NOT Currently in Use
These files exist from earlier prototype phases but are not loaded in the game:
- ❌ `js/entities/furniture.js` - Studio/house furniture positions
- ❌ `js/entities/coins.js` - Coin collectibles system
- ❌ `js/entities/enemies.js` - Enemy system (disabled)
- ❌ `js/systems/shop.js` - Shop system (disabled)
- ❌ `js/rendering/props.js` - Prototype furniture sprites
- ❌ `js/theme/studio/` - Prototype studio theme
- ❌ Prototype maps: house, upstairs, tunnel

**Note:** These files are kept for potential future use but can be safely removed if needed.

---

## 🐛 Known Issues & Current Work

### 🔴 Active Issues (February 2, 2026)

#### Tent Entrance Z-Ordering Bug 🐛 INVESTIGATING
**Problem:** During tent entry transition cooldown, BANDANIEL briefly appears to go "underneath" the green grass pixels between the tent ropes (entrance row).

**Details:**
- Happens only during the 200ms cooldown period after entering
- Player renders behind entrance grass instead of in front
- Occurs on both red and blue tents
- Very brief visual glitch (hard to screenshot)

**Current Status:** Attempted fix by adjusting tent sortY to `prop.y + 3.5` (entrance row) instead of `prop.y + 4` (bottom). Issue persists - may need to split tent rendering into body/entrance layers.

**Technical Context:**
- Y-sorting system in renderer.js (line ~258)
- Player sortY: `player.y`
- Tent sortY: `prop.y + 3.5` (attempted fix)
- Entrance is at tent row 3 (e.g., y=53 for tent at y=50)

**Next Steps to Try:**
1. Split tent rendering: draw body (rows 0-2) and entrance (row 3) separately
2. Adjust player sortY to `player.y + 0.5` instead of tent sortY
3. Debug player position during transition cooldown

#### Storage Interaction Works from All Sides ✅ FIXED
Previously only worked from left side - now uses facing-based detection and works from all 4 directions.

### 🟡 Medium Priority

#### Prop Collision Outside Tent #1
- Camping props in Tent #2 can be walked through
- Props in da Bussy interior (except backpack) can be walked through
- Props on outside map can be walked through
- Only Tent #1 has working prop collision
- **Root cause:** Collision system needs updating for new file structure

#### Bottom Fence Collision
- Fence at bottom of Tutorial Garden needs collision refinement

### 🟢 Low Priority / Polish

- da Bussy sprite orientation vs entrance position
- Add more camping props outside tents
- Add psychedelic decorations to bus interior
- Z-ordering for tree tops (player should go behind)
- Refine oak tree sprites

---

## 📊 Current Status

### ✅ Working Systems (February 2, 2026)
- BANDANIEL sprite (all directions with walk animation)
- da Bussy sprite (quest giver, multi-tile) with enterable interior
- Tutorial Garden map (150×40 tiles) with pond, fences, trees, flowers
- Two tent interiors (red ELEKTRA's tent, blue STRAWBERTO's tent)
- da Bussy interior (16×10 horizontal bus, psychedelic mobile home)
- Tent & bus entry/exit transitions (automatic, position-locked, camera-snapped)
- Key-based bus entry system (requires collecting da Bussy's keys)
- Camping props in tent #1 (8 items with collision)
- Camping props in tent #2 (6 items, no collision yet)
- Bus interior props (steering wheel, backpack, cooler)
- Item collection (required/optional) with 2-item carry limit (two hands)
- Inventory system with SNES-styled close button
- **Left/Right hand system with pixel art rendering** ✅
- **Dropped items system (Q/E/X keys to drop, auto-pickup on walk-over)** ✅
- **Storage system in da Bussy interior (5 item capacity, backpack at 77,52)** ✅
- **Context-aware multi-line NPC dialogue** ✅
- **Facing-based interaction detection (works from all 4 sides)** ✅
- SPACE key interaction system (props, storage, NPCs)
- Smooth camera (30 FPS optimized)
- Forest background (cached parallax scrolling)
- Y-sorted rendering (props, NPCs, player depth sorting)
- Comprehensive collision detection (tiles, props, NPCs, tent/bus walls)
- Complete SNES-style UI system with authentic aesthetics

### ⚠️ Known Issues (In Progress - February 2, 2026)
1. **🐛 Item Drop Bug** - Keys disappear when dropped via X/E keys
   - **Root Cause:** `addWorldItem()` receives `item.type` object instead of `item.type.id` string
   - **Error:** `⚠️ Item definition not found for: {id: 'bussy_keys', name: "da Bussy's Keys", ...}`
   - **Fix Required:** Update `input-handler-additions.js` lines 116 & 194
   - **Change:** `addWorldItem(item.type, ...)` → `addWorldItem(item.type.id, ..., currentMap)`
   - **Status:** Fixed version provided (input-handler-additions-FIXED.js)

2. **🎮 Steering Wheel Interaction** - Not yet working
   - **Root Cause:** Using `interactions.js v6.1` instead of `v9`
   - **Missing Feature:** No steering wheel priority check in `checkPropInteraction()`
   - **Fix Required:** Replace `js/ui/interactions.js` with v9 version
   - **What v9 adds:** Steering wheel check as PRIORITY 1, before storage/other props
   - **Status:** Fixed version provided (interactions-v9.js)

3. **📢 Interact Prompt** - Shows "Press SPACE to pick up" for auto-pickup items
   - **Root Cause:** `updateInteractPrompt()` in v6.1 still checks regular items
   - **Fix Required:** Upgrade to interactions.js v9 (same file as issue #2)
   - **Status:** Fixed in v9 version

### 🔧 Next Steps (Priority Order)

#### ⚡ Critical Fixes (Must Complete First)
1. **Fix item drop bug** - Replace input-handler-additions.js with FIXED version
2. **Enable steering wheel** - Replace interactions.js with v9 version  
3. **Test complete quest flow:**
   - Collect keys → Drop keys (X/E) → Pick up dropped keys → Enter bus
   - Walk to steering wheel → Press SPACE → Keys given to da Bussy ✅

#### Immediate (After Critical Fixes)
4. **Fix tent entrance Z-ordering bug** - Split tent rendering or adjust sorting
5. **Fix prop collision system** - Enable collision for all camping props

#### Short Term (This Month)
4. Add psychedelic decorations to bus interior
5. Polish oak tree sprites
6. Add more camping props outside tents
7. Refine bottom fence collision
8. Implement Z-ordering for tree tops

#### Long Term (Future Phases)
9. Create Level 2 (new location accessed via da Bussy)
10. Add more NPCs and quest items
11. Implement level selection via steering wheel
12. Add synthwave background music
13. Create story cutscenes

---

## 🛠️ Recent Changes

### February 3, 2026 - Animated Campfire & Prop System Reorganization ✅

#### Animated Campfire Implementation
1. ✅ Added animated campfire with 12-frame flickering animation:
   - Flickering flames with 3 layers (red, orange, yellow) + white-hot core
   - Pulsing embers with variable brightness
   - Rising smoke with fade-out effect
   - Pulsing ground glow for ambient lighting
   - Animation frame counter in `tiles.js` (alongside water animation)
   - Updated every 3 frames for fast, realistic flickering

2. ✅ Technical implementation:
   - `campfire.js` - Complete SNES-style pixelated campfire drawing function
   - `tiles.js` - Animation variables (`campfireAnimFrame`, `campfireAnimCounter`)
   - `game.js` - Animation update logic in main game loop
   - `renderer.js` - Passes `campfireAnimFrame` to `drawCampfire()`
   - Positioned outside ELEKTRA's tent at (22, 52)

#### Prop System Reorganization
3. ✅ Reorganized prop data files for better maintainability:
   - Split monolithic `prop-positions.js` (647 lines) into 3 focused files:
     - `large-props.js` - Multi-tile structures (trees, tents, buses, walls, port-o-potties)
     - `small-props.js` - Single-tile decorative props (camping items, furniture)
     - `props-registry.js` - Merges all sources, provides helper functions
   
4. ✅ Unified collision system:
   - Single `generatePropCollisionTiles()` function handles both:
     - Multi-tile props with `solidTiles[]` array (complex collision)
     - Single-tile props with `solidTiles: [{dx: 0, dy: 0}]` (simple collision)
   - Eliminated duplicate code and separate camping prop collision function
   - Standardized all props to use `solidTiles` format

5. ✅ Improved helper functions:
   - Single unified `getPropsForMap()` using spread operator (`...prop`)
   - Automatically passes ALL properties (future-proof)
   - Added optional utility functions: `getPropsByType()`, `getInteractableProps()`, `getCollidableProps()`
   - Backwards compatibility maintained with deprecated function wrappers

6. ✅ Benefits of reorganization:
   - Clear separation by prop type/size
   - Easy to find and add new props
   - Scalable structure for future expansion
   - Better code maintainability
   - No more confusion about "TENT_CAMPING_ITEMS" naming

#### Script Loading Fix
7. ✅ Fixed game initialization sequence:
   - Updated `main.js` to properly wait for all scripts to load
   - Uses both `DOMContentLoaded` and `window.load` events
   - Better error logging for debugging
   - Prevents "gameLoop is not defined" errors
   - Ensures campfire/water animations are available at game start

**Status:** Campfire flickering beautifully! Prop system clean and organized. Game initialization reliable.

### February 2, 2026 - Consolidated Sidebar UI Redesign ✅

#### New HUD System
1. ✅ Replaced old HUD elements with consolidated right-side sidebar:
   - Removed: Item counter, health bar (old style), inventory button
   - Added: Unified sidebar with hands panel and health face panel

2. ✅ Hands Panel - Compact inventory display:
   - Two side-by-side 60×80px slots (left hand, right hand)
   - Item sprites rendered at 1.3x scale for clarity
   - Colored borders: Gold (#FFD700) for required items, Cyan (#00D4FF) for optional
   - Item names displayed below sprites (can wrap to 2 lines)
   - Labels positioned below item border boxes for clean separation

3. ✅ Health Face Panel - Duke Nukem-style visual health:
   - BANDANIEL face (banana with sunglasses and cigarette)
   - Progressive bruising based on health percentage:
     - 100-80%: Pristine golden banana
     - 80-60%: Light bruising appears
     - 60-40%: Multiple brown bruises
     - 40-20%: Heavy dark bruising
     - 20-0%: Critical - cracked sunglasses, cigarette droops, ember goes out
   - Health number below face (e.g., "75 / 100")
   - Updates every 10 frames for performance

4. ✅ Technical Implementation:
   - `css/ui/sidebar.css` - SNES-style panel styling with multi-layer borders
   - `js/ui/sidebar.js` - Rendering system with canvas-based sprites
   - Slot dimensions: 60px wide × 80px tall (allows room for labels)
   - Item wrapper: 52×52px with rounded corners for borders
   - Canvas positioning: Centered at top 50% of slot
   - Label positioning: Below wrapper at top 60px
   - 12px gap between panels for shadow visibility

5. ✅ Backwards Compatibility:
   - Old HUD elements hidden but functional (can be removed later)
   - Legacy function redirects (initializeItemCounter → initializeSidebar)
   - updateSidebarHealth() calls updateHealthFace()

**Status:** Sidebar functional with proper item/label separation. Border colors working (gold/cyan).

### February 4, 2026 - Black Void Rendering Fix ✅

#### Fixed grey void in tent/bus interiors
1. ✅ Added explicit rendering for tile 9 (black void) in renderer.js
2. ✅ Tent and bus interior maps now display pure black (#000000) void instead of grey background
3. ✅ Issue: Tile 9 was defined in maps but had no rendering code, causing canvas to show grey background
4. ✅ Solution: Added tile 9 check before other tile rendering to fill with black

**Technical details:**
- Tent interiors use tile 9 for areas outside the tent floor
- Previously unrendered tiles showed the cached Florida forest background color
- Now explicitly renders black void before checking other tile types

### February 2, 2026 - Dropped Items System ✅

#### World Item Drop & Pickup System
1. ✅ Implemented dropped items system:
   - Items dropped on ground persist on map
   - Visual rendering with item sprites (no labels)
   - Automatic pickup when walking over dropped items
   
2. ✅ Quick-drop with X key:
   - Press X to drop first item in inventory
   - Items drop 2 tiles ahead based on facing direction
   - Prevents accidental immediate re-pickup (0.8 tile pickup range)
   - Cannot drop required quest items

3. ✅ Fixed auto-pickup collision detection:
   - Dropped items added to `handleCollisions()` in game.js
   - Same automatic pickup as regular items
   - Shows item notification on pickup
   - Respects 2-item carry limit

4. ✅ Technical implementation:
   - `world-items.js` - manages WORLD_ITEMS array by map
   - `inventory.js` - dropItem() function with facing direction
   - `game.js` - handleCollisions() checks world items each frame
   - `input.js` - simplified (no world item handling on SPACE)

**Known Issue:** Occasionally re-pickup when facing right (investigating drop position calculation)

### February 2, 2026 - File Reorganization & Interaction Fixes ✅

#### File Structure Split
1. ✅ Split `data.js` (987 lines) into 5 focused files:
   - `items-data.js` (145 lines) - Items, inventory system
   - `npcs-data.js` (80 lines) - NPC definitions
   - `furniture.js` (60 lines) - Prototype furniture (not in use)
   - `coins.js` (50 lines) - Coin system (not in use)

2. ✅ Further reorganized props (Feb 3, 2026):
   - Split `prop-positions.js` (647 lines) into 3 files:
   - `large-props.js` - Multi-tile structures
   - `small-props.js` - Single-tile decorative props
   - `props-registry.js` - Unified prop system

3. ✅ Updated `getPropsForMap()` to pass interaction properties:
   - `interact` flag
   - `storageItem` flag
   - `interactMessage` text
   - `key` identifier

#### Interaction System Improvements
3. ✅ Fixed storage interaction detection:
   - Changed from distance-based (`dx <= 1 && dy <= 1`) to facing-based
   - Now calculates exact tile player is facing
   - Works from all 4 directions (left, right, top, bottom)
   - Added detailed console logging for debugging

4. ✅ Updated `interactions.js` (v4):
   - Checks `facingX = player.x + player.facingX`
   - Checks `facingY = player.y + player.facingY`
   - Matches against prop position
   - Handles multi-tile props correctly

#### NPC Dialogue Improvements
5. ✅ Moved da Bussy special dialogue to NPC data:
   - Added `dialogueWithKeys` property in `npcs-data.js`
   - Supports both single string and array formats
   - Multi-line dialogue advances on SPACE press
   - Better code organization (dialogue lives with NPC data)

6. ✅ Updated `dialogue.js`:
   - Reads `dialogueWithKeys` from NPC data
   - Handles array format for multi-line special dialogue
   - Backwards compatible with single string format

### February 1, 2026 - Storage System Implementation ✅

1. ✅ Implemented item storage system in da Bussy interior
2. ✅ Added backpack prop (77, 52) in bus as storage container
3. ✅ Storage UI with two-column layout (inventory | stored items)
4. ✅ Can store optional items (required items protected)
5. ✅ 5-item storage capacity with visual counter
6. ✅ Fixed `dialogue.js` to check for storage props before NPCs
7. ✅ Fixed game pause/unpause when opening/closing storage
8. ✅ SPACE key interaction system working with props and NPCs
9. ✅ Storage persists in STORAGE_DATA object
10. ✅ Full error handling and comprehensive logging

### February 5, 2026 - Bussy Config System & Bus Interior Walls ✅

#### Centralized Bus Configuration
1. ✅ Created `bussy-config.js` - centralized configuration system:
   - Exterior dimensions and position (12×4 tiles at 26, 1)
   - Interior dimensions and position (24×10 tiles at 63, 51)
   - Door configurations for both exterior and interior
   - Spawn points for entering/exiting
   - Interaction points for player interaction
   - Steering wheel position

2. ✅ Updated files to use BUSSY_CONFIG:
   - `transitions.js` - Uses config for spawn points
   - `large-props.js` - Uses config for exterior, interior walls, steering wheel
   - `npcs-data.js` - Uses config for da Bussy NPC position

3. ✅ Benefits:
   - Single source of truth for all bus positioning
   - Matches tent-configs.js pattern for consistency
   - Easy to update positions in one location
   - Clear, maintainable codebase

#### Bus Interior Wall Rendering
1. ✅ Implemented SNES-style bus interior walls:
   - Vintage school bus aesthetic (yellow/orange #f9a825)
   - Position-aware rendering (different details per wall)
   - Metal trim and industrial rivets
   - Panel details and depth shadows

2. ✅ Wall types:
   - **Top wall (ceiling):** Horizontal panels with metal trim, rivets every 3 tiles
   - **Bottom wall:** Metal baseboard, vertical panels, automatic door rendering
   - **Left wall (exit side):** Metal edge strips with highlights, rivets
   - **Right wall (driver area):** Detailed paneling with shadows

3. ✅ Exit door rendering:
   - Blue-gray folding door aesthetic
   - Vertical seam (folding effect)
   - Glass window in upper half
   - Yellow handle
   - Metal frame with highlights

4. ✅ Technical implementation:
   - `bus-interior-walls.js` - All wall drawing functions
   - `renderer.js` - Calls drawBusInteriorWall() for bussyInterior map
   - Uses BUSSY_CONFIG for position calculations
   - Matches SNES aesthetic of tent walls

### February 5, 2026 - Port-o-Potty Collision Fix ✅

#### Fixed Port-o-Potty Collision Boundaries
1. ✅ Issue: Port-o-potty collision was offset in y-direction
   - Visual sprite scaled 1.5x but collision wasn't adjusted
   - Collision started at top of sprite instead of at the solid base
   - Players could walk through the door/body section

2. ✅ Solution: 
   - Updated `getPortOPottyCollision()` in port-o-potty.js
   - Changed from 2×3 footprint (top, middle, bottom) to 2×2 footprint (middle, bottom only)
   - Collision now at tileY+1 and tileY+2 instead of tileY, tileY+1, tileY+2
   - Top/roof section now walkable (players can walk behind it)

3. ✅ Updated small-props.js:
   - Removed `collidable: true` flag
   - Added proper `solidTiles` arrays with y-offset
   - Fixed overlapping port-o-potty positions (spaced them apart)
   - All 5 port-o-potties now have correct collision

4. ✅ Result:
   - Collision properly aligned with visual sprite base
   - Players blocked by door/body section
   - Players can walk behind top/roof section
   - Matches visual appearance

### February 6, 2026 - Crinkly Tent Floor Texture ✅

#### Enhanced Tent Interior Visuals
1. ✅ Created `drawCrinklyTentFloor()` function in tiles.js:
   - Replaces plain grey floor (#5a5a5a) in tent interiors
   - Simulates fabric/tarp texture with wrinkles and folds
   - Horizontal crinkle lines (3-5 per tile) for fabric folds
   - Vertical crinkle lines (2-3 per tile) for cross-hatching
   - Dark spots for dirt, wear, and shadows in folds
   - Light highlights on smooth areas
   - Consistent procedural patterns based on tile position

2. ✅ Updated renderer.js:
   - Checks if currentMap is a tent interior
   - Applies crinkly texture to TILES.FLOOR in tent interiors only
   - Keeps plain grey floor for other interior areas (like bus)

3. ✅ Visual improvements:
   - Tent floors now have realistic camping tarp appearance
   - Adds depth and texture to tent interiors
   - Maintains SNES-style pixelated aesthetic
   - Consistent with other tent theming (red/blue walls)

---

## 🚨 For AI Assistant Context

### Quick Summary
- **Game:** Top-down 2D adventure RPG with SNES aesthetic
- **Engine:** Vanilla JS + HTML5 Canvas (30 FPS)
- **Current Focus:** Tutorial Garden (Level 1) with tent & bus interiors
- **Recent Updates:** Crinkly tent floor texture (Feb 6, 2026), Port-o-potty collision fix, bussy-config.js system, bus interior walls
- **Tech Stack:** No frameworks, no build tools, pure vanilla

### Development Notes
- Y-sorting implemented in renderer.js (line ~258)
- Interaction system uses facing-based detection (not distance)
- NPC dialogue supports multi-line arrays with context awareness
- Storage system fully functional with 5-item capacity
- **Dropped items system: X key drops 2 tiles ahead, auto-pickup on collision** ✅
- **Animated campfire: 12-frame cycle, updates every 3 frames** ✅
- **Animation variables in tiles.js: waterAnimFrame, campfireAnimFrame** ✅
- 2-item inventory carry limit + 5-item storage = 7 total slots
- Files not in use: furniture.js, coins.js, enemies.js, shop.js, theme/studio/

### File Organization
- **Prop files reorganized (Feb 3, 2026):**
  - `large-props.js` - Multi-tile structures (trees, tents, buses, walls) - uses BUSSY_CONFIG
  - `small-props.js` - Single-tile props (camping items, furniture, port-o-potties)
  - `props-registry.js` - Unified system with helper functions
- **Config files:**
  - `tent-configs.js` - Centralized tent configuration
  - `bussy-config.js` - Centralized bus configuration (NEW Feb 5, 2026)
- **Rendering files:**
  - `bus-interior-walls.js` - SNES-style bus wall rendering (NEW Feb 5, 2026)
  - `port-o-potty.js` - Port-o-potty rendering with fixed collision (UPDATED Feb 5, 2026)
  - `tiles.js` - Includes drawCrinklyTentFloor() for tent floor textures (UPDATED Feb 6, 2026)
- **Animation in tiles.js:** Water and campfire animation variables
- **Main initialization:** main.js waits for all scripts with window.load

### Code Style
- SNES-style 16px tiles (no sub-pixel rendering)
- 30 FPS frame limiter
- Cached parallax background
- Y-sorted entity rendering
- Position locking on transitions
- No smooth CSS transitions (instant state changes)

---

**Last Updated:** February 6, 2026
**Version:** Phase 9 - Crinkly Tent Floor Texture Complete
**Next Milestone:** Add more props to Tutorial Garden, implement level selection system in da Bussy

---

🍌 *BANDANIEL is just trying to get home...* 🚌✨
