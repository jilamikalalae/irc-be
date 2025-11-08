import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CategoryDocument = Category & Document;

@Schema({ _id: false })
export class Localization {
  @Prop()
  name: string;

  @Prop()
  description: string;
}
export const LocalizationSchema = SchemaFactory.createForClass(Localization);

@Schema({ timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } })
export class Category {
  @Prop()
  isVisible: boolean;

  @Prop({ type: Map, of: LocalizationSchema })
  localization: Map<string, Localization>;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
