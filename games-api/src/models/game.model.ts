import { ImageModel } from './image.model';

export class GameModel {
  id: string;
  category: string;
  title: string;
  subtitle: string;
  description: string;
  images: ImageModel[];
  type: string;
  tags: string[];
  author: string;
  replayBundleUrlJson: string;
  duration: number;
  isDownloadable: boolean;
  isStreamable: boolean;
  version: string;

  constructor(partial: GameModel) {
    Object.assign(this, partial);
  }
}
