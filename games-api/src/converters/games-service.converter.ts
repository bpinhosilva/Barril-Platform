import { Injectable } from '@nestjs/common';
import { Game } from 'src/domain/game';
import { Image } from 'src/domain/image';
import { GamesHelper } from 'src/helpers/games.helper';
import { GameModel } from 'src/models/game.model';

@Injectable()
export class GamesServiceConverter {
  constructor(private _gamesHelper: GamesHelper) {}

  /**
   * Convert from DAO model to business domain (Game)
   * Including CDN Url for images
   * @param gameModel
   * @returns
   */
  public toGame(gameModel: GameModel): Game {
    const images: Image[] = [];

    for (const image of gameModel.images) {
      images.push(
        new Image({
          id: image.id,
          url: this._gamesHelper.getImageCdnUrl(image.filename),
          type: image.type,
        }),
      );
    }

    return new Game({
      ...gameModel,
      images,
    });
  }
}
