import { Controller, Get, Inject, Res } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs'
import * as path from 'path'

@Controller()
export class AppController {
  constructor() { }

  @Get('/')
  getHome(@Res() res): Observable<string> {
    return res.sendFile(path.join(__dirname, '/../client/build/index.html'));
  }

}
