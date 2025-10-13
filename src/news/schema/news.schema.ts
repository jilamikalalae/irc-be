import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { Category } from "src/category/schema/category.schema";
import { NewsStatus } from "src/common/enum/news-status.enum";
import { NewsFormat } from "src/news-format/schema/news-format.schema";


export type NewsDocument = News & Document;


@Schema()
export class News {
    @Prop({ type: Types.ObjectId , ref: Category.name, required: true })
    category: Category;

    @Prop({ type: Types.ObjectId , ref: NewsFormat.name, required: true }) 
    format : NewsFormat;

    @Prop()
    title: string;

    @Prop()
    createdAt: Date;

    @Prop()
    updatedAt: Date;

    @Prop()
    content: string;

    @Prop()
    source: string;

    @Prop()
    keyword: string[];

    @Prop(NewsStatus)
    status: string;
}


export const NewsSchema = SchemaFactory.createForClass(News);