import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

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
}
