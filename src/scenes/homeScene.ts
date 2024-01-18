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

  private mouseListener: MouseListener;

  // private mailButton: HTMLButtonElement;
  // private mailButtonClicked: HTMLButtonElement;
  // private defenderButton: HTMLButtonElement;
  // private terminalButton: HTMLButtonElement;
  // private vpnButton: HTMLButtonElement;
  // private shoppingButton: HTMLButtonElement;
  private nextScene: Scene | null;
  // private usedMailScene: boolean = false;
  private crossButton: HTMLButtonElement;

  public constructor(maxX: number, maxY: number) {
    super(maxX, maxY);
    this.pcBackground = CanvasRenderer.loadNewImage("./assets/pcbackground.png");
    this.shoppingCart = CanvasRenderer.loadNewImage("./assets/shopping-cart.png");
    this.defender = CanvasRenderer.loadNewImage("./assets/defender.png");
    this.terminal = CanvasRenderer.loadNewImage("./assets/terminal.png");
    this.mail = CanvasRenderer.loadNewImage("./assets/mail.png");
    this.vpn = CanvasRenderer.loadNewImage("./assets/vpn.png");

    // this.mailButton = this.createButton("./assets/mail.png", 20, 20, "mailButton");
    // this.defenderButton = this.createButton("./assets/defender.png", 140, 20, "defenderButton");
    // this.terminalButton = this.createButton("./assets/terminal.png", 20, 140, "terminalButton");
    // this.vpnButton = this.createButton("./assets/vpn.png", 140, 140, "vpnButton");
    // this.shoppingButton = this.createButton("./assets/shopping-cart.png", 20, 260, "shoppingButton");
    // this.crossButton = this.createButton("./assets/cross.png", 140, 20, "crossButton");
    // this.mailButtonClicked = this.createButton("./assets/mail-no-notification.png", 20, 20);

    // Add click event listeners to buttons
    // this.mailButton.addEventListener("click", this.onMailButtonClick.bind(this));
    // this.defenderButton.addEventListener("click", this.onDefenderButtonClick.bind(this));
    // this.terminalButton.addEventListener("click", this.onTerminalButtonClick.bind(this));
    // this.vpnButton.addEventListener("click", this.onVpnButtonClick.bind(this));
    // this.shoppingButton.addEventListener("click", this.onShoppingButtonClick.bind(this));
  }


  private onMailButtonClick(event: MouseEvent): void {
    if (mailScene.usedMailScene == false) {
      mailScene.usedMailScene = true;
      this.nextScene = new mailScene(this.maxX, this.maxY);
      this.crossButton.remove();
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
    if (mouseListener.getMousePosition().x > 0 && mouseListener.getMousePosition().x < 100 && mouseListener.getMousePosition().y > 20 && mouseListener.getMousePosition().y < 120) {
      if (mouseListener.buttonPressed(0)) {
        if (mailScene.usedMailScene == false) {
          mailScene.usedMailScene = true;
          this.nextScene = new mailScene(this.maxX, this.maxY);
          // this.crossButton.remove();
          // setTimeout(() => {
          //   this.mailButton.style.display = "none"; // Hide the mailButton
          //   this.mailButtonClicked.style.display = "block"; // Show the mailButtonClicked
          // }, 1000);
        } else {
          alert("Mail scene already used");
        }
      }
      console.log("Mouse over mail");
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

  private renderIcon(
    canvas: HTMLCanvasElement,
    icon: HTMLImageElement,
    x: number,
    y: number,
    onClick: () => void
  ): void {
    CanvasRenderer.drawImage(canvas, icon, x, y);

    const handleClick = (event: MouseEvent): void => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;
      if (
        mouseX >= x &&
        mouseX <= x + icon.width &&
        mouseY >= y &&
        mouseY <= y + icon.height
      ) {
        onClick();
      }
    };
    
    // document.addEventListener("click", handleClick.bind(this));
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

    this.renderIcon(canvas, this.shoppingCart, 0, 260, () => {
      console.log("Shopping cart clicked");
      this.nextScene = new ShoppingScene(this.maxX, this.maxY);
    });
    this.renderIcon(canvas, this.defender, 120, 20, () => {
      console.log("Defender clicked");
      this.nextScene = new DefenderScene(this.maxX, this.maxY);
    });
    this.renderIcon(canvas, this.terminal, 0, 140, () => {
      console.log("Terminal clicked");
      return new TerminalScene(this.maxX, this.maxY);
    });
    this.renderIcon(canvas, this.mail, 0, 20, () => {
      console.log("Mail clicked");
    });
    this.renderIcon(canvas, this.vpn, 120, 140, () => {
      console.log("VPN clicked");
      return new VPNScene(this.maxX, this.maxY);
    });
  }
}
