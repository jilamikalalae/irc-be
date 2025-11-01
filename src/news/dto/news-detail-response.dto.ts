import { NewsStatus } from 'src/common/enum/news-status.enum';

export class NewsDetailResponseDto {
  readonly id: string;
  readonly category: string;
  readonly title: string;
  readonly introduction: string;
  readonly hook: string;
  readonly summary: string;
  readonly source: string;
  readonly keyword: string[];
  readonly status: NewsStatus;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}
