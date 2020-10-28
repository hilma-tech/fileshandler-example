import { Module } from '@nestjs/common';
import { CatService } from './cat.service';
import { CatController } from './cat.controller';
import { FilesHandlerModule } from '@hilma/fileshandler-server';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cat } from './cat.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Cat])
  ],
  providers: [CatService],
  controllers: [CatController]
})
export class CatModule {}
