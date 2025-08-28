import { UserRole } from "src/common/enum/user-role.enum";
import { User } from "src/user/schema/user.schema";

export class ValidateUserResponseDto {
  readonly email: string;
  readonly userId: string;
  readonly role: UserRole;
}