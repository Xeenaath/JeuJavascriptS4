class Background {
    constructor(canvasName, width, height) {
        this.canvas = document.getElementById(canvasName);
        this.canvas.width = width;
        this.canvas.height = height;
        this.context = this.canvas.getContext("2d");
        this.context.imageSmoothingEnabled = false;

    }

    setBackground(source) {
        this.canvas.style.backgroundImage = "url(" + source + ")";
        this.canvas.style.backgroundRepeat = "no-repeat";
        this.canvas.style.backgroundSize = "cover";
        this.canvas.style.imageRendering = "pixelated";
    }
}