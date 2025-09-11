import { IsNotEmpty } from "class-validator";


export class SaveWorkflowConfigRequestDto {
    @IsNotEmpty()
    readonly categoryId: string;

    @IsNotEmpty()
    readonly formatId: string;
}