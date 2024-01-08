import CanvasRenderer from "../CanvasRenderer.js";
import MouseListener from "../MouseListener.js";
import Scene from "../Scene.js";
import homeScene from "./homeScene.js";
import winScene from "./winScene.js";
import Player from "../attributes/player.js";
import Projectile from "../attributes/projectiles.js";
import Enemy from "../attributes/enemies.js";
import portal from "../attributes/portals.js";

export default class DefenderScene extends Scene {
  private keyMap: { [key: string]: boolean };
  private currentDirection: string | null;
  private DefenderBackground: HTMLImageElement;
  private nextScene: Scene | null;
  private player: Player;
  private projectile: Projectile;
  private projectiles: Projectile[] = [];
  private enemies: Enemy[] = [];
  private portals: portal[] = [];

  // Amount of time the player has to complete the game in milliseconds
  private timeLimit: number = 150000;

  private portalSpawnTimer: number = 0;
  private portalSpawnInterval: number = 6000;

  private enemySpawnTimer: number = 0;
  private enemySpawnInterval: number = 4000;

  // Create spawn point coordinates, width and height for the enemies
  private spawnPointWidth = 150;
  private spawnPointHeight = 135;

  // Function to calculate the time score
  private timeScoreMinutesandSeconds(): string {
    let minutes: number = Math.floor((this.timeLimit / (1000 * 60)) % 60);
    let seconds: number = Math.floor((this.timeLimit / 1000) % 60);
    let minutesString: string = minutes < 10 ? "0" + minutes.toString() : minutes.toString();
    let secondsString: string = seconds < 10 ? "0" + seconds.toString() : seconds.toString();
    return minutesString + ":" + secondsString;
  }

  // Constructor for the Defender Scene
  public constructor(maxX: number, maxY: number) {
    super(maxX, maxY);

    this.keyMap = {
      ArrowLeft: false,
      ArrowRight: false,
      ArrowUp: false,
      ArrowDown: false,
    };
    this.currentDirection = null;

    this.DefenderBackground = CanvasRenderer.loadNewImage("./assets/test-defender-background.png");
    this.player = new Player(maxX / 2, maxY / 2, 100, 100, "./assets/player.png");

    // Add event listener for keydown events
    document.addEventListener("keydown", this.handleKeyDown.bind(this));
    document.addEventListener("keyup", this.handleKeyUp.bind(this));
    document.addEventListener("click", this.handleClick.bind(this));
  }

  // Handle keydown events
  private handleKeyDown(event: KeyboardEvent): void {
    if (this.keyMap.hasOwnProperty(event.key)) {
      event.preventDefault();
      this.keyMap[event.key] = true;
      this.updateDirection();
    }
  }

  // Handle keyup events
  private handleKeyUp(event: KeyboardEvent): void {
    if (this.keyMap.hasOwnProperty(event.key)) {
      event.preventDefault();
      this.keyMap[event.key] = false;
      this.updateDirection();
    }
  }

  // Function to fix the position of the projectile
  private fixPositionX(): number {
    if (this.player.rotation === 0) {
      return this.player.x + 34;
    } else if (this.player.rotation === 180) {
      return this.player.x + 36;
    } else if (this.player.rotation === 90) {
      return this.player.x + 58;
    }
    return this.player.x;
  }

  // Function to fix the position of the projectile
  private fixPositionY(): number {
    if (this.player.rotation === 180) {
      return this.player.y + 58;
    } else if (this.player.rotation === 90) {
      return this.player.y + 34;
    } else if (this.player.rotation === -90) {
      return this.player.y + 36;
    }
    return this.player.y;
  }

  // Function to handle the click event
  private handleClick(event: MouseEvent): void {
    this.projectiles.push(new Projectile(this.fixPositionX(), this.fixPositionY(), 30, 30, "./assets/bullet-green.png", this.player.rotation));
  }

  // Function to update the direction of the player
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

  public portalsSpawn(): void {
    const maxPortals = 3; // Maximum number of portals allowed
    const portalCount = this.portals.length;

    // Initial spawn of one portal
    if (portalCount < maxPortals) {
      this.spawnPortal();
    }

    // Use a timeout loop to spawn additional portals at random intervals
    const spawnInterval = 5000; // Initial spawn interval (between 5 to 15 seconds)
    const minSpawnDelay = 5000; // Minimum time before next spawn
    const maxSpawnDelay = 15000; // Maximum time before next spawn

    const spawnAdditionalPortal = () => {
      const newPortalCount = this.portals.length;
      if (newPortalCount < maxPortals) {
        this.spawnPortal();
      }

      if (newPortalCount < maxPortals) {
        const nextSpawnDelay = Math.floor(Math.random() * (maxSpawnDelay - minSpawnDelay + 1)) + minSpawnDelay;
        setTimeout(spawnAdditionalPortal, nextSpawnDelay);
      }
    };

    setTimeout(spawnAdditionalPortal, spawnInterval);
  }

  private spawnPortal(): void {
    // Calculate random coordinates within the specified range
    const randomX = Math.floor(Math.random() * (1800 - 50 + 1)) + 50;
    const randomY = Math.floor(Math.random() * (900 - 50 + 1)) + 50;

    const newPortal = new portal(randomX, randomY, 100, 100, "./assets/portal-gray.png");
    this.portals.push(newPortal);
  }

  /**
   *
   * @param elapsed elapsed ms since last update
   */
  // ...

