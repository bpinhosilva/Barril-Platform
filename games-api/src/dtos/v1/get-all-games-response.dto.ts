import { BaseGameResponseDto } from './base-game-response.dto';

export class GetAllGamesResponseDto {
  listings: BaseGameResponseDto[];

  constructor(params: GetAllGamesResponseDto) {
    Object.assign(this, params);
  }
}
