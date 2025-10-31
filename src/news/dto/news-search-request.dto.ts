import { IsEnum, IsOptional } from "class-validator";
import { NewsStatus } from "src/common/enum/news-status.enum";

export class NewsSearchRequestDto {
  page?: number;
  limit?: number;
  keyword?: string;
  categoryId?: string;
  
  @IsOptional()
  @IsEnum(NewsStatus)
  status?: NewsStatus;
}
