export class GetWorkflowLogResponseDto {
  readonly currentPage: number;
  readonly totalPage: number;
  readonly totalItems: number;
  readonly items: WorkflowLogResponseDto[];

}

export class LocalizedFieldDto {
  readonly en: string;
  readonly th: string;
}

export class WorkflowLogResponseDto {
  readonly id: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly step: LocalizedFieldDto;
  readonly status: LocalizedFieldDto;
  readonly durationMs: number;
}