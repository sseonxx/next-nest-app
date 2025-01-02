import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Board } from 'src/boards/board.entity';
import { User } from 'src/users/user.entity';

export const typeORMConfig: TypeOrmModuleOptions = {
  type: 'postgres', // 선택한 데이터베이스 타입
  host: 'localhost',
  port: 5432,
  username: 'seoeun',
  password: 'seoeun123',
  database: 'test_db',
  // entities: [__dirname + '/../**/*.entity.{js,ts}'],
  entities: [User, Board],
  synchronize: true, // 개발 환경에서만 true (자동 마이그레이션)
  /*
    synchronize true 일 경우 애플리케이션을 다시 실행할 때
    엔티티안에서 수정된 컬럼의 길이 탕비 변경값들을 해당 테이블을 
    Drop 한 후 다시 생성한다.
  */
  logging: true, // 로그 활성화
};
