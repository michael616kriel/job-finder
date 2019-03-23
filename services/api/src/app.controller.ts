import { Controller, Get, Res } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get('/')
  getHome(@Res() res): string {
    return res.send('Welcome to AUTH');
  }

  @MessagePattern({ cmd: 'message' })
  message(text: string): string {
    console.log('got messagt', text)
    return text;
  }
}
