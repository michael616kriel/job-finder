import { Controller, Get, Inject, Post, Req } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs'

@Controller()
export class AuthController {
    constructor(@Inject('AUTH_SERVICE') private readonly client: ClientProxy) { }

    @Post('/auth/login')
    login(@Req() req): Observable<string> {
        const pattern = { cmd: 'login' };
        const payload = req.body;
        return this.client.send<string>(pattern, payload);
    }

    @Post('/applicant/signup')
    signupApplicant(@Req() req): Observable<string> {
        const pattern = { cmd: 'signup' };
        const payload = req.body;
        return this.client.send<string>(pattern, payload);
    }

    @Post('/employer/signup')
    signupEmployer(@Req() req): Observable<string> {
        const pattern = { cmd: 'signup' };
        const payload = req.body;
        return this.client.send<string>(pattern, payload);
    }

    @Post('/auth/checkToken')
    checkToken(@Req() req): Observable<string> {
        const pattern = { cmd: 'checkToken' };
        const payload = req.body;
        return this.client.send<string>(pattern, payload);
    }

}
