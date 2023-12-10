import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Issue } from './issues.entity';
import { CreateIssueDto } from './dtos/createIssue.dto';
import { User } from '../users/users.entity';
import { Member } from '../members/members.entity';
import { SubProject } from '../subProjects/subProjects.entity';
import { SubProjectsService } from '../subProjects/subProjects.service';

@Injectable()
export class IssuesService {
  constructor(
    private subProjectsService: SubProjectsService,
    @InjectRepository(Issue)
    private issueRepository: Repository<Issue>,
  ) {}

  async getIssueDetail(issueId: number, projectId: number) {
    console.log(projectId);
    const issue = await this.issueRepository
      .createQueryBuilder('issue')
      .leftJoin(User, 'user', 'user.id = issue.assigneeId')
      .leftJoin(
        Member,
        'member',
        `member.id = issue.assigneeId AND member.projectId = :projectId`,
        { projectId },
      )
      .select(
        'issue.*, user.avatarUrl as assigneeAvatarUrl, member.username as assigneeUsername',
      )
      .where({ id: issueId })
      .getRawOne();

    console.log(issue);
  }

  async createIssue(
    subProjectId: number,
    createIssueRequestBody: CreateIssueDto,
  ) {
    const lastIssue = await this.issueRepository
      .createQueryBuilder('issue')
      .where('issue.subProjectId = :subProjectId', { subProjectId })
      .orderBy('issue.keyId', 'DESC')
      .getOne();

    const subProject =
      await this.subProjectsService.getSubProjectDetail(subProjectId);

    await this.issueRepository.save({
      ...createIssueRequestBody,
      subProjectId,
      keyId: lastIssue ? lastIssue.keyId + 1 : 1,
      issueKey: `${subProject.subProjectName}-${
        lastIssue ? lastIssue.keyId + 1 : 1
      }`,
    });
  }
}
