import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { AuthController } from './controllers/auth.controller';
import { ApiController } from './controllers/api.controller';
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
      {
        name: 'API_SERVICE',
        transport: Transport.TCP,
        options: {
          port: 6001
        }
      },
      // {
      //   name: 'NOTIFICATION_SERVICE',
      //   transport: Transport.TCP,
      //   options: {
      //     port: 6002
      //   }
      // },
      {
        name: 'STORAGE_SERVICE',
        transport: Transport.TCP,
        options: {
          port: 6003
        }
      },
    ])
  ],
  controllers: [
    AppController,
    AuthController,
    ApiController
  ],
  providers: [],
})
export class AppModule { }
