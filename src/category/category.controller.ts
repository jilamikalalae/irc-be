import { Body, Controller, Get, Post, Put, Query, Request, UseGuards } from '@nestjs/common';
import { CategoryService } from './category.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { setVisibleCategoryRequestDto } from './dto/set-visible-category-request.dto';
import { AddCategoryRequestDto } from './dto/add-category-request.dto';

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

  @Put('visible')
  async setVisibleCategory(@Body() request: setVisibleCategoryRequestDto) {
    return this.categoryService.setVisibleCategory(request);
  }

  @Post('add')
  async addCategory(@Body() request: AddCategoryRequestDto){
    return this.categoryService.addCategory(request);
  }
  
}
