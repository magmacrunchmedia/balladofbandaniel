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
            const hasMonocle = typeof STRAWBERTO_QUEST !== 'undefined' && STRAWBERTO_QUEST.monocleReturned;
            drawStrawberto(ctx, x, y, direction, frame, hasMonocle);
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
        case 'coffee-guy':
            drawCoffeeGuy(ctx, x, y, direction, frame);
            break;
        case 'blueberry':
            drawBlueberry(ctx, x, y, direction, frame);
            break;
        case 'grape':
            drawGrape(ctx, x, y, direction, frame);
            break;
            // Fallback
            ctx.fillStyle = '#ff00ff';
            ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE);
    }
}