import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { PostsController } from './post.controller';
import { PostsService } from './post.service';
import { Post, PostSchema } from './schemas/post.schema';
import { AdminGuard } from 'src/common/guards/admin.guard';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]),
    JwtModule.register({
      secret: process.env.JWT_SECRET, // 👈 bắt buộc
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [PostsController],
  providers: [PostsService, AdminGuard],
  exports: [PostsService],
})
export class PostsModule {}
