// import { Player } from "./player.js";
// import { Velocity } from "./types.js";
// import { Projectile } from "./projectile.js";
// import { Enemy } from "./enemy.js";
// import GSAPTimeline from "gsap";
// import { Particle } from "./particle.js";

// const canvas = document.querySelector("canvas")!;
// const c = canvas.getContext("2d")!;

// //resize canvas
// canvas.width = window.innerWidth;
// canvas.height = window.innerHeight;

// const scoreEL = document.querySelector("#scoreEl")!;
// const startBtn = document.querySelector("#startBtn")!;
// const modalEl = document.querySelector("#modalEl")! as HTMLElement;
// const endScoreEl = document.querySelector("#endScoreEl")! as HTMLElement;

// const x = canvas.width / 2;
// const y = canvas.height / 2;

// //player
// let player = new Player(x, y, 15, "white");
// //projectiles
// let projectiles: {
//   x: number;
//   y: number;
//   radius: number;
//   color: string;
//   velocity: Velocity;
//   update: () => void;
// }[] = [];
// //enemies
// let enemies: {
//   x: number;
//   y: number;
//   radius: number;
//   color: string;
//   velocity: Velocity;
//   update: () => void;
// }[] = [];
// //particles
// let particles: {
//   x: number;
//   y: number;
//   radius: number;
//   color: string;
//   velocity: Velocity;
//   alpha: number;
//   update: () => void;
// }[] = [];

// //initialize game
// function init() {
//   player = new Player(x, y, 15, "white");
//   projectiles = [];
//   enemies = [];
//   particles = [];
//   score = 0;
//   scoreEL.innerHTML = score.toString();
// }

// //spawn enemies
// function spawnEnemies() {
//   setInterval(() => {
//     const radius = Math.random() * (45 - 15) + 15;
//     let x: number;
//     let y: number;
//     if (Math.random() < 0.5) {
//       x = Math.random() < 0.5 ? 0 - radius : canvas.width + radius;
//       y = Math.random() * canvas.height;
//     } else {
//       x = Math.random() * canvas.width;
//       y = Math.random() < 0.5 ? 0 - radius : canvas.height + radius;
//     }
//     const color = `hsl( ${Math.random() * 360} , 50%, 50%)`;
//     const angle = Math.atan2(canvas.height / 2 - y, canvas.width / 2 - x);
//     const velocity: { x: number; y: number } = {
//       x: Math.cos(angle),
//       y: Math.sin(angle),
//     };
//     enemies.push(new Enemy(x, y, radius, color, velocity));
//   }, 1000);
// }

// //animation
// let animationId: number;
// let score: number = 0;
// function animate() {
//   animationId = requestAnimationFrame(animate);
//   //clear canvas
//   c.fillStyle = "rgba(0,0,0,0.1)";
//   c.fillRect(0, 0, canvas.width, canvas.height);
//   //draw player
//   player.draw();
//   //draw particles
//   particles.forEach((particle, index) => {
//     if (particle.alpha <= 0) {
//       setTimeout(() => {
//         particles.splice(index, 1);
//       }, 0);
//     } else particle.update();
//   });
//   //draw projectiles
//   projectiles.forEach((projectile) => {
//     projectile.update();

//     //remove projectiles
//     if (
//       projectile.x + projectile.radius < 0 ||
//       projectile.x - projectile.radius > canvas.width ||
//       projectile.y + projectile.radius < 0 ||
//       projectile.y - projectile.radius > canvas.height
//     ) {
//       setTimeout(() => {
//         projectiles.splice(projectiles.indexOf(projectile), 1);
//       }, 0);
//     }
//   });

//   enemies.forEach((enemy, index) => {
//     enemy.update();

//     const dist = Math.hypot(player.x - enemy.x, player.y - enemy.y);

//     //end game
//     if (dist - enemy.radius - player.radius < 0.1) {
//       cancelAnimationFrame(animationId);
//       modalEl.style.display = "flex";
//       endScoreEl.innerHTML = score.toString();
//     }

//     projectiles.forEach((projectile, projectileIndex) => {
//       const dist = Math.hypot(projectile.x - enemy.x, projectile.y - enemy.y);

//       //when projectiles touch enemies
//       if (dist - enemy.radius - projectile.radius < 0.1) {
//         //create explosion
//         for (let i = 0; i < enemy.radius; i++) {
//           particles.push(
//             new Particle(
//               projectile.x,
//               projectile.y,
//               Math.random() * (enemy.radius / 8),
//               enemy.color,
//               {
//                 x: (Math.random() - 0.5) * (Math.random() * 6),
//                 y: (Math.random() - 0.5) * (Math.random() * 6),
//               }
//             )
//           );
//         }
//         //remove enemies
//         if (enemy.radius - 15 > 10) {
//           //increase score
//           score += 100;
//           scoreEL.innerHTML = score.toString();

//           gsap.to(enemy, {
//             radius: enemy.radius - 15,
//           });
//           setTimeout(() => {
//             projectiles.splice(projectileIndex, 1);
//           }, 0);
//         } else {
//           //remove from scene
//           score += 250;
//           scoreEL.innerHTML = score.toString();
//           setTimeout(() => {
//             enemies.splice(index, 1);
//             projectiles.splice(projectileIndex, 1);
//           }, 0);
//         }
//       }
//     });
//   });
// }

// //mouse event
// window.addEventListener("click", (event) => {
//   const angle = Math.atan2(
//     event.clientY - canvas.height / 2,
//     event.clientX - canvas.width / 2
//   );

//   const velocity: { x: number; y: number } = {
//     x: Math.cos(angle) * 5,
//     y: Math.sin(angle) * 5,
//   };

//   projectiles.push(
//     new Projectile(canvas.width / 2, canvas.height / 2, 5, "white", velocity)
//   );
// });

// //start game
// startBtn.addEventListener("click", () => {
//   init();
//   animate();
//   spawnEnemies();
//   modalEl.style.display = "none";
// });
