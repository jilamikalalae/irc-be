import { IsEnum, IsNotEmpty } from "class-validator";
import { NewsStatus } from "src/common/enum/news-status.enum";

export class NewsUpdateStatusRequestDto {
    @IsNotEmpty()
    readonly id: string;

    @IsEnum(NewsStatus)
    readonly status: NewsStatus;
}