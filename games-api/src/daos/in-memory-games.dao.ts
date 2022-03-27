import { Injectable } from '@nestjs/common';
import * as O from 'fp-ts/Option';
import { Game } from 'src/domain/game';
import { GameModel } from 'src/models/game.model';
import { gamesDao, GamesDao } from './games.dao';

@Injectable()
export class InMemoryGamesDao implements GamesDao {
  private _games: GameModel[] = [new Game({ title: 'title', version: 1 })];

  public async getOne(
    options: gamesDao.GetOneOptions,
  ): Promise<O.Option<GameModel>> {
    return O.fromNullable(this._games[options.id]);
  }

  public async search(options: gamesDao.SearchOptions): Promise<GameModel[]> {
    return this._games.filter((game) => game.title === options.title);
  }

  public async update(options: gamesDao.UpdateOptions): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
