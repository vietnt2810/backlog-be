import { IsNotEmpty } from 'class-validator';

export class ChangeMemberRoleDto {
  @IsNotEmpty()
  role: number;
}
