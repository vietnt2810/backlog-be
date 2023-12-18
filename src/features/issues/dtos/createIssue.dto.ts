import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateIssueDto {
  @IsNotEmpty()
  type: number;

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
  estimatedHour: number;

  @IsOptional()
  actualHour: number;

  @IsNotEmpty()
  creatorId: number;
}
