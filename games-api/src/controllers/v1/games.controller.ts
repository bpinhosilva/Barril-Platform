import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { Game } from 'src/domain/game';
import { CreateGameResponseDto } from 'src/dtos/v1/create-game-response.dto';
import { CreateGameDto } from 'src/dtos/v1/create-game.dto';
import { GetOneGameResponseDto } from 'src/dtos/v1/get-one-game-response.dto';
import { GamesService } from 'src/services/games.service';

@Controller({
  path: 'games',
  version: '1',
})
export class GamesController {
  constructor(private _gamesService: GamesService) {}

  @Get()
  public async getAll(): Promise<any> {
    return await this._gamesService.getAll();
  }

  @Get(':id')
  public async getOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<GetOneGameResponseDto> {
    const game: Game = await this._gamesService.getOne({
      id,
    });

    return new GetOneGameResponseDto(game);
  }

  @Post()
  public async create(
    @Body() createGameDto: CreateGameDto,
  ): Promise<CreateGameResponseDto> {
    return new CreateGameResponseDto({
      title: createGameDto.title,
      version: 1,
    });
  }
}
