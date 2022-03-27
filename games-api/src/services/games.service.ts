import { OmitType } from '@nestjs/mapped-types';
import { Game } from 'src/domain/game';

export namespace gamesService {
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

export interface GamesService {
  create(options: gamesService.create.Options): Promise<Game>;

  getAll(): Promise<Game[]>;

  getOne(options: gamesService.getOne.Options): Promise<Game>;

  update(options: gamesService.update.Options): Promise<Game>;
}

// The framework needs a symbol, it cannot work with interface directly
export const GamesService = Symbol('GamesService');
