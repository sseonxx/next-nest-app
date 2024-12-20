import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthDto } from './auth.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './get-user.decorator';

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
  async login(
    @Body() body: { email: string; password: string },
  ): Promise<{ accessToken: string }> {
    const isValid = await this.authService.validateUser(
      body.email,
      body.password,
    );

    return isValid;
  }

  @Post('test')
  @UseGuards(AuthGuard())
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiBearerAuth() // Swagger UI에서 Bearer 토큰 사용 가능하도록 설정
  test(@Req() req) {
    console.log('req >>', req);
    return { message: 'Token is valid', user: req.user };
  }

  // @GetUser() 커스텀 데코레이팅
  @Post('test2')
  @UseGuards(AuthGuard())
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiBearerAuth() // Swagger UI에서 Bearer 토큰 사용 가능하도록 설정
  test2(@GetUser() user) {
    return { message: 'Token is valid', user: user };
  }
}
