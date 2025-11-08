import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type NewsFormatDocument = NewsFormat & Document;

@Schema({ _id: false })
export class Localization {
  @Prop()
  name: string;

  @Prop()
  description: string;
}
export const LocalizationSchema = SchemaFactory.createForClass(Localization);

@Schema({ timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } })
export class NewsFormat {
  @Prop()
  prioritySource: string[];

  @Prop({ type: Map, of: LocalizationSchema })
  localization: Map<string, Localization>;
}

export const NewsFormatSchema = SchemaFactory.createForClass(NewsFormat);
