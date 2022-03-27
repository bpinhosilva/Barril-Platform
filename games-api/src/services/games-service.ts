import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import * as O from 'fp-ts/Option';
import { IGamesDao } from 'src/daos/games.dao.interface';
import { Game } from 'src/domain/game';
import { GamesHelper } from 'src/helpers/games.helper';
import { GameModel } from 'src/models/game.model';
import { iGamesService, IGamesService } from './games-service.interface';

@Injectable()
export class GamesService implements IGamesService {
  constructor(
    @Inject(IGamesDao) private _gamesDao: IGamesDao,
    private _gamesHelper: GamesHelper,
  ) {}

  public async create(options: iGamesService.create.Options): Promise<Game> {
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

  public async getOne(options: iGamesService.getOne.Options): Promise<Game> {
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

  public async update(options: iGamesService.update.Options): Promise<Game> {
    throw new Error('Not implemented');
  }
}
