export class GameModel {
  title: string;
  version: number;

  constructor(partial: GameModel) {
    Object.assign(this, partial);
  }
}
