import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PartnersCreateDto } from './dto/partners-create.dto';

@Injectable()
export class PartnersService {
  constructor(private prisma: PrismaService) {}

  async create(dto: PartnersCreateDto) {
    try {
      await this.prisma.partner.create({
        data: {
          companyId: dto.companyId,
          firstName: dto.firstName,
          lastName: dto.lastName,
          email: dto.email,
          password: dto.password,
        },
      });
      return { message: 'You have successfully registered.' };
    } catch (error) {
      return { message: error };
    }
  }

  getAllpartners() {
    try {
      return this.prisma.partner.findMany({
        select: {
          partnerId: true,
          companyId: true,
          firstName: true,
          lastName: true,
          email: true,
          company: {
            select: {
              companyName: true,
            },
          },
        },
      });
    } catch (error) {
      return { message: error };
    }
  }
}
