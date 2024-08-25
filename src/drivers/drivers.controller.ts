import { Controller, Get, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { DriversService } from './drivers.service';

@Controller('drivers')
export class DriversController {
  constructor(private driversService: DriversService) {}

  @HttpCode(HttpStatus.OK)
  @Get('')
  async getNews(@Query() query: string) {
    const drivers = await this.driversService.findAll(query);

    return {
      drivers: drivers,
    };
  }
}
