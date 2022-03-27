import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import * as O from 'fp-ts/Option';
import { GamesDao } from 'src/daos/games.dao';
import { Game } from 'src/domain/game';

export namespace gamesService {
  export namespace create {
    export class Options {}
  }

  export namespace getOne {
    export class Options {
      id: number;
    }
  }

  export namespace update {
    export class Options {}
  }
}

@Injectable()
export class GamesService {
  constructor(@Inject(GamesDao) private _gamesDao: GamesDao) {}

  public async create(options: gamesService.create.Options): Promise<void> {}

  public async getAll() {
    return this._gamesDao.search({});
  }

  public async getOne(options: gamesService.getOne.Options): Promise<Game> {
    const game: Game = O.toNullable(
      await this._gamesDao.getOne({
        id: options.id,
      }),
    );

    if (!game) {
      throw new NotFoundException('Game not found.');
    }

    return game;
  }

  public async update(options: gamesService.update.Options) {}
}
