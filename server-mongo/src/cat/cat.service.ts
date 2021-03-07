import { Injectable } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { RequestUserType } from '@hilma/auth-mongo-nest';
import { FilesType, ImageMongooseService } from "@hilma/fileshandler-mongoose";

import { CreateCatDto } from './CreateCat.dto';
import { Cat, CatDocument } from './cat.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class CatService {
    constructor(
        @InjectModel(Cat.name) private readonly catModel: Model<CatDocument>,
        private readonly imageMongooseService: ImageMongooseService
    ) { }

    async newCat(cat: CreateCatDto, files: FilesType, user: RequestUserType): Promise<void> {

        const imagePath = await this.imageMongooseService.saveWithUsersPermission(files, cat.imageId, [Types.ObjectId(user._id)]);

        const newCat = new this.catModel;
        newCat.imagePath = imagePath;
        newCat.name = cat.name;
        newCat.userId = Types.ObjectId(user._id);
        newCat.save();
    }

    async allCats(user: RequestUserType): Promise<CatDocument[]> {
        const cats = await this.catModel.find({ userId: Types.ObjectId(user._id) }).exec();
        cats.forEach(cat => cat.id = cat._id);
        return cats;
    }

    singleCat(catId: number): Promise<CatDocument> {
        return this.catModel.findOne({ _id: Types.ObjectId(catId) }).exec();
    }

    async updateCat(catId: number, cat: CreateCatDto, files: FilesType, user: RequestUserType): Promise<void> {
        const catInDB = await this.catModel.findOne({ _id: catId });

        if (typeof cat.imageId === "number") {
            const previous = catInDB.imagePath;
            catInDB.imagePath = await this.imageMongooseService.saveInSizeWithUsersPermission(files, cat.imageId, 500, [Types.ObjectId(user._id)]);
            await this.imageMongooseService.deleteWithPermission(previous);
        }

        catInDB.name = cat.name;

        catInDB.save();
    }

    async deleteCat(catId: number): Promise<void> {
        const cat = await this.catModel.findOne({ _id: catId });
        await cat.deleteOne();
        await this.imageMongooseService.deleteWithPermission(cat.imagePath);
    }
}
