export class Eye {
  constructor() {
    this.radius = 100;
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
    this.cx = this.x;
    this.cy = this.y + this.radius;

    //get circle point
    this.total = 150;
    this.gap = 1 / this.total;
    this.originTopPos = [];
    this.topPos = [];
    for (let i = 0; i < this.total; i++) {
      const pos = this.getTopPoint(this.radius, this.gap * i);
      this.originTopPos[i] = pos;
      this.topPos[i] = pos;
    }
    this.originBottomPos = [];
    this.bottomPos = [];
    for (let i = 0; i < this.total; i++) {
      const pos = this.getBottomPoint(this.radius, this.gap * i);
      this.originBottomPos[i] = pos;
      this.bottomPos[i] = pos;
    }

    //get blink point
    this.blinkPos = [];
    for (let i = 0; i < this.total; i++) {
      const pos = this.getBlinkPoint(this.gap * i);
      this.blinkPos[i] = pos;
    }

    //get blink time, speed
    this.blinkTime = 30;
    this.topBlinkSpeed = [];
    for (let i = 0; i < this.total; i++) {
      const speed =
        (this.blinkPos[i].y - this.originTopPos[i].y) / this.blinkTime;
      this.topBlinkSpeed[i] = speed;
    }
    this.bottomBlinkSpeed = [];
    for (let i = 1; i < this.total; i++) {
      const speed =
        (this.blinkPos[this.total - i].y - this.originBottomPos[i].y) /
        this.blinkTime;
      this.bottomBlinkSpeed[i] = speed;
    }
  }

  blink() {
    for (let i = 0; i < this.total; i++) {
      if (this.topPos[i].y > this.blinkPos[i].y && this.topBlinkSpeed[i] > 0) {
        this.topPos[i].y = this.blinkPos[i].y;
        setTimeout(() => {
          this.topBlinkSpeed[i] *= -1;
        }, 0);
      } else if (this.topPos[i].y < this.originTopPos[i].y) {
        this.topBlinkSpeed[i] = 0;
        this.topPos[i] = this.originTopPos[i];
      } else {
        this.topPos[i] = {
          x: this.topPos[i].x,
          y: this.topPos[i].y + this.topBlinkSpeed[i],
        };
      }
    }

    for (let i = 1; i < this.total; i++) {
      if (
        this.bottomPos[i].y < this.blinkPos[i].y &&
        this.bottomBlinkSpeed[i] < 0
      ) {
        this.bottomBlinkSpeed[i] *= -1;
      } else if (this.bottomPos[i].y > this.originBottomPos[i].y) {
        this.bottomBlinkSpeed[i] = 0;
        this.bottomPos[i] = this.originBottomPos[i];
      } else {
        this.bottomPos[i] = {
          x: this.bottomPos[i].x,
          y: this.bottomPos[i].y + this.bottomBlinkSpeed[i],
        };
      }
    }
  }

  draw(ctx, mousePos) {
    this.blink();
    //draw outer circle
    ctx.fillStyle = "#f8f9fa";
    ctx.beginPath();
    let topPos = this.topPos[0];
    ctx.moveTo(topPos.x, topPos.y);
    for (let i = 1; i < this.total; i++) {
      const topPos = this.topPos[i];
      ctx.lineTo(topPos.x, topPos.y);
    }
    for (let i = 0; i < this.total; i++) {
      const bottomPos = this.bottomPos[i];
      ctx.lineTo(bottomPos.x, bottomPos.y);
    }
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

    //draw blink line
    // ctx.strokeStyle = "#c92a2a";
    // ctx.beginPath();
    // ctx.moveTo(this.x1, this.y1);
    // for (let i = 1; i < this.total; i++) {
    //   const blinkPos = this.blinkPos[i];
    //   ctx.lineTo(blinkPos.x, blinkPos.y);
    // }
    // ctx.lineTo(this.x2, this.y2);
    // ctx.stroke();

    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.ellipse(this.x, this.y, 200, 200, 0, 0, 2 * Math.PI);
    ctx.fill();
  }

  getTopPoint(radius, t) {
    return {
      x: this.x1 + radius * 2 * t,
      y: this.y - Math.sqrt(radius ** 2 - (-radius + radius * 2 * t) ** 2),
    };
  }

  getBottomPoint(radius, t) {
    return {
      x: this.x2 - radius * 2 * t,
      y: this.y + Math.sqrt(radius ** 2 - (radius - t * 2 * radius) ** 2),
    };
  }

  getBlinkPoint(t) {
    return {
      x: (1 - t) ** 2 * this.x1 + 2 * t * (1 - t) * this.cx + t ** 2 * this.x2,
      y: (1 - t) ** 2 * this.y1 + 2 * t * (1 - t) * this.cy + t ** 2 * this.y2,
    };
  }
}
