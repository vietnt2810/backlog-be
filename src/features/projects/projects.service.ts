import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './projects.entity';
import { CreateProjectDto } from './dtos/createProject.dto';
import { MembersService } from '../members/members.service';

@Injectable()
export class ProjectsService {
  constructor(
    private membersService: MembersService,
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
  ) {}

  async createProject(createProjectRequestBody: CreateProjectDto) {
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

  async findOne(id: number): Promise<Project | undefined> {
    return this.projectRepository.findOneBy({ id });
  }
}
