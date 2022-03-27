import { Injectable } from '@nestjs/common';
import * as O from 'fp-ts/Option';
import { GameModel } from 'src/models/game.model';
import { gamesDao, GamesDao } from './games.dao';

@Injectable()
export class InMemoryGamesDao implements GamesDao {
  private _games: GameModel[] = [];

  public async create(options: gamesDao.CreateOptions): Promise<GameModel> {
    const game: GameModel = options.game;

    this._games.push(options.game);

    return game;
  }

  public async getOne(
    options: gamesDao.GetOneOptions,
  ): Promise<O.Option<GameModel>> {
    return O.fromNullable(this._games.find((g) => g.id === options.id));
  }

  public async search(options: gamesDao.SearchOptions): Promise<GameModel[]> {
    // return this._games.filter((game) => game.title === options.title);
    return this._games;
  }

  public async update(options: gamesDao.UpdateOptions): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
