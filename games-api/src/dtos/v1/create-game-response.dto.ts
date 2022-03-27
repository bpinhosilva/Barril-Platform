export class CreateGameResponseDto {
  title: string;
  version: number;

  constructor(params: CreateGameResponseDto) {
    Object.assign(this, params);
  }
}
