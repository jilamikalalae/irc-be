export class LatestInfoResponseDto {
  readonly lastWeekCategoryId?: string;
  readonly lastWeekCategoryName?: string;
  readonly lastWeekFormatId?: string;
  readonly lastWeekFormatName?: string;
  readonly lastWeekFormatDescription?: string;
  readonly currentCategoryId?: string;
  readonly currentCategoryName?: string;
  readonly currentFormatId?: string;
  readonly currentFormatName?: string;
  readonly currentFormatDescription?: string;
  readonly updatedAt?: Date
}
