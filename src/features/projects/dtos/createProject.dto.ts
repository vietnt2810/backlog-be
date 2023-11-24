import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateEditProjectDto {
  @IsNotEmpty()
  projectName: string;

  @IsOptional()
  userId: number;
}
