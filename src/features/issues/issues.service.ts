import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Issue } from './issues.entity';
import { CreateIssueDto } from './dtos/createIssue.dto';
import { User } from '../users/users.entity';
import { Member } from '../members/members.entity';

@Injectable()
export class IssuesService {
  constructor(
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
    await this.issueRepository.save({
      ...createIssueRequestBody,
      subProjectId,
    });
  }
}
