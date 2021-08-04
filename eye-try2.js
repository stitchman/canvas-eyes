export class Eye {
  constructor() {
    this.radius = 100;
    this.blinkTime = 50;
    this.innerX = 0;
    this.innerY = 0;
  }

  resize(x, y) {
    this.x = x;
    this.y = y;

    this.x1 = this.x - this.radius;
    this.y1 = this.y;
    this.x2 = this.x + this.radius;
    this.y2 = this.y;
    this.topX = this.x;
    this.topY = this.y - this.radius;
    this.bottomX = this.x;
    this.bottomY = this.y + this.radius;
    this.blinkX = this.x;
    this.blinkY = this.y + (this.radius * 2) / 3;

    this.originTopY = this.topY;
    this.originBottomY = this.bottomY;

    this.topBlinkSpeed = (this.blinkY - this.originTopY) / this.blinkTime;
    this.bottomBlinkSpeed = (this.blinkY - this.originBottomY) / this.blinkTime;
  }

  blink() {
    if (this.topY > this.blinkY && this.topBlinkSpeed > 0) {
      this.topBlinkSpeed *= -1;
    } else if (this.topY < this.originTopY && this.topBlinkSpeed < 0) {
      this.topBlinkSpeed *= -1;
    } else {
      this.topY += this.topBlinkSpeed;
    }

    if (this.bottomY < this.blinkY && this.bottomBlinkSpeed < 0) {
      this.bottomBlinkSpeed *= -1;
    } else if (this.bottomY > this.originBottomY && this.bottomBlinkSpeed > 0) {
      this.bottomBlinkSpeed *= -1;
    } else {
      this.bottomY += this.bottomBlinkSpeed;
    }
  }

  draw(ctx, mousePos) {
    // this.blink();

    ctx.fillStyle = "#f8f9fa";
    ctx.beginPath();
    ctx.moveTo(this.x1, this.y1);
    ctx.quadraticCurveTo(this.topX, this.topY, this.x2, this.y2);
    ctx.quadraticCurveTo(this.bottomX, this.bottomY, this.x1, this.y1);
    ctx.fill();

    // ctx.strokeStyle = "#c92a2a";
    // ctx.beginPath();
    // ctx.moveTo(this.x1, this.y1);
    // ctx.quadraticCurveTo(this.blinkX, this.blinkY, this.x2, this.y2);
    // ctx.stroke();

    ctx.strokeStyle = "#c92a2a";
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(mousePos.x, mousePos.y);
    ctx.closePath();
    ctx.stroke();
  }
}
