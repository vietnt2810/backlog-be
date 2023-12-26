import { IsNotEmpty } from 'class-validator';

export class UpdateRecentlyViewedIssuesDto {
  @IsNotEmpty()
  issueId: number;
}
