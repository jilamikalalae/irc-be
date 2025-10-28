import { Body, Controller, Get, HttpCode, Param, Post, Put, UseGuards } from '@nestjs/common';
import { NewsService } from './news.service';
import { NewsSearchRequestDto } from './dto/news-search-request.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { NewsUpdateStatusRequestDto } from './dto/news-update-status-request.dto';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Get(':id')
  async getNewsById(@Param('id') id: string) {
    return this.newsService.getNewsById(id);
  }
  
  @Post('search')
  @HttpCode(200)
  async searchNews(@Body() request: NewsSearchRequestDto) {
    return await this.newsService.searchNews(request);
  }

  @Put('status')
  async updateNewsStatus(@Body() request: NewsUpdateStatusRequestDto) {
    return await this.newsService.updateStatus(request);
  }
  
}
