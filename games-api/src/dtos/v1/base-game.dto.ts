import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  ValidateNested,
} from 'class-validator';
import { ImageDto } from './image.dto';

export class BaseGameDto {
  @IsNotEmpty()
  category: string;

  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  subtitle: string;

  @IsNotEmpty()
  description: string;

  @IsArray({})
  @ValidateNested({ each: true })
  @Type(() => ImageDto)
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

  constructor(params: BaseGameDto) {
    Object.assign(this, params);
  }
}
