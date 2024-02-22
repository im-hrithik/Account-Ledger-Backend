import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  Get,
} from '@nestjs/common';
import { PartnersCreateDto } from './dto/partners-create.dto';
import { PartnersService } from './partners.service';

@Controller('partners')
export class PartnersController {
  constructor(private readonly partnersService: PartnersService) {}

  @Post('register')
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(@Body() dto: PartnersCreateDto) {
    return this.partnersService.create(dto);
  }

  @Get()
  getAllpartners() {
    return this.partnersService.getAllpartners();
  }
}
