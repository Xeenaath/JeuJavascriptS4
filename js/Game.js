class Game {
    constructor(canvas, ctx, bar, ball, tabBricks) {
        this.canvas = canvas;
        this.ctx = ctx;

        this.bar = bar;
        this.ball = ball;
        this.tabBricks = tabBricks;

        this.arrowLeftPressed = false;
        this.arrowRightPressed = false;

        this.lvl = 1;
    }

    init() {
        this.bar.drawBar(this.ctx);
        this.ball.drawBall(this.ctx);
        this.tabBricks.drawBricks(this.ctx);
    }

    gererClavier() {
        if(this.arrowRightPressed && this.bar.x < this.canvas.width - this.bar.width) {
            bar.x += 12;
        } else if(this.arrowLeftPressed && bar.x > 0) {
            bar.x -= 12;
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
                that.draw(!that.gameOver() && !that.win());
            }, 10);

        } else {
            if (this.win()) {
                this.changeLvl();
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                this.init();
            }
            if (this.gameOver());
        }
    }

    win() {
        return this.tabBricks.allDead();
    }

    changeLvl() {
        this.lvl++;
    }

    gameOver() {

        return this.ball.y + this.ball.radius > this.canvas.height;
    }

}