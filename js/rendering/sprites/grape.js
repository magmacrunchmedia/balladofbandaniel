// js/rendering/sprites/grape.js
// GRAPE GARY - A chill grape festival-goer

function drawGrape(ctx, x, y, direction, frame) {
    const centerX = x;
    const centerY = y;
    const bobOffset = frame === 1 ? 1 : 0;

    const colors = {
        bodyMain: '#7b1fa2',
        bodyDark: '#4a148c',
        bodyLight: '#ab47bc',
        bodyHighlight: '#ce93d8',
        vine: '#43a047',
        vineLight: '#66bb6a',
        eyes: '#1a1a1a',
        mouth: '#c62828',
        feet: '#3e2723',
    };

    ctx.save();

    if (direction === 'down') {
        // Grape cluster (row of 3 on top, 2 on bottom, 1 center)
        // Top row
        ctx.fillStyle = colors.bodyMain;
        ctx.beginPath();
        ctx.arc(centerX - 5, centerY - 6 + bobOffset, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(centerX, centerY - 7 + bobOffset, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(centerX + 5, centerY - 6 + bobOffset, 5, 0, Math.PI * 2);
        ctx.fill();

        // Middle row
        ctx.beginPath();
        ctx.arc(centerX - 3, centerY - 1 + bobOffset, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(centerX + 3, centerY - 1 + bobOffset, 5, 0, Math.PI * 2);
        ctx.fill();

        // Bottom single
        ctx.beginPath();
        ctx.arc(centerX, centerY + 4 + bobOffset, 5, 0, Math.PI * 2);
        ctx.fill();

        // Dark shading on bottom grapes
        ctx.fillStyle = colors.bodyDark;
        ctx.beginPath();
        ctx.arc(centerX - 3, centerY + 1 + bobOffset, 4, 0, Math.PI);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(centerX + 3, centerY + 1 + bobOffset, 4, 0, Math.PI);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(centerX, centerY + 6 + bobOffset, 4, 0, Math.PI);
        ctx.fill();

        // Highlights
        ctx.fillStyle = colors.bodyLight;
        ctx.beginPath();
        ctx.arc(centerX - 2, centerY - 8 + bobOffset, 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = colors.bodyHighlight;
        ctx.beginPath();
        ctx.arc(centerX + 1, centerY - 9 + bobOffset, 1.5, 0, Math.PI * 2);
        ctx.fill();

        // Vine stem
        ctx.fillStyle = colors.vine;
        ctx.fillRect(centerX - 1, centerY - 14 + bobOffset, 2, 4);

        // Vine leaf
        ctx.fillStyle = colors.vine;
        ctx.beginPath();
        ctx.ellipse(centerX + 4, centerY - 13 + bobOffset, 5, 2.5, 0.4, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = colors.vineLight;
        ctx.beginPath();
        ctx.ellipse(centerX - 3, centerY - 12 + bobOffset, 3.5, 1.8, -0.3, 0, Math.PI * 2);
        ctx.fill();

        // Eyes (on the top-center grape)
        ctx.fillStyle = colors.eyes;
        ctx.fillRect(centerX - 3, centerY - 8 + bobOffset, 2, 2);
        ctx.fillRect(centerX + 1, centerY - 8 + bobOffset, 2, 2);

        // Smile
        ctx.fillStyle = colors.mouth;
        ctx.fillRect(centerX - 2, centerY - 4 + bobOffset, 4, 1);

        // Feet
        ctx.fillStyle = colors.feet;
        ctx.fillRect(centerX - 4, centerY + 10 + bobOffset, 3, 2);
        ctx.fillRect(centerX + 1, centerY + 10 + bobOffset, 3, 2);

    } else if (direction === 'up') {
        // Grape cluster (back)
        ctx.fillStyle = colors.bodyDark;
        ctx.beginPath();
        ctx.arc(centerX - 5, centerY - 6 + bobOffset, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(centerX, centerY - 7 + bobOffset, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(centerX + 5, centerY - 6 + bobOffset, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(centerX - 3, centerY - 1 + bobOffset, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(centerX + 3, centerY - 1 + bobOffset, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(centerX, centerY + 4 + bobOffset, 5, 0, Math.PI * 2);
        ctx.fill();

        // Vine
        ctx.fillStyle = colors.vine;
        ctx.fillRect(centerX - 1, centerY - 14 + bobOffset, 2, 4);
        ctx.beginPath();
        ctx.ellipse(centerX + 4, centerY - 13 + bobOffset, 5, 2.5, 0.4, 0, Math.PI * 2);
        ctx.fill();

        // Feet
        ctx.fillStyle = colors.feet;
        ctx.fillRect(centerX - 4, centerY + 10 + bobOffset, 3, 2);
        ctx.fillRect(centerX + 1, centerY + 10 + bobOffset, 3, 2);

    } else if (direction === 'left') {
        // Grape cluster (side view)
        ctx.fillStyle = colors.bodyMain;
        ctx.beginPath();
        ctx.arc(centerX - 4, centerY - 6 + bobOffset, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(centerX + 1, centerY - 5 + bobOffset, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(centerX - 2, centerY - 1 + bobOffset, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(centerX + 3, centerY + 0 + bobOffset, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(centerX, centerY + 4 + bobOffset, 5, 0, Math.PI * 2);
        ctx.fill();

        // Dark shading
        ctx.fillStyle = colors.bodyDark;
        ctx.beginPath();
        ctx.arc(centerX - 2, centerY + 1 + bobOffset, 4, 0, Math.PI);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(centerX, centerY + 6 + bobOffset, 4, 0, Math.PI);
        ctx.fill();

        // Vine
        ctx.fillStyle = colors.vine;
        ctx.fillRect(centerX - 2, centerY - 13 + bobOffset, 2, 4);
        ctx.beginPath();
        ctx.ellipse(centerX + 2, centerY - 12 + bobOffset, 4, 2, 0.3, 0, Math.PI * 2);
        ctx.fill();

        // Eye
        ctx.fillStyle = colors.eyes;
        ctx.fillRect(centerX - 6, centerY - 7 + bobOffset, 2, 2);

        // Feet
        ctx.fillStyle = colors.feet;
        ctx.fillRect(centerX - 4, centerY + 10 + bobOffset, 3, 2);
        ctx.fillRect(centerX + 1, centerY + 10 + bobOffset, 3, 2);

    } else if (direction === 'right') {
        // Grape cluster (side view)
        ctx.fillStyle = colors.bodyMain;
        ctx.beginPath();
        ctx.arc(centerX + 4, centerY - 6 + bobOffset, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(centerX - 1, centerY - 5 + bobOffset, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(centerX + 2, centerY - 1 + bobOffset, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(centerX - 3, centerY + 0 + bobOffset, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(centerX, centerY + 4 + bobOffset, 5, 0, Math.PI * 2);
        ctx.fill();

        // Dark shading
        ctx.fillStyle = colors.bodyDark;
        ctx.beginPath();
        ctx.arc(centerX + 2, centerY + 1 + bobOffset, 4, 0, Math.PI);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(centerX, centerY + 6 + bobOffset, 4, 0, Math.PI);
        ctx.fill();

        // Vine
        ctx.fillStyle = colors.vine;
        ctx.fillRect(centerX + 0, centerY - 13 + bobOffset, 2, 4);
        ctx.beginPath();
        ctx.ellipse(centerX - 2, centerY - 12 + bobOffset, 4, 2, -0.3, 0, Math.PI * 2);
        ctx.fill();

        // Eye
        ctx.fillStyle = colors.eyes;
        ctx.fillRect(centerX + 4, centerY - 7 + bobOffset, 2, 2);

        // Feet
        ctx.fillStyle = colors.feet;
        ctx.fillRect(centerX - 3, centerY + 10 + bobOffset, 3, 2);
        ctx.fillRect(centerX + 2, centerY + 10 + bobOffset, 3, 2);
    }

    ctx.restore();
}
