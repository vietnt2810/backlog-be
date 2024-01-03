import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateMasterIssueTypeDto {
  @IsNotEmpty()
  issueType: string;

  @IsOptional()
  color: string;

  @IsNotEmpty()
  projectId: number;
}
