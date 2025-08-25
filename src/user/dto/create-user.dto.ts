import { UserRole } from 'src/common/enum/user-role.enum';
import { User } from '../schema/user.schema';
export class CreateUserDto {
  readonly username: string;
  readonly email: string;
  readonly password: string; 
  readonly fullName: string;
  readonly role: UserRole;
}
