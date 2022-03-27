import {
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import * as O from 'fp-ts/Option';
import { GamesServiceConverter } from 'src/converters/games-service.converter';
import { IGamesDao } from 'src/daos/games.dao.interface';
import { Game } from 'src/domain/game';
import { GamesHelper } from 'src/helpers/games.helper';
import { GameModel } from 'src/models/game.model';
import { ImageModel } from 'src/models/image.model';
import { iGamesService, IGamesService } from './games-service.interface';

@Injectable()
export class GamesService implements IGamesService {
  private readonly _logger: Logger;

  constructor(
    @Inject(IGamesDao) private _gamesDao: IGamesDao,
    private _gamesHelper: GamesHelper,
    private _gamesServiceConverter: GamesServiceConverter,
  ) {
    this._logger = new Logger(GamesService.name);
  }

  public async create(options: iGamesService.create.Options): Promise<Game> {
    const images: ImageModel[] = [];

    for (const image of options.game.images) {
      images.push(
        new ImageModel({
          ...image,
          id: this._gamesHelper.generateUuid(),
        }),
      );
    }

    const newGame: GameModel = new GameModel({
      id: this._gamesHelper.generateUuid(),
      version: '1',
      ...options.game,
      images,
    });

    try {
      this._logger.debug('Adding new game...');

      const gameModel: GameModel = await this._gamesDao.create({
        game: newGame,
      });

      return this._gamesServiceConverter.toGame(gameModel);
    } catch (e) {
      this._logger.error(`Error creating game: ${e}`);

      throw new InternalServerErrorException('Cannot create game.');
    }
  }

  public async getAll(): Promise<Game[]> {
    const gameModels: GameModel[] = await this._gamesDao.search({});

    return gameModels.map((gameModel) =>
      this._gamesServiceConverter.toGame(gameModel),
    );
  }

  public async getOne(options: iGamesService.getOne.Options): Promise<Game> {
    const gameModel: GameModel = O.toNullable(
      await this._gamesDao.getOne({
        id: options.id,
      }),
    );

    if (!gameModel) {
      throw new NotFoundException('Game not found.');
    }

    return this._gamesServiceConverter.toGame(gameModel);
  }

  public async update(options: iGamesService.update.Options): Promise<Game> {
    throw new Error('Not implemented');
  }
}
