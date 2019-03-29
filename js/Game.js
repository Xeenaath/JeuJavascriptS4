class Game {
	//contruit une nouvelle partie
    constructor(canvas, ctx, bar, ball, row, column) {
    	//info est une balise p pour afficher les informations
        this.info = document.getElementById("info");

        this.canvas = canvas;
        this.ctx = ctx;

        this.bar = bar;
        this.ball = ball;
        this.row = row;
        this.column = column;
        this.tabBricks = 0;

        this.arrowLeftPressed = false;
        this.arrowRightPressed = false;

        this.lvl = 1;
    }

	//initialise la partie : place tous les elements et les dessine
    init() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.bar.placer(this.canvas);
        this.ball.placer(this.canvas, this.bar);
        this.tabBricks = new TabBricks(this.canvas, this.row, this.column);

        this.bar.drawBar(this.ctx);
        this.ball.drawBall(this.ctx);
        this.tabBricks.drawBricks(this.ctx);

        this.info.innerHTML = "Niveau " + this.lvl;

        let that = this;
        document.addEventListener("keydown", function espace() {
            if (event.keyCode === 32) that.start();
				else if (event.keyCode === 37 || event.keyCode === 39) {
					espace();
				}
                document.removeEventListener("keydown", espace);
            });
    }

    gererClavier() {
        if(this.arrowRightPressed && this.bar.x < this.canvas.width - this.bar.width) {
            bar.x += 9;
        } else if(this.arrowLeftPressed && bar.x > 0) {
            bar.x -= 9;
        }
    }

    keyDownHandler() {
        if(event.keyCode === 39) {
            this.arrowRightPressed = true;
        }
        else if(event.keyCode === 37) {
            this.arrowLeftPressed = true;
        }
    }

    keyUpHandler() {
        if(event.keyCode === 39) {
            this.arrowRightPressed = false;
        }
        else if(event.keyCode === 37) {
            this.arrowLeftPressed = false;
        }
    }
	
	//ajoute les eventListener pour les fleches et lance la partie (avec draw)
    start() {
        document.addEventListener("keydown", evt => {
            this.keyDownHandler();
        });
        document.addEventListener("keyup", evt => {
            this.keyUpHandler();
        });

        this.draw(true);
    }
	
	//draw s'appelle elle-même toute les 10ms
    draw(test) {
    	//la partie se joue seulement si le test est à true.
    	//le test est à true si le joue n'a ni gagné, ni perdu.
        if (test) {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

            this.ball.move();
            this.ball.changeDirection(this.canvas, bar);
            this.ball.collisionDetection(this.tabBricks);

            this.gererClavier();

            this.bar.drawBar(this.ctx);
            this.ball.drawBall(this.ctx);
            this.tabBricks.drawBricks(background.context);

            let that = this;
            setTimeout(function () {
                that.draw(!that.gameOver() && !that.winNiveau());
            }, 10);

        } else {
        	//si le joueur a gagné le niveau, il passe au niveau suivant en appellant init
            if (this.winNiveau()) {
                this.changeLvl();
                //Il y a seulement 10 niveaux, le 11ème fait gagner la partie
                if (this.lvl === 11) {
                    this.info.innerHTML = "Bravo champion ! Vous avez finis tous les niveaux";
                } else this.init();
            }
            if (this.gameOver()) {
                this.info.innerHTML = "Perdu ! Appuyez sur espace pour recommencer !";

                let that = this;
                document.addEventListener("keydown", function espace() {
                    if (event.keyCode === 32) that.init();
					else if (event.keyCode === 37 || event.keyCode === 39) {
						event.keyCode = 0;
						espace();
					}
                    document.removeEventListener("keydown", espace);
                });
            }
        }
    }
	
	//teste si le niveau est gagné (donc plus de blocks à détruire)
    winNiveau() {
        return this.tabBricks.allDead();
    }

	//augmente le niveau et donc la difficulté
    changeLvl() {
        this.lvl++;
        if (this.lvl % 2 === 0)
            this.ball.increaseSpeed();
        else {
            this.bar.decreaseWidth();
        }
        if (this.lvl === 3) {
            this.row++;
            this.column++;
        }
    }
	
	//teste si le joueur à perdu
    gameOver() {
        return this.ball.y + this.ball.radius > this.canvas.height;
    }

}
