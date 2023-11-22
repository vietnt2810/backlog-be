import { IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateUserProfileDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  email: string;

  @IsOptional()
  avatarUrl: string | null;
}
