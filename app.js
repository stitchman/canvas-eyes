import { Eye } from "./eye.js";
import { Greedy } from "./greedy.js";

class App {
  constructor() {
    this.canvas = document.createElement("canvas");
    document.body.appendChild(this.canvas);
    this.ctx = this.canvas.getContext("2d");

    this.pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;

    this.greedy = new Greedy();

    window.addEventListener("resize", this.resize.bind(this), false);
    this.resize();

    const initEye = new Eye(
      this.stageWidth / 2 - 50,
      this.stageHeight / 2 - 30
    );
    this.eyes = [initEye];

    window.addEventListener("click", this.onClick.bind(this), false);

    window.addEventListener("pointermove", this.onMove.bind(this), false);

    window.requestAnimationFrame(this.animate.bind(this));
  }

  resize() {
    this.stageWidth = document.body.clientWidth;
    this.stageHeight = document.body.clientHeight;

    this.canvas.width = this.stageWidth * this.pixelRatio;
    this.canvas.height = this.stageHeight * this.pixelRatio;
    this.ctx.scale(this.pixelRatio, this.pixelRatio);

    this.greedy.resize(this.stageWidth, this.stageHeight);
  }

  animate(t) {
    window.requestAnimationFrame(this.animate.bind(this));

    this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

    this.greedy.draw(this.ctx);

    this.eyes.forEach((eye) => {
      eye.draw(this.ctx, this.mousePos);
    });
  }

  onClick(e) {
    const newEye = new Eye(e.clientX, e.clientY);

    for (let i = this.eyes.length - 1; i >= 0; i--) {
      const eye = this.eyes[i];
      const distance = Math.hypot(eye.x - newEye.x, eye.y - newEye.y);
      if (distance < eye.radius + newEye.radius + 10) {
        this.eyes.splice(i, 1);
      }
    }

    this.eyes.push(newEye);
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
