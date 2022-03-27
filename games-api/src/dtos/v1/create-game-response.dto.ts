import { BaseGameResponseDto } from './base-game-response.dto';

export class CreateGameResponseDto extends BaseGameResponseDto {
  constructor(params: CreateGameResponseDto) {
    super(params);
    Object.assign(this, params);
  }
}
