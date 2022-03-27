export class ImageReponseDto {
  id: string;
  url: URL;
  type: number;

  constructor(partial: ImageReponseDto) {
    Object.assign(this, partial);
  }
}
