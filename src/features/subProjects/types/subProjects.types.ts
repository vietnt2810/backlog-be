import { PaginationParams } from 'src/types/pagination.types';

export type GetIssuesParams = {
  keyword?: string;
  status?: number;
  type?: number;
  assigneeId?: number;
  isOverdue?: number;
} & PaginationParams;
