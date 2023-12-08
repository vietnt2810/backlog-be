import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { IssuesService } from './issues.service';
import { CreateIssueDto } from './dtos/createIssue.dto';

@Controller('issues')
export class IssuesController {
  constructor(private readonly issuesService: IssuesService) {}
  @Post(':subProjectId')
  createIssue(
    @Param('subProjectId', ParseIntPipe) subProjectId: number,
    @Body() createIssueRequestBody: CreateIssueDto,
  ) {
    return this.issuesService.createIssue(subProjectId, createIssueRequestBody);
  }

  @Get('/:projectId/:issueId')
  getIssueDetail(
    @Param('issueId', ParseIntPipe) issueId: number,
    @Param('projectId', ParseIntPipe) projectId: number,
  ) {
    return this.issuesService.getIssueDetail(issueId, projectId);
  }
}
