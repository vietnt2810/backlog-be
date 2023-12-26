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

  @Column({ default: null })
  content: string;

  @Column({ default: null, type: 'json' })
  attachedFile: any[];

  @CreateDateColumn()
  createdAt: string;
}
