import { Controller, Get } from '@nestjs/common';
import { AccountService } from './account.service';

@Controller('account')
export class AccountController {
  constructor(private accountService: AccountService) {}

  @Get()
  getAllTransactions() {
    return this.accountService.getAllAccount();
  }
}
