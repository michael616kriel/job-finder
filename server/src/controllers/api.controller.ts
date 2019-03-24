import { Controller, Get, Inject, Post, Req } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs'

@Controller()
export class ApiController {
    constructor(@Inject('API_SERVICE') private readonly client: ClientProxy) { }

    @Get('/')
    root(): string {
        return 'Welcome to Auth';
    }

    @Get('/applicant/get')
    getApplicant(@Req() req): Observable<any> {
        const pattern = { cmd: 'applicant-get' };
        const payload = req.query;
        return this.client.send<any>(pattern, payload);
    }

    @Get('/applicant/update')
    updateApplicant(@Req() req): Observable<any> {
        const pattern = { cmd: 'applicant-update' };
        const payload = req.query;
        return this.client.send<any>(pattern, payload);
    }

    @Get('/applicant/delete')
    deleteApplicant(@Req() req): Observable<any> {
        const pattern = { cmd: 'applicant-delete' };
        const payload = req.query;
        return this.client.send<any>(pattern, payload);
    }


    @Get('/jobs')
    getJobs(@Req() req): Observable<any> {
        const pattern = { cmd: 'jobs' };
        const payload = req.query;
        return this.client.send<any>(pattern, payload);
    }

    @Get('/job/:id')
    getJob(@Req() req): Observable<any> {
        const pattern = { cmd: 'job' };
        const payload = req.params;
        return this.client.send<any>(pattern, payload);
    }

    @Get('/jobsApplied')
    jobsApplied(@Req() req): Observable<any> {
        const pattern = { cmd: 'jobsApplied' };
        const payload = req.query;
        return this.client.send<any>(pattern, payload);
    }


    @Get('/friend-requests')
    friendRequests(@Req() req): Observable<any> {
        const pattern = { cmd: 'friend-requests' };
        const payload = req.query;
        return this.client.send<any>(pattern, payload);
    }

    @Get('/network-users')
    networkUsers(@Req() req): Observable<any> {
        const pattern = { cmd: 'network-users' };
        const payload = req.query;
        return this.client.send<any>(pattern, payload);
    }

    @Get('/my-network')
    myNetwork(@Req() req): Observable<any> {
        const pattern = { cmd: 'my-network' };
        const payload = req.query;
        return this.client.send<any>(pattern, payload);
    }

    @Get('/stats')
    stats(@Req() req): Observable<any> {
        const pattern = { cmd: 'stats' };
        const payload = req.query;
        return this.client.send<any>(pattern, payload);
    }

}
