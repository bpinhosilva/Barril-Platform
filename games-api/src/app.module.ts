import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppService } from './app.service';
import { AppController } from './controllers/v1/app.controller';
import { GamesController } from './controllers/v1/games.controller';
import { GamesServiceConverter } from './converters/games-service.converter';
import { IGamesDao } from './daos/games.dao.interface';
import { MongoDbDao } from './daos/mongo-db.dao';
import { GamesHelper } from './helpers/games.helper';
import { GameModel } from './models/game.model';
import { GameSchema } from './models/game.schema';
import { GamesService } from './services/games-service';
import { IGamesService } from './services/games-service.interface';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://games-database/games'),
    MongooseModule.forFeature([{ name: GameModel.name, schema: GameSchema }]),
  ],
  controllers: [AppController, GamesController],
  providers: [
    GamesHelper,
    GamesServiceConverter,
    {
      provide: IGamesService,
      useClass: GamesService,
    },
    {
      provide: IGamesDao,
      useClass: MongoDbDao,
    },
    AppService,
  ],
})
export class AppModule {}
