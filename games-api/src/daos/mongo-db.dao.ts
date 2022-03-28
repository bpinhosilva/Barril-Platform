import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as O from 'fp-ts/lib/Option';
import { Model } from 'mongoose';
import { GameModel } from 'src/models/game.model';
import { GameModelDocument } from 'src/models/game.schema';
import { iGamesDao, IGamesDao } from './games.dao.interface';

@Injectable()
export class MongoDbDao implements IGamesDao {
  private readonly _logger: Logger;

  constructor(
    @InjectModel(GameModel.name) private _gameModel: Model<GameModelDocument>,
  ) {
    this._logger = new Logger(MongoDbDao.name);
  }

  public async create(options: iGamesDao.create.Options): Promise<GameModel> {
    this._logger.log(options);

    const newGame = new this._gameModel({ ...options.game });

    this._logger.log(newGame);

    await newGame.save();

    return newGame.toObject({
      transform: (doc, ret, options) => {
        delete ret._id;
        delete ret.__v;

        return ret;
      },
    });
  }

  public async getOne(
    options: iGamesDao.getOne.Options,
  ): Promise<O.Option<GameModel>> {
    this._logger.log('Inside findOne', options);

    const gameModel: O.Option<GameModel> = O.fromNullable(
      await this._gameModel
        .findOne({ id: options.id }, { _id: 0, __v: 0 })
        .lean(),
    );

    return gameModel;
  }

  public async search(options: iGamesDao.search.Options): Promise<GameModel[]> {
    this._logger.log('Inside search');

    const query: Record<string, any> = {};

    if (options.title) {
      query['title'] = options.title;
    }

    this._logger.log(JSON.stringify(query));

    return await this._gameModel
      .find(query, { _id: 0, __v: 0 })
      .skip(options.offset)
      .limit(options.limit)
      .lean();
  }

  public async update(options: iGamesDao.update.Options): Promise<GameModel> {
    return await this._gameModel
      .findOneAndUpdate({ id: options.game.id }, options.game, {
        new: true,
        upsert: false,
        projection: { _id: 0, __v: 0 },
      })
      .lean();
  }

  public async remove(options: iGamesDao.remove.Options): Promise<void> {
    await this._gameModel.findOneAndDelete({ id: options.id });
  }
}
