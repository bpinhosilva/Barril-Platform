import { OmitType } from '@nestjs/mapped-types';
import { Game } from 'src/domain/game';

export namespace iGamesService {
  export namespace create {
    class CreateOptions extends OmitType(Game, ['id', 'version'] as const) {}

    export class Options {
      game: CreateOptions;
    }
  }

  export namespace getOne {
    export class Options {
      id: string;
    }
  }

  export namespace update {
    export class Options {
      game: Game;
    }
  }
}

export interface IGamesService {
  create(options: iGamesService.create.Options): Promise<Game>;

  getAll(): Promise<Game[]>;

  getOne(options: iGamesService.getOne.Options): Promise<Game>;

  update(options: iGamesService.update.Options): Promise<Game>;
}

// The framework needs a symbol, it cannot work with interface directly
export const IGamesService = Symbol('IGamesService');
