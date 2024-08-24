import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      name: 'db_host',
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'seryu_db_admin',
      password: 'seryu_db_password_123',
      database: 'seryu_db',
      autoLoadEntities: true,
      synchronize: false,
    }),
  ],
  exports: [],
})
export class DatabaseModule {}
