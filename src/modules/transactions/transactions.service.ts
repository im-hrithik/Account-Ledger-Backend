import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { TransactionsCreateDto } from './dto/create-transaction.dto';

@Injectable()
export class TransactionsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: TransactionsCreateDto) {
    const {
      isPartnerTransaction,
      partnerId,
      accountId,
      transactionType,
      date,
      description,
      amount,
      tds,
    } = dto;

    let data: any = {
      isPartnerTransaction,
      partnerId,
      accountId,
      transactionType,
      date,
      description,
      amount,
    };

    if (transactionType === 'credit') {
      data = { ...data, tds };
    }

    await this.prisma.transaction.create({ data });
    if (transactionType === 'credit') {
      return { message: 'Credit' };
    }
    return { message: 'debit' };
  }

  getAllTransactions() {
    return this.prisma.transaction.findMany({
      select: {
        transactionId: true,
        isPartnerTransaction: true,
        transactionType: true,
        date: true,
        description: true,
        amount: true,
        tds: true,
        partner: {
          select: { partnerId: true, firstName: true, lastName: true },
        },
        account: { select: { accountId: true, account: true } },
      },
    });
  }
}
