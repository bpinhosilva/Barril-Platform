import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Logger,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { Game } from 'src/domain/game';
import { CreateGameResponseDto } from 'src/dtos/v1/create-game-response.dto';
import { CreateGameDto } from 'src/dtos/v1/create-game.dto';
import { GetAllGamesResponseDto } from 'src/dtos/v1/get-all-games-response.dto';
import { GetOneGameResponseDto } from 'src/dtos/v1/get-one-game-response.dto';
import { ListAllGamesDto } from 'src/dtos/v1/list-all-games.dto';
import { UpdateGameResponseDto } from 'src/dtos/v1/update-game-response.dto';
import { UpdateGameDto } from 'src/dtos/v1/update-game.dto';
import { IGamesService } from 'src/services/games-service.interface';

@Controller({
  path: 'games',
  version: '1',
})
export class GamesController {
  private readonly _logger: Logger;

  constructor(@Inject(IGamesService) private _gamesService: IGamesService) {
    this._logger = new Logger(GamesController.name);
  }

  @Get()
  public async getAll(
    @Query() query: ListAllGamesDto,
  ): Promise<GetAllGamesResponseDto> {
    this._logger.log(JSON.stringify(query));

    const games: Game[] = await this._gamesService.getAll(query);

    return new GetAllGamesResponseDto({
      listings: games.map((game) => new GetOneGameResponseDto(game)),
    });
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

  @Put(':id')
  public async update(
    @Param('id') id: string,
    @Body() updateGameDto: UpdateGameDto,
  ): Promise<UpdateGameResponseDto> {
    const game: Game = await this._gamesService.update({
      game: { ...updateGameDto, id },
    });

    return new UpdateGameResponseDto(game);
  }

  @Delete(':id')
  public async delete(@Param('id') id: string): Promise<void> {
    await this._gamesService.remove({
      id,
    });
  }
}
