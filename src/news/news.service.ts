import { Injectable, NotFoundException } from '@nestjs/common';
import { NewsDetailResponseDto } from './dto/news-detail-response.dto';
import { InjectModel } from '@nestjs/mongoose';
import {
  Category,
  CategoryDocument,
} from 'src/category/schema/category.schema';
import { Model } from 'mongoose';
import { NewsFormat } from 'src/news-format/schema/news-format.schema';
import { LocalizedNews, News, NewsDocument } from './schema/news.schema';
import { NewsStatus } from 'src/common/enum/news-status.enum';
import { NewsSearchRequestDto } from './dto/news-search-request.dto';
import { NewsSearchResponseDto } from './dto/news-search-response.dto';
import { NewsUpdateStatusRequestDto } from './dto/news-update-status-request.dto';

@Injectable()
export class NewsService {
  constructor(
    @InjectModel(News.name) private newsModel: Model<NewsDocument>,
  ) {}
  async getNewsById(id: string): Promise<NewsDetailResponseDto | null> {
    const news = await this.newsModel.findById(id).populate('category').exec();
    if (!news) {
        throw new NotFoundException('News not found');
    }
    const localizedNews: LocalizedNews = news["en"];
    return {
        id : news.id,
        category : news.category.localization.get('en')?.name || '',
        title : localizedNews.title,
        introduction : localizedNews.introduction,
        hook : localizedNews.hook,
        summary : localizedNews.summery,
        source : localizedNews.sources,
        keyword : localizedNews.keyword,
        status : news.status as NewsStatus,
        createdAt : news.createdAt,
        updatedAt : news.updatedAt  
    };
  }
  

  async searchNews(request: NewsSearchRequestDto): Promise<NewsSearchResponseDto> {
    const page = request.page ? Number((request as any).page) : 1;
    const limit = request.limit ? Number((request as any).limit) : 10;

    const query: any = {};
    
    if (request.keyword) {
      const kwRegex = { $regex: request.keyword, $options: 'i' };
      query.$or = [
        { ['en.title']: kwRegex },
        { ['en.keyword']: kwRegex },
      ];
    }
    if (request.categoryId && request.categoryId.trim() !== '') {
      query.category = request.categoryId;
    }
    // Only filter by status when it's explicitly provided (not null/undefined).
    if (request.status !== undefined && request.status !== null) {
      query.status = request.status;
    }

    if (request.startDate && request.endDate) {
      const startDate =  new Date(request.startDate)
      const endDate = new Date(request.endDate);
      endDate.setUTCHours(23, 59, 59, 999); // Set to end of the day
      console.log('Filtering from', startDate, 'to', endDate);
      query.createdAt = { $gte: startDate, $lte: endDate };
    }
    
    const totalItems = await this.newsModel.countDocuments(query);
    const totalPage = Math.ceil(totalItems / limit);
    const skip = (page - 1) * limit;

    const newsList = await this.newsModel.find(query)
      .populate('category')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .exec();


    const langEn = 'en';
    const items = newsList.map(news => {
    const localized: LocalizedNews = news[langEn];
    return {
      id: news.id,
      category: news.category?.localization.get('en')?.name || '',
      title: localized?.title || '',
      introduction: localized?.introduction || '',
      hook: localized?.hook || '',
      summary: localized?.summery || '',
      source: localized?.sources || '',
      keyword: localized?.keyword || [],
      status: news.status as NewsStatus,
      createdAt: news.createdAt,
      updatedAt: news.updatedAt,
    };
  });

    return {
      currentPage: page,
      totalPage,
      totalItems,
      items,
    } as NewsSearchResponseDto;
  }

  async updateStatus (request: NewsUpdateStatusRequestDto){
    let news = await this.newsModel.findById(request.id).exec();
    if(!news){
      throw new NotFoundException('News not found');
    }
    news.status = request.status;
    await news.save();
    return;
  }

}
