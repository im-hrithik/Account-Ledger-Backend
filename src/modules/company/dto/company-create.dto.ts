import { Transform } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class CompanyCreateDto {
  @IsNotEmpty({ message: 'Please provide a company name' })
  @IsString({ message: 'Company name must be a string' })
  @Transform(({ value }) => value.trim())
  companyName: string;

  @IsArray({ message: 'Emails must be provided as an array' })
  @ArrayNotEmpty({ message: 'At least one email must be provided' })
  @IsEmail({}, { each: true, message: 'Invalid email format' })
  emails: string[];
}
