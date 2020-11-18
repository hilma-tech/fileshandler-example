import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { set } from 'mongoose';
import * as cookieParser from "cookie-parser";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  set("useCreateIndex", true);
  await app.listen(8080);
}
bootstrap();
