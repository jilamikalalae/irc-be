import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type NewsFormatDocument = NewsFormat & Document;

@Schema({ timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } })
export class NewsFormat {

    @Prop()
    name: string;
    
    @Prop()
    description: string;

    @Prop()
    prioritySource: string[];

}

export const NewsFormatSchema = SchemaFactory.createForClass(NewsFormat);