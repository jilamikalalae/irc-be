import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
import { WorkflowLogService } from './workflow-log.service';
import { GetWorkflowLogRequestDto } from './dto/get-workflow-log-request.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('workflow-log')
export class WorkflowLogController {
  constructor(private readonly workflowLogService: WorkflowLogService) {}

  @Post('search')
  @HttpCode(200)
  async getWorkflowLogs(@Body() request:GetWorkflowLogRequestDto) {
    return await this.workflowLogService.workflowLog(request);
  }

}
