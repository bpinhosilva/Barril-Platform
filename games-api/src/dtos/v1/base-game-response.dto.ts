import { ImageReponseDto } from './image-response.dto';

export class BaseGameResponseDto {
  id: string;
  category: string;
  title: string;
  subtitle: string;
  description: string;
  images: ImageReponseDto[];
  type: string;
  tags: string[];
  author: string;
  replayBundleUrlJson: string;
  duration: number;
  isDownloadable: boolean;
  isStreamable: boolean;
  version: string;

  constructor(params: BaseGameResponseDto) {
    Object.assign(this, params);
  }
}
