export default class Portal {
  x: number;
  y: number;
  width: number;
  height: number;
  image: HTMLImageElement;
  lives: number;
  isAlive: boolean;

  constructor(x: number, y: number, width: number, height: number, imagePath: string) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.image = new Image();
    this.image.src = imagePath;
    this.lives = 3;
    this.isAlive = true;
  }

  public portalState() {
    if (this.lives === 3) {
      return (this.image.src = "./assets/portal-gray.png");
    } else if (this.lives === 2) {
      return (this.image.src = "./assets/portal-gray-damaged1.png");
    } else if (this.lives === 1) {
      return (this.image.src = "./assets/portal-gray-damaged2.png");
    } else {
      return console.log("Portal is destroyed");
    }
  }

  public hitByProjectile() {
    if (this.isAlive) {
      this.lives--;
      if (this.lives <= 0) {
        this.isAlive = false;
      }
    }
  }
  render(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D): void {
    ctx.save();
    ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
    ctx.drawImage(this.image, -this.width / 2, -this.height / 2, this.width, this.height);
    ctx.restore();
  }
}
