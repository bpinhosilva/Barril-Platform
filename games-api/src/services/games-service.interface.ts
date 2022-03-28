import { OmitType } from '@nestjs/mapped-types';
import { Game } from 'src/domain/game';
import { Image } from 'src/domain/image';

export namespace iGamesService {
  export namespace create {
    class CreateImageOptions extends OmitType(Image, ['id', 'url'] as const) {
      filename: string;
    }

    class CreateOptions extends OmitType(Game, [
      'id',
      'version',
      'images',
    ] as const) {
      images: CreateImageOptions[];
    }

    export class Options {
      game: CreateOptions;
    }
  }

  export namespace getAll {
    export class Options {
      title?: string;
      limit?: number;
      offset?: number;
    }
  }

  export namespace getOne {
    export class Options {
      id: string;
    }
  }

  export namespace update {
    class UpdateImageOptions extends OmitType(Image, ['id', 'url'] as const) {
      filename: string;
    }

    class UpdateOptions extends OmitType(Game, ['images'] as const) {
      images: UpdateImageOptions[];
    }

    export class Options {
      game: UpdateOptions;
    }
  }

  export namespace remove {
    export class Options {
      id: string;
    }
  }
}

export interface IGamesService {
  create(options: iGamesService.create.Options): Promise<Game>;

  getAll(options: iGamesService.getAll.Options): Promise<Game[]>;

  getOne(options: iGamesService.getOne.Options): Promise<Game>;

  update(options: iGamesService.update.Options): Promise<Game>;

  remove(options: iGamesService.remove.Options): Promise<void>;
}

// The framework needs a symbol, it cannot work with interface directly
export const IGamesService = Symbol('IGamesService');
