class TabBricks {

    constructor(canvas, rows, columns){
        this.brick = [];
        this.rowBricks = rows;
        this.columnBricks = columns;
        this.brickPadding = 30;
        this.brickSetTop = 30;
        this.brickSetLeft = ( canvas.width - 130 * columns - this.brickPadding * (columns - 1)) / 2;
        for(let i=0; i< this.columnBricks; i++) {
            this.brick[i] = [];
            for(let j=0; j<this.rowBricks; j++) {
                this.brick[i][j] = new Brick(130, 40);
            }
        }
    }

    drawBricks(ctx) {

        for(let i=0; i<this.columnBricks; i++) {
            for(let j=0; j<this.rowBricks; j++) {
                if(this.brick[i][j].status > 0) {
                    let brickX = (i*(this.brick[i][j].width+this.brickPadding))+this.brickSetLeft;
                    let brickY = (j*(this.brick[i][j].height+this.brickPadding))+this.brickSetTop;
                    this.brick[i][j].x = brickX;
                    this.brick[i][j].y = brickY;
                    this.brick[i][j].drawBrick(brickX, brickY, ctx);
                    this.brick[i][j].writeText(brickX,brickY,ctx);
                }
            }
        }

    }

    allDead() {
        for(let i=0; i<this.columnBricks; i++) {
            for (let j = 0; j < this.rowBricks; j++) {
                if (this.brick[i][j].status > 0) {
                    return false;
                }
            }
        }
        return true;
    }


}