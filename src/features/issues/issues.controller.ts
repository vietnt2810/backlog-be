import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { IssuesService } from './issues.service';
import { CreateIssueDto } from './dtos/createIssue.dto';
import { UpdateIssueDto } from './dtos/updateIssue.dto';
import { IssueUpdatesService } from '../issueUpdates/issueUpdate.service';

@Controller('issues')
export class IssuesController {
  constructor(
    private readonly issuesService: IssuesService,
    private readonly issueUpdatesService: IssueUpdatesService,
  ) {}

  @Get(':issueId')
  getIssueDetail(@Param('issueId', ParseIntPipe) issueId: number) {
    return this.issuesService.getIssueDetail(issueId);
  }

  @Get(':issueId/history')
  getIssueHistory(@Param('issueId', ParseIntPipe) issueId: number) {
    return this.issueUpdatesService.getIssueHistory(issueId);
  }

  @Post(':subProjectId')
  createIssue(
    @Param('subProjectId', ParseIntPipe) subProjectId: number,
    @Body() createIssueRequestBody: CreateIssueDto,
  ) {
    return this.issuesService.createIssue(subProjectId, createIssueRequestBody);
  }

  @Put(':issueId')
  updateIssue(
    @Param('issueId', ParseIntPipe) issueId: number,
    @Body() updateIssueRequestBody: UpdateIssueDto,
  ) {
    return this.issuesService.updateIssue(issueId, updateIssueRequestBody);
  }
}
