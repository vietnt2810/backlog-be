import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class IssueUpdate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  issueId: number;

  @Column()
  createdByUserId: number;

  @Column({ nullable: true })
  assignerId: number;

  @Column({ nullable: true })
  assigneeId: number;

  @Column()
  subProjectId: number;
}
