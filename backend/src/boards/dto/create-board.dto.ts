import { IsNotEmpty } from 'class-validator';

export class CreateBoardDto {
  /*
  @IsNotEmpty : 빈값으로 생성시 예외발생하도록
  */
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;
}
