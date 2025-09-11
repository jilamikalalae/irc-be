import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { NewsFormat, NewsFormatDocument } from './schema/news-format.schema';
import { Model } from 'mongoose';
import { NewsFormatWorkflowConfigResponseDto } from './dto/news-format-workflow-config.dto';

@Injectable()
export class NewsFormatService {
    constructor(@InjectModel(NewsFormat.name) private newsFormatModel: Model<NewsFormatDocument>) {}

    async getAllForWorkflowConfig(): Promise<NewsFormatWorkflowConfigResponseDto[]> {
        const rawNewsFormats = await this.newsFormatModel.find().exec();
        const response: NewsFormatWorkflowConfigResponseDto[] = rawNewsFormats.map(newsFormat => ({
            id: newsFormat.id,
            name: newsFormat.name,
            description: newsFormat.description,
        }));
        return response;
    }
}
