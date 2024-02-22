import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { Transform } from 'class-transformer';

export class PartnersCreateDto {
  @IsNotEmpty({ message: 'Please enter your first name' })
  @IsString({ message: 'First name must be a string' })
  @Transform(({ value }) => value.trim())
  firstName: string;

  @IsNotEmpty({ message: 'Please enter your last name' })
  @IsString({ message: 'Last name must be a string' })
  @Transform(({ value }) => value.trim())
  lastName: string;

  @IsNotEmpty({ message: 'Please provide your email address' })
  @IsEmail({}, { message: 'Invalid email format' })
  @Transform(({ value }) => value.trim())
  email: string;

  @IsNotEmpty({ message: 'Please provide a password' })
  @IsString({ message: 'Password must be a string' })
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  @Transform(({ value }) => value.trim())
  password: string;

  @IsNotEmpty({ message: 'Company ID must not be empty' })
  companyId: number;
}
