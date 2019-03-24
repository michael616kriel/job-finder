import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { EventsGateway } from './events/events.gateway'

import ChatSchema from './schemas/Chat.schema'

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/joblist'),
    MongooseModule.forFeature([{ name: 'Chat', schema: ChatSchema }]),
  ],
  controllers: [AppController],
  providers: [AppService, EventsGateway],
})
export class AppModule { }
