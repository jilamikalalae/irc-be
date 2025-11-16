import { Module } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Category, CategorySchema } from 'src/category/schema/category.schema';
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
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}
