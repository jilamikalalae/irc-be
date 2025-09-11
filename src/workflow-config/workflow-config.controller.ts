import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { WorkflowConfigService } from './workflow-config.service';
import { SaveWorkflowConfigRequestDto } from './dto/save-workflow-config-request.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';


@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('workflow-config')
export class WorkflowConfigController {
  constructor(private readonly workflowConfigService: WorkflowConfigService) {}

  @Post('save')
  async save(@Request() req, @Body() saveWorkflowConfigRequestDto: SaveWorkflowConfigRequestDto ){
    return this.workflowConfigService.save(req.user.userId, saveWorkflowConfigRequestDto)
  }
}
