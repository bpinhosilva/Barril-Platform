import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import * as O from 'fp-ts/Option';
import { GamesDao } from 'src/daos/games.dao';
import { Game } from 'src/domain/game';
import { GamesHelper } from 'src/helpers/games.helper';
import { GameModel } from 'src/models/game.model';
import { gamesService, GamesService } from './games.service';

@Injectable()
export class GamesBusiness implements GamesService {
  constructor(
    @Inject(GamesDao) private _gamesDao: GamesDao,
    private _gamesHelper: GamesHelper,
  ) {}

  public async create(options: gamesService.create.Options): Promise<Game> {
    const newGame: Game = new Game({
      id: this._gamesHelper.generateUuid(),
      version: '1',
      ...options.game,
    });

    const gameModel: GameModel = await this._gamesDao.create({
      game: newGame,
    });

    return new Game(gameModel);
  }

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

  public async update(options: gamesService.update.Options): Promise<Game> {
    throw new Error('Not implemented');
  }
}
