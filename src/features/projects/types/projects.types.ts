import { PaginationParams } from 'src/types/pagination.types';

export type GetProjectIssuesQueryParams = {
  isAssigned: number;
};

export type GetMembersQueryParams = {
  keyword?: string;
  role?: number;
} & PaginationParams;
