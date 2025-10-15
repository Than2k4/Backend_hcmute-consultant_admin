import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { QuestionsService } from './questions.service';
import { QuestionsController } from './questions.controller';
import { Question, QuestionSchema } from './schemas/question.schema';
import { AdminGuard } from 'src/common/guards/admin.guard';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Question.name, schema: QuestionSchema }]),
    JwtModule.register({
      secret: process.env.JWT_SECRET, // 👈 dùng cùng secret với AuthModule
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [QuestionsController],
  providers: [QuestionsService, AdminGuard],
})
export class QuestionsModule {}
