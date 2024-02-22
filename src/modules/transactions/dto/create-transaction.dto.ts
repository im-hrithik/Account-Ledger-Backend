import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsString,
  Matches,
  Max,
  Min,
  ValidateIf,
} from 'class-validator';

export class TransactionsCreateDto {
  @IsInt({ message: 'partner ID must be an integer' })
  @IsNotEmpty({ message: 'partner ID is must required' })
  partnerId: number;

  @IsInt({ message: 'Account ID must be an integer' })
  @IsNotEmpty({ message: 'Account ID is must required' })
  accountId: number;

  @IsBoolean({ message: 'ispartnerTransaction must be a boolean' })
  @IsNotEmpty({ message: 'ispartnerTransaction is must required' })
  isPartnerTransaction: boolean;

  @IsString({ message: 'Transaction type must be a string' })
  @IsNotEmpty({ message: 'Transaction type is must required' })
  transactionType: string;

  @IsNotEmpty({ message: 'Date is must required' })
  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'Date format is invalid. Use YYYY-MM-DD',
  })
  date: string;

  @IsString({ message: 'Description must be a string' })
  @IsNotEmpty({ message: 'Description is must required' })
  @Transform(({ value }) => value.trim())
  description: string;

  @IsInt({ message: 'Amount must be an integer' })
  @Min(0, { message: 'Amount must be greater than or equal to 0' })
  @IsNotEmpty({ message: 'Amount is must required' })
  amount: number;

  @IsInt({ message: 'TDS must be an integer' })
  @Min(0, { message: 'TDS must be greater than or equal to 0' })
  @Max(100, { message: 'TDS must be less than or equal to 100' })
  @ValidateIf((dto) => dto.transactionType === 'credit', {
    message: 'TDS is required for credit transactions',
  })
  tds: number;
}
