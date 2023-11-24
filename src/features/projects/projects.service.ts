import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './projects.entity';
import { CreateEditProjectDto } from './dtos/createProject.dto';
import { MembersService } from '../members/members.service';

@Injectable()
export class ProjectsService {
  constructor(
    private membersService: MembersService,
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
  ) {}

  async createProject(createProjectRequestBody: CreateEditProjectDto) {
    const createdProject = await this.projectRepository.save({
      projectName: createProjectRequestBody.projectName,
    });

    await this.membersService.addMember({
      projectId: createdProject.id,
      userId: createProjectRequestBody.userId,
      role: true,
    });

    return createdProject;
  }

  async editProject(
    projectId: number,
    editProjectRequestBody: CreateEditProjectDto,
  ) {
    await this.projectRepository.update(
      { id: projectId },
      {
        ...editProjectRequestBody,
      },
    );
  }

  async deleteProject(projectId: number) {
    await this.projectRepository.delete({ id: projectId });
  }

  async findOne(id: number): Promise<Project | undefined> {
    return this.projectRepository.findOneBy({ id });
  }
}
