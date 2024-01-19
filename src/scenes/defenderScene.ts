import CanvasRenderer from "../CanvasRenderer.js";
import MouseListener from "../MouseListener.js";
import Scene from "../Scene.js";
import homeScene from "./homeScene.js";
import winScene from "./winScene.js";
import Player from "../attributes/player.js";
import Projectile from "../attributes/projectiles.js";
import Enemy from "../attributes/enemies.js";
import portal from "../attributes/portals.js";
import PowerUpItems from "../attributes/PowerUpItems.js";
import Coin from "../attributes/powerup/Coin.js";
import Turbo from "../attributes/powerup/Turbo.js";

import ScoreManager from "../attributes/totalScore.js";

const scoreManager = ScoreManager.getInstance();

import loseScene from "./loseScene.js";

export default class DefenderScene extends Scene {
  private keyMap: { [key: string]: boolean };

  private currentDirection: string | null;

  private DefenderBackground: HTMLImageElement;

  private player: Player;

  private projectiles: Projectile[] = [];

  private enemies: Enemy[] = [];

  private portals: portal[] = [];

  private powerUpItems: PowerUpItems[] = [];

  private escapeClicked: boolean = false;

  private lifes: number = 5;

  private timeLimit: number = 60000;

  private defenderScore = 0;

  private turboActive: boolean = false;

  private turboTimer: number = 0;

  private timeUntilNextItem: number = 0;

  public getCurrentGameScore(): number {
    return this.defenderScore;
  }

  private portalSpawnTimer: number = 0;

