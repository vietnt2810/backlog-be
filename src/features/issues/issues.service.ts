import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Issue } from './issues.entity';
import { CreateIssueDto } from './dtos/createIssue.dto';
import { User } from '../users/users.entity';
import { Member } from '../members/members.entity';
import { SubProjectsService } from '../subProjects/subProjects.service';
import { SubProject } from '../subProjects/subProjects.entity';
import { GetProjectIssuesQueryParams } from '../projects/types/projects.types';
import { IssueUpdate } from '../issueUpdates/issueUpdate.entity';
import { UpdateIssueDto } from './dtos/updateIssue.dto';
import { IssueStatusTypes } from './constants/issues.constants';

@Injectable()
export class IssuesService {
  constructor(
    private subProjectsService: SubProjectsService,
    @InjectRepository(Issue)
    private issueRepository: Repository<Issue>,
    @InjectRepository(IssueUpdate)
    private issueUpdateRepository: Repository<IssueUpdate>,
  ) {}

  async getUserProjectIssues(
    projectId: number,
    userId: number,
    getProjectIssuesQueryParams?: GetProjectIssuesQueryParams,
  ) {
    const query = await this.issueRepository
      .createQueryBuilder('issue')
      .leftJoin(SubProject, 'subProject', 'subProject.id = issue.subProjectId')
      .select(
        'issue.id, issue.issueKey, issue.subject, issue.priority, issue.status, issue.dueDate',
      )
      .where('subProject.projectId = :projectId', { projectId });

    if (Number(getProjectIssuesQueryParams.isAssigned) === 1) {
      query.andWhere('issue.assigneeId = :userId', { userId });
    } else {
      query.andWhere('issue.createdByUserId = :userId', { userId });
    }

    return query.getRawMany();
  }

  async getIssueDetail(issueId: number, projectId: number) {
    const issue = await this.issueRepository
      .createQueryBuilder('issue')
      .leftJoin(User, 'user', 'user.id = issue.assigneeId')
      .leftJoin(
        Member,
        'member',
        `member.userId = issue.assigneeId AND member.projectId = :projectId`,
        { projectId },
      )
      .select(
        'issue.*, user.avatarUrl as assigneeAvatarUrl, member.username as assigneeUsername',
      )
      .where({ id: issueId })
      .getRawOne();
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

    const createdIssue = await this.issueRepository.save({
      ...createIssueRequestBody,
      subProjectId,
      keyId: lastIssue ? lastIssue.keyId + 1 : 1,
      issueKey: `${subProject.subProjectName}-${
        lastIssue ? lastIssue.keyId + 1 : 1
      }`,
    });

    await this.issueUpdateRepository.save({
      issueId: createdIssue.id,
      creatorId: createdIssue.createdByUserId,
      assigneeId: createdIssue.assigneeId,
      newStatus: createdIssue.status,
      updateType: 'create',
      subProjectId,
    });
  }

  async updateIssue(
    subProjectId: number,
    issueId: number,
    updateIssueRequestBody: UpdateIssueDto,
  ) {
    //   await this.issueRepository.update({ updateIssueRequestBody });
  }

  async getIssueStatusList(subProjectId: number) {
    const openIssuesCount = await this.issueRepository.count({
      where: { status: IssueStatusTypes['open'], subProjectId },
    });

    const inProgressIssuesCount = await this.issueRepository.count({
      where: { status: IssueStatusTypes['inProgress'], subProjectId },
    });

    const resolvedIssuesCount = await this.issueRepository.count({
      where: { status: IssueStatusTypes['resolved'], subProjectId },
    });

    const pendingIssuesCount = await this.issueRepository.count({
      where: { status: IssueStatusTypes['pending'], subProjectId },
    });

    const closedIssuesCount = await this.issueRepository.count({
      where: { status: IssueStatusTypes['closed'], subProjectId },
    });

    const totalIssues =
      openIssuesCount +
      inProgressIssuesCount +
      resolvedIssuesCount +
      pendingIssuesCount +
      closedIssuesCount;

    return {
      openIssuesCount,
      inProgressIssuesCount,
      resolvedIssuesCount,
      pendingIssuesCount,
      closedIssuesCount,
      totalIssues,
    };
  }
}
