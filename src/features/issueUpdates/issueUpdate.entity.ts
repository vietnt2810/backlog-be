import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

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

  @Column()
  updateType: string;

  @Column()
  subProjectId: number;

  @Column({ nullable: true })
  commentId: number;

  @CreateDateColumn()
  createdAt: Date;
}
