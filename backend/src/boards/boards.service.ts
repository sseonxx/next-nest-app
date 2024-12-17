import { UpdateBoardDto } from './dto/update-board.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Board, BoardStatus } from './board.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBoardDto } from './dto/create-board.dto';

@Injectable()
export class BoardsService {
  private boards: Board[] = [];
  constructor(
    @InjectRepository(Board)
    private readonly boardRepository: Repository<Board>,
  ) {}

  getAllBoards(): Board[] {
    return this.boards;
  }

  async createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
    const { title, description } = createBoardDto;

    const board = this.boardRepository.create({
      title,
      description,
      status: BoardStatus.PUBLIC,
    });
    return this.boardRepository.save(board);
  }
  /*
      ※게시물 ID 처리
      ID 는 모든 게시물에 유니크해야한다. DB에 데이터를 넣어줄때
      DB가 알아서 유니크 값을 준다다
  
  */

  async getBoardById(id: string): Promise<Board> {
    const found = await this.boardRepository.findOne({ where: { id } });

    if (!found) {
      throw new NotFoundException();
    }
    return found;
  }

  deleteBoard(id: string): void {
    this.boards = this.boards.filter((board) => board.id !== id);
  }

  async updateBoard(
    id: string,
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
