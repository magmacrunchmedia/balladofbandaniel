// sprites.js - Main sprite coordinator/router
// Delegates to specific sprite files

function drawSprite(type, x, y, direction, frame, gameFrame) {
    switch(type) {
        case 'bandaniel':
            drawBandaniel(x, y, direction, frame);
            break;
        case 'bussy':
            drawBussy(x, y, direction, frame);
            break;
        // NEW CHARACTERS - ADD THESE:
        case 'strawberto':
            drawStrawberto(ctx, x, y, direction, frame, false); // Change to true for monocle
            break;
        case 'carl':
            drawCarl(ctx, x, y, direction, frame, gameFrame || 0);
            break;
        case 'plantain-jane':
            drawPlantainJane(ctx, x, y, direction, frame);
            break;
        case 'elektra':
            drawElektra(ctx, x, y, direction, frame);
            break;
        case 'kim':
            drawKim(ctx, x, y, direction, frame);
            break;            
        default:
        case 'chuck-cherry':
            drawChuckCherry(ctx, x, y, direction, frame);
            break;
            // Fallback
            ctx.fillStyle = '#ff00ff';
            ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE);
    }
}