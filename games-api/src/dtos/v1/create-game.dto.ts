import { IsNotEmpty } from 'class-validator';

export class CreateGameDto {
  @IsNotEmpty()
  title: string;

  constructor(params: CreateGameDto) {
    Object.assign(this, params);
  }
}
