import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { EventsGateway } from './events/events.gateway'

const DB_HOST = process.env.DB_HOST || 'localhost';

@Module({
  imports: [MongooseModule.forRoot(`mongodb://${DB_HOST}/joblist`)],
  controllers: [AppController],
  providers: [AppService, EventsGateway],
})
export class AppModule { }
