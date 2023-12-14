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

  @Put(':subProjectId/:issueId')
  updateIssue(
    @Param('subProjectId', ParseIntPipe) subProjectId: number,
    @Param('issueId', ParseIntPipe) issueId: number,
    @Body() updateIssueRequestBody: UpdateIssueDto,
  ) {
    return this.issuesService.updateIssue(
      subProjectId,
      issueId,
      updateIssueRequestBody,
    );
  }

  @Get('/:projectId/:issueId')
  getIssueDetail(
    @Param('issueId', ParseIntPipe) issueId: number,
    @Param('projectId', ParseIntPipe) projectId: number,
  ) {
    return this.issuesService.getIssueDetail(issueId, projectId);
  }
}
