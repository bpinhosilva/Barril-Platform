import { Injectable } from '@nestjs/common';
import * as O from 'fp-ts/Option';
import { GameModel } from 'src/models/game.model';
import { iGamesDao, IGamesDao } from './games.dao.interface';

@Injectable()
export class InMemoryGamesDao implements IGamesDao {
  private _games: GameModel[] = [];

  public async create(options: iGamesDao.create.Options): Promise<GameModel> {
    const game: GameModel = options.game;

    this._games.push(options.game);

    return game;
  }

  public async getOne(
    options: iGamesDao.getOne.Options,
  ): Promise<O.Option<GameModel>> {
    return O.fromNullable(this._games.find((g) => g.id === options.id));
  }

  public async search(options: iGamesDao.search.Options): Promise<GameModel[]> {
    return this._games;
  }

  public async update(options: iGamesDao.update.Options): Promise<GameModel> {
    throw new Error('Method not implemented.');
  }

  public async remove(options: iGamesDao.remove.Options): Promise<void> {
    throw new Error('Not implemented');
  }
}
