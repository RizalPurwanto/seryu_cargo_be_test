import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOption } from 'src/config/ormconfig';

@Module({
  imports: [TypeOrmModule.forRoot(dataSourceOption)],
})
export class VariableConfigsModule {}
