import CanvasRenderer from "../../CanvasRenderer.js";
import PowerUpItems from "../PowerUpItems.js";

export default class Turbo extends PowerUpItems {
  private turboActive: boolean = false;

  private turboTimer: number = 0;

  public constructor() {
    super();
    this.image = CanvasRenderer.loadNewImage("./assets/turbo.png");
    this.posX = Math.random() * (window.innerWidth - this.image.width) + this.image.width;
    this.posY = Math.random() * (window.innerHeight - this.image.height) + this.image.height;
  }
}
