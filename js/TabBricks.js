class TabBricks {

    constructor(rows, columns){
        this.bricks = [];
        this.brickRowCount = rows; //4
        this.brickColumnCount = columns; // 10
        this.brickPadding = 30;
        this.brickOffsetTop = 30;
        this.brickOffsetLeft = 150;
        for(let i=0; i< this.brickColumnCount; i++) {
            this.bricks[i] = [];
            for(let j=0; j<this.brickRowCount; j++) {
                this.bricks[i][j] = new Brick(150, 40, 1);
            }
        }
    }

    drawBricks(ctx) {

        for(let i=0; i<this.brickColumnCount; i++) {
            for(let j=0; j<this.brickRowCount; j++) {
                if(this.bricks[i][j].status === 1) {
                    let brickX = (i*(this.bricks[i][j].width+this.brickPadding))+this.brickOffsetLeft;
                    let brickY = (j*(this.bricks[i][j].height+this.brickPadding))+this.brickOffsetTop;
                    this.bricks[i][j].x = brickX;
                    this.bricks[i][j].y = brickY;
                    this.bricks[i][j].drawBrick(brickX, brickY, ctx);
                    this.bricks[i][j].writeText(brickX,brickY,ctx);
                }
            }
        }

    }




}