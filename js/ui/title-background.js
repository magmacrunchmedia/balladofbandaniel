// js/ui/title-background.js
// Complete shiny 80's disco fruit background for title screen

const TitleBackground = {
    canvas: null,
    ctx: null,
    staticBG: null,
    sparkles: [],
    time: 0,
    animationId: null,
    
    PALETTE: {
        deepBlue: '#0a0a28',
        darkPurple: '#1a1040',
        midPurple: '#2a1860',
        chrome1: '#4a4a90',
        chrome2: '#7070c0',
        chromeShine: '#d0d0ff',
        white: '#ffffff',
        bananaYellow: '#f1c40f',
        tropicalGreen: '#27ae60',
        palmGreen: '#2ecc71',
        sunsetOrange: '#ff6b35',
        tropicalPink: '#ff69b4',
        neonPink: '#ff1493',
        neonCyan: '#00ffff'
    },
    
    TILE: 16,
    
    init: function(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;
        this.ctx = this.canvas.getContext('2d');
        this.resize();
        this.buildStaticBackground();
        this.initSparkles();
        this.start();
        window.addEventListener('resize', () => this.resize());
    },
    
    resize: function() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.buildStaticBackground();
    },
    
    start: function() {
        if (this.animationId) return;
        this.animate();
    },
    
    stop: function() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
    },
    
    animate: function() {
        this.time += 0.1;
        if (this.staticBG) this.ctx.drawImage(this.staticBG, 0, 0);
        this.drawSparkles();
        this.animationId = requestAnimationFrame(() => this.animate());
    },
    
    buildStaticBackground: function() {
        this.staticBG = document.createElement('canvas');
        this.staticBG.width = this.canvas.width;
        this.staticBG.height = this.canvas.height;
        const sCtx = this.staticBG.getContext('2d');
        
        const bgGradient = sCtx.createRadialGradient(
            this.canvas.width/2, this.canvas.height/2, 0,
            this.canvas.width/2, this.canvas.height/2, this.canvas.width*0.8
        );
        bgGradient.addColorStop(0, this.PALETTE.midPurple);
        bgGradient.addColorStop(0.7, this.PALETTE.darkPurple);
        bgGradient.addColorStop(1, this.PALETTE.deepBlue);
        sCtx.fillStyle = bgGradient;
        sCtx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        const facetSize = this.TILE * 4;
        for (let y = -facetSize; y < this.canvas.height + facetSize; y += facetSize) {
            for (let x = -facetSize; x < this.canvas.width + facetSize; x += facetSize) {
                const cx = x + facetSize/2, cy = y + facetSize/2;
                const dist = Math.sqrt(Math.pow(cx-this.canvas.width/2,2) + Math.pow(cy-this.canvas.height/2,2));
                const maxD = Math.sqrt(Math.pow(this.canvas.width/2,2) + Math.pow(this.canvas.height/2,2));
                const intensity = 1 - (dist/maxD);
                if (Math.random() > 0.3) this.drawChromeFacet(sCtx, x, y, facetSize, intensity);
            }
        }
        
        this.drawLightRays(sCtx);
        
        for (let i = 0; i < 30; i++) {
            const x = Math.random() * this.canvas.width;
            const y = Math.random() * this.canvas.height;
            // ADD THIS CHECK - skip if in center title area
            //const centerX = this.canvas.width / 2;
            //const centerY = this.canvas.height / 2;
            //const distX = Math.abs(x - centerX);
            //const distY = Math.abs(y - centerY);
            // Skip if too close to center (where ASCII art is)
            //if (distX < this.canvas.width * 0.35 && distY < this.canvas.height * 0.4) {
            //    continue; // Skip this fruit, try next one
            //}
            const type = Math.floor(Math.random() * 11);
            if (type === 0) this.drawPixelDiamond(sCtx, x, y);
            else if (type === 1) this.drawPixelStar(sCtx, x, y);
            else if (type === 2) this.drawPixelHexagon(sCtx, x, y);
            else if (type === 3) this.drawPixelBanana(sCtx, x, y);
            else if (type === 4) this.drawPixelStrawberry(sCtx, x, y);
            else if (type === 5) this.drawPixelKiwi(sCtx, x, y);
            else if (type === 6) this.drawPixelCherry(sCtx, x, y);
            else if (type === 7) this.drawPixelOrange(sCtx, x, y);
            else if (type === 8) this.drawPixelAvocado(sCtx, x, y);
            else if (type === 9) this.drawPixelPineapple(sCtx, x, y);
            else this.drawPixelPalmLeaf(sCtx, x, y);
        }
    },
    
    drawChromeFacet: function(c, x, y, s, i) {
        c.fillStyle = this.PALETTE.chrome1;
        c.fillRect(x,y,s,s);
        const g = c.createLinearGradient(x,y,x+s,y+s);
        g.addColorStop(0, this.PALETTE.chromeShine);
        g.addColorStop(0.5, this.PALETTE.chrome2);
        g.addColorStop(1, this.PALETTE.chrome1);
        c.fillStyle = g;
        c.globalAlpha = i*0.8;
        c.fillRect(x,y,s,s);
        c.globalAlpha = 1;
        c.fillStyle = this.PALETTE.white;
        c.globalAlpha = i*0.4;
        c.fillRect(x,y,s,this.TILE/2);
        c.fillRect(x,y,this.TILE/2,s);
        c.globalAlpha = 1;
    },
    
    drawLightRays: function(c) {
        c.globalAlpha = 0.06;
        for (let i = 0; i < 12; i++) {
            const a = (i/12)*Math.PI*2;
            const col = i%3===0 ? this.PALETTE.bananaYellow : i%3===1 ? this.PALETTE.tropicalPink : this.PALETTE.neonCyan;
            c.fillStyle = col;
            for (let d = 0; d < this.canvas.width; d += this.TILE*3) {
                const x = this.canvas.width/2 + Math.cos(a)*d;
                const y = this.canvas.height/2 + Math.sin(a)*d;
                const sz = this.TILE*4 - (d/this.canvas.width)*this.TILE*4*0.7;
                const px = Math.floor(x/this.TILE)*this.TILE;
                const py = Math.floor(y/this.TILE)*this.TILE;
                c.globalAlpha = (1-d/this.canvas.width)*0.08;
                c.fillRect(px-sz/2, py-sz/2, sz, sz);
            }
        }
        c.globalAlpha = 1;
    },
    
    drawPixelDiamond: function(c,x,y) {
        const px = Math.floor(x/this.TILE)*this.TILE, py = Math.floor(y/this.TILE)*this.TILE, p = this.TILE/2;
        c.globalAlpha = 0.6;
        c.fillStyle = this.PALETTE.tropicalPink;
        c.fillRect(px,py-this.TILE,this.TILE,this.TILE);
        c.fillRect(px-this.TILE,py,this.TILE*3,this.TILE);
        c.fillRect(px,py+this.TILE,this.TILE,this.TILE);
        c.fillStyle = this.PALETTE.neonPink;
        c.globalAlpha = 0.8;
        c.fillRect(px,py-this.TILE,this.TILE,p);
        c.globalAlpha = 1;
    },
    
    drawPixelStar: function(c,x,y) {
        const px = Math.floor(x/this.TILE)*this.TILE, py = Math.floor(y/this.TILE)*this.TILE, p = this.TILE/2;
        c.globalAlpha = 0.6;
        c.fillStyle = this.PALETTE.bananaYellow;
        c.fillRect(px,py-this.TILE*2,this.TILE,this.TILE*4);
        c.fillRect(px-this.TILE*2,py,this.TILE*4,this.TILE);
        c.fillStyle = this.PALETTE.white;
        c.globalAlpha = 0.8;
        c.fillRect(px,py,this.TILE,this.TILE);
        c.globalAlpha = 1;
    },
    
    drawPixelHexagon: function(c,x,y) {
        const px = Math.floor(x/this.TILE)*this.TILE, py = Math.floor(y/this.TILE)*this.TILE, p = this.TILE/2;
        c.globalAlpha = 0.5;
        c.fillStyle = this.PALETTE.neonCyan;
        c.fillRect(px-this.TILE,py-p,this.TILE*3,this.TILE*2);
        c.fillRect(px-this.TILE*2,py+p,this.TILE*5,this.TILE);
        c.fillRect(px-this.TILE,py+this.TILE+p,this.TILE*3,this.TILE*2);
        c.globalAlpha = 1;
    },
    
    drawPixelBanana: function(c,x,y) {
        const px = Math.floor(x/this.TILE)*this.TILE, py = Math.floor(y/this.TILE)*this.TILE, p = this.TILE/2;
        c.globalAlpha = 0.8;
        c.fillStyle = this.PALETTE.bananaYellow;
        c.fillRect(px,py,this.TILE,p);
        c.fillRect(px-p,py+p,this.TILE+p,this.TILE);
        c.fillRect(px,py+this.TILE+p,this.TILE*2,this.TILE);
        c.fillRect(px+p,py+this.TILE*2+p,this.TILE*2,this.TILE);
        c.fillRect(px+this.TILE,py+this.TILE*3+p,this.TILE,this.TILE);
        c.fillStyle = '#e8b40f';
        c.fillRect(px+this.TILE,py+this.TILE+p,this.TILE,this.TILE);
        c.fillRect(px+this.TILE+p,py+this.TILE*2+p,this.TILE,this.TILE);
        c.fillStyle = this.PALETTE.white;
        c.globalAlpha = 0.5;
        c.fillRect(px-p,py+this.TILE+p,p,this.TILE);
        c.fillStyle = '#8b7355';
        c.globalAlpha = 0.8;
        c.fillRect(px,py-p,this.TILE,p);
        c.globalAlpha = 1;
    },
    
    drawPixelStrawberry: function(c,x,y) {
        const px = Math.floor(x/this.TILE)*this.TILE, py = Math.floor(y/this.TILE)*this.TILE, p = this.TILE/2;
        c.globalAlpha = 0.8;
        c.fillStyle = this.PALETTE.palmGreen;
        c.fillRect(px-p,py,this.TILE*2,p);
        c.fillStyle = '#ff3366';
        c.fillRect(px-p,py+this.TILE,this.TILE*2,this.TILE);
        c.fillRect(px,py+this.TILE*2,this.TILE*1.5,this.TILE);
        c.fillStyle = this.PALETTE.bananaYellow;
        c.globalAlpha = 0.7;
        c.fillRect(px,py+this.TILE+p,p,p);
        c.fillRect(px+this.TILE,py+this.TILE+p,p,p);
        c.globalAlpha = 1;
    },
    
    drawPixelKiwi: function(c,x,y) {
        const px = Math.floor(x/this.TILE)*this.TILE, py = Math.floor(y/this.TILE)*this.TILE, p = this.TILE/2;
        c.globalAlpha = 0.8;
        c.fillStyle = '#8b6f47';
        c.fillRect(px-p,py+this.TILE,this.TILE*2,this.TILE);
        c.fillRect(px-this.TILE,py+this.TILE*2,this.TILE*3,this.TILE);
        c.fillStyle = this.PALETTE.tropicalGreen;
        c.fillRect(px,py+this.TILE+p,this.TILE,this.TILE);
        c.fillStyle = '#000';
        c.fillRect(px+p,py+this.TILE+p,p,p);
        c.fillRect(px+this.TILE,py+this.TILE*2,p,p);
        c.globalAlpha = 1;
    },
    
    drawPixelCherry: function(c,x,y) {
        const px = Math.floor(x/this.TILE)*this.TILE, py = Math.floor(y/this.TILE)*this.TILE, p = this.TILE/2;
        c.globalAlpha = 0.8;
        c.fillStyle = this.PALETTE.palmGreen;
        c.fillRect(px,py,p,this.TILE);
        c.fillRect(px+this.TILE,py,p,this.TILE);
        c.fillStyle = '#cc0044';
        c.fillRect(px-p,py+this.TILE,this.TILE,this.TILE);
        c.fillRect(px+this.TILE,py+this.TILE,this.TILE,this.TILE);
        c.fillStyle = this.PALETTE.white;
        c.globalAlpha = 0.6;
        c.fillRect(px-p,py+this.TILE,p,p);
        c.fillRect(px+this.TILE,py+this.TILE,p,p);
        c.globalAlpha = 1;
    },
    
    drawPixelOrange: function(c,x,y) {
        const px = Math.floor(x/this.TILE)*this.TILE, py = Math.floor(y/this.TILE)*this.TILE, p = this.TILE/2;
        c.globalAlpha = 0.8;
        c.fillStyle = this.PALETTE.sunsetOrange;
        c.fillRect(px-p,py+this.TILE,this.TILE*2,this.TILE);
        c.fillRect(px-this.TILE,py+this.TILE*2,this.TILE*3,this.TILE);
        c.fillStyle = this.PALETTE.white;
        c.globalAlpha = 0.7;
        c.fillRect(px-p,py+this.TILE,this.TILE,p);
        c.fillStyle = this.PALETTE.palmGreen;
        c.globalAlpha = 0.8;
        c.fillRect(px,py+p,this.TILE,p);
        c.globalAlpha = 1;
    },
    
    drawPixelAvocado: function(c,x,y) {
        const px = Math.floor(x/this.TILE)*this.TILE, py = Math.floor(y/this.TILE)*this.TILE, p = this.TILE/2;
        c.globalAlpha = 0.8;
        c.fillStyle = '#4a5f3a';
        c.fillRect(px-p,py+this.TILE,this.TILE*2,this.TILE);
        c.fillRect(px-this.TILE,py+this.TILE*2,this.TILE*3,this.TILE);
        c.fillStyle = this.PALETTE.tropicalGreen;
        c.fillRect(px,py+this.TILE*2,this.TILE,this.TILE);
        c.fillStyle = '#8b6f47';
        c.fillRect(px+p,py+this.TILE*2,this.TILE,this.TILE);
        c.globalAlpha = 1;
    },
    
    drawPixelPineapple: function(c,x,y) {
        const px = Math.floor(x/this.TILE)*this.TILE, py = Math.floor(y/this.TILE)*this.TILE, p = this.TILE/2;
        c.globalAlpha = 0.8;
        c.fillStyle = this.PALETTE.palmGreen;
        c.fillRect(px,py-this.TILE*2,this.TILE,this.TILE);
        c.fillRect(px-this.TILE,py-this.TILE,this.TILE,this.TILE);
        c.fillRect(px+this.TILE,py-this.TILE,this.TILE,this.TILE);
        c.fillStyle = this.PALETTE.bananaYellow;
        c.fillRect(px-p,py,this.TILE*2,this.TILE);
        c.fillRect(px-this.TILE,py+this.TILE,this.TILE*3,this.TILE);
        c.fillRect(px-this.TILE,py+this.TILE*2,this.TILE*3,this.TILE);
        c.fillStyle = this.PALETTE.sunsetOrange;
        c.globalAlpha = 0.5;
        c.fillRect(px+this.TILE,py+this.TILE,p,this.TILE);
        c.fillStyle = '#cc8800';
        c.globalAlpha = 0.6;
        c.fillRect(px-p,py+p,p,p);
        c.fillRect(px+this.TILE,py+p,p,p);
        c.fillRect(px,py+this.TILE*2,p,p);
        c.globalAlpha = 1;
    },
    
    drawPixelPalmLeaf: function(c,x,y) {
        const px = Math.floor(x/this.TILE)*this.TILE, py = Math.floor(y/this.TILE)*this.TILE, p = this.TILE/2;
        c.globalAlpha = 0.6;
        c.fillStyle = this.PALETTE.tropicalGreen;
        c.fillRect(px,py,p,this.TILE*4);
        c.fillRect(px-this.TILE*2,py,this.TILE*2,p);
        c.fillRect(px-this.TILE*2,py+this.TILE,this.TILE*2,p);
        c.fillRect(px+p,py,this.TILE*2,p);
        c.fillRect(px+p,py+this.TILE,this.TILE*2,p);
        c.globalAlpha = 1;
    },
    
    initSparkles: function() {
        this.sparkles = [];
        for (let i = 0; i < 80; i++) {
            this.sparkles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: this.TILE * (Math.random() > 0.7 ? 2 : 1),
                phase: Math.random() * Math.PI * 2,
                speed: 0.01 + Math.random() * 0.02
            });
        }
    },
    
    drawSparkles: function() {
        this.sparkles.forEach(s => {
            s.phase += s.speed;
            const b = Math.sin(s.phase) * 0.5 + 0.5;
            if (b > 0.3) {
                const px = Math.floor(s.x/this.TILE)*this.TILE;
                const py = Math.floor(s.y/this.TILE)*this.TILE;
                this.ctx.fillStyle = this.PALETTE.white;
                this.ctx.globalAlpha = b * 0.8;
                this.ctx.fillRect(px, py, s.size, s.size);
                if (b > 0.7 && s.size > this.TILE) {
                    this.ctx.fillRect(px-this.TILE, py, this.TILE, s.size);
                    this.ctx.fillRect(px+s.size, py, this.TILE, s.size);
                    this.ctx.fillRect(px, py-this.TILE, s.size, this.TILE);
                    this.ctx.fillRect(px, py+s.size, s.size, this.TILE);
                }
            }
        });
        this.ctx.globalAlpha = 1;
    }
};

document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('titleBackgroundCanvas')) {
        TitleBackground.init('titleBackgroundCanvas');
    }
});