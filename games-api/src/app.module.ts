import { Module } from '@nestjs/common';
import { AppController } from './controllers/v1/app.controller';
import { AppService } from './app.service';
import { GamesController } from './controllers/v1/games.controller';
import { IGamesDao } from './daos/games.dao.interface';
import { InMemoryGamesDao } from './daos/in-memory-games.dao';
import { GamesHelper } from './helpers/games.helper';
import { GamesService } from './services/games-service';
import { IGamesService } from './services/games-service.interface';

@Module({
  imports: [],
  controllers: [AppController, GamesController],
  providers: [
    GamesHelper,
    {
      provide: IGamesService,
      useClass: GamesService,
    },
    {
      provide: IGamesDao,
      useClass: InMemoryGamesDao,
    },
    AppService,
  ],
})
export class AppModule {}
