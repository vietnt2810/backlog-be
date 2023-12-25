import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Notification } from './notifications.entity';
import { IssueUpdate } from '../issueUpdates/issueUpdate.entity';
import { User } from '../users/users.entity';
import { Member } from '../members/members.entity';
import { Issue } from '../issues/issues.entity';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(Notification)
    private notificationRepository: Repository<Notification>,
  ) {}

  async getNotifications(projectId: number, userId: number) {
    const data = await this.notificationRepository
      .createQueryBuilder('notification')
      .leftJoin(
        IssueUpdate,
        'issueUpdate',
        'issueUpdate.id = notification.issueUpdateId',
      )
      .leftJoin(Issue, 'issue', 'issueUpdate.issueId = issue.id')
      .leftJoin(User, 'creatorUser', 'creatorUser.id = issueUpdate.creatorId')
      .leftJoin(
        Member,
        'creatorMember',
        'creatorMember.userId = issueUpdate.creatorId',
      )
      .select(
        'notification.id, notification.isRead, notification.createdAt, issueUpdate.id as issueUpdateId, issueUpdate.subProjectId, issue.id as issueId, issue.issueKey, issue.subject, issue.status, issueUpdate.updateType, creatorUser.avatarUrl as creatorAvatarUrl, creatorMember.username as creatorUsername',
      )
      .where({ projectId, userId })
      .orderBy('createdAt', 'DESC')
      .distinct(true)
      .getRawMany();

    return data;
  }

  async updateReadNotification(notificationId: number) {
    return await this.notificationRepository.update(
      { id: notificationId },
      { isRead: true },
    );
  }
}
