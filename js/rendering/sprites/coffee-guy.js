// js/rendering/sprites/coffee-guy.js
// COFFEE GUY - Festival barista with apron and bandana

function drawCoffeeGuy(ctx, x, y, direction, frame) {
    const centerX = x;
    const centerY = y;
    const bobOffset = frame === 1 ? 1 : 0;

    const colors = {
        skin: '#f5c6a0',
        skinShadow: '#d4a574',
        hair: '#4e342e',
        apron: '#ffffff',
        apronShadow: '#e0e0e0',
        bandana: '#d32f2f',
        bandanaLight: '#ef5350',
        eyes: '#1a1a1a',
        mouth: '#c62828',
        pants: '#37474f',
        shoes: '#3e2723',
    };

    ctx.save();

    if (direction === 'down') {
        // Head
        ctx.fillStyle = colors.skin;
        ctx.beginPath();
        ctx.arc(centerX, centerY - 4 + bobOffset, 7, 0, Math.PI * 2);
        ctx.fill();

        // Bandana
        ctx.fillStyle = colors.bandana;
        ctx.fillRect(centerX - 7, centerY - 10 + bobOffset, 14, 4);
        ctx.fillStyle = colors.bandanaLight;
        ctx.fillRect(centerX - 7, centerY - 10 + bobOffset, 14, 1);
        // Bandana knot (back)
        ctx.fillStyle = colors.bandana;
        ctx.fillRect(centerX - 8, centerY - 9 + bobOffset, 2, 3);
        ctx.fillRect(centerX + 6, centerY - 9 + bobOffset, 2, 3);

        // Eyes
        ctx.fillStyle = colors.eyes;
        ctx.fillRect(centerX - 3, centerY - 5 + bobOffset, 2, 2);
        ctx.fillRect(centerX + 1, centerY - 5 + bobOffset, 2, 2);

        // Smile
        ctx.fillStyle = colors.mouth;
        ctx.fillRect(centerX - 2, centerY - 2 + bobOffset, 4, 1);

        // Body (apron)
        ctx.fillStyle = colors.apron;
        ctx.fillRect(centerX - 5, centerY + 3 + bobOffset, 10, 8);
        ctx.fillStyle = colors.apronShadow;
        ctx.fillRect(centerX - 5, centerY + 3 + bobOffset, 10, 1);

        // Apron pocket
        ctx.fillStyle = colors.apronShadow;
        ctx.fillRect(centerX - 3, centerY + 7 + bobOffset, 6, 3);
        ctx.fillStyle = colors.apron;
        ctx.fillRect(centerX - 2, centerY + 7 + bobOffset, 4, 1);

        // Arms
        ctx.fillStyle = colors.skin;
        ctx.fillRect(centerX - 7, centerY + 4 + bobOffset, 2, 4);
        ctx.fillRect(centerX + 5, centerY + 4 + bobOffset, 2, 4);

        // Pants
        ctx.fillStyle = colors.pants;
        ctx.fillRect(centerX - 4, centerY + 11 + bobOffset, 3, 3);
        ctx.fillRect(centerX + 1, centerY + 11 + bobOffset, 3, 3);

        // Shoes
        ctx.fillStyle = colors.shoes;
        ctx.fillRect(centerX - 5, centerY + 14 + bobOffset, 4, 2);
        ctx.fillRect(centerX + 1, centerY + 14 + bobOffset, 4, 2);

    } else if (direction === 'up') {
        // Head (back)
        ctx.fillStyle = colors.hair;
        ctx.beginPath();
        ctx.arc(centerX, centerY - 4 + bobOffset, 7, 0, Math.PI * 2);
        ctx.fill();

        // Bandana (back)
        ctx.fillStyle = colors.bandana;
        ctx.fillRect(centerX - 7, centerY - 10 + bobOffset, 14, 4);

        // Body
        ctx.fillStyle = colors.apron;
        ctx.fillRect(centerX - 5, centerY + 3 + bobOffset, 10, 8);

        // Arms
        ctx.fillStyle = colors.skin;
        ctx.fillRect(centerX - 7, centerY + 4 + bobOffset, 2, 4);
        ctx.fillRect(centerX + 5, centerY + 4 + bobOffset, 2, 4);

        // Pants
        ctx.fillStyle = colors.pants;
        ctx.fillRect(centerX - 4, centerY + 11 + bobOffset, 3, 3);
        ctx.fillRect(centerX + 1, centerY + 11 + bobOffset, 3, 3);

        // Shoes
        ctx.fillStyle = colors.shoes;
        ctx.fillRect(centerX - 5, centerY + 14 + bobOffset, 4, 2);
        ctx.fillRect(centerX + 1, centerY + 14 + bobOffset, 4, 2);

    } else if (direction === 'left') {
        // Head
        ctx.fillStyle = colors.skin;
        ctx.beginPath();
        ctx.arc(centerX, centerY - 4 + bobOffset, 7, 0, Math.PI * 2);
        ctx.fill();

        // Bandana
        ctx.fillStyle = colors.bandana;
        ctx.fillRect(centerX - 7, centerY - 10 + bobOffset, 14, 4);
        ctx.fillStyle = colors.bandanaLight;
        ctx.fillRect(centerX - 7, centerY - 10 + bobOffset, 14, 1);
        ctx.fillStyle = colors.bandana;
        ctx.fillRect(centerX + 5, centerY - 9 + bobOffset, 3, 3);

        // Eye (side)
        ctx.fillStyle = colors.eyes;
        ctx.fillRect(centerX - 4, centerY - 5 + bobOffset, 2, 2);

        // Body (apron)
        ctx.fillStyle = colors.apron;
        ctx.fillRect(centerX - 4, centerY + 3 + bobOffset, 9, 8);
        ctx.fillStyle = colors.apronShadow;
        ctx.fillRect(centerX - 4, centerY + 3 + bobOffset, 9, 1);

        // Arm
        ctx.fillStyle = colors.skin;
        ctx.fillRect(centerX - 6, centerY + 4 + bobOffset, 2, 4);

        // Pants
        ctx.fillStyle = colors.pants;
        ctx.fillRect(centerX - 3, centerY + 11 + bobOffset, 3, 3);
        ctx.fillRect(centerX + 1, centerY + 11 + bobOffset, 3, 3);

        // Shoes
        ctx.fillStyle = colors.shoes;
        ctx.fillRect(centerX - 4, centerY + 14 + bobOffset, 4, 2);
        ctx.fillRect(centerX + 1, centerY + 14 + bobOffset, 4, 2);

    } else if (direction === 'right') {
        // Head
        ctx.fillStyle = colors.skin;
        ctx.beginPath();
        ctx.arc(centerX, centerY - 4 + bobOffset, 7, 0, Math.PI * 2);
        ctx.fill();

        // Bandana
        ctx.fillStyle = colors.bandana;
        ctx.fillRect(centerX - 7, centerY - 10 + bobOffset, 14, 4);
        ctx.fillStyle = colors.bandanaLight;
        ctx.fillRect(centerX - 7, centerY - 10 + bobOffset, 14, 1);
        ctx.fillStyle = colors.bandana;
        ctx.fillRect(centerX - 8, centerY - 9 + bobOffset, 3, 3);

        // Eye (side)
        ctx.fillStyle = colors.eyes;
        ctx.fillRect(centerX + 2, centerY - 5 + bobOffset, 2, 2);

        // Body (apron)
        ctx.fillStyle = colors.apron;
        ctx.fillRect(centerX - 5, centerY + 3 + bobOffset, 9, 8);
        ctx.fillStyle = colors.apronShadow;
        ctx.fillRect(centerX - 5, centerY + 3 + bobOffset, 9, 1);

        // Arm
        ctx.fillStyle = colors.skin;
        ctx.fillRect(centerX + 4, centerY + 4 + bobOffset, 2, 4);

        // Pants
        ctx.fillStyle = colors.pants;
        ctx.fillRect(centerX - 4, centerY + 11 + bobOffset, 3, 3);
        ctx.fillRect(centerX, centerY + 11 + bobOffset, 3, 3);

        // Shoes
        ctx.fillStyle = colors.shoes;
        ctx.fillRect(centerX - 5, centerY + 14 + bobOffset, 4, 2);
        ctx.fillRect(centerX, centerY + 14 + bobOffset, 4, 2);
    }

    ctx.restore();
}
