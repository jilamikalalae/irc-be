import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

class WorkFlowConfigCreatedBy {
  @Prop()
  id: string;

  @Prop()
  email: string;

  @Prop()
  firstName: string;

  @Prop()
  lastName: string;
}

export type WorkFlowConfigDocument = WorkFlowConfig & Document;

@Schema({ timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } })
export class WorkFlowConfig {
  @Prop()
  categoryId: string;

  @Prop()
  categoryName: string;

  @Prop()
  formatId: string;

  @Prop()
  formatName: string;

  @Prop()
  formatDescription: string;

  @Prop({ type: Object })
  createdBy: WorkFlowConfigCreatedBy;

  @Prop()
  createdAt: Date

  @Prop()
  updatedAt: Date
}

export const WorkFlowConfigSchema =
  SchemaFactory.createForClass(WorkFlowConfig);