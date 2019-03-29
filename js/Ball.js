class Ball {
	//contruit une balle de rayon radius et de vitesse speed
    constructor(radius, speed) {
        this.x = 0;
        this.y = 0;
        this.radius = radius;
        this.speedX = speed;
        this.speedY = speed;
    }
	
	//définit les coordonnées de la balle selon la taille du canvas et de la barre
    placer(canvas, bar) {
        this.x = canvas.width / 2;
        this.y = canvas.height - bar.height - this.radius - 15;
    }
	
	//dessine la balle sur le canvas
    drawBall(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2);
        ctx.fillStyle = "lightgrey"; //mettre une image
        ctx.fill();
        ctx.strokeStyle = "black";
        ctx.stroke();
        ctx.closePath();
    }

	//déplace la balle
    move(){
        this.x += this.speedX;
        this.y += this.speedY;
    }

	//change de direction quand la balle touche la barre et les bordures du canvas
    changeDirection(canvas, bar) {
        if(this.x > canvas.width - this.radius || this.x < this.radius) {
            this.speedX = -this.speedX;
        }
        if(this.y < this.radius ||
            (this.y > canvas.height - bar.height - this.radius && this.x >= bar.x && this.x <= bar.x + bar.width)) {
            this.speedY = -this.speedY;
        }
    }

	//change de direction quand la balle touche un block
    collisionDetection(tabBricks) {
		//booleen qui est a true si la balle est dans un block
        let isCollision;
		//distance entre la balle et les bordures des blocks
        let distanceHaut, distanceBas, distanceGauche, distanceDroite;

        for(let i = 0; i < tabBricks.columnBricks; i++) {
            for(let j = 0; j < tabBricks.rowBricks; j++) {
                let brick = tabBricks.brick[i][j];

				//si le block a encore de la vie
                if (brick.status > 0) {
					
					//calcul de coordonnées entre la balle et le block
                    isCollision = (this.y + this.radius) >= brick.y && (this.y - this.radius) <= (brick.y + brick.height) &&
                                  (this.x + this.radius) >= brick.x && (this.x - this.radius) <= (brick.x + brick.width);
					
					//calcul des distances entre les bords de la balle et les bords du block
                    distanceHaut = Math.abs( (this.y + this.radius) - brick.y );
                    distanceBas = Math.abs( (this.y - this.radius) - (brick.y + brick.height) );
                    distanceGauche = Math.abs( (this.x + this.radius) - brick.x );
                    distanceDroite = Math.abs( (this.x - this.radius) - (brick.x + brick.width) );
					
					//si une collision existe
                    if (isCollision) {
                    	//si la balle touche la bordure du haut du block, ou la bordure du bas, alors la balle part en -speedY
                        if (Math.min(distanceHaut, distanceBas, distanceGauche, distanceDroite) === distanceHaut ||
                            Math.min(distanceHaut, distanceBas, distanceGauche, distanceDroite) === distanceBas) {
                            this.speedY = -this.speedY;
                        //sinon, elle touche les bordures gauche ou droite, elle doit partir en -speedX
                        } else {
                            this.speedX = -this.speedX;
                        }
                		//la brick perd de la vie
                        brick.status--;
                    }
                }
            }
        }
    }

	//augmente la vitesse de la balle
    increaseSpeed() {
        if (Math.abs(this.speedX) < 9) {
            this.speedX = Math.abs(this.speedX) + 1;
            this.speedY = Math.abs(this.speedY) + 1;
        }
    }

}
