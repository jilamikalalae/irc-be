import { Injectable } from '@nestjs/common';
import { Category, CategoryDocument } from './schema/category.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CategoryWorkflowConfigResponseDto } from './dto/category-workflow-config-response.dto';
import { CategoryOverviewDto } from './dto/category-overview.dto';
import { News, NewsDocument } from 'src/news/schema/news.schema';
import { CategorySearchRequestDto } from './dto/category-search-request.dto';
import { CategorySearchResponseDto } from './dto/category-search-response.dto';

@Injectable()
export class CategoryService {
    constructor(
        @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>,
        @InjectModel(News.name) private newsModel: Model<NewsDocument>
) {}

    async getAllForWorkflowConfig(lang: string): Promise<CategoryWorkflowConfigResponseDto[]> {
        const rawCategories = await this.categoryModel.find().exec();
        const response: CategoryWorkflowConfigResponseDto[] = rawCategories.map(category => ({
            id: category.id,
            name: category.localization.get(lang)?.name || '',
        }));      
        return response;
    }  
    
    async getOverviewCategories(): Promise<CategoryOverviewDto> {
        const totalCategory = await this.categoryModel.countDocuments().exec();
        const totalActiveCategory = await this.categoryModel.countDocuments({ isVisible: true }).exec();
        const totalNews = await this.newsModel.countDocuments().exec(); 
        return {
            totalCategory: totalCategory,
            totalActiveCategory: totalActiveCategory,
            totalNews: totalNews
        }
    }

    async searchCategory(request: CategorySearchRequestDto, lang: string): Promise<CategorySearchResponseDto[]> {
        const query: any = {};
        if (request.keyword && request.keyword.trim() !== '') {
            const kwRegex = { $regex: request.keyword, $options: 'i' };
            query.$or = [
                { ['localization.en.name']: kwRegex },
                { ['localization.en.description']: kwRegex },
            ];
        }
        const rawCategories = await this.categoryModel.find(query).exec();
        if (!rawCategories || rawCategories.length === 0) return [];

        // Get counts for all categories in a single aggregation
        const categoryIds = rawCategories.map(c => c.id);
        const counts = await this.newsModel.aggregate([
            { $match: { category: { $in: categoryIds } } },
            { $group: { _id: '$category', count: { $sum: 1 } } }
        ]).exec();

        const countsMap = new Map<string, number>(counts.map(c => [String(c._id), c.count]));

        const response: CategorySearchResponseDto[] = rawCategories.map(category => ({
            name: category.localization.get(lang)?.name || '',
            description: category.localization.get(lang)?.description || '',
            isVisible: category.isVisible,
            totalNews: countsMap.get(category.id) || 0
        }));

        return response;
    }
}
