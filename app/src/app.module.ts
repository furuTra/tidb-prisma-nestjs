import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { UserService } from './prisma/user.service';
import { PostService } from './prisma/post.service';
import { UserController } from './user.controller';
import { PostController } from './post.controller';

@Module({
  imports: [],
  controllers: [AppController, UserController, PostController],
  providers: [AppService, PrismaService, UserService, PostService],
})
export class AppModule { }
