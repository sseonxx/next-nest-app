import { Module } from '@nestjs/common';
import { BoardsController } from './boards.controller';
import { BoardsService } from './boards.service';

/*
$ nest g module boards
>> app.modules.ts 의 module imports란에  자동으로 입력
*/
@Module({
  controllers: [BoardsController],
  providers: [BoardsService],
})
export class BoardsModule {}
