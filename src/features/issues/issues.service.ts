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
import { MasterIssueType } from '../masterIssueTypes/masterIssueTypes.entity';
import { Comment } from '../comments/comments.entity';
import { GetIssuesParams } from '../subProjects/types/subProjects.types';
import { Notification } from '../notifications/notifications.entity';

@Injectable()
export class IssuesService {
  constructor(
    private subProjectsService: SubProjectsService,
    @InjectRepository(SubProject)
    private subProjectRepository: Repository<SubProject>,
    @InjectRepository(Issue)
    private issueRepository: Repository<Issue>,
    @InjectRepository(IssueUpdate)
    private issueUpdateRepository: Repository<IssueUpdate>,
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
    @InjectRepository(Notification)
    private notificationRepository: Repository<Notification>,
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
        'issue.id, issue.subProjectId, issue.issueKey, issue.subject, issue.priority, issue.status, issue.dueDate',
      )
      .where('subProject.projectId = :projectId', { projectId });

    if (Number(getProjectIssuesQueryParams.isAssigned) === 1) {
      query.andWhere('issue.assigneeId = :userId', { userId });
    } else {
      query.andWhere('issue.creatorId = :userId', { userId });
    }

    return query.getRawMany();
  }

  async getIssueDetail(issueId: number) {
    const { projectId } = await this.issueRepository
      .createQueryBuilder('issue')
      .leftJoin(SubProject, 'subProject', 'subProject.id = issue.subProjectId')
      .select('subProject.projectId as projectId')
      .where({ id: issueId })
      .getRawOne();

    return await this.issueRepository
      .createQueryBuilder('issue')
      .leftJoin(
        MasterIssueType,
        'masterIssueType',
        'issue.type = masterIssueType.id',
      )
      .leftJoin(User, 'assigneeUser', 'assigneeUser.id = issue.assigneeId')
      .leftJoin(
        Member,
        'assigneeMember',
        `assigneeMember.userId = issue.assigneeId AND assigneeMember.projectId = :projectId`,
        { projectId },
      )
      .leftJoin(User, 'creatorUser', 'creatorUser.id = issue.creatorId')
      .leftJoin(
        Member,
        'creatorMember',
        `creatorMember.userId = issue.creatorId AND creatorMember.projectId = :projectId`,
        {
          projectId,
        },
      )
      .select(
        'issue.*, masterIssueType.issueType, assigneeUser.id as assigneeUserId, assigneeUser.avatarUrl as assigneeAvatarUrl, assigneeMember.username as assigneeUsername, creatorUser.avatarUrl as creatorAvatarUrl, creatorMember.username as creatorUsername',
      )
      .where({ id: issueId })
      .getRawOne();
  }

  async getIssues(subProjectId: number, getIssuesParams?: GetIssuesParams) {
    const { projectId } = await this.subProjectRepository.findOne({
      where: { id: subProjectId },
    });

    const data = await this.issueRepository
      .createQueryBuilder('issue')
      .leftJoin(
        MasterIssueType,
        'masterIssueType',
        'issue.type = masterIssueType.id',
      )
      .leftJoin(User, 'creatorUser', 'issue.creatorId = creatorUser.id')
      .leftJoin(
        Member,
        'creatorMember',
        'issue.creatorId = creatorMember.userId AND creatorMember.projectId = :projectId',
        { projectId },
      )
      .leftJoin(User, 'assigneeUser', 'issue.assigneeId = assigneeUser.id')
      .leftJoin(
        Member,
        'assigneeMember',
        'issue.assigneeId = assigneeMember.userId AND assigneeMember.projectId = :projectId',
        { projectId },
      )
      .select(
        'issue.*, masterIssueType.issueType, creatorUser.avatarUrl as creatorAvatarUrl, creatorMember.username as creatorUsername, assigneeUser.avatarUrl as assigneeAvatarUrl, assigneeMember.username as assigneeUsername',
      )
      .where({
        subProjectId,
      })
      .orderBy('lastUpdatedAt', 'DESC')
      .getRawMany();

    let resultData = data;

    // query with keyword
    getIssuesParams.keyword &&
      (resultData = data.filter(
        (item) =>
          item.issueKey
            .toLowerCase()
            .includes(getIssuesParams.keyword.toLowerCase()) ||
          item.subject
            .toLowerCase()
            .includes(getIssuesParams.keyword.toLowerCase()),
      ));
    // query with issue status
    getIssuesParams.status &&
      resultData.length &&
      (resultData = resultData.filter(
        (item) => item.status === Number(getIssuesParams.status),
      ));
    // query with issue type
    getIssuesParams.type &&
      resultData.length &&
      (resultData = resultData.filter(
        (item) => item.type === Number(getIssuesParams.type),
      ));
    // query with assignee
    getIssuesParams.assigneeId &&
      resultData.length &&
      (resultData = resultData.filter(
        (item) => item.assigneeId === Number(getIssuesParams.assigneeId),
      ));

    return {
      data: resultData
        .slice(((getIssuesParams.page ? getIssuesParams.page : 1) - 1) * 20)
        .slice(0, getIssuesParams.perPage ? getIssuesParams.perPage : 20),
      meta: {
        page: getIssuesParams.page ? getIssuesParams.page : 1,
        totalRecord: resultData.length,
      },
    };
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

    const createdIssueUpdate = await this.issueUpdateRepository.save({
      issueId: createdIssue.id,
      creatorId: createdIssue.creatorId,
      assigneeId: createdIssue.assigneeId,
      newStatus: createdIssue.status,
      newStartDate: createdIssue.startDate,
      newDueDate: createdIssue.dueDate,
      newEstimatedHour: createdIssue.estimatedHour,
      newActualHour: createdIssue.actualHour,
      updateType: 'create',
      subProjectId,
    });

    await this.notificationRepository.save({
      projectId: subProject.projectId,
      userId: createdIssueUpdate.assigneeId,
      issueUpdateId: createdIssueUpdate.id,
    });

    return createdIssue;
  }

  async updateIssue(issueId: number, updateIssueRequestBody: UpdateIssueDto) {
    const currentIssueDetail = await this.issueRepository.findOneBy({
      id: issueId,
    });

    const { projectId } = await this.subProjectRepository.findOne({
      where: {
        id: currentIssueDetail.subProjectId,
      },
    });

    const handleUpdateRecord = (currentValue, requestBodyValue) => {
      if (currentValue === null && currentValue !== requestBodyValue) {
        return {
          oldValue: '',
          newValue: requestBodyValue,
        };
      }

      if (currentValue === null && currentValue === requestBodyValue) {
        return {
          oldValue: null,
          newValue: null,
        };
      }

      if (currentValue !== null && currentValue !== requestBodyValue) {
        return {
          oldValue: currentValue,
          newValue: requestBodyValue,
        };
      }

      if (currentValue !== null && currentValue === requestBodyValue) {
        return {
          oldValue: null,
          newValue: currentValue,
        };
      }
    };

    const { comment, updaterId, ...rest } = updateIssueRequestBody;

    const createdComment = comment
      ? await this.commentRepository.save({
          creatorId: updaterId,
          content: comment,
        })
      : undefined;

    const createdIssueUpdate = await this.issueUpdateRepository.save({
      issueId: issueId,
      creatorId: updaterId,
      assignerId:
        currentIssueDetail.assigneeId === updateIssueRequestBody.assigneeId
          ? null
          : currentIssueDetail.assigneeId,
      assigneeId:
        currentIssueDetail.assigneeId === updateIssueRequestBody.assigneeId
          ? currentIssueDetail.assigneeId
          : updateIssueRequestBody.assigneeId,
      oldStatus:
        currentIssueDetail.status === updateIssueRequestBody.status
          ? null
          : currentIssueDetail.status,
      newStatus:
        currentIssueDetail.status === updateIssueRequestBody.status
          ? currentIssueDetail.status
          : updateIssueRequestBody.status,
      oldStartDate: handleUpdateRecord(
        currentIssueDetail.startDate,
        updateIssueRequestBody.startDate,
      ).oldValue,
      newStartDate: handleUpdateRecord(
        currentIssueDetail.startDate,
        updateIssueRequestBody.startDate,
      ).newValue,
      oldDueDate: handleUpdateRecord(
        currentIssueDetail.dueDate,
        updateIssueRequestBody.dueDate,
      ).oldValue,
      newDueDate: handleUpdateRecord(
        currentIssueDetail.dueDate,
        updateIssueRequestBody.dueDate,
      ).newValue,
      oldEstimatedHour: handleUpdateRecord(
        currentIssueDetail.estimatedHour,
        updateIssueRequestBody.estimatedHour,
      ).oldValue,
      newEstimatedHour: handleUpdateRecord(
        currentIssueDetail.estimatedHour,
        updateIssueRequestBody.estimatedHour,
      ).newValue,
      oldActualHour: handleUpdateRecord(
        currentIssueDetail.actualHour,
        updateIssueRequestBody.actualHour,
      ).oldValue,
      newActualHour: handleUpdateRecord(
        currentIssueDetail.actualHour,
        updateIssueRequestBody.actualHour,
      ).newValue,
      commentId: createdComment ? createdComment.id : null,
      updateType: comment ? 'comment' : 'update',
      subProjectId: currentIssueDetail.subProjectId,
    });

    await this.notificationRepository.save({
      projectId: projectId,
      userId: updateIssueRequestBody.assigneeId,
      issueUpdateId: createdIssueUpdate.id,
    });

    await this.issueRepository.update({ id: issueId }, { ...rest });
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
