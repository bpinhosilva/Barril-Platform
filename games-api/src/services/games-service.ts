import {
  ConflictException,
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import * as O from 'fp-ts/Option';
import { GamesConstants } from 'src/constants/games.constants';
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

  public async getAll(options: iGamesService.getAll.Options): Promise<Game[]> {
    this._logger.log(JSON.stringify(options));

    const gameModels: GameModel[] = await this._gamesDao.search({
      title: options.title,
      limit: options.limit || GamesConstants.DefaultSearchLimit,
      offset: options.offset || 0,
    });

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
    const gameModel: GameModel = O.toNullable(
      await this._gamesDao.getOne({
        id: options.game.id,
      }),
    );

    if (!gameModel) {
      throw new NotFoundException('Game not found.');
    }

    if (gameModel.version !== options.game.version) {
      throw new ConflictException('Version mismatch.');
    }

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
      id: options.game.id,
      ...options.game,
      version: String(parseInt(options.game.version) + 1),
      images,
    });

    try {
      this._logger.debug('Updating game...');

      const updatedGameModel: GameModel = await this._gamesDao.update({
        game: newGame,
      });

      return this._gamesServiceConverter.toGame(updatedGameModel);
    } catch (e) {
      this._logger.error(`Error creating game: ${e}`);

      throw new InternalServerErrorException('Cannot update game.');
    }
  }

  public async remove(options: iGamesService.remove.Options): Promise<void> {
    try {
      this._logger.debug('Removing a game...');

      await this._gamesDao.remove({ id: options.id });
    } catch (e) {
      this._logger.error(`Error removing game: ${e}`);

      throw new InternalServerErrorException('Cannot remove game.');
    }
  }
}
