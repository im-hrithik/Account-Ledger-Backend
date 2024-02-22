import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';

@Injectable()
export class AccountService {
  constructor(private prisma: PrismaService) {}

  getAllAccount() {
    return this.prisma.account.findMany({
      select: {
        accountId: true,
        account: true,
      },
    });
  }
}
