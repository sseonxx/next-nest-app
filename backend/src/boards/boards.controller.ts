import { Controller, Get } from '@nestjs/common';
import { BoardsService } from './boards.service';
/*
$ nest g controller boards --no-spec
*/
@Controller('boards')
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @Get()
  getAllBoards() {
    return this.boardsService.getAllBoards();
  }
}
