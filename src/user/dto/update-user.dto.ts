import { UserRole } from "src/common/enum/user-role.enum";

export class UpdateUserDto {
  readonly fullName?: string;
  readonly role?: UserRole;
}
