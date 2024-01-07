import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Issue } from '../issues/issues.entity';

@Entity()
export class ViewHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  issueId: number;

  @Column()
  projectId: number;

  @UpdateDateColumn()
  lastViewedAt: Date;

  @ManyToOne(() => Issue, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  issue: Issue;
}
