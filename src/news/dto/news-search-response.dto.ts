import { NewsStatus } from 'src/common/enum/news-status.enum';
import { NewsDetailResponseDto } from './news-detail-response.dto';

export class NewsSearchResponseDto {
  currentPage: number;
  totalPage: number;
  totalItems: number;
  items: NewsDetailResponseDto[];
}
