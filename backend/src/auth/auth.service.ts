import { AuthDto } from './auth.dto';
import { UsersService } from './../users/users.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(authDto: AuthDto) {
    const { email, password, username } = authDto;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const resultAuthDto: AuthDto = {
      email,
      username,
      password: hashedPassword,
    };
    return this.usersService.create(resultAuthDto);
  }

  async validateUser(
    email: string,
    password: string,
  ): Promise<{ accessToken: string }> {
    const user = await this.usersService.findByEmail(email); // 이메일로 사용자 조회
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new HttpException('Invalid Credentials', HttpStatus.UNAUTHORIZED);
    }
    // 유저토큰 생성 (Secret + Payload)
    const payload = { email: user.email };

    const accessToken = await this.jwtService.sign(payload);

    return { accessToken };
  }

  async generateToken(email: string) {
    const payload = { email };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
/*
$ curl -X 'POST' \
  'http://localhost:4000/auth/test' \
   -H "Accept: application/json" \
   -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3Q1QG5hdmVyLmNvbSIsImlhdCI6MTczNDYwNDY5NCwiZXhwIjoxNzM0NjA4Mjk0fQ.2hHK1ZbOYaYwg6zRPwEiROSBJDkhebaasVeAVS9bXyI" \
*/
