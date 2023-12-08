import { IsNotEmpty } from 'class-validator';

export class CreateIssueDto {
  @IsNotEmpty()
  key: string;

  @IsNotEmpty()
  subject: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  status: number;

  @IsNotEmpty()
  assigneeId: number;
}
