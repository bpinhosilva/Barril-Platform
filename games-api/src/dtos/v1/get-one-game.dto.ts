import { IsNotEmpty } from 'class-validator';

export class GetOneGameDto {
  @IsNotEmpty()
  id: number;

  constructor(params: GetOneGameDto) {
    Object.assign(this, params);
  }
}
