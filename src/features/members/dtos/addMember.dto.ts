import { IsNotEmpty, IsOptional } from 'class-validator';

export class AddMemberDto {
  @IsOptional()
  projectId: number;

  @IsOptional()
  userId: number;

  @IsOptional()
  email?: string;

  @IsNotEmpty()
  role: number;
}
