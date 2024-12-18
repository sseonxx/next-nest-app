import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from './users/user.entity';
import { AuthModule } from './auth/auth.module';
import { BoardsModule } from './boards/boards.module';
import { Board } from './boards/board.entity';
import { typeORMConfig } from './config/typeorm.config';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeORMConfig),
    AuthModule,
    BoardsModule, // <<CLI 생성시 자동으로 인식
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
