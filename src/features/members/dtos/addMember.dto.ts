import { IsNotEmpty, IsOptional } from 'class-validator';

export class AddMemberDto {
  @IsNotEmpty()
  projectId: number;

  @IsOptional()
  userId: number;

  @IsOptional()
  email?: string;

  @IsNotEmpty()
  role: boolean;
}
