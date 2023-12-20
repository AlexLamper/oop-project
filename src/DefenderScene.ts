import CanvasRenderer from "./CanvasRenderer.js";
import MouseListener from "./MouseListener.js";
import Scene from "./Scene.js";
import homeScene from "./homeScene.js";
import winScene from "./winScene.js";

export default class DefenderScene extends Scene {
  private DefenderBackground: HTMLImageElement;
  private nextScene: Scene | null;
  private timeLimit: number = 300000;

  private timeScoreMinutesandSeconds(): string {
    let minutes: number = Math.floor((this.timeLimit / (1000 * 60)) % 60);
    let seconds: number = Math.floor((this.timeLimit / 1000) % 60);
    let minutesString: string = minutes < 10 ? "0" + minutes.toString() : minutes.toString();
    let secondsString: string = seconds < 10 ? "0" + seconds.toString() : seconds.toString();
    return minutesString + ":" + secondsString;
  }

  public constructor(maxX: number, maxY: number) {
    super(maxX, maxY);
    // Ff tijdelijke achtergrond voor de mail scene, deze moet nog worden aangepast
    this.DefenderBackground = CanvasRenderer.loadNewImage("./assets/final-background.png");
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
    if (this.timeLimit <= 0) {
      return new winScene(this.maxX, this.maxY);
    }
    return null;
  }

  /**
   *
   * @param elapsed elapsed ms since last update
   */
  public update(elapsed: number): void {
    if (this.timeLimit > 0) {
      this.timeLimit -= elapsed;
      console.log(this.timeLimit);
    } else {
      console.log("Defender scene ended");
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
    document.body.style.backgroundImage = `url(${this.DefenderBackground.src})`;
    CanvasRenderer.writeText(canvas, "Defender Scene", canvas.width / 2, canvas.height / 2, "center", "Pixelated", 75, "White");
    CanvasRenderer.writeText(canvas, this.timeScoreMinutesandSeconds(), canvas.width / 2, canvas.height * 0.05, "center", "Pixelated", 75, "White");
  }
}
