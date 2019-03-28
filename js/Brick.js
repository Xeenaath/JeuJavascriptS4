class Brick {

    constructor(width, height, status) {
        this.width = width; //150
        this.height = height; //40
        this.status = status;
    }

    drawBrick(brickX, brickY, ctx) {
        ctx.beginPath();
        ctx.rect(brickX, brickY, this.width, this.height);
        ctx.fillStyle = "orchid";
        ctx.fill();
        ctx.strokeStyle = "black";
        ctx.stroke();
        ctx.closePath();
    }
}