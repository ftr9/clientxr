import { ValidationPipe } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common/exceptions';
import { NestFactory } from '@nestjs/core';
import { ValidationError } from 'class-validator/types/validation/ValidationError';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (validationErrors: ValidationError[]) => {
        throw new BadRequestException(validationErrors);
      },
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  await app.listen(process.env.PORT || 4050);
}
bootstrap();
