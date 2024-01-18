import CanvasRenderer from "../CanvasRenderer.js";
import MouseListener from "../MouseListener.js";
import Scene from "../Scene.js";
import mailScene from "./mailScene.js";
import TerminalScene from "./terminalScene.js";
import DefenderScene from "./defenderScene.js";
import VPNScene from "./vpnScene.js";
import ShoppingScene from "./shoppingScene.js";
import ScoreManager from "../attributes/totalScore.js";

const scoreManager = ScoreManager.getInstance();
const totalScore = scoreManager.getTotalScore();


export default class homeScene extends Scene {
  private pcBackground: HTMLImageElement;
  private shoppingCart: HTMLImageElement;
  private defender: HTMLImageElement;
  private terminal: HTMLImageElement;
  private mail: HTMLImageElement;
  private vpn: HTMLImageElement;
  private nextScene: Scene | null;
  private mailNoNotif: HTMLImageElement;
  public setMailNoNotif: boolean = false;

  public constructor(maxX: number, maxY: number) {
    super(maxX, maxY);
    this.pcBackground = CanvasRenderer.loadNewImage("./assets/pcbackground.png");
    this.shoppingCart = CanvasRenderer.loadNewImage("./assets/shopping-cart.png");
    this.defender = CanvasRenderer.loadNewImage("./assets/defender.png");
    this.terminal = CanvasRenderer.loadNewImage("./assets/terminal.png");
    this.mail = CanvasRenderer.loadNewImage("./assets/mail.png");
    this.vpn = CanvasRenderer.loadNewImage("./assets/vpn.png");
    this.mailNoNotif = CanvasRenderer.loadNewImage("./assets/mail-no-notification.png");
  }

  /**
   * Process input from the mouse
   *
   * @param mouseListener mouse listener object
   */
  public processInput(mouseListener: MouseListener): void {
    if (mouseListener.getMousePosition().x > 0 && mouseListener.getMousePosition().x < 100 && mouseListener.getMousePosition().y > 20 && mouseListener.getMousePosition().y < 120) {
      if (mouseListener.buttonPressed(0)) {
        if (mailScene.usedMailScene == false) {
          mailScene.usedMailScene = true;
          this.nextScene = new mailScene(this.maxX, this.maxY);
        } else {
          alert("Mail scene already used");
        }
      }
      console.log("Mouse over mail");
    }
    if (mouseListener.getMousePosition().x > 120 && mouseListener.getMousePosition().x < 220 && mouseListener.getMousePosition().y > 20 && mouseListener.getMousePosition().y < 120) {
      if (mouseListener.buttonPressed(0)) {
        this.nextScene = new DefenderScene(this.maxX, this.maxY);
      }
      console.log("Mouse over Defender");
    }
    if (mouseListener.getMousePosition().x > 0 && mouseListener.getMousePosition().x < 100 && mouseListener.getMousePosition().y > 140 && mouseListener.getMousePosition().y < 240) {
      if (mouseListener.buttonPressed(0)) {
        this.nextScene = new TerminalScene(this.maxX, this.maxY);
      }
      console.log("Mouse over Terminal");
    }
    if (mouseListener.getMousePosition().x > 120 && mouseListener.getMousePosition().x < 220 && mouseListener.getMousePosition().y > 140 && mouseListener.getMousePosition().y < 240) {
      if (mouseListener.buttonPressed(0)) {
        this.nextScene = new VPNScene(this.maxX, this.maxY);
      }
      console.log("Mouse over VPN");
    }
    if (mouseListener.getMousePosition().x > 0 && mouseListener.getMousePosition().x < 100 && mouseListener.getMousePosition().y > 260 && mouseListener.getMousePosition().y < 360) {
      if (mouseListener.buttonPressed(0)) {
        this.nextScene = new ShoppingScene(this.maxX, this.maxY);
      }
      console.log("Mouse over Shopping");
    }
  }

  /**5
   *
   * @returns the next scene to be rendered. null if no change
   */
  public getNextScene(): Scene | null {
    if (this.nextScene instanceof mailScene) {
      return this.nextScene;
    } else if (this.nextScene instanceof DefenderScene) {
      return new DefenderScene(this.maxX, this.maxY);
    } else if (this.nextScene instanceof TerminalScene) {
      return new TerminalScene(this.maxX, this.maxY);
    } else if (this.nextScene instanceof VPNScene) {
      return new VPNScene(this.maxX, this.maxY);
    } else if (this.nextScene instanceof ShoppingScene) {
      return new ShoppingScene(this.maxX, this.maxY);
    } else {
      return null;
    }
  }

  public renderIcon(
    canvas: HTMLCanvasElement,
    icon: HTMLImageElement,
    x: number,
    y: number,
  ): void {
    CanvasRenderer.drawImage(canvas, icon, x, y);
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
    document.body.style.backgroundImage = `url(${this.pcBackground.src})`;
    CanvasRenderer.clearCanvas(canvas);
    this.renderIcon(canvas, this.shoppingCart, 0, 260)
    this.renderIcon(canvas, this.defender, 120, 20)
    this.renderIcon(canvas, this.terminal, 0, 140)
    if (mailScene.setMailNoNotif) {
      this.renderIcon(canvas, this.mailNoNotif, 0, 20)
    } else {
      this.renderIcon(canvas, this.mail, 0, 20)
    }
    this.renderIcon(canvas, this.vpn, 120, 140)
  }
}
