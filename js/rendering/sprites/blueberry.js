// js/rendering/sprites/blueberry.js
// BERRY - A friendly blueberry festival-goer

function drawBlueberry(ctx, x, y, direction, frame) {
    const centerX = x;
    const centerY = y;
    const bobOffset = frame === 1 ? 1 : 0;

    const colors = {
        bodyMain: '#5c6bc0',
        bodyDark: '#3949ab',
        bodyHighlight: '#7986cb',
        bodyDeep: '#283593',
        leaf: '#43a047',
        leafLight: '#66bb6a',
        eyes: '#1a1a1a',
        mouth: '#c62828',
        feet: '#3e2723',
    };

    ctx.save();

    if (direction === 'down') {
        // Berry cluster (3 circles)
        ctx.fillStyle = colors.bodyMain;
        ctx.beginPath();
        ctx.arc(centerX, centerY - 2 + bobOffset, 8, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(centerX - 5, centerY + 3 + bobOffset, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(centerX + 5, centerY + 3 + bobOffset, 5, 0, Math.PI * 2);
        ctx.fill();

        // Dark shading on bottom berries
        ctx.fillStyle = colors.bodyDark;
        ctx.beginPath();
        ctx.arc(centerX - 5, centerY + 5 + bobOffset, 4, 0, Math.PI);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(centerX + 5, centerY + 5 + bobOffset, 4, 0, Math.PI);
        ctx.fill();

        // Highlight
        ctx.fillStyle = colors.bodyHighlight;
        ctx.beginPath();
        ctx.arc(centerX - 2, centerY - 5 + bobOffset, 3, 0, Math.PI * 2);
        ctx.fill();

        // Leaf
        ctx.fillStyle = colors.leaf;
        ctx.beginPath();
        ctx.ellipse(centerX, centerY - 10 + bobOffset, 4, 2, -0.3, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = colors.leafLight;
        ctx.beginPath();
        ctx.ellipse(centerX + 2, centerY - 11 + bobOffset, 3, 1.5, 0.3, 0, Math.PI * 2);
        ctx.fill();

        // Stem
        ctx.fillStyle = colors.leaf;
        ctx.fillRect(centerX - 1, centerY - 12 + bobOffset, 2, 3);

        // Eyes
        ctx.fillStyle = colors.eyes;
        ctx.fillRect(centerX - 3, centerY - 3 + bobOffset, 2, 2);
        ctx.fillRect(centerX + 1, centerY - 3 + bobOffset, 2, 2);

        // Smile
        ctx.fillStyle = colors.mouth;
        ctx.fillRect(centerX - 2, centerY + 1 + bobOffset, 4, 1);

        // Feet
        ctx.fillStyle = colors.feet;
        ctx.fillRect(centerX - 4, centerY + 9 + bobOffset, 3, 2);
        ctx.fillRect(centerX + 1, centerY + 9 + bobOffset, 3, 2);

    } else if (direction === 'up') {
        // Berry cluster (back)
        ctx.fillStyle = colors.bodyDark;
        ctx.beginPath();
        ctx.arc(centerX, centerY - 2 + bobOffset, 8, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(centerX - 5, centerY + 3 + bobOffset, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(centerX + 5, centerY + 3 + bobOffset, 5, 0, Math.PI * 2);
        ctx.fill();

        // Leaf
        ctx.fillStyle = colors.leaf;
        ctx.beginPath();
        ctx.ellipse(centerX, centerY - 10 + bobOffset, 4, 2, -0.3, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillRect(centerX - 1, centerY - 12 + bobOffset, 2, 3);

        // Feet
        ctx.fillStyle = colors.feet;
        ctx.fillRect(centerX - 4, centerY + 9 + bobOffset, 3, 2);
        ctx.fillRect(centerX + 1, centerY + 9 + bobOffset, 3, 2);

    } else if (direction === 'left') {
        // Berry cluster (side)
        ctx.fillStyle = colors.bodyMain;
        ctx.beginPath();
        ctx.arc(centerX - 2, centerY - 2 + bobOffset, 8, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(centerX - 6, centerY + 3 + bobOffset, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(centerX + 2, centerY + 3 + bobOffset, 5, 0, Math.PI * 2);
        ctx.fill();

        // Dark shading
        ctx.fillStyle = colors.bodyDark;
        ctx.beginPath();
        ctx.arc(centerX - 6, centerY + 5 + bobOffset, 4, 0, Math.PI);
        ctx.fill();

        // Leaf
        ctx.fillStyle = colors.leaf;
        ctx.beginPath();
        ctx.ellipse(centerX - 2, centerY - 10 + bobOffset, 4, 2, -0.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillRect(centerX - 3, centerY - 12 + bobOffset, 2, 3);

        // Eye
        ctx.fillStyle = colors.eyes;
        ctx.fillRect(centerX - 5, centerY - 3 + bobOffset, 2, 2);

        // Feet
        ctx.fillStyle = colors.feet;
        ctx.fillRect(centerX - 5, centerY + 9 + bobOffset, 3, 2);
        ctx.fillRect(centerX + 0, centerY + 9 + bobOffset, 3, 2);

    } else if (direction === 'right') {
        // Berry cluster (side)
        ctx.fillStyle = colors.bodyMain;
        ctx.beginPath();
        ctx.arc(centerX + 2, centerY - 2 + bobOffset, 8, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(centerX - 2, centerY + 3 + bobOffset, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(centerX + 6, centerY + 3 + bobOffset, 5, 0, Math.PI * 2);
        ctx.fill();

        // Dark shading
        ctx.fillStyle = colors.bodyDark;
        ctx.beginPath();
        ctx.arc(centerX + 6, centerY + 5 + bobOffset, 4, 0, Math.PI);
        ctx.fill();

        // Leaf
        ctx.fillStyle = colors.leaf;
        ctx.beginPath();
        ctx.ellipse(centerX + 2, centerY - 10 + bobOffset, 4, 2, 0.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillRect(centerX + 1, centerY - 12 + bobOffset, 2, 3);

        // Eye
        ctx.fillStyle = colors.eyes;
        ctx.fillRect(centerX + 3, centerY - 3 + bobOffset, 2, 2);

        // Feet
        ctx.fillStyle = colors.feet;
        ctx.fillRect(centerX - 3, centerY + 9 + bobOffset, 3, 2);
        ctx.fillRect(centerX + 2, centerY + 9 + bobOffset, 3, 2);
    }

    ctx.restore();
}
