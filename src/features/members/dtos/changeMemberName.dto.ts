import { IsNotEmpty } from 'class-validator';

export class ChangeMemberNameDto {
  @IsNotEmpty()
  memberName: string;
}
