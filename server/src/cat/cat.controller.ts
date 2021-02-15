import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { UseFilesHandler, UploadedFiles, FilesType, ImageService } from '@hilma/fileshandler-server';
import { CreateCatDto } from './CreateCat.dto';
import { CatService } from './cat.service';
import { RequestUser, RequestUserType, UseJwtAuth, UserService } from '@hilma/auth-nest';
import { Cat } from './cat.entity';

@Controller('cat')
export class CatController {
    constructor(
        private readonly catService: CatService,
    ) { }

    @Post("new-cat")
    @UseJwtAuth()
    @UseFilesHandler()
    async newCat(@Body() cat: CreateCatDto, @UploadedFiles() files: FilesType, @RequestUser() user: RequestUserType) {
        console.log(files)
        await this.catService.newCat(cat, files, user);
        return { success: true };
    }

    @Get("all-cats")
    @UseJwtAuth()
    allCats(@RequestUser() user: RequestUserType): Promise<Cat[]> {
        return this.catService.allCats(user);
    }

    @Get("single-cat/:id")
    @UseJwtAuth()
    singleCat(@Param("id") id: number): Promise<Cat> {
        return this.catService.singleCat(id);
    }

    @Post("update-cat/:id")
    @UseJwtAuth()
    @UseFilesHandler()
    async updateCat(@Param("id") id: number, @Body() cat: CreateCatDto, @UploadedFiles() files: FilesType, @RequestUser() user: RequestUserType) {
        await this.catService.updateCat(id, cat, files, user);
        return { success: true };
    }

    @Delete("delete-cat/:id")
    async deleteCat(@Param("id") id: number) {
        await this.catService.deleteCat(id);
    }
}
