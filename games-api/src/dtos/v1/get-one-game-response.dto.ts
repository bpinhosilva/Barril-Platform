import { ImageDto } from './image.dto';

export class GetOneGameResponseDto {
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

  constructor(params: GetOneGameResponseDto) {
    Object.assign(this, params);
  }
}
