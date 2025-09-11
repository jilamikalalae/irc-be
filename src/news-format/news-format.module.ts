import { Module } from '@nestjs/common';
import { NewsFormatService } from './news-format.service';
import { NewsFormatController } from './news-format.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { NewsFormat, NewsFormatSchema } from './schema/news-format.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: NewsFormat.name,
        schema: NewsFormatSchema,
      },
    ])
  ],
  controllers: [NewsFormatController],
  providers: [NewsFormatService],
  exports: [NewsFormatService, MongooseModule],
  
})
export class NewsFormatModule {}
