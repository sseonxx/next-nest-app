import { ApiProperty } from '@nestjs/swagger';
import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class AuthDto {
  @ApiProperty({
    example: 'test@example.com',
    description: 'User email address',
  })
  @Matches(/^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, {
    message: '이메일 형식이 아닙니다.',
  })
  email: string;

  @ApiProperty({
    example: 'password123',
    description: 'User password',
  })
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
    message: '8글자 이상, 영문, 숫자, 특수문자를 모두 사용해야 합니다.',
  })
  password: string;

  @ApiProperty({
    example: 'tese01',
    description: 'user name',
  })
  @MinLength(4)
  @MaxLength(20)
  username: string;
}
