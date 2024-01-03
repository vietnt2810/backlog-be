import { IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateMasterIssueTypeDto {
  @IsNotEmpty()
  projectId: number;

  @IsOptional()
  issueType: string;

  @IsOptional()
  color: string;
}
