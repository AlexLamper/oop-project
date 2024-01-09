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

  private mailButton: HTMLButtonElement;
  private mailButtonClicked: HTMLButtonElement;
  private defenderButton: HTMLButtonElement;
  private terminalButton: HTMLButtonElement;
  private vpnButton: HTMLButtonElement;
  private shoppingButton: HTMLButtonElement;
  private nextScene: Scene | null;
  // private usedMailScene: boolean = false;

  public constructor(maxX: number, maxY: number) {
    super(maxX, maxY);
    this.pcBackground = CanvasRenderer.loadNewImage("./assets/pcbackground.png");
    this.shoppingCart = CanvasRenderer.loadNewImage("./assets/shopping-cart.png");
    this.defender = CanvasRenderer.loadNewImage("./assets/defender.png");
    this.terminal = CanvasRenderer.loadNewImage("./assets/terminal.png");
    this.mail = CanvasRenderer.loadNewImage("./assets/mail.png");
    this.vpn = CanvasRenderer.loadNewImage("./assets/vpn.png");

    this.mailButton = this.createButton("./assets/mail.png", 20, 20, "mailButton");
    this.defenderButton = this.createButton("./assets/defender.png", 140, 20, "defenderButton");
    this.terminalButton = this.createButton("./assets/terminal.png", 20, 140, "terminalButton");
    this.vpnButton = this.createButton("./assets/vpn.png", 140, 140, "vpnButton");
    this.shoppingButton = this.createButton("./assets/shopping-cart.png", 20, 260, "shoppingButton");
    // this.mailButtonClicked = this.createButton("./assets/mail-no-notification.png", 20, 20);

    // Append the buttons to the document body or a container element
    document.body.appendChild(this.mailButton);
    document.body.appendChild(this.defenderButton);
    document.body.appendChild(this.terminalButton);
    document.body.appendChild(this.vpnButton);
    document.body.appendChild(this.shoppingButton);
    // document.body.appendChild(this.mailButtonClicked);
    // this.mailButtonClicked.style.display = "none"; // Hide the mailButtonClicked

    // Add click event listeners to buttons
    this.mailButton.addEventListener("click", this.onMailButtonClick.bind(this));
    // this.defenderButton.addEventListener("click", this.onDefenderButtonClick.bind(this));
    // this.terminalButton.addEventListener("click", this.onTerminalButtonClick.bind(this));
    // this.vpnButton.addEventListener("click", this.onVpnButtonClick.bind(this));
    // this.shoppingButton.addEventListener("click", this.onShoppingButtonClick.bind(this));
  }

  private createButton(imagePath: string, x: number, y: number, id: string): HTMLButtonElement {
    document.querySelectorAll(`button#${id}`).forEach((button) => {
      button.remove();
    });
    const button = document.createElement("button");
    button.style.width = "100px";
    button.style.height = "100px";
    button.style.position = "absolute";
    button.style.top = `${y}px`;
    button.style.left = `${x}px`;
    button.style.background = `url('${imagePath}') no-repeat center/cover`;
    button.style.border = "none";
    button.style.backgroundColor = "transparent"; // Set background color to transparent
    button.id = id;
    return button;
  }

  private onMailButtonClick(event: MouseEvent): void {
    if (mailScene.usedMailScene == false) {
      mailScene.usedMailScene = true;
      this.nextScene = new mailScene(this.maxX, this.maxY);
      // setTimeout(() => {
      //   this.mailButton.style.display = "none"; // Hide the mailButton
      //   this.mailButtonClicked.style.display = "block"; // Show the mailButtonClicked
      // }, 1000);
    } else {
      alert("Mail scene already used");
    }
  }

  private onDefenderButtonClick(event: MouseEvent): void {
    this.nextScene = new DefenderScene(this.maxX, this.maxY);
  }

  private onTerminalButtonClick(event: MouseEvent): void {
    this.nextScene = new TerminalScene(this.maxX, this.maxY);
  }
  private onVpnButtonClick(event: MouseEvent): void {
    this.nextScene = new VPNScene(this.maxX, this.maxY);
  }
  private onShoppingButtonClick(event: MouseEvent): void {
    this.nextScene = new ShoppingScene(this.maxX, this.maxY);
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
  }
}
