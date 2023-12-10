import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class MasterIssueType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  issueType: string;

  @Column({ default: null, nullable: true })
  projectId: number;

  @Column({ default: false })
  isCommon: boolean;
}
