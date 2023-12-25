import { IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateIssueDto {
  @IsOptional()
  type: number;

  @IsOptional()
  subject: string;

  @IsOptional()
  description: string;

  @IsOptional()
  priority: number;

  @IsOptional()
  comment: string;

  @IsNotEmpty()
  status: number;

  @IsNotEmpty()
  assigneeId: number;

  @IsOptional()
  startDate: string;

  @IsOptional()
  dueDate: string;

  @IsOptional()
  estimatedHour: string;

  @IsOptional()
  actualHour: string;

  @IsNotEmpty()
  updaterId: number;

  @IsOptional()
  attachedFile: any[];
}
