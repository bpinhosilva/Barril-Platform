export class Game {
  title: string;
  version: number;

  constructor(params: Game) {
    Object.assign(this, params);
  }
}
