import { IsNotEmpty } from 'class-validator';

export class CreateMasterIssueTypeDto {
  @IsNotEmpty()
  issueType: string;

  @IsNotEmpty()
  projectId: number;
}
