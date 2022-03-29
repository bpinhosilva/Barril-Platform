import { IsNotEmpty } from 'class-validator';
import { BaseGameDto } from './base-game.dto';

export class UpdateGameDto extends BaseGameDto {
  @IsNotEmpty()
  version: string;

  constructor(params: UpdateGameDto) {
    super(params);
    Object.assign(this, params);
  }
}
