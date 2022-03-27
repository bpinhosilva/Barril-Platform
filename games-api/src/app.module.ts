import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GamesController } from './controllers/v1/games.controller';
import { GamesService } from './services/games.service';
import { GamesDao } from './daos/games.dao';
import { InMemoryGamesDao } from './daos/in-memory-games.dao';

@Module({
  imports: [],
  controllers: [AppController, GamesController],
  providers: [
    GamesService,
    {
      provide: GamesDao,
      useClass: InMemoryGamesDao,
    },
    AppService,
  ],
})
export class AppModule {}
