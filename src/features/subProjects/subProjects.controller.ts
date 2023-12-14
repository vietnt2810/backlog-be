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

@Controller('projects')
export class SubProjectsController {
  constructor(private readonly subProjectsService: SubProjectsService) {}

  @Post(':projectId/sub-projects')
  createSubProject(
    @Param('projectId', ParseIntPipe) projectId: number,
    @Body() createSubProjectRequestBody: CreateAndEditSubProjectDto,
  ) {
    return this.subProjectsService.createSubProject(
      projectId,
      createSubProjectRequestBody,
    );
  }

  @Get(':projectId/sub-projects')
  getSubProjects(@Param('projectId', ParseIntPipe) projectId: number) {
    return this.subProjectsService.getSubProjects(projectId);
  }

  @Get(':projectId/sub-projects/:subProjectId')
  getSubProjectDetail(@Param('subProjectId', ParseIntPipe) subProjectId: number) {
    return this.subProjectsService.getSubProjectDetail(subProjectId);
  }

  @Put(':projectId/sub-projects/:subProjectId')
  changeSubProjectName(
    @Param('subProjectId', ParseIntPipe) subProjectId: number,
    @Body() changeSubProjectNameRequestBody: CreateAndEditSubProjectDto,
  ) {
    this.subProjectsService.changeSubProjectName(
      subProjectId,
      changeSubProjectNameRequestBody,
    );
  }
}
