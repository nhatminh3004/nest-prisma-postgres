import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  await app.listen(3000).catch((err) => console.error(err));
  // Thêm dòng này để kiểm tra
  console.log('DB URL check:', process.env.DATABASE_URL);
}
void bootstrap();
