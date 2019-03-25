import { Controller, Get, Inject, Post, Req, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import * as formidable from 'formidable'
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs'


@Controller()
export class ApiController {
    constructor(
        @Inject('API_SERVICE') private readonly client: ClientProxy,
        @Inject('STORAGE_SERVICE') private readonly storage: ClientProxy) { }

    @Get('/')
    root(): string {
        return 'Welcome to Auth';
    }

    @Post('/upload/profile')
    @UseInterceptors(FilesInterceptor('profile'))
    async uploadProfile(@Req() req, @UploadedFiles() files): Promise<any> {
        const pattern = { cmd: 'upload-profile' };
        const payload = { profile: files[0] };
        return this.storage.send<any>(pattern, payload);
    }

    @Post('/upload/banner')
    uploadBanner(@Req() req): Observable<any> {
        const pattern = { cmd: 'upload-banner' };
        const payload = req.body;
        return this.storage.send<any>(pattern, payload);
    }

    @Get('/employer/get')
    getEmployer(@Req() req): Observable<any> {
        const pattern = { cmd: 'employer-get' };
        const payload = req.query;
        return this.client.send<any>(pattern, payload);
    }

    @Get('/employer/update')
    updateEmployer(@Req() req): Observable<any> {
        const pattern = { cmd: 'employer-update' };
        const payload = req.query;
        return this.client.send<any>(pattern, payload);
    }

    @Get('/employer/delete')
    deleteEmployer(@Req() req): Observable<any> {
        const pattern = { cmd: 'employer-delete' };
        const payload = req.query;
        return this.client.send<any>(pattern, payload);
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

    @Get('/jobCreate')
    jobCreate(@Req() req): Observable<any> {
        const pattern = { cmd: 'jobCreate' };
        const payload = req.query;
        return this.client.send<any>(pattern, payload);
    }

    @Get('/jobUpdate')
    jobUpdate(@Req() req): Observable<any> {
        const pattern = { cmd: 'jobUpdate' };
        const payload = req.query;
        return this.client.send<any>(pattern, payload);
    }

    @Get('/jobsPosted')
    jobsPosted(@Req() req): Observable<any> {
        const pattern = { cmd: 'jobsPosted' };
        const payload = req.query;
        return this.client.send<any>(pattern, payload);
    }

    @Get('/JobApply')
    JobApply(@Req() req): Observable<any> {
        const pattern = { cmd: 'JobApply' };
        const payload = req.query;
        return this.client.send<any>(pattern, payload);
    }



    @Get('/jobApplicants')
    jobApplicants(@Req() req): Observable<any> {
        const pattern = { cmd: 'jobApplicants' };
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
    @Get('/profile')
    profile(@Req() req): Observable<any> {
        const pattern = { cmd: 'profile' };
        const payload = req.query;
        return this.client.send<any>(pattern, payload);
    }

    @Get('/my-network')
    myNetwork(@Req() req): Observable<any> {
        const pattern = { cmd: 'my-network' };
        const payload = req.query;
        return this.client.send<any>(pattern, payload);
    }

    @Get('/network-connect')
    networkConnect(@Req() req): Observable<any> {
        const pattern = { cmd: 'network-connect' };
        const payload = req.query;
        return this.client.send<any>(pattern, payload);
    }
    @Get('/handle-friend-requests')
    handleFriendRequests(@Req() req): Observable<any> {
        const pattern = { cmd: 'handle-friend-requests' };
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
