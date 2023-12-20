export default class Player {
  x: number;
  y: number;
  width: number;
  height: number;
  image: HTMLImageElement;
  rotation: number;

  constructor(x: number, y: number, width: number, height: number, imagePath: string) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.image = new Image();
    this.image.onload = () => {
      console.log('Player image loaded.');
    };
    this.image.onerror = (error) => {
      console.error('Failed to load player image:', error);
    };
    this.image.src = imagePath;
    this.rotation = 0;
  }

  // Move Functions For The Player
  moveLeft(): void {
    this.x -= 5;
    this.rotation = -90;
  }

  moveRight(): void {
    this.x += 5;
    this.rotation = 90;
  }

  moveUp(): void {
    this.y -= 5;
    this.rotation = 0;
  }

  moveDown(): void {
    this.y += 5;
    this.rotation = 180;
  }

  render(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D): void {
    ctx.save();
    ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
    ctx.rotate((this.rotation * Math.PI) / 180);
    ctx.drawImage(this.image, -this.width / 2, -this.height / 2, this.width, this.height); // Draw the image
    ctx.restore();
  }
}
