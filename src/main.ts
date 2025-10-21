import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ Bật CORS để cho phép React (port 3000) truy cập
  app.enableCors({
    origin: 'http://localhost:3000', // frontend đang chạy ở đây
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true, // nếu bạn gửi cookie/token
  });

  await app.listen(9090);
  console.log(`🚀 Admin server running on: http://localhost:9090`);
}
bootstrap();
