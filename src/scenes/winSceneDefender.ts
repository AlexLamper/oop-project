import CanvasRenderer from "../CanvasRenderer.js";
import MouseListener from "../MouseListener.js";
import Scene from "../Scene.js";
import homeScene from "./homeScene.js";
import ScoreManager from "../attributes/totalScore.js";

const facts = [
  "",
  "",
  "Did you know?",
  "- Defenders almost have 100% real-time protection rates.",
  "- Firewalls filter incoming and outgoing network traffic",
  "- Computer viruses date back to the 1970s.",
];

const paddingX = 20;
const paddingY = 40;

const textStyle = {
  font: "12px Arial",
  fillStyle: "White",
  textAlign: "left" as CanvasTextAlign,
  textBaseline: "top",
};

export default class winScene extends Scene {
  private winBackground: HTMLImageElement;
  private clickNext: boolean = false;

  public constructor(maxX: number, maxY: number) {
    super(maxX, maxY);
    this.winBackground = CanvasRenderer.loadNewImage("./assets/black-background.jpg");
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
    CanvasRenderer.writeText(canvas, "You completed Level 1", canvas.width / 2, canvas.height / 8, "center", "Pixelated", 75, "Green");
    for (let i = 0; i < facts.length; i++) {
      const x = paddingX;
      const y = paddingY + i * 100; // ruimte/padding tussen de feiten

      CanvasRenderer.writeText(canvas, facts[i], x, y, textStyle.textAlign, textStyle.font, null, textStyle.fillStyle);
  }
  CanvasRenderer.writeText(canvas, "Click to continue", canvas.width / 2, canvas.height - 30, "center", "Pixelated", 75, "Green");
  CanvasRenderer.writeText(canvas, `Defender score:  ${ScoreManager.defenderScore}`, canvas.width / 2, canvas.height - 90, "center", "Pixelated", 75, "Green");
}
}
