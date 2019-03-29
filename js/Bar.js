class Bar {

    constructor(canvas, width, height) {
        this.x = 0;
        this.y = 0;
        this.width = width;
        this.height = height;
    }

    placer(canvas) {
        this.x = (canvas.width - this.width) / 2;
        this.y = canvas.height - this.height - 5;
    }

    drawBar(ctx) {
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = "fuchsia";
        ctx.fill();
        ctx.strokeStyle = "black";
        ctx.stroke();
        ctx.closePath();
    }

    decreaseWidth() {
        if (this.width > 75) {
            this.width -= 25;
        }
    }
}