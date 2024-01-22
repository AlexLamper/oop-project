export default class ScoreManager {
  private totalScore: number;

  private static instance: ScoreManager;

  public static VPNScore: number = 0;
  
  public static defenderScore: number = 0;

  public static terminalScore: number = 0;
  
  private constructor() {}

  public static getInstance(): ScoreManager {
    if (!ScoreManager.instance) {
      ScoreManager.instance = new ScoreManager();
    }
    return ScoreManager.instance;
  }

  public updateTotalScore(gameScore: number): void {
    this.totalScore += gameScore;
  }

  public getTotalScore(): number {
    this.totalScore = ScoreManager.VPNScore + ScoreManager.defenderScore + ScoreManager.terminalScore;
    return this.totalScore;
  }
}
