import { Module } from '@nestjs/common';
import { CompanyModule } from './modules/company/company.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import { PartnersModule } from './modules/partners/partners.module';
import { TransactionsModule } from './modules/transactions/transactions.module';
import { AccountModule } from './modules/account/account.module';

@Module({
  imports: [
    CompanyModule,
    PrismaModule,
    PartnersModule,
    TransactionsModule,
    AccountModule,
  ],
})
export class AppModule {}
