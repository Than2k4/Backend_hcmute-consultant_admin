import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt'; 
import { StatisticsService } from './statistics.service';
import { StatisticsController } from './statistics.controller';
import { User, UserSchema } from '../users/schemas/user.schema';
import { Question, QuestionSchema } from '../questions/schemas/question.schema';
import { Answer, AnswerSchema } from '../answer/schemas/answer.schema';
import { Post, PostSchema } from '../posts/schemas/post.schema';
import { Field, FieldSchema } from '../departments/schemas/field.schema';
import { Department, DepartmentSchema } from '../departments/schemas/department.schema';
import { AdminGuard } from 'src/common/guards/admin.guard';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Question.name, schema: QuestionSchema },
      { name: Answer.name, schema: AnswerSchema },
      { name: Post.name, schema: PostSchema },
      { name: Field.name, schema: FieldSchema },
      { name: Department.name, schema: DepartmentSchema },
    ]),
    JwtModule.register({ 
      secret: process.env.JWT_SECRET || 'secret',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [StatisticsController],
  providers: [StatisticsService, AdminGuard], // 👈 đăng ký guard
})
export class StatisticsModule {}
