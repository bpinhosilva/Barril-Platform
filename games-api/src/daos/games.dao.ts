import * as O from 'fp-ts/Option';
import { GameModel } from 'src/models/game.model';

export namespace gamesDao {
  export class CreateOptions {
    game: GameModel;
  }

  export class GetOneOptions {
    id: string;
  }

  export class SearchOptions {
    title?: string;
    // limit
    // offset
  }

  export class UpdateOptions {
    game: GameModel;
  }

  export class DeleteOptions {}
}

export interface GamesDao {
  create(options: gamesDao.CreateOptions): Promise<GameModel>;

  getOne(options: gamesDao.GetOneOptions): Promise<O.Option<GameModel>>;

  search(options: gamesDao.SearchOptions): Promise<GameModel[]>;

  update(options: gamesDao.UpdateOptions): Promise<void>;
}

// The framework needs a symbol, it cannot work with interface directly
export const GamesDao = Symbol('GamesDao');
