import { Injectable } from '@nestjs/common';
import { Category, CategoryDocument } from './schema/category.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CategoryWorkflowConfigResponseDto } from './dto/category-workflow-config-response.dto';

@Injectable()
export class CategoryService {
    constructor(@InjectModel(Category.name) private categoryModel: Model<CategoryDocument>) {}

    async getAllForWorkflowConfig(): Promise<CategoryWorkflowConfigResponseDto[]> {
        const rawCategories = await this.categoryModel.find().exec();
        const response: CategoryWorkflowConfigResponseDto[] = rawCategories.map(category => ({
            id: category.id,
            name: category.localization.get('en')?.name || '',
        }));      
        return response;
    }   
}
