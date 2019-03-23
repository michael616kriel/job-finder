import { Controller, Get, Inject, Res } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs'

@Controller('messaging')
export class MessagingController {
    // constructor(@Inject('MESSAGING_SERVICE') private readonly client: ClientProxy) { }

    // @Get('/')
    // getApi(): Observable<string> {
    //     const pattern = { cmd: 'message' };
    //     const payload = 'this is my message';
    //     return this.client.send<string>(pattern, payload);
    // }

}
