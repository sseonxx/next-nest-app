import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

/*
    ※Interface 와 Classes 의 차이
    - interface : 변수의 타입만을 체크
    - classes : 변수의 타입을 체크하고 인스턴스 또한 생성할 수 있음

    모델은 위 1택을 한다

    Board Status란
    이 게시물이 공개 게시물인지, 비공개 게시물인지
    이 두가지 상태 이외에 다른 값이 나오면 안되기 때문에
    타입스크립트 기능의 enumeration을 이용
*/
@Entity()
export class Board {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: BoardStatus;
}

/*
유효성 검사
class-validator와 class-transformer 라이브러리를 이용
$ npm install class-validator class-transformer
*/
export enum BoardStatus {
  PUBLIC = 'PUBLIC',
  PRIVATE = 'PRIVATE',
}
