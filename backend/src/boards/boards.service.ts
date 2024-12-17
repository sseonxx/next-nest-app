import { UpdateBoardDto } from './dto/update-board.dto';
import { Injectable } from '@nestjs/common';
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

    const board: CreateBoardDto = {
      title: title, // title ==  title: title,
      description: description, //description ==  description: description,
    };

    // this.boards.push(board);
    return this.boardRepository.create({
      title,
      description,
      status: BoardStatus.PUBLIC,
    });
  }
  /*
      ※게시물 ID 처리
      ID 는 모든 게시물에 유니크해야한다. DB에 데이터를 넣어줄때
      DB가 알아서 유니크 값을 준다다
  
  */

  getBoardById(id: string): Board {
    return this.boards.find((board) => board.id === id);
  }

  deleteBoard(id: string): void {
    this.boards = this.boards.filter((board) => board.id !== id);
  }

  async updateBoard(updateBoardDto: UpdateBoardDto): Promise<Board> {
    const { id, title, description, status } = updateBoardDto;
    this.boardRepository.update(id, updateBoardDto);
    return this.boardRepository.findOne({ where: { id } });
  }
}
