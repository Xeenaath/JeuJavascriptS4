class Ball {

    constructor(x, y, radius, speed) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.speedX = speed;
        this.speedY = speed;
    }

    drawBall(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2);
        ctx.fillStyle = "lightgrey"; //mettre une image
        ctx.fill();
        ctx.strokeStyle = "black";
        ctx.stroke();
        ctx.closePath();
    }

    move(){
        this.x += this.speedX;
        this.y += this.speedY;
    }

    changeYdirectionOrNot(canvas, bar) {
        if(this.y < this.radius) {
            this.speedY = -this.speedY;
        } else if(this.y > canvas.height-bar.height-ball.radius) {
            if(this.x >= bar.x && this.x <= bar.x + bar.width) {
                this.speedY = -this.speedY;
            }
        }
    }

    changeXdirectionOrNot(canvas) {
        if(this.x + this.speedX > canvas.width-this.radius || this.x +this.speedX < this.radius) {
            this.speedX = -this.speedX;
        }
    }

}