import {
  Body,
  Controller,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyCreateDto } from './dto/company-create.dto';
import { CompanyUpdateDto } from './dto/company-update.dto';

@Controller('company')
export class CompanyController {
  constructor(private companyService: CompanyService) {}

  @Post('register')
  @UsePipes(new ValidationPipe({ transform: true }))
  create(@Body() dto: CompanyCreateDto) {
    return this.companyService.create(dto);
  }

  @Patch('update')
  @UsePipes(new ValidationPipe({ transform: true }))
  update(@Body() dto: CompanyUpdateDto) {
    return this.companyService.update(dto);
  }
}
