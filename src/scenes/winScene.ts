import CanvasRenderer from "../CanvasRenderer.js";
import MouseListener from "../MouseListener.js";
import Scene from "../Scene.js";
import homeScene from "./homeScene.js";

export default class winScene extends Scene {
  private winBackground: HTMLImageElement;
  private clickNext: boolean = false;

  public constructor(maxX: number, maxY: number) {
    super(maxX, maxY);
    // Ff tijdelijke achtergrond voor de mail scene, deze moet nog worden aangepast
    this.winBackground = CanvasRenderer.loadNewImage("./assets/win_background.png");
  }

  /**
   * Process input from the mouse
   *
   * @param mouseListener mouse listener object
   */
  public processInput(mouseListener: MouseListener): void {
    if (mouseListener.buttonPressed(0)) {
      this.clickNext = true;
    }
  }

  public getNextScene(): Scene | null {
    if (this.clickNext === true) {
      return new homeScene(this.maxX, this.maxY);
    }
    return null;
  }

  /**
   *
   * @param elapsed elapsed ms since last update
   */
  public update(elapsed: number): void {
    if (this.clickNext) {
      console.log("Win scene ended");
      this.getNextScene();
    }
  }

  /**
   * Render the scene to the canvas
   * @param canvas canvas to render to
   */
  public render(canvas: HTMLCanvasElement): void {
    document.querySelectorAll("button").forEach((button) => {
      button.remove();
    }); //alle buttons verwijderen van vorige pagina
    document.body.style.backgroundImage = `url(${this.winBackground.src})`;
    CanvasRenderer.writeText(canvas, "Win scene", canvas.width / 2, canvas.height / 2, "center", "Pixelated", 75, "White");
    CanvasRenderer.writeText(canvas, "Click to continu", canvas.width / 2, canvas.height / 1.5, "center", "Pixelated", 75, "White");
  }
}
