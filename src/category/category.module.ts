import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Category, CategorySchema } from './schema/category.schema';
import { News, NewsSchema } from 'src/news/schema/news.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { 
        name: Category.name,
        schema: CategorySchema,
    },
    {
      name: News.name,
      schema: NewsSchema,
    }
  ])
  ],
  controllers: [CategoryController],
  providers: [CategoryService],
  exports: [CategoryService, MongooseModule],
})
export class CategoryModule {}
