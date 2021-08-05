import { Tooth } from "./tooth.js";

export class Greedy {
  constructor() {
    this.eatingSpeed = 40;
    this.teethTotal = 20;
    this.teethWidth = 50;
    this.teethHeight = 50;

    this.originEatingSpeed = this.eatingSpeed;
  }

  resize(stageWidth, stageHeight) {
    this.stageWidth = stageWidth;
    this.stageHeight = stageHeight;

    this.x = this.stageWidth / 2;
    this.y = this.stageHeight / 2;

    this.originMouthHeight = this.stageHeight * 1.8;
    this.originMouthWidth = this.stageWidth;
    this.mouthHeight = this.originMouthHeight;
    this.mouthWidth = this.originMouthWidth;
  }

  init() {
    this.x1 = this.x - this.mouthWidth;
    this.y1 = this.y;
    this.x2 = this.x + this.mouthWidth;
    this.y2 = this.y;
    this.cx1 = this.x;
    this.cy1 = this.y - this.mouthHeight;
    this.cx2 = this.x;
    this.cy2 = this.y + this.mouthHeight;

    this.teethPos = [];

    this.teethGap = 1 / this.teethTotal;
    for (let i = 2; i < this.teethTotal - 1; i++) {
      if (i % 2) {
        const pos = this.getQuadraticCurvePoint(
          this.x1,
          this.y1,
          this.cx2,
          this.cy2,
          this.x2,
          this.y2,
          this.teethGap * i
        );
        this.teethPos[i] = pos;
      } else {
        const pos = this.getQuadraticCurvePoint(
          this.x1,
          this.y1,
          this.cx1,
          this.cy1,
          this.x2,
          this.y2,
          this.teethGap * i
        );
        this.teethPos[i] = pos;
      }
    }

    this.teeth = [];
    for (let i = 2; i < this.teethTotal - 1; i++) {
      const pos = this.teethPos[i];
      const tooth = new Tooth(
        pos.x,
        pos.y,
        this.teethWidth,
        this.teethHeight,
        i
      );
      this.teeth.push(tooth);
    }
  }

  eat() {
    if (this.mouthHeight < 0) {
      this.eatingSpeed = 0;
      this.mouthHeight = 0;
    } else if (this.mouthHeight === 0) {
      setTimeout(() => {
        this.eatingSpeed = -this.originEatingSpeed;
      }, 1000);
    } else if (this.mouthHeight > this.originMouthHeight) {
      this.eatingSpeed = 0;
      this.mouthHeight = this.originMouthHeight;
    }
    this.mouthHeight -= this.eatingSpeed;
    this.init();
  }

  draw(ctx) {
    this.eat();

    ctx.beginPath();
    ctx.fillStyle = "#c92a2a";
    ctx.moveTo(this.x1, this.y1);
    ctx.quadraticCurveTo(this.cx1, this.cy1, this.x2, this.y2);
    ctx.quadraticCurveTo(this.cx2, this.cy2, this.x1, this.y1);
    ctx.fill();
    ctx.closePath();

    ctx.save();
    ctx.globalCompositeOperation = "source-atop";
    this.teeth.forEach((tooth) => {
      tooth.draw(ctx);
    });
    ctx.restore();
  }

  quadraticCurveValue(p1, cp, p2, t) {
    return (1 - t) ** 2 * p1 + 2 * t * (1 - t) * cp + t ** 2 * p2;
  }

  getQuadraticCurvePoint(x1, y1, cx, cy, x2, y2, t) {
    return {
      x: this.quadraticCurveValue(x1, cx, x2, t),
      y: this.quadraticCurveValue(y1, cy, y2, t),
    };
  }
}
