import { Module } from '@nestjs/common';
import { DriversController } from './drivers.controller';
import { DriversService } from './drivers.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOption } from 'src/config/ormconfig';

@Module({
  controllers: [DriversController],
  imports: [TypeOrmModule.forRoot(dataSourceOption)],
  providers: [DriversService],
  exports: [DriversService],
})
export class DriversModule {}
