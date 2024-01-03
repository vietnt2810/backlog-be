import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateIssueDto {
  @IsNotEmpty()
  issueTypeId: number;

  @IsNotEmpty()
  subject: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  status: number;

  @IsNotEmpty()
  assigneeId: number;

  @IsNotEmpty()
  priority: number;

  @IsOptional()
  startDate: string;

  @IsOptional()
  dueDate: string;

  @IsOptional()
  estimatedHour: string;

  @IsOptional()
  actualHour: string;

  @IsNotEmpty()
  creatorId: number;

  @IsOptional()
  attachedFile: string[];
}
