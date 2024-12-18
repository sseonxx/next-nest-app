import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthDto } from './auth.dto';

@ApiTags('Auth') // Swagger에서 그룹 태그
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @ApiOperation({ summary: 'Sign up' }) // API 설명
  @ApiResponse({ status: 201, description: 'User created successfully.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: { type: 'string' },
        password: { type: 'string' },
        username: { type: 'string' },
      },
    },
  })
  async signUp(@Body(ValidationPipe) authDto: AuthDto) {
    return this.authService.signUp(authDto);
  }

  @Post('login')
  @ApiOperation({ summary: 'Login' }) // API 설명
  @ApiResponse({ status: 200, description: 'User logged in successfully.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: { type: 'string' },
        password: { type: 'string' },
      },
    },
  })
  async login(@Body() body: { email: string; password: string }) {
    const isValid = await this.authService.validateUser(
      body.email,
      body.password,
    );

    return isValid;
  }
}
