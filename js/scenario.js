let background = new Background("canvas", 1200, 600);
background.setBackground("img/fond.png");
let bar = new Bar((background.canvas.width-175)/2, background.canvas.height-15, 175,15);
let ball = new Ball((background.canvas.width-10)/2, (background.canvas.height-30), 10, 1);
let tabBricks = new TabBricks(4,5);

function draw() {
    background.context.clearRect(0,0, background.canvas.width, background.canvas.height);

    bar.drawBar(background.context);

    ball.drawBall(background.context);
    ball.changeXdirectionOrNot(background.canvas);
    ball.changeYdirectionOrNot(background.canvas, bar);
    ball.move();

    tabBricks.drawBricks(background.context);
    collisionDetection();

    keyboard();
}

setInterval(draw, 10);

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

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

function keyboard() {
    if(rightPressed && bar.x < background.canvas.width-bar.width) {
        bar.x += 15;
    } else if(leftPressed && bar.x > 0) {
        bar.x -= 15;
    }
}


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