  private enemySpawnTimer: number = 0;

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
      KeyA: false,
      KeyS: false,
      KeyD: false,
      KeyW: false,
    };
    this.currentDirection = null;

    this.DefenderBackground = CanvasRenderer.loadNewImage("./assets/background-defender-final.png");
    this.player = new Player(maxX / 2, maxY / 2, 100, 100, "./assets/player.png");

    // Add event listener for keydown events
    document.addEventListener("keydown", this.handleKeyDown.bind(this));
    document.addEventListener("keyup", this.handleKeyUp.bind(this));
    document.addEventListener("click", this.handleClick.bind(this));
    document.addEventListener("keydown", this.handleSpaceKeyDown.bind(this));
  }

  // Handle space keydown events
  private handleSpaceKeyDown(event: KeyboardEvent): void {
    if (event.key === " ") {
      event.preventDefault();
      this.projectiles.push(new Projectile(this.fixPositionX(), this.fixPositionY(), 30, 30, "./assets/bullet-green.png", this.player.rotation));
      // Add your code here to handle the space keydown event
    }
  }

  // Add event listener for space keydown events

  // Handle keydown events
  private handleKeyDown(event: KeyboardEvent): void {
    if (this.keyMap.hasOwnProperty(event.code)) {
      event.preventDefault();
      this.keyMap[event.code] = true;
      this.updateDirection();
    } else if (event.key === "Escape") {
      this.escapeClicked = true;
    } else if (event.key === " ") {
      this.projectiles.push(new Projectile(this.fixPositionX(), this.fixPositionY(), 30, 30, "./assets/bullet-green.png", this.player.rotation));
    }
  }

  // Handle keyup events
  private handleKeyUp(event: KeyboardEvent): void {
    if (this.keyMap.hasOwnProperty(event.code)) {
      event.preventDefault();
      this.keyMap[event.code] = false;
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
  // Function to update the direction of the player
  private updateDirection(): void {
    console.log("Current direction:", this.currentDirection);
    const keys = Object.keys(this.keyMap).filter((key) => this.keyMap[key]);

    // Prioritize WASD keys over arrow keys
    const prioritizedKeys = ["KeyW", "KeyA", "KeyS", "KeyD", "ArrowUp", "ArrowLeft", "ArrowDown", "ArrowRight"];

    const firstMatchingKey = prioritizedKeys.find((key) => keys.includes(key));

    this.currentDirection = firstMatchingKey || null;
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
      this.endGame();
      const totalScore = scoreManager.getTotalScore();
      console.log(`Total Score: ${totalScore}`);
      homeScene.terminalEnabled = true;
      return new winScene(this.maxX, this.maxY);
    } else if (this.escapeClicked === true) {
      return new homeScene(this.maxX, this.maxY);
    } else if (this.lifes <= 0) {
      return new loseScene(this.maxX, this.maxY);
    } else return null;
  }

  // Method to end the game
  private endGame(): void {
    // Add defenderScore to the totalScore when the game ends
    scoreManager.updateTotalScore(this.getCurrentGameScore());
  }

  public portalsSpawn(): void {
    const maxPortals = 4; // Maximum number of portals allowed
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
    const minX = 100;
    const minY = 100;
    const maxX = window.innerWidth - 100;
    const maxY = window.innerHeight - 100;

    const randomX = Math.floor(Math.random() * (maxX - minX + 1)) + minX;
    const randomY = Math.floor(Math.random() * (maxY - minY + 1)) + minY;

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
    if (this.timeLimit > 0 || this.lifes > 0) {
      this.timeLimit -= elapsed;
    } else {
      this.getNextScene();
    }

    console.log(this.turboTimer);
    this.projectiles.forEach((projectile) => {
      projectile.update();
    });

    // Update the player's position
    if (this.currentDirection === "ArrowLeft" || this.currentDirection === "KeyA") {
      if (this.player.x > 0) {
        if (this.turboActive === true) {
          this.player.turboMoveLeft();
        } else {
          this.player.moveLeft();
        }
      }
    } else if (this.currentDirection === "ArrowRight" || this.currentDirection === "KeyD") {
      if (this.player.x < this.maxX - this.player.width) {
        if (this.turboActive === true) {
          this.player.turboMoveRight();
        } else {
          this.player.moveRight();
        }
      }
    } else if (this.currentDirection === "ArrowUp" || this.currentDirection === "KeyW") {
      if (this.player.y > 0) {
        if (this.turboActive === true) {
          this.player.turboMoveUp();
        } else {
          this.player.moveUp();
        }
      }
    } else if (this.currentDirection === "ArrowDown" || this.currentDirection === "KeyS") {
      if (this.player.y < this.maxY - this.player.height) {
        {
          if (this.player.y < this.maxY - this.player.height) {
            if (this.turboActive === true) {
              this.player.turboMoveDown();
            } else {
              this.player.moveDown();
            }
          }
        }
      }
    }
    // Update enemies and check for collision with player
    const playerBox = {
      x: this.player.x + 12,
      y: this.player.y + 12,
      width: this.player.width - 22,
      height: this.player.height - 22,
    };

    this.enemies.forEach((enemy, index) => {
      enemy.update(playerBox.x, playerBox.y);
      // Check for overlap between player and enemy bounding boxes
      if (playerBox.x < enemy.x + enemy.width && playerBox.x + playerBox.width > enemy.x && playerBox.y < enemy.y + enemy.height && playerBox.y + playerBox.height > enemy.y) {
        // Collision detected, delete the enemy
        this.enemies.splice(index, 1);
        this.lifes--;
      }
    });

    // Collision detection between projectiles and enemies
    for (let i = 0; i < this.projectiles.length; i++) {
      const projectile = this.projectiles[i];
      for (let j = 0; j < this.enemies.length; j++) {
        const enemy = this.enemies[j];

        // Check for overlap between bounding boxes
        if (projectile.x < enemy.x + enemy.width && projectile.x + projectile.width > enemy.x && projectile.y < enemy.y + enemy.height && projectile.y + projectile.height > enemy.y) {
          // Remove the enemy from the array when hit by the projectile
          this.defenderScore++;
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

        // Check for overlap between bounding boxes
        if (projectile.x < portal.x + portal.width && projectile.x + projectile.width > portal.x && projectile.y < portal.y + portal.height && projectile.y + projectile.height > portal.y) {
          // Remove the portal from the array when hit by the projectile
          this.portals.splice(j, 1);
          this.projectiles.splice(i, 1);

          // Decrement j to account for the removed portal
          this.defenderScore += 3;
          j--;
        }
      }
    }

    // Portal spawn
    this.portalSpawnTimer += elapsed;
    if (this.portalSpawnTimer >= 6000 + Math.floor(Math.random() * 5000)) {
      this.portalSpawnTimer = 0;
      this.portalsSpawn();
    }

    this.enemySpawnTimer += elapsed;
    if (this.enemySpawnTimer >= 4000 + Math.floor(Math.random() * 3000)) {
      this.enemySpawnTimer = 0;
      this.spawnEnemiesFromPortals();
    }

    // Power up items spawn timer
    const randomItemChance = Math.random() * 100;
    const randomItemInterval = Math.random() * 1000 + 1000;
    this.timeUntilNextItem += elapsed;
    if (this.timeUntilNextItem >= randomItemInterval) {
      this.timeUntilNextItem = 0;
      if (randomItemChance < 50) {
        this.powerUpItems.push(new Coin());
      } else this.powerUpItems.push(new Turbo());
    }

    //power up collision detection
    this.powerUpItems.forEach((item) => {
      if (this.player.collidesWithItem(item) === true) {
        if (item instanceof Coin) {
          this.defenderScore += item.getScore();
        }
        if (item instanceof Turbo) {
          this.turboActive = true;
          this.turboTimer += 5000;
        }
        this.powerUpItems.splice(this.powerUpItems.indexOf(item), 1);
      }
    });

    if (this.turboTimer > 0) {
      this.turboTimer -= elapsed;
    }
    if (this.turboTimer <= 0) {
      this.turboActive = false;
      this.turboTimer = 0;
    }
  }

  // Function to spawn enemies from existing portals
  private spawnEnemiesFromPortals(): void {
    this.portals.forEach((portal) => {
      const spawnX = portal.x;
      const spawnY = portal.y;
      this.spawnEnemiesFromSpawnPoint(1, spawnX, spawnY, 0); // Spawn instantly from portals
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

      this.powerUpItems.forEach((powerUpItem) => {
        powerUpItem.render(canvas);
      });
      // Render the time, score and lives on the canvas
      CanvasRenderer.writeText(canvas, this.timeScoreMinutesandSeconds(), canvas.width / 2, canvas.height * 0.07, "center", "Pixelated", 75, "White");
      CanvasRenderer.writeText(canvas, `Score: ${this.defenderScore}`, canvas.width * 0.15, canvas.height * 0.07, "center", "Pixelated", 75, "White");
      CanvasRenderer.writeText(canvas, `Lives: ${this.lifes}`, canvas.width * 0.85, canvas.height * 0.07, "center", "Pixelated", 75, "White");
    }
  }
}
