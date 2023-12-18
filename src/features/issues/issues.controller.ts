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

  @Get(':issueId')
  getIssueDetail(@Param('issueId', ParseIntPipe) issueId: number) {
    return this.issuesService.getIssueDetail(issueId);
  }

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
}
