import { UpdateBoardDto } from './dto/update-board.dto';
import {
  HttpException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Board, BoardStatus } from './board.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBoardDto } from './dto/create-board.dto';
import { User } from 'src/users/user.entity';
import { UnauthorizedBoardAccessException } from './exceptions/unauthorized-board-access.exception';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(Board)
    private readonly boardRepository: Repository<Board>,
  ) {}

  async getAllBoards(): Promise<[Board[], number]> {
    return this.boardRepository.findAndCount();
  }

  async createBoard(
    createBoardDto: CreateBoardDto,
    user: User,
  ): Promise<Board> {
    const { title, description } = createBoardDto;

    const board = this.boardRepository.create({
      title,
      description,
      status: BoardStatus.PUBLIC,
      user,
    });
    return this.boardRepository.save(board);
  }
  /*
      ※게시물 ID 처리
      ID 는 모든 게시물에 유니크해야한다. DB에 데이터를 넣어줄때
      DB가 알아서 유니크 값을 준다다
  
  */

  async getBoardById(id: number): Promise<Board> {
    const found = await this.boardRepository.findOne({ where: { id } });

    if (!found) {
      throw new NotFoundException(`Can't find Board with id:${id}`);
    }
    return found;
  }

  async getBoardByParam(user: User): Promise<Board[]> {
    const query = this.boardRepository.createQueryBuilder('board');
    query.where('board.userId = :userId', { userId: user.id });

    const boards = await query.getMany();
    return boards;
  }

  async deleteBoardById(id: number, user: User): Promise<boolean> {
    try {
      // 게시글 조회
      const board = await this.boardRepository.findOne({
        where: { id },
        relations: ['user'],
      });

      if (!board) {
        throw new NotFoundException(`Board with id ${id} not found`);
      }

      //게시글 소유자 확인
      if (board.user.id !== user.id) {
        throw new UnauthorizedBoardAccessException(
          'You are not authorized to delete this board',
        );
      }

      console.log('여기 넘어가?');

      // 게시글 삭제
      const result = await this.boardRepository.delete({ id });
      /* result =
      {
        raw: {}, // 원시 데이터베이스 응답
        affected: 1 // 영향을 받은(삭제된) 행의 수
      }
       */
      if (result.affected === 0) {
        throw new NotFoundException(`Failed to delete Board with id ${id}`);
      }

      return true;
    } catch (error) {
      if (error instanceof HttpException) {
        // 이 코드를 추가하지 않으면 InternalServerErrorException 로 빠진다.
        throw error; // 커스텀 예외 또는 NestJS 기본 예외 재발생
      }
      throw new InternalServerErrorException(
        'An unexpected error occurred while deleting the board',
      );
    }
  }

  async updateBoard(
    id: number,
    updateBoardDto: UpdateBoardDto,
  ): Promise<Board> {
    const { title, description, status } = updateBoardDto;
    // this.boardRepository.update(id, updateBoardDto); //영속성 컨텍스트에 반영된 내용을 자동으로 반환하지 않기에

    // 기존 엔티티를 찾음
    const board = await this.getBoardById(id);
    if (!board) {
      throw new NotFoundException(`Board with ID:${id} not found`);
    }

    // 엔티티 내용 업데이트
    board.title = title ?? board.title;
    board.description = description ?? board.description;
    board.status = status ?? board.status;

    return await this.boardRepository.save(board);
  }
}
