import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './config/swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // await app.listen(process.env.PORT ?? 4000);

  // CORS 활성화
  app.enableCors({
    origin: ['http://localhost:3000'], // 프론트엔드 주소
    credentials: true, // 쿠키와 인증 정보를 허용하려면 true로 설정
  });

  // 개발환경에서만 Swagger을 활성화 하고싶다면
  if (process.env.NODE_ENV !== 'production') {
    setupSwagger(app);
  }
  await app.listen(process.env.PORT ?? 4000); // 백엔드 포트 설정
  console.log('Application is running on: http://localhost:4000/api');
}
bootstrap();
