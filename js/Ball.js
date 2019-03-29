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

    changeDirection(canvas, bar) {
        if(this.x > canvas.width - this.radius || this.x < this.radius) {
            this.speedX = -this.speedX;
        }
        if(this.y < this.radius ||
            (this.y > canvas.height - bar.height - this.radius && this.x >= bar.x && this.x <= bar.x + bar.width)) {
            this.speedY = -this.speedY;
        }
    }

    collisionDetection(tabBricks) {
        for(let i = 0; i < tabBricks.columnBricks; i++) {
            for(let j = 0; j < tabBricks.rowBricks; j++) {
                let brick = tabBricks.brick[i][j];
                if (brick.status > 0) {
                    //si la balle entre en collision avec une brique
                    if ((ball.y + ball.radius) > brick.y && (ball.y - ball.radius) < (brick.y + brick.height) &&
                        (ball.x + ball.radius) > brick.x && (ball.x - ball.radius) < (brick.x + brick.width)) {
                        ball.speedY = -ball.speedY;
                        brick.status--;
                    }
                }
            }
        }
    }

}