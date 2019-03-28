let background = new Background("canvas", 1200, 600);
background.setBackground("img/fond.png");
let barWidth = 175;
let bar = new Bar((background.canvas.width-barWidth)/2, background.canvas.height-15, barWidth,15);
let speed = 2;
let ball = new Ball((background.canvas.width-10)/2, (background.canvas.height-30), 10, speed);
let tabBricks = new TabBricks(4,5);

let level = 1;

var info = document.getElementById("info");

/******************************************************************************************************/

let rightPressed = false;
let leftPressed = false;

function keyDownHandler(code) {
    if(code.keyCode === 39) {
        rightPressed = true;
    }
    else if(code.keyCode === 37) {
        leftPressed = true;
    }
}

function keyUpHandler(code) {
    if(code.keyCode === 39) {
        rightPressed = false;
    }
    else if(code.keyCode === 37) {
        leftPressed = false;
    }
}

document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);

function keyboard() {
    if(rightPressed && bar.x < background.canvas.width-bar.width) {
        bar.x += 15;
    } else if(leftPressed && bar.x > 0) {
        bar.x -= 15;
    }
}

/******************************************************************************************************/

function collisionDetection() {
    for(let i=0; i<tabBricks.brickColumnCount; i++) {
        for(let j=0; j<tabBricks.brickRowCount; j++) {
            let brick = tabBricks.bricks[i][j];
            if(brick.status === 1) {
                //si la balle entre en collision avec une brique
                if((ball.y+ball.radius) > brick.y && (ball.y-ball.radius) < (brick.y+brick.height) &&
                   (ball.x+ball.radius) > brick.x && (ball.x-ball.radius) < (brick.x+brick.width)) {
                    ball.speedY = -ball.speedY;
                    brick.status--;
                }
            }
        }
    }
}

/******************************************************************************************************/

function gameOver() {
    return ball.y+ball.radius > background.canvas.height;
}

/******************************************************************************************************/

function win() {
    return false;
}

/******************************************************************************************************/
/******************************************************************************************************/

function draw(test) {
    if (test) {
        background.context.clearRect(0, 0, background.canvas.width, background.canvas.height);

        bar.drawBar(background.context);

        ball.drawBall(background.context);
        ball.changeXdirectionOrNot(background.canvas);
        ball.changeYdirectionOrNot(background.canvas, bar);
        ball.move();

        tabBricks.drawBricks(background.context);
        collisionDetection();

        keyboard();

        setTimeout(function () {
            draw(!gameOver() && !win());
        }, 10);

    } else {
        changeLevel();
        draw(true);
    }

}

/******************************************************************************************************/

function changeLevel() {
    level++;
    if (level%2 === 0) {
        if (speed < 9) {
            speed++;
        }
        ball = new Ball((background.canvas.width-10)/2, (background.canvas.height-30), 10, speed);
        bar = new Bar((background.canvas.width-barWidth)/2, background.canvas.height-15, barWidth,15);
        tabBricks = new TabBricks(4,5);
    } else {
        if (barWidth > 75) {
            barWidth-=15;
        }
        ball = new Ball((background.canvas.width-10)/2, (background.canvas.height-30), 10, speed);
        bar = new Bar((background.canvas.width-barWidth)/2, background.canvas.height-15, barWidth,15);
        tabBricks = new TabBricks(4,5);
    }
}

/******************************************************************************************************/

draw(true);
info.innerText("level");