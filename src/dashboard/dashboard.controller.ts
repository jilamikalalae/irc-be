import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('count-overall')
  async getCountOverall() {
    return this.dashboardService.getCountOverall();
  }

  @Get('recent-news')
  async getRecentNews(@Query('limit') limit: number) {
    return this.dashboardService.getRecentNews({ limit: limit });
  }

}
