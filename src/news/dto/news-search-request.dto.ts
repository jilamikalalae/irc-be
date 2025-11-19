import { IsDateString, IsEnum, IsOptional } from "class-validator";
import { NewsStatus } from "src/common/enum/news-status.enum";

export class NewsSearchRequestDto {
  page?: number;
  limit?: number;
  keyword?: string;
  categoryId?: string;

  @IsDateString()
  @IsOptional()
  startDate?: string;

  @IsDateString()
  @IsOptional()
  endDate?: string;
  
  @IsOptional()
  @IsEnum(NewsStatus)
  status?: NewsStatus;
}
