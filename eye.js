export class Eye {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.radius = Math.random() * 70 + 30;
    this.rw = this.radius;
    this.rh = this.radius;

    this.innerX = 0;
    this.innerY = 0;

    this.blinkSpeed = 10;
  }

  blink() {
    if (this.rh < 1 + this.blinkSpeed && this.blinkSpeed > 0) {
      this.blinkSpeed *= -1;
    } else if (this.rh === this.radius && this.blinkSpeed < 0) {
      this.rh = this.radius;
    } else {
      this.rh -= this.blinkSpeed;
    }
  }

  draw(ctx, mousePos) {
    this.blink();
    ctx.fillStyle = "#f8f9fa";
    ctx.beginPath();
    ctx.ellipse(this.x, this.y, this.rw, this.rh, 0, 0, Math.PI * 2);
    ctx.fill();

    //get inner x and y
    if (mousePos) {
      this.angle = Math.atan2(mousePos.y - this.y, mousePos.x - this.x);
      this.innerX = (this.radius / 2) * Math.cos(this.angle);
      this.innerY = (this.radius / 2) * Math.sin(this.angle);
    }

    //draw inner circle
    ctx.save();
    ctx.globalCompositeOperation = "source-atop";
    ctx.fillStyle = "#212529";
    ctx.beginPath();
    ctx.arc(
      this.innerX + this.x,
      this.innerY + this.y,
      this.radius / 2,
      0,
      Math.PI * 2
    );
    ctx.fill();
    ctx.restore();
  }
}
