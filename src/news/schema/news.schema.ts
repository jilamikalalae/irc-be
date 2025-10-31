import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';
import { Category } from 'src/category/schema/category.schema';
import { NewsStatus } from 'src/common/enum/news-status.enum';
import { NewsFormat } from 'src/news-format/schema/news-format.schema';

export type NewsDocument = News & Document;

@Schema()
export class LocalizedNews {
  @Prop()
  title: string;

  @Prop()
  hook: string;

  @Prop()
  introduction: string;

  @Prop()
  summery: string;

  @Prop()
  sources: string;

  @Prop()
  keyword: string[];
}
export const LocalizedNewsSchema =
  SchemaFactory.createForClass(LocalizedNews);

@Schema({ strict: false})
export class News {
  // @Prop({ type: Map, of: LocalizedNewsSchema })
  // localizedNews: Map<string, LocalizedNews>;

  @Prop()
  en: LocalizedNews;

  @Prop()
  th: LocalizedNews;

  @Prop({ type: Types.ObjectId, ref: Category.name, required: true })
  category: Category;

  @Prop({ type: Types.ObjectId, ref: NewsFormat.name, required: true })
  format: NewsFormat;

  @Prop(NewsStatus)
  status: string;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const NewsSchema = SchemaFactory.createForClass(News);
