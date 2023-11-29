import { IsNotEmpty } from 'class-validator';

export class CreateAndEditSubProjectDto {
  @IsNotEmpty()
  subProjectName: string;
  @IsNotEmpty()
  subTitle: string;
}
