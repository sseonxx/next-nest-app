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
    const hashedPassword = await bcrypt.hash(password, 10);
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
  ): Promise<{ token: string }> {
    const user = await this.usersService.findByEmail(email); // 이메일로 사용자 조회
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new HttpException('Invalid Credentials', HttpStatus.UNAUTHORIZED);
    }
    const token = await this.generateToken(user.email);
    return { token: token.accessToken };
  }

  async generateToken(email: string) {
    const payload = { email };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
