import { IsNotEmpty, IsNumber } from '@nestjs/class-validator';
import { CompanyCreateDto } from './company-create.dto';
import { Transform } from 'class-transformer';
import { IsString } from 'class-validator';

export class CompanyUpdateDto {
  @IsNotEmpty()
  @IsNumber()
  companyId: number;

  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => value.trim())
  companyName: string;
}
