import { IsEnum } from "class-validator";
import { NewsStatus } from "src/common/enum/news-status.enum";

export class NewsSearchRequestDto {
  page?: number;
  limit?: number;
  keyword?: string;
  categoryId?: string;
  
  @IsEnum(NewsStatus)
  status?: NewsStatus;
}
