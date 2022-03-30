import { Controller, Get, Param, Res } from '@nestjs/common';
import { AppService } from '../../app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('images/:filename')
  getImages(@Param('filename') filename: string, @Res() res): Promise<any> {
    return res.sendFile(filename, { root: 'src/images' });
  }
}
