export class Image {
  id: string;
  url: URL;
  type: number;

  constructor(params: Image) {
    Object.assign(this, params);
  }
}
