import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { DepartmentsModule } from './modules/departments/departments.module'; // 👈 Thêm dòng này
import { PostsModule } from './modules/posts/post.module'; // 👈 Thêm dòng này
import { QuestionsModule } from './modules/questions/questions.module';
import { AnswersModule } from './modules/answer/answers.module';
@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_URI ?? 'mongodb://localhost:27017/defaultdb'),
    AuthModule,
    UsersModule,
    DepartmentsModule, 
    PostsModule, 
    QuestionsModule,
    AnswersModule
  ],
})
export class AppModule {}
