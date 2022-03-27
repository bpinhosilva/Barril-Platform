import { IsArray, IsBoolean, IsNotEmpty } from 'class-validator';
import { ImageDto } from './image.dto';

export class CreateGameDto {
  @IsNotEmpty()
  category: string;

  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  subtitle: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  @IsArray()
  images: ImageDto[];

  @IsNotEmpty()
  type: string;

  @IsArray()
  tags: string[];

  @IsNotEmpty()
  author: string;

  @IsNotEmpty()
  replayBundleUrlJson: string;

  @IsNotEmpty()
  duration: number;

  @IsBoolean()
  isDownloadable: boolean;

  @IsBoolean()
  isStreamable: boolean;

  constructor(params: CreateGameDto) {
    Object.assign(this, params);
  }
}
