export class ImageModel {
  id: string;
  filename: string;
  type: number;

  constructor(partial: ImageModel) {
    Object.assign(this, partial);
  }
}
