import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { join } from 'path';
import * as bodyParser from 'body-parser'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors();
  app.useStaticAssets(join(__dirname, '/../', 'client/build/'));
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: false }))
  await app.listen(3005);
}
bootstrap();
