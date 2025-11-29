import { Controller, Get, Post, Query, Request, UseGuards } from '@nestjs/common';
import { CategoryService } from './category.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get('workflow-config')
  async getAllForWorkflowConfig(@Request() req) {
    return this.categoryService.getAllForWorkflowConfig(req.lang);
  }

  @Get('overview')
  async getOverviewCategories() {
    return this.categoryService.getOverviewCategories();
  }

  @Get('search')
  async searchCategory(@Query('keyword') keyword: string, @Request() req) {
    return this.categoryService.searchCategory({ keyword }, req.lang);
  }
  
}
