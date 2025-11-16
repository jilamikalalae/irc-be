import { NewsStatus } from "src/common/enum/news-status.enum";


export class RecentNewsResponseDto {
  readonly id: string;
  readonly title: string;
  readonly category: string;
  readonly status: NewsStatus;
  readonly updatedAt: Date;
}