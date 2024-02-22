import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsCreateDto } from './dto/create-transaction.dto';

@Controller('transactions')
export class TransactionsController {
  constructor(private transactionServise: TransactionsService) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(@Body() dto: TransactionsCreateDto) {
    return this.transactionServise.create(dto);
  }

  @Get()
  getAllTransactions() {
    return this.transactionServise.getAllTransactions();
  }
}
