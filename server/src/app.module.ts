import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '@hilma/auth-nest';
import { FilesHandlerModule } from '@hilma/fileshandler-server';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatModule } from './cat/cat.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forRoot(),
    FilesHandlerModule.register({
      folder: "/home/michael/filesHandlerUploads/full-project",
      imageSizes: { s: 500, m: 1000 },
      // autoAllow: true
    }),
    ConfigModule.forRoot({ load: [configuration], isGlobal: true }),
    CatModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
