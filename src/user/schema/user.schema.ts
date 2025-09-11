import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { UserRole } from 'src/common/enum/user-role.enum';
import * as bcrypt from 'bcrypt';

export type UserDocument = User & Document;

@Schema({ timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } })
export class User {

  @Prop({ required: true, unique: true })
  email: string;

  @Prop() 
  password: string;
  
  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop(UserRole)
  role: string;

  @Prop()
  googleId: string;

  @Prop()
  lastLogin?: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);


UserSchema.pre('save', async function (next){
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10)
  }

  next();
})

