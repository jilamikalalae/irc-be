import { Controller, Get, UseGuards } from '@nestjs/common';
import { NewsFormatService } from './news-format.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('news-format')
export class NewsFormatController {
  constructor(private readonly newsFormatService: NewsFormatService) {}

  @Get('workflow-config')
  async getAllForWorkflowConfig() {
    return this.newsFormatService.getAllForWorkflowConfig();
  }
}
