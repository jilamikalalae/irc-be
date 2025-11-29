export class GetWorkflowLogResponseDto {
  readonly currentPage: number;
  readonly totalPage: number;
  readonly totalItems: number;
  readonly items: WorkflowLogResponseDto[];

}

export class WorkflowLogResponseDto {
  readonly id: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly step: string;
  readonly status: string;
  readonly durationMs: number;

}