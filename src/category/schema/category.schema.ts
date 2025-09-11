import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";


export type CategoryDocument = Category & Document;


@Schema({ timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } })
export class Category {

    @Prop()
    name: string;

    @Prop()
    description: string;

    @Prop()
    isVisible: boolean;
}


export const CategorySchema = SchemaFactory.createForClass(Category);