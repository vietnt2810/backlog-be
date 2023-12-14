import { IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateIssueDto {
  @IsOptional()
  comment: string;

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
  createdByUserId: number;
}