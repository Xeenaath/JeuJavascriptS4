//fond d'écran + canvas
let background = new Background("canvas", 1200, 600);
background.setBackground("img/fond.png");

let canvas = background.canvas,
    ctx = background.context;

//barre
let widthBar = 175,
    heightBar = 15;

//balle
let radiusBall = 10,
    speedBall = 4;

//tableau de briques
let rowBricks = 3,
    columnBricks = 4;

let bar = new Bar(canvas, widthBar, heightBar);
let ball = new Ball(radiusBall, speedBall);

let g = new Game(canvas, ctx, bar, ball, rowBricks, columnBricks);

g.init();