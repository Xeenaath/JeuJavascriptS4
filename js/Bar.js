class Bar {
	
	//construit une barre sur le canvas avec la longueur width et la hauteur height
    constructor(canvas, width, height) {
        this.x = 0;
        this.y = 0;
        this.width = width;
        this.height = height;
    }
    
	//définit les coordonnées de la barre selon le canvas (en bas au milieu)
    placer(canvas) {
        this.x = (canvas.width - this.width) / 2;
        this.y = canvas.height - this.height - 5;
    }

	//dessine la barre sur le canvas
    drawBar(ctx) {
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = "fuchsia";
        ctx.fill();
        ctx.strokeStyle = "black";
        ctx.stroke();
        ctx.closePath();
    }

	//réduit la longueur de la barre
    decreaseWidth() {
        if (this.width > 75) {
            this.width -= 25;
        }
    }
}
