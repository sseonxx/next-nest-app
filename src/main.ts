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

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 4000);
  console.log('Application is running on: http://localhost:4000/api');
}
bootstrap();
