import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  WorkFlowConfig,
  WorkFlowConfigDocument,
} from './schema/workflow-config.shcema';
import { Model } from 'mongoose';
import {
  Category,
  CategoryDocument,
} from 'src/category/schema/category.schema';
import {
  NewsFormat,
  NewsFormatDocument,
} from 'src/news-format/schema/news-format.schema';
import { User, UserDocument } from 'src/user/schema/user.schema';
import { SaveWorkflowConfigRequestDto } from './dto/save-workflow-config-request.dto';
import { getBangkokMidnightLastFridayAsUTC } from 'src/utill/date-time';
import { LatestInfoResponseDto } from './dto/latest-info-response.dto';

@Injectable()
export class WorkflowConfigService {
  constructor(
    @InjectModel(WorkFlowConfig.name)
    private WorkFlowConfigModel: Model<WorkFlowConfigDocument>,
    @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>,
    @InjectModel(NewsFormat.name)
    private newsFormatModel: Model<NewsFormatDocument>,
    @InjectModel(User.name) private UserModel: Model<UserDocument>,
  ) {}

  async save(userId: string, request: SaveWorkflowConfigRequestDto) {
    const category = await this.categoryModel.findById(request.categoryId);
    if (!category) {
      throw new NotFoundException();
    }
    const format = await this.newsFormatModel.findById(request.formatId);
    if (!format) {
      throw new NotFoundException();
    }
    const user = await this.UserModel.findById(userId);
    if (!user) {
      throw new NotFoundException();
    }
    const saveWorkFlowConfig: Omit<WorkFlowConfig, 'createdAt' | 'updatedAt'> = {
      categoryId: category.id,
      categoryName: category.localization.get('en')?.name || '',
      formatId: format.id,
      formatName: format.localization.get('en')?.name || '',
      formatDescription: format.localization.get('en')?.description || '',
      createdBy: {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      },
    };

    const result = new this.WorkFlowConfigModel(saveWorkFlowConfig);
    return result.save()
  }


  async getLatestInfo(): Promise<LatestInfoResponseDto>{
    const newestConfig = await this.WorkFlowConfigModel
      .findOne()
      .sort({ createdAt: -1})
      .exec();

    const lastFridayDate = getBangkokMidnightLastFridayAsUTC()
    const latestConfig = await this.WorkFlowConfigModel
      .findOne({
        createdAt: { $lt: lastFridayDate },
      })
      .sort({ createdAt: -1})
      .exec()


    const response: LatestInfoResponseDto = {
      lastWeekCategoryId: latestConfig?.categoryId,
      lastWeekCategoryName: latestConfig?.categoryName,
      lastWeekFormatId: latestConfig?.formatId,
      lastWeekFormatName: latestConfig?.formatName,
      lastWeekFormatDescription: latestConfig?.formatDescription,
      currentCategoryId: newestConfig?.categoryId,
      currentCategoryName: newestConfig?.categoryName,
      currentFormatId: newestConfig?.formatId,
      currentFormatName: newestConfig?.formatName,
      currentFormatDescription: newestConfig?.formatDescription,
      updatedAt: newestConfig?.updatedAt
    }

    return response
  }

  
}