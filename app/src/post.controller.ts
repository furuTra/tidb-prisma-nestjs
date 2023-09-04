import { Controller, Get, Param, Post, Body, Put, Delete, HttpException, HttpStatus, Logger, Header } from '@nestjs/common';
import { PostService } from './prisma/post.service';
import { Post as PostModel } from '@prisma/client';

@Controller()
export class PostController {
  private readonly logger = new Logger(PostController.name);

  constructor(
    private readonly postService: PostService,
  ) {}

  @Get('post/:id')
  @Header('content-type', 'application/json; charset=UTF-8')
  async getPostById(@Param('id') id: string): Promise<PostModel> {
    return this.postService.post({ id: Number(id) });
  }

  @Get('feed')
  @Header('content-type', 'application/json; charset=UTF-8')
  async getPubilshedPosts(): Promise<PostModel[]> {
    return this.postService.posts({
      where: { published: true }
    });
  }

  @Get('filtered-posts/:searchString')
  async getFilteredPosts(@Param('searchString') searchString: string): Promise<PostModel[]> {
    return this.postService.posts({
      where: {
        OR: [
          {
            title: { contains: searchString }
          },
          {
            content: { contains: searchString }
          }
        ]
      }
    })
  }

  @Post('post')
  async createDraft(
    @Body() postData: { title: string; content?: string; authorEmail: string }
  ): Promise<PostModel> {
    this.logger.log(postData);
    const { title, content, authorEmail } = postData;
    return this.postService.createPost({
      title,
      content,
      author: {
        connect: { email: authorEmail }
      }
    })
  }

  @Put('publish/:id')
  async publishPost(@Param('id') id: string): Promise<PostModel> {
    return this.postService.updatePost({
      where: { id: Number(id) },
      data: { published: true },
    });
  }

  @Delete('post/:id')
  async deletePost(@Param('id') id: string): Promise<PostModel> {
    return this.postService.deletePost({ id: Number(id) });
  }
}