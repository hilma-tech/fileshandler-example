import { Module } from '@nestjs/common';
import { CatService } from './cat.service';
import { CatController } from './cat.controller';
import { FilesHandlerModule } from '@hilma/fileshandler-server';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cat } from './cat.entity';
import { UserModule } from '@hilma/auth-nest';

@Module({
  imports: [
    TypeOrmModule.forFeature([Cat]),
    UserModule
  ],
  providers: [CatService],
  controllers: [CatController]
})
export class CatModule {}
