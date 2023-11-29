import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { SubProject } from './subProjects.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectsService } from '../projects/projects.service';
import { CreateAndEditSubProjectDto } from './dtos/createAndEditSubProjectDto.dto';

@Injectable()
export class SubProjectsService {
  constructor(
    private projectsService: ProjectsService,
    @InjectRepository(SubProject)
    private subProjectRepository: Repository<SubProject>,
  ) {}

  async createSubProject(
    projectId: number,
    createSubProjectRequestBody: CreateAndEditSubProjectDto,
  ) {
    return await this.subProjectRepository.save({
      ...createSubProjectRequestBody,
      projectId,
    });
  }

  async getSubProjects(projectId: number) {
    return await this.subProjectRepository.find({
      where: {
        projectId,
      },
      select: {
        id: true,
        subProjectName: true,
        subTitle: true,
      },
    });
  }

  async changeSubProjectName(
    subProjectId: number,
    changeSubProjectNameRequestBody: CreateAndEditSubProjectDto,
  ) {
    return await this.subProjectRepository.update(
      {
        id: subProjectId,
      },
      {
        ...changeSubProjectNameRequestBody,
      },
    );
  }
}
