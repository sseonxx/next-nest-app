import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from './users/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres', // 선택한 데이터베이스 타입
      host: 'localhost', 
      port: 5432,
      username: 'seoeun',
      password: 'seoeun123',
      database: 'test_db',
      // entities: [__dirname + '/../**/*.entity.{js,ts}'],
      entities: [User],
      synchronize: true, // 개발 환경에서만 true (자동 마이그레이션)
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
