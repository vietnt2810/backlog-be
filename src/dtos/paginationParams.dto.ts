import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, Min } from 'class-validator';

export class PaginationParamsDto {
  @IsNumber()
  @IsOptional()
  @Min(0)
  @Transform(({ value }) => parseInt(value, 10), { toClassOnly: true })
  perPage = 10;

  @IsNumber()
  @IsOptional()
  @Min(1)
  @Transform(({ value }) => parseInt(value, 10), { toClassOnly: true })
  page = 1;
}
