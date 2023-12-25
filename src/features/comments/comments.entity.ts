import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  creatorId: number;

  @Column()
  content: string;

  @Column({ nullable: true, type: 'json' })
  attachedFile: string[];

  @CreateDateColumn()
  createdAt: string;
}
