class Background {
	//constructeur qui définit un canvas
    constructor(canvasName, width, height) {
        this.canvas = document.getElementById(canvasName);
        this.canvas.width = width;
        this.canvas.height = height;
        this.context = this.canvas.getContext("2d");
        this.context.imageSmoothingEnabled = false;

    }
	
	//mettre un background au canvas
    setBackground(source) {
        this.canvas.style.backgroundImage = "url(" + source + ")";
        this.canvas.style.backgroundRepeat = "no-repeat";
        this.canvas.style.backgroundSize = "cover";
    }
}
