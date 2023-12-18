import CanvasRenderer from "./CanvasRenderer.js";
import MouseListener from "./MouseListener.js";
import Scene from "./Scene.js";

export default class ShoppingScene extends Scene {
  private ShoppingBackground: HTMLImageElement;

  public constructor(maxX: number, maxY: number) {
    super(maxX, maxY);
    // Ff tijdelijke achtergrond voor de mail scene, deze moet nog worden aangepast
    this.ShoppingBackground = CanvasRenderer.loadNewImage("./assets/MainMenuGame.jpg");
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

  public getNextScene(): Scene | null {
    return null;
  }

  /**
   *
   * @param elapsed elapsed ms since last update
   */
  public update(elapsed: number): void {}

  /**
   * Render the scene to the canvas
   * @param canvas canvas to render to
   */
  public render(canvas: HTMLCanvasElement): void {
    document.querySelectorAll("button").forEach((button) => {
      button.remove();
    });   //alle buttons verwijderen van vorige pagina
    document.body.style.backgroundImage = `url(${this.ShoppingBackground.src})`;
    CanvasRenderer.writeText(canvas, 'Shopping Scene', canvas.width / 2, canvas.height / 2, 'center', 'Pixelated', 75, 'White');
  }
}
