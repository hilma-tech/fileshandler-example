import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role, User, UserModule } from '@hilma/auth-nest';
import { FilePermission, FilesHandlerTypeormModule } from '@hilma/fileshandler-typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatModule } from './cat/cat.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { Cat } from './cat/cat.entity';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forRoot({
      "type": "mysql",
      "host": "localhost",
      "port": 3306,
      "username": "root",
      "password": "z10mz10m",
      "database": "fileshandler_full_project",
      "entities": [
        Cat,
        User,
        Role,
        FilePermission
      ],
      "synchronize": true
    }),
    FilesHandlerTypeormModule.register({
      folder: "/home/michael/filesHandlerUploads/full-project",
      imageSizes: { s: 500, m: 1000 },
      defaultAllow: true
    }),
    ConfigModule.forRoot({ load: [configuration], isGlobal: true }),
    CatModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
