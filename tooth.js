export class Tooth {
  constructor(x, y, width, height, index) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    index % 2 ? (this.direction = -1) : (this.direction = 1);
  }

  draw(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.scale(1, this.direction);

    ctx.fillStyle = "#ced4da";
    ctx.beginPath();
    ctx.moveTo(0, this.height);
    ctx.lineTo(this.width, -this.height);
    ctx.lineTo(this.width / 2, -this.height);
    ctx.lineTo(0, this.height);
    ctx.fill();
    ctx.closePath();

    ctx.fillStyle = "#f8f9fa";
    ctx.beginPath();
    ctx.moveTo(0, this.height);
    ctx.lineTo(this.width, -this.height);
    ctx.lineTo(-this.width, -this.height);
    ctx.lineTo(0, this.height);
    ctx.fill();
    ctx.closePath();
    ctx.restore();
  }
}
