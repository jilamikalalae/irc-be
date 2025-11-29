import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { WorkflowLogService } from './workflow-log.service';
import { GetWorkflowLogRequestDto } from './dto/get-workflow-log-request.dto';

@Controller('workflow-log')
export class WorkflowLogController {
  constructor(private readonly workflowLogService: WorkflowLogService) {}

  @Post('search')
  @HttpCode(200)
  async getWorkflowLogs(@Body() request:GetWorkflowLogRequestDto) {
    return await this.workflowLogService.workflowLog(request);
  }

}
