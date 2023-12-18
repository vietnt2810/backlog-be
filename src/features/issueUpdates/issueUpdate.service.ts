import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { IssueUpdate } from '../issueUpdates/issueUpdate.entity';
import { Project } from '../projects/projects.entity';
import { SubProject } from '../subProjects/subProjects.entity';
import { Issue } from '../issues/issues.entity';
import { User } from '../users/users.entity';
import { Member } from '../members/members.entity';

@Injectable()
export class IssueUpdatesService {
  constructor(
    @InjectRepository(IssueUpdate)
    private issueUpdateRepository: Repository<IssueUpdate>,
    @InjectRepository(SubProject)
    private subProjectRepository: Repository<SubProject>,
  ) {}

  async getProjectRecentUpdates(projectId: number) {
    return await this.issueUpdateRepository
      .createQueryBuilder('issueUpdate')
      .leftJoin(
        SubProject,
        'subProject',
        'subProject.id = issueUpdate.subProjectId',
      )
      .leftJoin(Issue, 'issue', 'issue.id = issueUpdate.issueId')
      .leftJoin(User, 'creator', 'creator.id = issueUpdate.creatorId')
      .leftJoin(
        Member,
        'creatorMember',
        `creatorMember.userId = issueUpdate.creatorId AND creatorMember.projectId = :projectId`,
        { projectId },
      )
      .leftJoin(
        Member,
        'assignerMember',
        'assignerMember.userId = issueUpdate.assignerId',
      )
      .leftJoin(
        Member,
        'assigneeMember',
        'assigneeMember.userId = issueUpdate.assigneeId',
      )
      .where('subProject.projectId = :projectId', { projectId })
      .select(
        'issueUpdate.id, issueUpdate.issueId, issueUpdate.subProjectId, issueUpdate.oldStatus, issueUpdate.newStatus, issueUpdate.updateType, issueUpdate.createdAt, issue.issueKey, issue.subject as issueSubject, creator.avatarUrl as creatorAvatarUrl, creatorMember.username as creatorUsername, assignerMember.username as assignerUsername, assigneeMember.username as assigneeUsername',
      )
      .orderBy('issueUpdate.createdAt', 'DESC')
      .distinct(true)
      .getRawMany();
  }

  async getSubProjectRecentUpdates(subProjectId: number) {
    const { projectId } = await this.subProjectRepository.findOne({
      where: { id: subProjectId },
    });

    return await this.issueUpdateRepository
      .createQueryBuilder('issueUpdate')
      .leftJoin(Issue, 'issue', 'issue.id = issueUpdate.issueId')
      .leftJoin(User, 'creator', 'creator.id = issueUpdate.creatorId')
      .leftJoin(
        Member,
        'creatorMember',
        `creatorMember.userId = issueUpdate.creatorId AND creatorMember.projectId = :projectId`,
        { projectId },
      )
      .leftJoin(
        Member,
        'assignerMember',
        'assignerMember.userId = issueUpdate.assignerId',
      )
      .leftJoin(
        Member,
        'assigneeMember',
        'assigneeMember.userId = issueUpdate.assigneeId',
      )
      .where({ subProjectId })
      .select(
        'issueUpdate.id, issueUpdate.issueId, issueUpdate.subProjectId, issueUpdate.oldStatus, issueUpdate.newStatus, issueUpdate.updateType, issueUpdate.createdAt, issue.issueKey, issue.subject as issueSubject, creator.avatarUrl as creatorAvatarUrl, creatorMember.username as creatorUsername, assignerMember.username as assignerUsername, assigneeMember.username as assigneeUsername',
      )
      .distinct(true)
      .getRawMany();
  }
}
