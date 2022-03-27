import * as O from 'fp-ts/Option';
import { GameModel } from 'src/models/game.model';

export namespace iGamesDao {
  export namespace create {
    export class Options {
      game: GameModel;
    }
  }

  export namespace getOne {
    export class Options {
      id: string;
    }
  }

  export namespace search {
    export class Options {
      title?: string;
      // limit
      // offset
    }
  }

  export namespace update {
    export class Options {
      game: GameModel;
    }
  }

  export namespace remove {
    export class Options {}
  }
}

export interface IGamesDao {
  create(options: iGamesDao.create.Options): Promise<GameModel>;

  getOne(options: iGamesDao.getOne.Options): Promise<O.Option<GameModel>>;

  search(options: iGamesDao.search.Options): Promise<GameModel[]>;

  update(options: iGamesDao.update.Options): Promise<void>;

  remove(options: iGamesDao.remove.Options): Promise<void>;
}

// The framework needs a symbol, it cannot work with interface directly
export const IGamesDao = Symbol('IGamesDao');
