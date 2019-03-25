import { Controller, Get, Res } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

import { JobService } from './job.service';
import { ApplicantService } from './applicant.service';
import { NetworkService } from './network.service';
import { EmployerService } from './employer.service';

@Controller()
export class AppController {
  constructor(
    private readonly jobService: JobService,
    private readonly applicantService: ApplicantService,
    private readonly networkService: NetworkService,
    private readonly employerService: EmployerService
  ) { }


  @MessagePattern({ cmd: 'employer-get' })
  async getEmployer(payload: any): Promise<any> {
    return await this.employerService.get(payload);
  }

  @MessagePattern({ cmd: 'employer-update' })
  async updateEmployer(payload: any): Promise<any> {
    return await this.employerService.update(payload);
  }

  @MessagePattern({ cmd: 'employer-delete' })
  async deleteEmployer(payload: any): Promise<any> {
    return await this.employerService.delete(payload);
  }

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

  @MessagePattern({ cmd: 'jobCreate' })
  async jobCreate(payload: any): Promise<any> {
    return await this.jobService.create(payload);
  }

  @MessagePattern({ cmd: 'jobUpdate' })
  async jobUpdate(payload: any): Promise<any> {
    return await this.jobService.update(payload);
  }

  @MessagePattern({ cmd: 'JobApply' })
  async JobApply(payload: any): Promise<any> {
    return await this.jobService.apply(payload);
  }

  @MessagePattern({ cmd: 'jobsPosted' })
  async jobsPosted(payload: any): Promise<any> {
    return await this.jobService.getUserJobs(payload);
  }

  @MessagePattern({ cmd: 'jobApplicants' })
  async jobApplicants(payload: any): Promise<any> {
    return await this.jobService.jobApplicants(payload);
  }


  // networking
  @MessagePattern({ cmd: 'friend-requests' })
  async friendRequests(payload: any): Promise<any> {
    return await this.networkService.getFriendRequests(payload);
  }

  @MessagePattern({ cmd: 'handle-friend-requests' })
  async handleFriendRequests(payload: any): Promise<any> {
    return await this.networkService.acceptFriendRequest(payload);
  }

  @MessagePattern({ cmd: 'network-users' })
  async networkUsers(payload: any): Promise<any> {
    return await this.networkService.getUsers(payload);
  }

  @MessagePattern({ cmd: 'profile' })
  async profile(payload: any): Promise<any> {
    return await this.networkService.profile(payload);
  }

  @MessagePattern({ cmd: 'my-network' })
  async myNetwork(payload: any): Promise<any> {
    return await this.networkService.getMyNetwork(payload);
  }

  @MessagePattern({ cmd: 'network-connect' })
  async netoworkConnect(payload: any): Promise<any> {
    return await this.networkService.connect(payload);
  }

  @MessagePattern({ cmd: 'stats' })
  async stats(payload: any): Promise<any> {
    return await this.networkService.generalStats(payload);
  }


}

