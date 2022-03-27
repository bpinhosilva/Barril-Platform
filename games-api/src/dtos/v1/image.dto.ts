export class ImageDto {
  id: string;
  url: string;
  type: number;

  constructor(partial: ImageDto) {
    Object.assign(this, partial);
  }
}
