let tabNames = ["HTML", "CSS", "PHP", "Javascript", "Java", "Python", "C"];

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function setStatus(name) {
    if (name === "Python" || name === "HTML" || name === "CSS")
        return 1;
    else if (name === "Javascript")
        return 2;
    else if (name === "PHP" || name === "Java")
        return 3;
    else
        return 5;
}

class Brick {

    constructor(width, height) {
        this.width = width; //150
        this.height = height; //40
        this.name = tabNames[getRandomInt(tabNames.length)];
        this.status = setStatus(this.name);
    }

    drawBrick(brickX, brickY, ctx) {
        ctx.beginPath();
        ctx.rect(brickX, brickY, this.width, this.height);

        if (this.status === 1) ctx.fillStyle = "#4486f1";
        if (this.status === 2) ctx.fillStyle = "#5900af";
        if (this.status === 3) ctx.fillStyle = "#f9004a";
        if (this.status === 4) ctx.fillStyle = "#fb002c";
        if (this.status === 5) ctx.fillStyle = "#bb000a";

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