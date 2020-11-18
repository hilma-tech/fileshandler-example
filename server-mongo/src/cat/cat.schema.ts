import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types, Document } from 'mongoose';

export type CatDocument = Cat & Document;

@Schema()
export class Cat {
    @Prop()
    id: Types.ObjectId;

    @Prop()
    name: string;

    @Prop()
    imagePath: string;

    @Prop()
    userId: Types.ObjectId;
}

export const CatSchema = SchemaFactory.createForClass(Cat);