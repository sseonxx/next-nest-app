import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { Board } from './board.model';
import { CreateBoardDto } from './dto/create-board.dto';
/*
$ nest g controller boards --no-spec
*/
@Controller('boards')
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @Get('/')
  async getAllBoards(): Promise<Board[]> {
    return this.boardsService.getAllBoards();
  }

  @Post()
  async createBoard(@Body() createBoardDto: CreateBoardDto): Promise<Board> {
    return this.boardsService.createBoard(createBoardDto);
  }

  /* 특정 게시물 가져오기 */
  @Get('/:id')
  async getBoardById(@Param('id') id: string): Promise<Board> {
    return this.boardsService.getBoardById(id);
  }

  /* 특정 게시물 지우기기 */
  @Delete('/:id')
  async deleteBoard(@Param('id') id: string): Promise<void> {
    this.boardsService.deleteBoard(id);
  }

  /* 특정 게시물의 상태 업데이트 */
}
