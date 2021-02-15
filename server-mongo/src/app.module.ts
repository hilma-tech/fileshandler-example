import { Module } from '@nestjs/common';
import { FilesHandlerMongooseModule } from '@hilma/fileshandler-mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatModule } from './cat/cat.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from '@hilma/auth-mongo-nest';

@Module({
  imports: [
    MongooseModule.forRoot("mongodb://root:z10mz10m@localhost/fileshandlerFullProject"),
    FilesHandlerMongooseModule.register({
      folder: "/home/michael/filesHandlerUploads/full-project",
      imageSizes: { s: 500, m: 1000 },
      sizes: {
        image: 200
      }
    }),
    ConfigModule.forRoot({ load: [configuration], isGlobal: true }),
    CatModule,
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
