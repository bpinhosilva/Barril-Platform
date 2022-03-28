import { BaseGameResponseDto } from './base-game-response.dto';

export class UpdateGameResponseDto extends BaseGameResponseDto {
  constructor(params: UpdateGameResponseDto) {
    super(params);
    Object.assign(this, params);
  }
}
