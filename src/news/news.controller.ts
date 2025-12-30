import { Body, Controller, Get, HttpCode, Param, Post, Put, Request, UseGuards } from '@nestjs/common';
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
  async getNewsById(@Param('id') id: string, @Request() req) {
    return this.newsService.getNewsById(id, req.lang);
  }
  
  @Post('search')
  @HttpCode(200)
  async searchNews(@Body() request: NewsSearchRequestDto, @Request() req) {
    return await this.newsService.searchNews(request, req.lang);
  }

  @Put('status')
  async updateNewsStatus(@Body() request: NewsUpdateStatusRequestDto) {
    return await this.newsService.updateStatus(request);
  }

  @Post('publish/:id')
  async publishNews(@Param('id') id: string) {
    return await this.newsService.publishNews(id);
  }
  
}
