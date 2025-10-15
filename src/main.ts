import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(6000);
  console.log(`🚀 Admin server running on: http://localhost:6000`);
}
bootstrap();
