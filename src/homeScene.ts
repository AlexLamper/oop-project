import CanvasRenderer from "./CanvasRenderer.js";
import MouseListener from "./MouseListener.js";
import Scene from "./Scene.js";
import Level from "./Level.js";

export default class homeScene extends Scene {
  private pcBackground: HTMLImageElement;
  private shoppingCart: HTMLImageElement;
  private defender: HTMLImageElement;
  private terminal: HTMLImageElement;
  private mail: HTMLImageElement;
  private vpn: HTMLImageElement;

  public constructor(maxX: number, maxY: number) {
    super(maxX, maxY);
    this.pcBackground = CanvasRenderer.loadNewImage("./assets/pcbackground.png");
    this.shoppingCart = CanvasRenderer.loadNewImage("./assets/shopping-cart.png");
    this.defender = CanvasRenderer.loadNewImage("./assets/defender.png");
    this.terminal = CanvasRenderer.loadNewImage("./assets/terminal.png");
    this.mail = CanvasRenderer.loadNewImage("./assets/mail.png");
    this.vpn = CanvasRenderer.loadNewImage("./assets/vpn.png");
  }

  /**
   * Process input from the mouse
   *
   * @param mouseListener mouse listener object
   */
  public processInput(mouseListener: MouseListener): void {
    if (mouseListener.buttonPressed(0)) {
    }
  }

  /**
   *
   * @param elapsed elapsed ms since last update
   */
  public update(elapsed: number): void {}

  /**
   *
   * @returns the next scene to be rendered. null if no change
   */
  public getNextScene(): Scene | null {
    // if (this.starting) {
    //   return new Level(this.maxX, this.maxY);
    // }
    return null;
  }

  /**
   * Render the scene to the canvas
   * @param canvas canvas to render to
   */
  public render(canvas: HTMLCanvasElement): void {
    document.body.style.backgroundImage = `url(${this.pcBackground.src})`;
    CanvasRenderer.drawImage(canvas, this.shoppingCart, canvas.width / 2 - this.shoppingCart.width - 625, canvas.height / 2 - this.shoppingCart.height - 200);
    CanvasRenderer.drawImage(canvas, this.mail, canvas.width / 2 - this.mail.width - 625, canvas.height / 2 - this.mail.height + 75);
    CanvasRenderer.drawImage(canvas, this.defender, canvas.width / 2 - this.defender.width - 225, canvas.height / 2 - this.defender.height - 150);
    CanvasRenderer.drawImage(canvas, this.vpn, canvas.width / 2 - this.vpn.width - 200, canvas.height / 2 - this.vpn.height + 125);
    CanvasRenderer.drawImage(canvas, this.terminal, canvas.width / 2 - this.terminal.width -100, canvas.height / 2 - this.terminal.height + 600);
  }
}
