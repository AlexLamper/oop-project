import CanvasRenderer from "./CanvasRenderer.js";
import MouseListener from "./MouseListener.js";
import Scene from "./Scene.js";

export default class mailScene extends Scene {
  private mailBackground: HTMLImageElement;
  private newsarticle: HTMLImageElement;
  private newsarticleUpdated: boolean = false;
  private pcBackgroundDarkened: HTMLImageElement;
  private canClickAway: boolean = false;

  public constructor(maxX: number, maxY: number) {
    super(maxX, maxY);
    // Ff tijdelijke achtergrond voor de mail scene, deze moet nog worden aangepast
    this.mailBackground = CanvasRenderer.loadNewImage("./assets/pcbackground.png");
    this.newsarticle = CanvasRenderer.loadNewImage("./assets/newsarticle.png");
    this.pcBackgroundDarkened = CanvasRenderer.loadNewImage("./assets/pcbackgrounddarkend.png");
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
    if (this.newsarticleUpdated == false) {
      const image = document.createElement("img");
      setTimeout(() => {
        image.src = this.newsarticle.src;
        document.body.style.backgroundImage = `url(${this.pcBackgroundDarkened.src})`;
        const container = document.createElement("div");
        container.style.position = "absolute";
        container.style.width = `${this.newsarticle.width}px`;
        container.style.height = `${this.newsarticle.height}px`;
        container.style.left = `${canvas.width / 2 - this.newsarticle.width / 2}px`;
        container.style.top = `${canvas.height / 2 - this.newsarticle.height / 2}px`;
        container.style.transition = "all 0.5s ease-in-out"; // Updated transition property
        document.body.style.transition = "all 0.5s ease-in-out"; // Updated transition property
      

      image.style.width = "100%";
      image.style.height = "100%";
      image.style.objectFit = "cover";

      container.appendChild(image);
      document.body.appendChild(container); // Append container to document body

      container.style.opacity = "0";
      container.style.transform = "scale(0)";

      // Trigger reflow to apply initial styles
      void container.offsetWidth;

      container.style.opacity = "1";
      container.style.transform = "scale(1)";
      // Wait for the transition to complete
      this.canClickAway = false;
      setTimeout(() => {
        this.canClickAway = true;
      }, 5000); // Set delay here, 5000ms = 5 seconds

      document.addEventListener('click', () => {
        if (this.canClickAway == true) {
          container.style.opacity = "0";
          container.style.transform = "scale(0)";
          document.body.style.backgroundImage = `url(${this.mailBackground.src})`;
        }
      });

    }, 50);
      this.newsarticleUpdated = true;
    }
  }
}
