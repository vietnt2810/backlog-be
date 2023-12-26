import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ViewHistory } from './viewHistory.entity';
import { Issue } from '../issues/issues.entity';
import { UpdateRecentlyViewedIssuesDto } from '../projects/dtos/updateRecentlyViewedIssues.dto';

@Injectable()
export class ViewHistoryService {
  constructor(
    @InjectRepository(ViewHistory)
    private viewHistoryRepository: Repository<ViewHistory>,
  ) {}

  async getRecentlyViewedIssues(projectId: number, userId: number) {
    return await this.viewHistoryRepository
      .createQueryBuilder('viewHistory')
      .leftJoin(Issue, 'issue', 'issue.id = viewHistory.issueId')
      .select(
        'viewHistory.issueId, issue.issueKey, issue.subject, issue.subProjectId',
      )
      .where({ projectId, userId })
      .orderBy('lastViewedAt', 'DESC')
      .getRawMany();
  }

  async updateRecentlyViewedIssues(
    projectId: number,
    userId: number,
    updateRecentlyViewedIssuesRequestBody: UpdateRecentlyViewedIssuesDto,
  ) {
    const isIssueViewed = await this.viewHistoryRepository.findOne({
      where: {
        userId,
        issueId: updateRecentlyViewedIssuesRequestBody.issueId,
      },
    });

    if (isIssueViewed) {
      await this.viewHistoryRepository
        .createQueryBuilder('viewHistory')
        .update(ViewHistory)
        .set({ lastViewedAt: () => 'CURRENT_TIMESTAMP' })
        .where({
          userId,
          issueId: updateRecentlyViewedIssuesRequestBody.issueId,
        })
        .execute();
    } else {
      await this.viewHistoryRepository.save({
        userId,
        issueId: updateRecentlyViewedIssuesRequestBody.issueId,
        projectId,
      });
    }
  }
}
