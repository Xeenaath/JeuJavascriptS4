class Ball {

    constructor(radius, speed) {
        this.x = 0;
        this.y = 0;
        this.radius = radius;
        this.speedX = speed;
        this.speedY = speed;
    }

    placer(canvas, bar) {
        this.x = canvas.width / 2;
        this.y = canvas.height - bar.height - this.radius - 15;
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
        let isCollision;
        let distanceHaut, distanceBas, distanceGauche, distanceDroite;
        for(let i = 0; i < tabBricks.columnBricks; i++) {
            for(let j = 0; j < tabBricks.rowBricks; j++) {
                let brick = tabBricks.brick[i][j];
                if (brick.status > 0) {

                    isCollision = (this.y + this.radius) >= brick.y && (this.y - this.radius) <= (brick.y + brick.height) &&
                                  (this.x + this.radius) >= brick.x && (this.x - this.radius) <= (brick.x + brick.width);

                    distanceHaut = Math.abs( (this.y + this.radius) - brick.y );
                    distanceBas = Math.abs( (this.y - this.radius) - (brick.y + brick.height) );
                    distanceGauche = Math.abs( (this.x + this.radius) - brick.x );
                    distanceDroite = Math.abs( (this.x - this.radius) - (brick.x + brick.width) );

                    if (isCollision) {
                        if (Math.min(distanceHaut, distanceBas, distanceGauche, distanceDroite) === distanceHaut ||
                            Math.min(distanceHaut, distanceBas, distanceGauche, distanceDroite) === distanceBas) {
                            this.speedY = -this.speedY;
                        } else {
                            this.speedX = -this.speedX;
                        }
                        brick.status--;
                    }
                }
            }
        }
    }

    increaseSpeed() {
        if (Math.abs(this.speedX) < 6) {
            this.speedX = Math.abs(this.speedX) + 1;
            this.speedY = Math.abs(this.speedY) + 1;
        }
    }

}