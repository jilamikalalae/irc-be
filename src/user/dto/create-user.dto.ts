import { UserRole } from 'src/common/enum/user-role.enum';
export class CreateUserDto {
  readonly email: string;
  readonly password: string; 
  readonly fullName: string;
  readonly role: UserRole;
}