  public update(elapsed: number): void {
    // Update the time limit
    if (this.timeLimit > 0) {
      this.timeLimit -= elapsed;
      console.log(this.timeLimit);
    } else {
      console.log("Defender scene ended");
      this.getNextScene();
    }

    this.projectiles.forEach((projectile) => {
      projectile.update();
    });

    // Update the player's position
    if (this.currentDirection === "ArrowLeft") {
      this.player.moveLeft();
    } else if (this.currentDirection === "ArrowRight") {
      this.player.moveRight();
    } else if (this.currentDirection === "ArrowUp") {
      this.player.moveUp();
    } else if (this.currentDirection === "ArrowDown") {
      this.player.moveDown();
    }

    // Update enemies
    const playerX = this.player.x;
    const playerY = this.player.y;
    this.enemies.forEach((enemy) => {
      enemy.update(playerX, playerY);
    });

    // Collision detection between projectiles and enemies
    for (let i = 0; i < this.projectiles.length; i++) {
      const projectile = this.projectiles[i];
      for (let j = 0; j < this.enemies.length; j++) {
        const enemy = this.enemies[j];

        // Calculate bounding box coordinates for projectile and enemy
        const projectileBox = {
          x: projectile.x,
          y: projectile.y,
          width: projectile.width,
          height: projectile.height,
        };

        const enemyBox = {
          x: enemy.x,
          y: enemy.y,
          width: enemy.width,
          height: enemy.height,
        };

        // Check for overlap between bounding boxes
        if (projectileBox.x < enemyBox.x + enemyBox.width && projectileBox.x + projectileBox.width > enemyBox.x && projectileBox.y < enemyBox.y + enemyBox.height && projectileBox.y + projectileBox.height > enemyBox.y) {
          // Remove the enemy from the array when hit by the projectile
          this.enemies.splice(j, 1);
          this.projectiles.splice(i, 1);
          // Decrement j to account for the removed enemy
          j--;
        }
      }
    }

    // Collision detection between projectiles and portals
    for (let i = 0; i < this.projectiles.length; i++) {
      const projectile = this.projectiles[i];
      for (let j = 0; j < this.portals.length; j++) {
        const portal = this.portals[j];

        // Calculate bounding box coordinates for projectile and portal
        const projectileBox = {
          x: projectile.x,
          y: projectile.y,
          width: projectile.width,
          height: projectile.height,
        };

        const portalBox = {
          x: portal.x,
          y: portal.y,
          width: portal.width,
          height: portal.height,
        };

        // Check for overlap between bounding boxes
        if (projectileBox.x < portalBox.x + portalBox.width && projectileBox.x + projectileBox.width > portalBox.x && projectileBox.y < portalBox.y + portalBox.height && projectileBox.y + projectileBox.height > portalBox.y) {
          // Remove the portal from the array when hit by the projectile
          this.portals.splice(j, 1);
          this.projectiles.splice(i, 1);
          // Decrement j to account for the removed portal
          j--;

          // Handle portal hit logic here (e.g., decrease portal lives)
          portal.hitByProjectile();
        }
      }
    }

    // Control portal spawn
    this.portalSpawnTimer += elapsed;
    if (this.portalSpawnTimer >= this.portalSpawnInterval + Math.floor(Math.random() * 5000)) {
      this.portalSpawnTimer = 0;
      this.portalsSpawn();
    }

    this.enemySpawnTimer += elapsed;
    if (this.enemySpawnTimer >= this.enemySpawnInterval + Math.floor(Math.random() * 3000)) {
      this.enemySpawnTimer = 0;
      this.spawnEnemiesFromPortals();
    }
  }

  // Function to spawn enemies from existing portals
  private spawnEnemiesFromPortals(): void {
    const numberOfEnemies = 1; // Adjust the number of enemies as needed

    // Iterate through each portal and spawn enemies
    this.portals.forEach((portal) => {
      const spawnX = portal.x;
      const spawnY = portal.y;
      this.spawnEnemiesFromSpawnPoint(numberOfEnemies, spawnX, spawnY, 0); // Spawn instantly from portals
    });
  }

  // Function to spawn enemies from the spawn point
  public spawnEnemiesFromSpawnPoint(numberOfEnemies: number, spawnX: number, spawnY: number, spawnInterval: number): void {
    const enemyImagePath = "./assets/enemy-red.png";
    let enemyCount = 0;

    // Spawn an enemy every spawnInterval milliseconds
    const spawnTimer = setInterval(() => {
      if (enemyCount >= numberOfEnemies) {
        clearInterval(spawnTimer);
        return;
      }

      // Create a new enemy at the spawn point
      const newEnemy = new Enemy(spawnX, spawnY, 70, 70, enemyImagePath);

      // Add the new enemy to the enemies array
      this.enemies.push(newEnemy);

      enemyCount++;
    }, spawnInterval);
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
      // Render the projectiles on the canvas
      this.projectiles.forEach((projectile) => {
        projectile.render(canvas, ctx);
      });
      // Render the enemies on the canvas
      this.enemies.forEach((enemy) => {
        enemy.render(canvas, ctx); // Implement a render method in the Enemy class
      });

      this.portals.forEach((portal) => {
        portal.render(canvas, ctx);
      });
      // Render the time, score and lives on the canvas
      CanvasRenderer.writeText(canvas, this.timeScoreMinutesandSeconds(), canvas.width / 2, canvas.height * 0.05, "center", "Pixelated", 75, "White");
      CanvasRenderer.writeText(canvas, "Score: 24", canvas.width * 0.15, canvas.height * 0.05, "center", "Pixelated", 75, "White");
      CanvasRenderer.writeText(canvas, "Lives: X X X", canvas.width * 0.85, canvas.height * 0.05, "center", "Pixelated", 75, "White");
    }
  }
}
