import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { WorkflowLog, WorkflowLogDocument } from './schema/workflow-log.schema';
import { Model } from 'mongoose';
import { GetWorkflowLogRequestDto } from './dto/get-workflow-log-request.dto';
import { GetWorkflowLogResponseDto, WorkflowLogResponseDto } from './dto/get-workflow-log-response.dto';

@Injectable()
export class WorkflowLogService {
    constructor(
        @InjectModel(WorkflowLog.name) private workflowLogModel: Model<WorkflowLogDocument>,
    ) {}

    async workflowLog(request: GetWorkflowLogRequestDto): Promise<GetWorkflowLogResponseDto> {
        const page = request.page ? Number((request as any).page) : 1;
        const limit = request.limit ? Number((request as any).limit) : 10;
        

        const skip = (page - 1) * limit;

        const [logs, total] = await Promise.all([
            this.workflowLogModel
                .find()
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit)
                .exec(),
            this.workflowLogModel.countDocuments().exec(),
        ]);

        const items:WorkflowLogResponseDto[] = logs.map(log => ({
            id: log.id,
            createdAt: log.createdAt,
            updatedAt: log.updatedAt,
            step: log.step,
            status: log.status,
            durationMs: log.durationMs,
        }));

        return {
            totalItems: total,
            totalPage: Math.ceil(total / limit),
            currentPage: page,
            items,
        };
    }
}
