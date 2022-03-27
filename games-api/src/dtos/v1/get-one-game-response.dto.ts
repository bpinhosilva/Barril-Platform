export class GetOneGameResponseDto {
  title: string;
  version: number;

  constructor(params: GetOneGameResponseDto) {
    Object.assign(this, params);
  }
}
