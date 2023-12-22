import CyberIQ from "./cyberIQ.js";

const game: CyberIQ = new CyberIQ(document.getElementById("game") as HTMLCanvasElement);

window.addEventListener("load", () => {
  game.start();
});
