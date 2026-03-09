import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.enableCors({
    origin: ['https://full-guid-azerbaijan.onrender.com', 'http://localhost:3000', 'http://localhost:3001'],
    credentials: true,
  });

  const port = configService.get<number>('PORT', 5555);
  await app.listen(port);

  console.log(`🚀 Backend is running on: http://localhost:${port}`);
}
bootstrap();
