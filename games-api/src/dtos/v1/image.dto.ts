import { IsNotEmpty, IsNumber } from 'class-validator';

export class ImageDto {
  @IsNotEmpty()
  filename: string;

  @IsNotEmpty()
  @IsNumber()
  type: number;

  constructor(partial: ImageDto) {
    Object.assign(this, partial);
  }
}
