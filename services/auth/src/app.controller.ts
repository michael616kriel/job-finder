import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AppService } from './app.service';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @MessagePattern({ cmd: 'login' })
  async login(payload: any): Promise<any> {
    console.log(payload)
    return await this.appService.login(payload)
  }

  @MessagePattern({ cmd: 'signup' })
  async signup(payload: any): Promise<any> {
    return await this.appService.signup(payload)
  }

  @MessagePattern({ cmd: 'checkToken' })
  async checkToken(payload: any): Promise<any> {
    return await this.appService.checkToken(payload)
  }

}
