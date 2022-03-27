import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { Game } from 'src/domain/game';
import { CreateGameResponseDto } from 'src/dtos/v1/create-game-response.dto';
import { CreateGameDto } from 'src/dtos/v1/create-game.dto';
import { GetOneGameResponseDto } from 'src/dtos/v1/get-one-game-response.dto';
import { IGamesService } from 'src/services/games-service.interface';

@Controller({
  path: 'games',
  version: '1',
})
export class GamesController {
  constructor(@Inject(IGamesService) private _gamesService: IGamesService) {}

  @Get()
  public async getAll(): Promise<GetOneGameResponseDto[]> {
    const games: Game[] = await this._gamesService.getAll();

    return games.map((game) => new GetOneGameResponseDto(game));
  }

  @Get(':id')
  public async getOne(@Param('id') id: string): Promise<GetOneGameResponseDto> {
    const game: Game = await this._gamesService.getOne({
      id,
    });

    return new GetOneGameResponseDto(game);
  }

  @Post()
  public async create(
    @Body() createGameDto: CreateGameDto,
  ): Promise<CreateGameResponseDto> {
    const game: Game = await this._gamesService.create({ game: createGameDto });

    return new CreateGameResponseDto(game);
  }
}
