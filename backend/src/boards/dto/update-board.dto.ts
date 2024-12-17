import { IsEnum } from 'class-validator';
import { BoardStatus } from '../board.model';

/*
ValidationPipe는 Dto에 있는 데코레이션 기준으로 유효성 검사를 실행합니다.
@IsEnum 데코레이터는 status 필드에 입력된 값이 BoardStatus Enum에 속하는지 확인후
Enum에 없는 값이 들어올 시, 메시지를 반환한다
*/

export class UpdateBoardDto {
  title: string;
  description: string;

  @IsEnum(BoardStatus, {
    message: `Status muse be either ${BoardStatus.PUBLIC} or ${BoardStatus.PRIVATE}`,
  })
  status: BoardStatus;
}
