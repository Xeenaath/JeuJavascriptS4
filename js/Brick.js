let tabNames = ["HTML","CSS","PHP", "Javascript", "Java", "Python", "C"];

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

class Brick {



    constructor(width, height, status) {
        this.width = width; //150
        this.height = height; //40
        this.status = status;
        this.name = tabNames[getRandomInt(tabNames.length-1)];

    }

    drawBrick(brickX, brickY, ctx) {
        ctx.beginPath();
        ctx.rect(brickX, brickY, this.width, this.height);
        ctx.fillStyle = "fuchsia";
        ctx.fill();
        ctx.strokeStyle = "black";
        ctx.stroke();
        ctx.closePath();

    }

    writeText(brickX, brickY, ctx) {
        ctx.beginPath();
        ctx.font = '20px serif';
        ctx.fillStyle = "white";
        ctx.textAlign= "center";
        ctx.fillText(this.name, brickX+this.width/2, brickY+this.height/1.5);
        ctx.closePath();
    }
}