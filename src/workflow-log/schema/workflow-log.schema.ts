import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type WorkflowLogDocument = WorkflowLog & Document;

@Schema({ collection: 'logs_news_process' })
export class WorkflowLog {
  
  @Prop()
  createdAt: Date;
  
  @Prop()
  updatedAt: Date;
  
  @Prop()
  step: string;
  
  @Prop()
  status: string;
  
  @Prop()
  durationMs: number;
}

export const WorkflowLogSchema = SchemaFactory.createForClass(WorkflowLog);