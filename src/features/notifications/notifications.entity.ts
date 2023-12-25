import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IssueUpdate } from '../issueUpdates/issueUpdate.entity';

@Entity()
export class Notification {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  projectId: number;

  @Column()
  userId: number;

  @Column()
  issueUpdateId: number;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ default: false })
  isRead: boolean;

  @OneToOne(() => IssueUpdate, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  issueUpdate: IssueUpdate;
}
