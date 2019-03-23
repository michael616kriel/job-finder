import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { AuthController } from './controllers/auth.controller';
// import { MessagingController } from './controllers/messaging.controller';
// import { NetworkController } from './controllers/networking.controller';
import { ClientsModule, Transport, ClientProxyFactory } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'AUTH_SERVICE',
        transport: Transport.TCP,
        options: {
          port: 6000
        }
      },
      // {
      //   name: 'MESSAGING_SERVICE',
      //   transport: Transport.TCP,
      //   options: {
      //     host: 'http://localhost',
      //     port: 8082
      //   }
      // },
      // {
      //   name: 'NETWORKING_SERVICE',
      //   transport: Transport.TCP,
      //   options: {
      //     host: 'http://localhost',
      //     port: 8082
      //   }
      // },
    ])
  ],
  controllers: [
    AppController,
    AuthController,
    // MessagingController,
    // NetworkController
  ],
  providers: [],
})
export class AppModule { }
