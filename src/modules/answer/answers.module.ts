import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { AnswersService } from './answers.service';
import { AnswersController } from './answers.controller';
import { Answer, AnswerSchema } from './schemas/answer.schema';
import { AdminGuard } from 'src/common/guards/admin.guard';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Answer.name, schema: AnswerSchema }]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AnswersController],
  providers: [AnswersService, AdminGuard],
  exports: [AnswersService],
})
export class AnswersModule {}
