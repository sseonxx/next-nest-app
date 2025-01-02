import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { BoardsService } from './boards.service';
import { Board } from './board.entity';
import { CreateBoardDto } from './dto/create-board.dto';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { UpdateBoardDto } from './dto/update-board.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/users/user.entity';
/*
$ nest g controller boards --no-spec
*/
@Controller('boards')
@UseGuards(AuthGuard())
@ApiBearerAuth()
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @Get('/')
  async getAllBoards(): Promise<[Board[], number]> {
    return this.boardsService.getAllBoards();
  }

  @Post()
  @UsePipes(ValidationPipe)
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        title: { type: 'string' },
        description: { type: 'string' },
      },
    },
  })
  async createBoard(
    @Body() createBoardDto: CreateBoardDto,
    @GetUser() user: User,
  ): Promise<Board> {
    return this.boardsService.createBoard(createBoardDto, user);
  }

  /* 특정 게시물 가져오기 */
  @Get('/:id')
  async getBoardById(@Param('id') id: number): Promise<Board> {
    return this.boardsService.getBoardById(id);
  }

  /* 특정 게시물 지우기 */
  @Delete('/:id')
  async deleteBoard(
    @Param('id') id: string,
  ): Promise<{ message: string; deletedId?: string }> {
    try {
      const isDeleted = await this.boardsService.deleteBoardById(id);
      if (isDeleted) {
        return { message: 'Item succeeefully deleted', deletedId: id };
      } else {
        throw new HttpException('Item not found', HttpStatus.NOT_FOUND);
      }
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to delete item',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /* 특정 게시물의 상태 업데이트 */
  @Patch('/:id')
  @UsePipes(ValidationPipe) //DTO를 서비스에 전달하기 전에 NestJS의 ValidationPipe를 사용해 DTO의 유효성을 검사
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        title: { type: 'string' },
        description: { type: 'string' },
        status: { default: 'PUBLIC' },
      },
    },
  })
  async updateBoard(
    @Param('id') id: number,
    @Body() updateBoardDto: UpdateBoardDto,
  ): Promise<Board> {
    return this.boardsService.updateBoard(id, updateBoardDto);
  }
}
