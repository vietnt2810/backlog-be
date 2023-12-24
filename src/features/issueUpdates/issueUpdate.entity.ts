import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Issue } from '../issues/issues.entity';

@Entity()
export class IssueUpdate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  issueId: number;

  @Column()
  creatorId: number;

  @Column({ nullable: true })
  assignerId: number;

  @Column()
  assigneeId: number;

  @Column({ nullable: true })
  oldStatus: number;

  @Column()
  newStatus: number;

  @Column({ nullable: true })
  oldStartDate: string;

  @Column({ nullable: true })
  newStartDate: string;

  @Column({ nullable: true })
  oldDueDate: string;

  @Column({ nullable: true })
  newDueDate: string;

  @Column({ nullable: true })
  oldEstimatedHour: string;

  @Column({ nullable: true })
  newEstimatedHour: string;

  @Column({ nullable: true })
  oldActualHour: string;

  @Column({ nullable: true })
  newActualHour: string;

  @Column()
  updateType: string;

  @Column()
  subProjectId: number;

  @Column({ nullable: true })
  commentId: number;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Issue, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  issue: Issue;
}
