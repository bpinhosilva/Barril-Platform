import { ImageDto } from './image.dto';

export class CreateGameResponseDto {
  id: string;
  category: string;
  title: string;
  subtitle: string;
  description: string;
  images: ImageDto[];
  type: string;
  tags: string[];
  author: string;
  replayBundleUrlJson: string;
  duration: number;
  isDownloadable: boolean;
  isStreamable: boolean;
  version: string;

  constructor(params: CreateGameResponseDto) {
    Object.assign(this, params);
  }
}
