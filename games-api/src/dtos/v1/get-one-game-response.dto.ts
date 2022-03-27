import { BaseGameResponseDto } from './base-game-response.dto';

export class GetOneGameResponseDto extends BaseGameResponseDto {
  constructor(params: GetOneGameResponseDto) {
    super(params);
    Object.assign(this, params);
  }
}
