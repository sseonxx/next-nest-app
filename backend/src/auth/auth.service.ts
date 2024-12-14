import { UsersService } from './../users/users.service';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(email: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return this.usersService.create(email, hashedPassword);
  }

  async validateUser(email: string, password: string): Promise<boolean> {
    const user = await this.usersService.findByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      return true;
    }
    return false;
  }

  async getAccessToken(email: string) {
    const payload = { email };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
