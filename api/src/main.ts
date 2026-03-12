import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';

// api/src/main.ts
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.enableCors({
    origin: [
      'http://localhost:3000',
      'http://localhost:3333',
      'http://52.186.174.0',
      'http://52.186.174.0:3000',
      'http://52.186.174.0:3333',
      'https://full-guid-azerbaijan.onrender.com',
    ],
    credentials: true,
  });

  const port = configService.get<number>('PORT', 5555);
  await app.listen(port, '0.0.0.0');
}

bootstrap();
