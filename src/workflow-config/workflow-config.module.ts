import { Module } from '@nestjs/common';
import { WorkflowConfigService } from './workflow-config.service';
import { WorkflowConfigController } from './workflow-config.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Category, CategorySchema } from 'src/category/schema/category.schema';
import { NewsFormat, NewsFormatSchema } from 'src/news-format/schema/news-format.schema';
import { User, UserSchema } from 'src/user/schema/user.schema';
import { SaveWorkflowConfigRequestDto } from './dto/save-workflow-config-request.dto';
import { WorkFlowConfig, WorkFlowConfigSchema } from './schema/workflow-config.shcema';

@Module({
  imports:[
    MongooseModule.forFeature([
      {
        name: Category.name,
        schema: CategorySchema
      },
      {
        name: NewsFormat.name,
        schema: NewsFormatSchema
      },
      {
        name: User.name,
        schema: UserSchema
      },
      {
        name: WorkFlowConfig.name,
        schema: WorkFlowConfigSchema
      },

    ])
  ],
  controllers: [WorkflowConfigController],
  providers: [WorkflowConfigService],
  exports: [WorkflowConfigService, MongooseModule]
})
export class WorkflowConfigModule {}
