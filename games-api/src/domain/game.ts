import { Image } from './image';

export class Game {
  id: string;
  category: string;
  title: string;
  subtitle: string;
  description: string;
  images: Image[];
  type: string;
  tags: string[];
  author: string;
  replayBundleUrlJson: string;
  duration: number;
  isDownloadable: boolean;
  isStreamable: boolean;
  version: string;

  constructor(params: Game) {
    Object.assign(this, params);
  }
}
