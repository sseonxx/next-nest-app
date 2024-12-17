import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from './users/user.entity';
import { AuthModule } from './auth/auth.module';
import { BoardsModule } from './boards/boards.module';
import { Board } from './boards/board.model';

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
      entities: [User, Board],
      synchronize: true, // 개발 환경에서만 true (자동 마이그레이션)
    }),
    AuthModule,
    BoardsModule, // <<CLI 생성시 자동으로 인식
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
