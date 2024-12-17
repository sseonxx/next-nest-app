import { BoardStatus } from '../board.model';

export class UpdateBoardDto {
  id: string;
  title: string;
  description: string;
  status: BoardStatus;
}
