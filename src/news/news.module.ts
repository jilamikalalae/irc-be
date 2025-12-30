import { Module } from '@nestjs/common';
import { NewsService } from './news.service';
import { NewsController } from './news.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { News, NewsSchema } from './schema/news.schema';
import { Category, CategorySchema } from 'src/category/schema/category.schema';
import { SanityService } from 'src/sanity/sanity.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: News.name, schema: NewsSchema },
      { name: Category.name, schema: CategorySchema },
    ]),
  ],
  controllers: [NewsController],
  providers: [NewsService, MongooseModule, SanityService],
})
export class NewsModule {}
