import { Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { CategoryService } from './category.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get('workflow-config')
  async getAllForWorkflowConfig() {
    return this.categoryService.getAllForWorkflowConfig();
  }

  @Get('overview')
  async getOverviewCategories() {
    return this.categoryService.getOverviewCategories();
  }

  @Get('search')
  async searchCategory(@Query('keyword') keyword: string) {
    return this.categoryService.searchCategory({ keyword });
  }
  
}
