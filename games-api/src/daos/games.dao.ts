import * as O from 'fp-ts/Option';
import { GameModel } from 'src/models/game.model';

export namespace gamesDao {
  export class GetOneOptions {
    id: number;
  }

  export class SearchOptions {
    title?: string;
  }

  export class UpdateOptions {}

  export class DeleteOptions {}
}

export interface GamesDao {
  getOne(options: gamesDao.GetOneOptions): Promise<O.Option<GameModel>>;

  search(options: gamesDao.SearchOptions): Promise<GameModel[]>;

  update(options: gamesDao.UpdateOptions): Promise<void>;
}

// The framework needs a symbol, it cannot work with interface directly
export const GamesDao = Symbol('GamesDao');
