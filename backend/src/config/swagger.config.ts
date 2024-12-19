import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function setupSwagger(app: INestApplication): void {
  // Swagerr 설정
  const config = new DocumentBuilder()
    .setTitle('Nest API')
    .setDescription('Api Documentation')
    .setVersion('1.0')
    .addBearerAuth() // JWT인증 위한 설정
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // '/api' 경로로 Swagger UI 설정
}
