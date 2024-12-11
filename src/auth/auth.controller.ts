import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthContoller {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() body: { email: string; password: string }) {
    return this.authService.signUp(body.email, body.password);
  }

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    const isValid = await this.authService.validateUser(
      body.email,
      body.password,
    );
    if (!isValid) {
      return { message: 'Invalid credentials' };
    }
    return { message: 'Login successful' };
  }
}
