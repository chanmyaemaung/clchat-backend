import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import * as CookieParser from 'cookie-parser';
import { Logger } from 'nestjs-pino';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  app.getHttpAdapter().getInstance().disable('x-powered-by'); // Disable the X-Powered-By header
  app.useGlobalPipes(new ValidationPipe());
  app.useLogger(app.get(Logger));
  app.enableCors();
  app.use(CookieParser());

  const configService = app.get(ConfigService);
  await app.listen(configService.getOrThrow('PORT'));
}
bootstrap();
