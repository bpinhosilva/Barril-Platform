export class ImageModel {
  id: string;
  url: string;
  type: number;

  constructor(partial: ImageModel) {
    Object.assign(this, partial);
  }
}
