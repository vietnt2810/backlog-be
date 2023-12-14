import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { SubProjectsService } from './subProjects.service';
import { CreateAndEditSubProjectDto } from './dtos/createAndEditSubProjectDto.dto';
import { IssueUpdatesService } from '../issueUpdates/issueUpdate.service';

@Controller('sub-projects')
export class SubProjectsController {
  constructor(
    private readonly subProjectsService: SubProjectsService,
    private readonly issueUpdatesService: IssueUpdatesService,
  ) {}

  @Get('/:subProjectId')
  getSubProjectDetail(
    @Param('subProjectId', ParseIntPipe) subProjectId: number,
  ) {
    return this.subProjectsService.getSubProjectDetail(subProjectId);
  }

  @Put('/:subProjectId')
  changeSubProjectName(
    @Param('subProjectId', ParseIntPipe) subProjectId: number,
    @Body() changeSubProjectNameRequestBody: CreateAndEditSubProjectDto,
  ) {
    this.subProjectsService.changeSubProjectName(
      subProjectId,
      changeSubProjectNameRequestBody,
    );
  }

  @Get('/:subProjectId/recent-updates')
  getSubProjectRecentUpdates(
    @Param('subProjectId', ParseIntPipe) subProjectId: number,
  ) {
    return this.issueUpdatesService.getSubProjectRecentUpdates(subProjectId);
  }
}
