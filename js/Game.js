class Game {
    constructor(canvas, ctx, bar, ball, row, column) {
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

    start() {
        document.addEventListener("keydown", evt => {
            this.keyDownHandler();
        });
        document.addEventListener("keyup", evt => {
            this.keyUpHandler();
        });

        this.draw(true);
    }

    draw(test) {
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
            if (this.winNiveau()) {
                this.changeLvl();
                if (this.lvl === 11) {
                    this.info.innerHTML = "Bravo champion ! Vous avez finis tous les niveaux";
                } else this.init();
            }
            if (this.gameOver()) {
                this.info.innerHTML = "Perdu ! Appuyez sur espace pour recommencer !";

                let that = this;
                document.addEventListener("keydown", function espace() {
                    if (event.keyCode === 32) that.init();
                    document.removeEventListener("keydown", espace);
                });
            }
        }
    }

    winNiveau() {
        return this.tabBricks.allDead();
    }

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

    gameOver() {
        return this.ball.y + this.ball.radius > this.canvas.height;
    }

}