import { ApiProperty } from '@nestjs/swagger';

export class AuthDto {
  @ApiProperty({
    example: 'test@example.com',
    description: 'User email address',
  })
  email: string;

  @ApiProperty({
    example: 'password123',
    description: 'User password',
  })
  password: string;
}
