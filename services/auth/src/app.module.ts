import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';

import UserSchema from './schemas/User.schema'
import EmployerSchema from './schemas/Employer.schema'
import ApplicantSchema from './schemas/Applicant.schema'

const DB_HOST = process.env.DB_HOST || 'localhost';

@Module({
  imports: [
    MongooseModule.forRoot(`mongodb://${DB_HOST}/joblist`),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    MongooseModule.forFeature([{ name: 'Employer', schema: EmployerSchema }]),
    MongooseModule.forFeature([{ name: 'Applicant', schema: ApplicantSchema }])
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
