import { Injectable } from '@nestjs/common';
import { FilesType, ImageService } from "@hilma/fileshandler-server";
import { CreateCatDto } from './CreateCat.dto';
import { RequestUserType } from '@hilma/auth-nest';
import { Repository } from 'typeorm';
import { Cat } from './cat.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CatService {
    constructor(
        @InjectRepository(Cat) private readonly catRepository: Repository<Cat>,
        private readonly imageService: ImageService
    ) { }

    async newCat(cat: CreateCatDto, files: FilesType, user: RequestUserType): Promise<void> {

        const imagePath = await this.imageService.saveWithUserPermission(files, cat.imageId, user.id);

        const newCat = new Cat();
        newCat.imagePath = imagePath;
        newCat.name = cat.name;
        newCat.userId = user.id;
        await this.catRepository.save(newCat);
    }

    allCats(user: RequestUserType): Promise<Cat[]> {
        return this.catRepository.find({ where: { userId: user.id } });
    }

    singleCat(catId: number): Promise<Cat> {
        return this.catRepository.findOne({ where: { id: catId } });
    }

    async updateCat(catId: number, cat: CreateCatDto, files: FilesType, user: RequestUserType): Promise<void> {
        const catInDB = await this.catRepository.findOne({ where: { id: catId } });

        if (typeof cat.imageId === "number") {
            const previous = catInDB.imagePath;
            catInDB.imagePath = await this.imageService.saveInSizeWithUserPermission(files, cat.imageId, 500, user.id);
            await this.imageService.deleteWithPermissions(previous);
        }

        catInDB.name = cat.name;

        await this.catRepository.save(catInDB);
    }

    async deleteCat(catId: number): Promise<void> {
        const cat = await this.catRepository.findOne({ where: { id: catId } });
        await this.catRepository.delete({ id: catId });
        await this.imageService.deleteWithPermissions(cat.imagePath);
    }
}
