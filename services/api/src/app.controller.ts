import { Controller, Get, Res } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

import { JobService } from './job.service';
import { ApplicantService } from './applicant.service';
import { NetworkService } from './network.service';

@Controller()
export class AppController {
  constructor(
    private readonly jobService: JobService,
    private readonly applicantService: ApplicantService,
    private readonly networkService: NetworkService
  ) { }

  @MessagePattern({ cmd: 'applicant-get' })
  async get(payload: any): Promise<any> {
    return await this.applicantService.get(payload);
  }

  @MessagePattern({ cmd: 'applicant-update' })
  async update(payload: any): Promise<any> {
    return await this.applicantService.update(payload);
  }

  @MessagePattern({ cmd: 'applicant-delete' })
  async delete(payload: any): Promise<any> {
    return await this.applicantService.delete(payload);
  }

  @MessagePattern({ cmd: 'jobs' })
  async jobs(payload: any): Promise<any> {
    return await this.jobService.get(payload);
  }

  @MessagePattern({ cmd: 'job' })
  async job(payload: any): Promise<any> {
    return await this.jobService.getOne(payload);
  }

  @MessagePattern({ cmd: 'jobsApplied' })
  async jobsApplied(payload: any): Promise<any> {
    return await this.jobService.getUserAppliedJobs(payload);
  }

  // networking
  @MessagePattern({ cmd: 'friend-requests' })
  async friendRequests(payload: any): Promise<any> {
    return await this.networkService.getFriendRequests(payload);
  }

  @MessagePattern({ cmd: 'network-users' })
  async networkUsers(payload: any): Promise<any> {
    return await this.networkService.getUsers(payload);
  }

  @MessagePattern({ cmd: 'my-network' })
  async myNetwork(payload: any): Promise<any> {
    return await this.networkService.getMyNetwork(payload);
  }

  @MessagePattern({ cmd: 'stats' })
  async stats(payload: any): Promise<any> {
    return await this.networkService.generalStats(payload);
  }


}

