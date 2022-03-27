import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GamesController } from './controllers/v1/games.controller';
import { GamesDao } from './daos/games.dao';
import { InMemoryGamesDao } from './daos/in-memory-games.dao';
import { GamesHelper } from './helpers/games.helper';
import { GamesBusiness } from './services/games-business';
import { GamesService } from './services/games.service';

@Module({
  imports: [],
  controllers: [AppController, GamesController],
  providers: [
    GamesHelper,
    {
      provide: GamesService,
      useClass: GamesBusiness,
    },
    {
      provide: GamesDao,
      useClass: InMemoryGamesDao,
    },
    AppService,
  ],
})
export class AppModule {}
