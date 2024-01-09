export default class Projectile {
  x: number;
  y: number;
  width: number;
  height: number;
  image: HTMLImageElement;
  rotation: number;

  constructor(x: number, y: number, width: number, height: number, imagePath: string, rotation: number) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.image = new Image();
    this.image.src = imagePath;
    this.rotation = rotation;
  }
  bulletLeft(): void {
    this.x -= 10;
  }
  bulletRight(): void {
    this.x += 10;
  }
  bulletUp(): void {
    this.y -= 10;
  }
  bulletDown(): void {
    this.y += 10;
  }

  update(): void {
    if (this.rotation === 90) {
      this.bulletRight();
    } else if (this.rotation === 180) {
      this.bulletDown();
    } else if (this.rotation === -90) {
      this.bulletLeft();
    } else if (this.rotation === 0) {
      this.bulletUp();
    }
  }
  render(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D): void {
    ctx.save();
    ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
    ctx.rotate((this.rotation * Math.PI) / 180);
    ctx.drawImage(this.image, -this.width / 2, -this.height / 2, this.width, this.height); // Draw the image
    ctx.restore();
  }
}
