import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @MessagePattern({ cmd: 'upload-profile' })
  uploadProfile(payload: any): string {
    return this.appService.uploadProfile(payload);
  }

  @MessagePattern({ cmd: 'upload-banner' })
  uploadBanner(payload: any): string {
    return this.appService.uploadBanner(payload);
  }

}
