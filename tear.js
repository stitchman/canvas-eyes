export class Tear {
  constructor(width, color, total) {
    this.width = width;
    this.color = color;
    this.total = total;
  }

  resize(x, y) {
    this.x = x;
    this.y = y;

    this.gap = this.width / (this.total - 1);
    this.points = [];
    for (let i = 0; i < this.total; i++) {
      const point = {
        x: this.gap * i,
        y: this.getY(),
      };
      this.points[i] = point;
    }
  }

  update() {
    this.cur = index;
    this.cur += this.speed;
    this.y = this.fixedY + Math.sin(this.cur) * this.max;
  }

  draw(ctx) {}

  getY(max) {
    return Math.sin(x) * max;
  }
}
