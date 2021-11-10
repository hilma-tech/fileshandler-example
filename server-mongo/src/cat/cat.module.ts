import { Module } from '@nestjs/common';
import { CatService } from './cat.service';
import { CatController } from './cat.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Cat, CatSchema } from './cat.schema';
import { UserModule } from '@hilma/auth-mongo-nest';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Cat.name, schema: CatSchema }]),
    UserModule
  ],
  providers: [CatService],
  controllers: [CatController]
})
export class CatModule { }
