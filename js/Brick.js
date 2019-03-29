//tous les noms des briques. Les noms qui reviennent plusieurs fois ont plus de chances d'apparaître dans le jeu
let tabNames = ["HTML", "CSS", "PHP", "PHP", "Javascript", "Javascript", "Java", "Java", "Python", "C", "C"];

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

//définit la vie d'un block selon son nom (ex: C = 5 pv)
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

	//fabrique UNE brique
    constructor(width, height) {
        this.width = width; 
        this.height = height; 
        this.name = tabNames[getRandomInt(tabNames.length)];
        this.status = setStatus(this.name);
    }
	
	//dessine la brique
    drawBrick(brickX, brickY, ctx) {
        ctx.beginPath();
        ctx.rect(brickX, brickY, this.width, this.height);
		
		//colore la brique selon ses points de vie
        if (this.status === 1) ctx.fillStyle = "#00a9f1";
        if (this.status === 2) ctx.fillStyle = "#ffc700";
        if (this.status === 3) ctx.fillStyle = "#ff8c00";
        if (this.status === 4) ctx.fillStyle = "#fb4600";
        if (this.status === 5) ctx.fillStyle = "#bb000a";

        ctx.fill();
        ctx.strokeStyle = "black";
        ctx.stroke();
        ctx.closePath();

    }
	
	//ecrit le nom de la brique sur elle-même
    writeText(brickX, brickY, ctx) {
        ctx.beginPath();
        ctx.font = '20px serif';
        ctx.fillStyle = "white";
        ctx.textAlign= "center";
        ctx.fillText(this.name, brickX+this.width/2, brickY+this.height/1.5);
        ctx.closePath();
    }
}
