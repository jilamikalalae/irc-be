import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category, CategoryDocument } from 'src/category/schema/category.schema';
import { News, NewsDocument } from 'src/news/schema/news.schema';
import { CountOverallResponseDto } from './dto/count-overall-response.dto';
import { NewsStatus } from 'src/common/enum/news-status.enum';
import { RecentNewsResponseDto } from './dto/recent-news-response.dto';
import { RecentNewsRequestDto } from './dto/recent-news-request.dto';

@Injectable()
export class DashboardService {
    constructor(
            @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>,
            @InjectModel(News.name) private newsModel: Model<NewsDocument>
    ) {}

    async getCountOverall(): Promise<CountOverallResponseDto> {
        const totalNews = await this.newsModel.countDocuments().exec();
        const totalPendingNews = await this.newsModel.countDocuments({ status: NewsStatus.PENDING }).exec();
        const totalPublishedNews = await this.newsModel.countDocuments({ status: NewsStatus.PUBLISHED }).exec();
        const totalCategory = await this.categoryModel.countDocuments().exec();

        return {
            totalNews,
            totalPendingNews,
            totalPublishedNews,
            totalCategory
        };
    }

    async getRecentNews(request: RecentNewsRequestDto, lang: string): Promise<RecentNewsResponseDto[]> {
        const recentNews = await this.newsModel.find()
            .sort({ updatedAt: -1 })
            .limit(request.limit)
            .populate('category')
            .exec();

        return recentNews.map(news => {
            const localizedNews = news[lang];
            console.log('Localized News:', localizedNews);
            return {
                id: news.id,
                title: localizedNews.title,
                category: news.category.localization.get(lang)?.name || '',
                status: news.status as NewsStatus,
                updatedAt: news.updatedAt
            };
        }); 
    }

}
