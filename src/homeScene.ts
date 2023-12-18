import CanvasRenderer from "./CanvasRenderer.js";
import MouseListener from "./MouseListener.js";
import Scene from "./Scene.js";
import Level from "./Level.js";
import mailScene from "./mailScene.js";

export default class homeScene extends Scene {
  private pcBackground: HTMLImageElement;
  private shoppingCart: HTMLImageElement;
  private defender: HTMLImageElement;
  private terminal: HTMLImageElement;
  private mail: HTMLImageElement;
  private vpn: HTMLImageElement;

  private mailButton: HTMLButtonElement;
  private defenderButton: HTMLButtonElement;
  private terminalButton: HTMLButtonElement;
  private vpnButton: HTMLButtonElement;
  private shoppingButton: HTMLButtonElement;

  public constructor(maxX: number, maxY: number) {
    super(maxX, maxY);
    this.pcBackground = CanvasRenderer.loadNewImage("./assets/pcbackground.png");
    this.shoppingCart = CanvasRenderer.loadNewImage("./assets/shopping-cart.png");
    this.defender = CanvasRenderer.loadNewImage("./assets/defender.png");
    this.terminal = CanvasRenderer.loadNewImage("./assets/terminal.png");
    this.mail = CanvasRenderer.loadNewImage("./assets/mail.png");
    this.vpn = CanvasRenderer.loadNewImage("./assets/vpn.png");

    this.mailButton = this.createButton("./assets/mail.png", 20, 20);
    this.defenderButton = this.createButton("./assets/defender.png", 140, 20);
    this.terminalButton = this.createButton("./assets/terminal.png", 20, 140);
    this.vpnButton = this.createButton("./assets/vpn.png", 140, 140);
    this.shoppingButton = this.createButton("./assets/shopping-cart.png", 20, 260);

    // Append the buttons to the document body or a container element
    document.body.appendChild(this.mailButton);
    document.body.appendChild(this.defenderButton);
    document.body.appendChild(this.terminalButton);
    document.body.appendChild(this.vpnButton);
    document.body.appendChild(this.shoppingButton);

    // Add click event listeners to buttons
    this.mailButton.addEventListener('click', this.onMailButtonClick.bind(this));
    this.defenderButton.addEventListener('click', this.onDefenderButtonClick.bind(this));
    this.terminalButton.addEventListener('click', this.onTerminalButtonClick.bind(this));
    this.vpnButton.addEventListener('click', this.onVpnButtonClick.bind(this));
    this.shoppingButton.addEventListener('click', this.onShoppingButtonClick.bind(this));
  }

  private createButton(imagePath: string, x: number, y: number): HTMLButtonElement {
    const button = document.createElement('button');
    button.style.width = '100px';
    button.style.height = '100px';
    button.style.position = 'absolute';
    button.style.top = `${y}px`;
    button.style.left = `${x}px`;
    button.style.background = `url('${imagePath}') no-repeat center/cover`;
    button.style.border = 'none';
    button.style.backgroundColor = 'transparent'; // Set background color to transparent
    return button;
  }

  private onMailButtonClick(event: MouseEvent): void {
    // Handle the click event for the mailButton
    console.log('Mail button clicked!');
  }

  private onDefenderButtonClick(event: MouseEvent): void {
    // Handle the click event for the defenderButton
    console.log('Defender button clicked!');
    // Add your logic here for when the defenderButton is clicked
  }

  private onTerminalButtonClick(event: MouseEvent): void {
    // Handle the click event for the terminalButton
    console.log('Terminal button clicked!');
    // Add your logic here for when the terminalButton is clicked
  }

  private onVpnButtonClick(event: MouseEvent): void {
    // Handle the click event for the vpnButton
    console.log('VPN button clicked!');
    // Add your logic here for when the vpnButton is clicked
  }

  private onShoppingButtonClick(event: MouseEvent): void {
    // Handle the click event for the shoppingButton
    console.log('Shopping button clicked!');
    // Add your logic here for when the shoppingButton is clicked
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
    // if (op drukken ofzo) {
    //   return new mailScene(this.maxX, this.maxY);
    // } else {
    //   return null;
    // }
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
    document.body.style.backgroundImage = `url(${this.pcBackground.src})`;
    // CanvasRenderer.drawImage(canvas, this.shoppingCart, canvas.width / 2 - this.shoppingCart.width - 625, canvas.height / 2 - this.shoppingCart.height - 200);
    // CanvasRenderer.drawImage(canvas, this.mail, canvas.width / 2 - this.mail.width - 625, canvas.height / 2 - this.mail.height + 75);
    // CanvasRenderer.drawImage(canvas, this.defender, canvas.width / 2 - this.defender.width - 225, canvas.height / 2 - this.defender.height - 150);
    // CanvasRenderer.drawImage(canvas, this.vpn, canvas.width / 2 - this.vpn.width - 200, canvas.height / 2 - this.vpn.height + 125);
    // CanvasRenderer.drawImage(canvas, this.terminal, canvas.width / 2 - this.terminal.width -100, canvas.height / 2 - this.terminal.height + 600);
  }


}
