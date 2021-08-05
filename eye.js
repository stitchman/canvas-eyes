export class Eye {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.radius = Math.random() * 100 + 20;
    this.rw = this.radius;
    this.rh = 0;

    this.originX = this.x;
    this.originY = this.y;

    this.total = 60;
    this.gap = 1 / this.total;
    this.originPos = [];
    this.pos = [];

    for (let i = 0; i < this.total; i++) {
      const pos = this.getEllipsePoint(this.radius, this.radius, this.gap * i);
      pos.x += (Math.random() * this.radius) / 50;
      pos.y += (Math.random() * this.radius) / 50;
      this.originPos[i] = pos;
    }

    for (let i = 0; i < this.total; i++) {
      const pos = this.getEllipsePoint(this.rw, this.rh, this.gap * i);
      this.pos[i] = pos;
    }

    this.blinkSpeed = 13;
    this.originBlinkSpeed = this.blinkSpeed;

    this.irisX = this.x;
    this.irisY = this.y;
    this.irisRadius = this.radius / 6;

    const irisColors = [
      "#fd7e14",
      "#ffd43b",
      "#82c91e",
      "#2f9e44",
      "#099268",
      "#22b8cf",
      "#1971c2",
      "#3b5bdb",
      "#6741d9",
      "#9c36b5",
      "#c2255c",
      "#e03131",
      "#212529",
    ];
    this.irisColor = irisColors[Math.floor(Math.random() * irisColors.length)];

    this.drawIris = {
      round: (ctx) => {
        ctx.arc(this.irisX, this.irisY, this.irisRadius / 1.5, 0, Math.PI * 2);
      },
      snake: (ctx) => {
        ctx.moveTo(this.irisX, this.irisY + this.irisRadius);
        ctx.quadraticCurveTo(
          this.irisX + this.irisRadius,
          this.irisY,
          this.irisX,
          this.irisY - this.irisRadius
        );
        ctx.quadraticCurveTo(
          this.irisX - this.irisRadius,
          this.irisY,
          this.irisX,
          this.irisY + this.irisRadius
        );
      },
      cross: (ctx) => {
        const innerRadius = this.irisRadius / 5;
        ctx.save();
        ctx.translate(this.irisX, this.irisY);
        ctx.moveTo(this.irisRadius, 0);
        ctx.lineTo(innerRadius, innerRadius);
        ctx.lineTo(0, this.irisRadius);
        ctx.lineTo(-innerRadius, innerRadius);
        ctx.lineTo(-this.irisRadius, 0);
        ctx.lineTo(-innerRadius, -innerRadius);
        ctx.lineTo(0, -this.irisRadius);
        ctx.lineTo(innerRadius, -innerRadius);
        ctx.lineTo(this.irisRadius, 0);
        ctx.restore();
      },
    };

    const irisKeys = Object.keys(this.drawIris);
    const irisIndex = Math.floor(Math.random() * irisKeys.length);

    this.irisShape = irisKeys[irisIndex];
  }

  blink() {
    if (this.rh < 1 + this.blinkSpeed && this.blinkSpeed > 0) {
      this.blinkSpeed *= -1;
    } else if (this.rh >= this.radius && this.blinkSpeed <= 0) {
      const randInt = Math.random() * 100;
      if (randInt < 0.3) {
        this.blinkSpeed = this.originBlinkSpeed;
      } else {
        this.pos.forEach((pos, i) => {
          pos.x = this.originPos[i].x;
          pos.y = this.originPos[i].y;
        });
      }
    } else {
      this.rh -= this.blinkSpeed;
      for (let i = 0; i < this.total; i++) {
        const pos = this.getEllipsePoint(this.rw, this.rh, this.gap * i);
        this.pos[i] = pos;
      }
    }
  }

  draw(ctx, mousePos) {
    this.blink();

    //draw ellipse
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.fillStyle = "#f8f9fa";
    ctx.beginPath();
    let pos = this.pos[0];
    ctx.moveTo(pos.x, pos.y);
    for (let i = 1; i < this.total; i++) {
      const pos = this.pos[i];
      ctx.lineTo(pos.x, pos.y);
    }
    ctx.fill();
    ctx.restore();

    //move eye slightly to the pointer
    if (mousePos) {
      this.angle = Math.atan2(mousePos.y - this.y, mousePos.x - this.x);
      if (Math.hypot(this.x - mousePos.x, this.y - mousePos.y) > 10) {
        this.x = (this.radius / 10) * Math.cos(this.angle) + this.originX;
        this.y = (this.radius / 10) * Math.sin(this.angle) + this.originY;
      }

      // get irisX,Y
      this.irisX = (this.radius / 10) * Math.cos(this.angle) + this.x;
      this.irisY = (this.radius / 10) * Math.sin(this.angle) + this.y;
    }

    //draw iris

    ctx.save();
    ctx.globalCompositeOperation = "source-atop";
    ctx.fillStyle = this.irisColor;
    ctx.beginPath();
    this.drawIris[this.irisShape](ctx);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  getEllipsePoint(a, b, t) {
    const theta = Math.PI * 2 * t;
    return {
      x: a * Math.cos(theta),
      y: b * Math.sin(theta),
    };
  }

  update;
}
