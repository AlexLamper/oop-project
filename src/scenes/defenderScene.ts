import CanvasRenderer from "../CanvasRenderer.js";
import MouseListener from "../MouseListener.js";
import Scene from "../Scene.js";
import homeScene from "./homeScene.js";
import winScene from "./winScene.js";
import Player from "../attributes/player.js";
import Projectile from "../attributes/projectiles.js";
import Enemy from "../attributes/enemies.js";

import ScoreManager from "../attributes/totalScore.js";

const scoreManager = ScoreManager.getInstance();

import loseScene from "./loseScene.js";

export default class DefenderScene extends Scene {
  private keyMap: { [key: string]: boolean };
  private currentDirection: string | null;
  private DefenderBackground: HTMLImageElement;
  private nextScene: Scene | null;
  private player: Player;
  private projectile: Projectile;
  private projectiles: Projectile[] = [];
  private enemies: Enemy[] = [];
  private lifes: number = 3;

  // Amount of time the player has to complete the game in milliseconds
  private timeLimit: number = 150000;
  private defenderScore = 0;

  public getCurrentGameScore(): number {
    return this.defenderScore;
  }

  // Create spawn point coordinates, width and height for the enemies
  private spawnPointX = 100;
  private spawnPointY = 100;
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

    // Spawn 10 enemies with a delay of 3 seconds (3000 milliseconds) at the spawn point
    this.spawnEnemiesFromSpawnPoint(30, this.spawnPointX, this.spawnPointY, 3000);
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
      this.endGame();
      const totalScore = scoreManager.getTotalScore();
      console.log(`Total Score: ${totalScore}`);
      return new winScene(this.maxX, this.maxY);
    } else if (this.lifes <= 0) {
      return new loseScene(this.maxX, this.maxY);
    } else return null;
  }

  // Method to end the game
  private endGame(): void {
    // Add defenderScore to the totalScore when the game ends
    scoreManager.updateTotalScore(this.getCurrentGameScore());
  }

  /**
   *
   * @param elapsed elapsed ms since last update
   */
  public update(elapsed: number): void {
    // Update the time limit
    if (this.timeLimit > 0 || this.lifes > 0) {
      this.timeLimit -= elapsed;
    } else {
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

    // Update enemies and check for collision with player
    const playerBox = {
      x: this.player.x,
      y: this.player.y,
      width: this.player.width,
      height: this.player.height,
    };

    this.enemies.forEach((enemy, index) => {
      enemy.update(playerBox.x, playerBox.y);

      const enemyBox = {
        x: enemy.x,
        y: enemy.y,
        width: enemy.width,
        height: enemy.height,
      };

      // Check for overlap between player and enemy bounding boxes
      if (playerBox.x < enemyBox.x + enemyBox.width && playerBox.x + playerBox.width > enemyBox.x && playerBox.y < enemyBox.y + enemyBox.height && playerBox.y + playerBox.height > enemyBox.y) {
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
          this.defenderScore++;
          this.enemies.splice(j, 1);
          this.projectiles.splice(i, 1);
          // Decrement j to account for the removed enemy
          j--;
        }
      }
    }
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

    // Load the spawn point image
    const spawnPointImage = new Image();
    spawnPointImage.src = "./assets/portal-gray.png";

    // Calculate the center coordinates of the spawn point
    const spawnPointCenterX = this.spawnPointX - this.spawnPointWidth / 2;
    const spawnPointCenterY = this.spawnPointY - this.spawnPointHeight / 2;
    const spawnPointWidth = this.spawnPointWidth;
    const spawnPointHeight = this.spawnPointHeight;

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
      // Render the spawn point image at the spawn coordinates
      ctx.drawImage(spawnPointImage, spawnPointCenterX, spawnPointCenterY, spawnPointWidth, spawnPointHeight);
      // Render the time, score and lives on the canvas
      CanvasRenderer.writeText(canvas, this.timeScoreMinutesandSeconds(), canvas.width / 2, canvas.height * 0.05, "center", "Pixelated", 75, "White");
      CanvasRenderer.writeText(canvas, `Score: ${this.defenderScore}`, canvas.width * 0.15, canvas.height * 0.05, "center", "Pixelated", 75, "White");
      CanvasRenderer.writeText(canvas, `Lives: ${this.lifes}`, canvas.width * 0.85, canvas.height * 0.05, "center", "Pixelated", 75, "White");
    }
  }
}
