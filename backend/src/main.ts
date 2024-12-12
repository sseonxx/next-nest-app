import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // await app.listen(process.env.PORT ?? 4000);

  // Swagerr 설정
  const config = new DocumentBuilder()
    .setTitle('Nest API')
    .setDescription('Api Documentation')
    .setVersion('1.0')
    .addBearerAuth() // JWT인증 위한 설정
    .build();

  // CORS 활성화
  app.enableCors({
    origin: ['http://localhost:3000'], // 프론트엔드 주소
    credentials: true, // 쿠키와 인증 정보를 허용하려면 true로 설정
  });

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 4000); // 백엔드 포트 설정
  console.log('Application is running on: http://localhost:4000/api');
}
bootstrap();
