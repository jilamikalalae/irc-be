import { Module } from '@nestjs/common';
import { WorkflowLogService } from './workflow-log.service';
import { WorkflowLogController } from './workflow-log.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { WorkflowLog, WorkflowLogSchema } from './schema/workflow-log.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: WorkflowLog.name, schema: WorkflowLogSchema },
    ]),
  ],
  controllers: [WorkflowLogController],
  providers: [WorkflowLogService],
})
export class WorkflowLogModule {}
