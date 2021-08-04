import { Eye } from "./eye.js";

class App {
  constructor() {
    this.canvas = document.createElement("canvas");
    document.body.appendChild(this.canvas);
    this.ctx = this.canvas.getContext("2d");

    this.pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;

    window.addEventListener("resize", this.resize.bind(this), false);
    this.resize();

    const initEye = new Eye(
      this.stageWidth / 2 - 50,
      this.stageHeight / 2 - 30
    );
    this.eyes = [initEye];
    console.log(this.eyes);

    window.addEventListener("click", (e) => {
      const eye = new Eye(e.clientX, e.clientY);
      this.eyes.push(eye);
    });

    window.addEventListener("pointermove", this.onMove.bind(this), false);

    window.requestAnimationFrame(this.animate.bind(this));
  }

  resize() {
    this.stageWidth = document.body.clientWidth;
    this.stageHeight = document.body.clientHeight;

    this.canvas.width = this.stageWidth * this.pixelRatio;
    this.canvas.height = this.stageHeight * this.pixelRatio;
    this.ctx.scale(this.pixelRatio, this.pixelRatio);
  }

  animate(t) {
    window.requestAnimationFrame(this.animate.bind(this));

    this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

    this.eyes.forEach((eye) => {
      eye.draw(this.ctx, this.mousePos);
    });
  }

  onMove(e) {
    this.mousePos = {
      x: e.clientX,
      y: e.clientY,
    };
  }
}

window.onload = () => {
  new App();
};
