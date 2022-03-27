import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class GamesHelper {
  public generateUuid(): string {
    return uuidv4();
  }
}
