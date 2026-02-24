import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type WorkflowLogDocument = WorkflowLog & Document;

@Schema()
export class LocalizedWorkflowLog {
  @Prop()
  en: string;

  @Prop()
  th: string;
}

export const localizedWorkflowLogSchema =
  SchemaFactory.createForClass(LocalizedWorkflowLog);
@Schema({ collection: 'workflowlogs' })
export class WorkflowLog {
  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;

  @Prop()
  step: LocalizedWorkflowLog;

  @Prop()
  status: LocalizedWorkflowLog;

  @Prop()
  durationMs: number;
}

export const WorkflowLogSchema = SchemaFactory.createForClass(WorkflowLog);
