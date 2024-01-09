export default class ScoreManager {
  private totalScore: number = 0;
  private static instance: ScoreManager;

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
    return this.totalScore;
  }
}
