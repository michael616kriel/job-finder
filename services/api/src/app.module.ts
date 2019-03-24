import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { JobService } from './job.service';
import { ApplicantService } from './applicant.service';
import { NetworkService } from './network.service';
import { EmployerService } from './employer.service';
import { MongooseModule } from '@nestjs/mongoose';

import ApplicantSchema from './schemas/Applicant.schema'
import JobSchema from './schemas/Job.schema'
import UserSchema from './schemas/User.schema'
import NetworkSchema from './schemas/Network.schema'
import FriendRequestSchema from './schemas/FriendRequest.schema'
import EmployerSchema from './schemas/Employer.schema'
@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/joblist', { useNewUrlParser: true }),
    MongooseModule.forFeature([{ name: 'Job', schema: JobSchema }]),
    MongooseModule.forFeature([{ name: 'Applicant', schema: ApplicantSchema }]),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    MongooseModule.forFeature([{ name: 'Network', schema: NetworkSchema }]),
    MongooseModule.forFeature([{ name: 'FriendRequest', schema: FriendRequestSchema }]),
    MongooseModule.forFeature([{ name: 'Employer', schema: EmployerSchema }])
  ],
  controllers: [AppController],
  providers: [JobService, ApplicantService, NetworkService, EmployerService],
})
export class AppModule { }
