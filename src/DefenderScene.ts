import CanvasRenderer from "./CanvasRenderer.js";
import MouseListener from "./MouseListener.js";
import Scene from "./Scene.js";
import homeScene from "./homeScene.js";
import winScene from "./winScene.js";
import Player from "./Player.js";

export default class DefenderScene extends Scene {

  private keyMap: { [key: string]: boolean };
  private currentDirection: string | null;
  private DefenderBackground: HTMLImageElement;
  private nextScene: Scene | null;
  private player: Player;

  // Amount of time the player has to complete the game in milliseconds
  private timeLimit: number = 300000;

  // Function to calculate the time score
  private timeScoreMinutesandSeconds(): string {
    let minutes: number = Math.floor((this.timeLimit / (1000 * 60)) % 60);
    let seconds: number = Math.floor((this.timeLimit / 1000) % 60);
    let minutesString: string = minutes < 10 ? "0" + minutes.toString() : minutes.toString();
    let secondsString: string = seconds < 10 ? "0" + seconds.toString() : seconds.toString();
    return minutesString + ":" + secondsString;
  }

  public constructor(maxX: number, maxY: number) {
    super(maxX, maxY);

    this.keyMap = {
      ArrowLeft: false,
      ArrowRight: false,
      ArrowUp: false,
      ArrowDown: false,
    };
    this.currentDirection = null;

    this.DefenderBackground = CanvasRenderer.loadNewImage("./assets/defender-background.png");
    this.player = new Player(maxX / 2, maxY / 2, 100, 100, "./assets/player.png");

    // Add event listener for keydown events
    document.addEventListener('keydown', this.handleKeyDown.bind(this));
    document.addEventListener('keyup', this.handleKeyUp.bind(this));
  }

  private handleKeyDown(event: KeyboardEvent): void {
    if (this.keyMap.hasOwnProperty(event.key)) {
      event.preventDefault();
      this.keyMap[event.key] = true;
      this.updateDirection();
    }
  }

  private handleKeyUp(event: KeyboardEvent): void {
    if (this.keyMap.hasOwnProperty(event.key)) {
      event.preventDefault();
      this.keyMap[event.key] = false;
      this.updateDirection();
    }
  }

  private updateDirection(): void {
    const keys = Object.keys(this.keyMap).filter((key) => this.keyMap[key]);
    if (keys.length === 0) {
      this.currentDirection = null;
    } else {
      this.currentDirection = keys[0];
    }
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
   * Get the next scene to run
   */
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

    // Update the time limit
    if (this.timeLimit > 0) {
      this.timeLimit -= elapsed;
      console.log(this.timeLimit);
    } else {
      console.log("Defender scene ended");
      this.getNextScene();
    }

    // Update the player's position
    if (this.currentDirection === 'ArrowLeft') {
      this.player.moveLeft();
    } else if (this.currentDirection === 'ArrowRight') {
      this.player.moveRight();
    } else if (this.currentDirection === 'ArrowUp') {
      this.player.moveUp();
    } else if (this.currentDirection === 'ArrowDown') {
      this.player.moveDown();
    }
  }

  /**
   * Render the scene to the canvas
   * @param canvas canvas to render to
   */
  public render(canvas: HTMLCanvasElement): void {
    document.querySelectorAll("button").forEach((button) => {
      button.remove();
    });
    // Render the background image
    document.body.style.backgroundImage = `url(${this.DefenderBackground.src})`;
    const ctx = canvas.getContext("2d");

    if (ctx) {
      // Render the player on the canvas
      this.player.render(canvas, ctx);
      // Render the time score on the canvas
      CanvasRenderer.writeText(canvas, this.timeScoreMinutesandSeconds(), canvas.width / 2, canvas.height * 0.05, "center", "Pixelated", 75, "White");
      CanvasRenderer.writeText(canvas, "Score: 24", canvas.width * 0.15, canvas.height * 0.05, "center", "Pixelated", 75, "White");
      CanvasRenderer.writeText(canvas, "Lives: X X X", canvas.width * 0.85, canvas.height * 0.05, "center", "Pixelated", 75, "White");
    }
  }
}
