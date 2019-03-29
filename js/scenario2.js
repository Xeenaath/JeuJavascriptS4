//fond d'écran + canvas
let background = new Background("canvas", 1200, 600);
background.setBackground("img/fond.png");

let canvas = background.canvas,
    ctx = background.context;

//barre
let widthBar = 175,
    heightBar = 15,
    xBar = (canvas.width - widthBar) / 2,
    yBar = canvas.height - heightBar;

//balle
let radiusBall = 10,
    speedBall = 4,
    xBall = canvas.width / 2,
    yBall = canvas.height - heightBar - radiusBall - 15;

//tableau de briques
let rowBricks = 4,
    columnBricks = 5;

let bar = new Bar(xBar, yBar, widthBar, heightBar);
let ball = new Ball(xBall, yBall, radiusBall, speedBall);
let tabBricks = new TabBricks(rowBricks, columnBricks);

let g = new Game(canvas, ctx, bar, ball, tabBricks);

g.init();

document.addEventListener("keydown", evt => {
    if (event.keyCode === 32) g.start();
});