import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CompanyCreateDto } from './dto/company-create.dto';
import { CompanyUpdateDto } from './dto/company-update.dto';
import * as nodemailer from 'nodemailer';

@Injectable()
export class CompanyService {
  constructor(private prisma: PrismaService) {}

  private async sendInvitationEmails(companyName: string, emails: string[]) {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      requireTLS: true,
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    for (const email of emails) {
      const emailOptions = {
        from: process.env.EMAIL_USERNAME,
        to: email,
        subject: 'Invitation to join ' + companyName,
        text: `Dear user,\n\nYou have been invited to join ${companyName}. Please register your account to get started.`,
      };

      await transporter.sendMail(emailOptions);
    }
  }

  async create(dto: CompanyCreateDto) {
    const createdCompany = await this.prisma.company.create({
      data: {
        companyName: dto.companyName,
      },
    });

    if (createdCompany) {
      await this.sendInvitationEmails(createdCompany.companyName, dto.emails);
      return { message: 'Successfully created company and sent invitations.' };
    }
  }

  update(dto: CompanyUpdateDto) {
    return this.prisma.company.update({
      where: {
        companyId: dto.companyId,
      },
      data: {
        companyName: dto.companyName,
      },
    });
  }
}
