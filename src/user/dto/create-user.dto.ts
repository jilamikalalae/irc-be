import { UserRole } from 'src/common/enum/user-role.enum';
import { IsEmail, IsNotEmpty } from 'class-validator';
export class CreateUserDto {
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  readonly password: string; 

  readonly firstName: string;
  
  readonly lastName: string;

  readonly role: UserRole;
}
