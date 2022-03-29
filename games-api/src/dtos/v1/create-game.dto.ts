import { BaseGameDto } from './base-game.dto';

export class CreateGameDto extends BaseGameDto {
  constructor(params: CreateGameDto) {
    super(params);
    Object.assign(this, params);
  }
}
