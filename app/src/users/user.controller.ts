import { Controller, Get, Param, Post, Body, Put, Delete, HttpException, HttpStatus, Logger, Header } from '@nestjs/common';
import { UserService } from './user.service';
import { User as UserModel } from '@prisma/client';
import { ApiOperation, ApiParam, ApiProduces, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/createUser.dto';
import { UserDto } from './dto/user.dto';

@Controller('users')
@ApiTags('/users')
export class UserController {
  private readonly logger = new Logger(UserController.name);

  constructor(
    private readonly userService: UserService,
  ) { }

  @Get()
  @ApiProduces('application/json; charset=utf-8')
  @ApiOperation({ summary: 'ユーザー一覧取得API' })
  @ApiResponse({
    status: 200,
    description: '登録したユーザー一覧を取得',
    type: [UserDto]
  })
  @Header('content-type', 'application/json; charset=UTF-8')
  async getUsers(): Promise<UserModel[]> {
    this.logger.log("getUsers");
    return this.userService.users({});
  }

  @Get(':id')
  @ApiProduces('application/json; charset=utf-8')
  @ApiOperation({ summary: 'ユーザー単体取得API' })
  @ApiResponse({
    status: 200,
    description: '指定されたIDのユーザーを取得',
    type: UserDto
  })
  @ApiParam({
    name: 'id',
    type: Number,
    example: 1
  })
  @Header('content-type', 'application/json; charset=UTF-8')
  async getUserById(@Param('id') id: string): Promise<UserModel> {
    return this.userService.user({ id: Number(id) })
  }

  @Post()
  @ApiProduces('application/json; charset=utf-8')
  @ApiOperation({ summary: 'ユーザー生成API' })
  @ApiResponse({
    status: 200,
    description: '作成されたユーザー情報を返却',
  })
  async signupUser(
    @Body() userData: CreateUserDto,
  ): Promise<UserModel> {
    try {
      this.logger.log(userData);
      return this.userService.createUser(userData);
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: 'This is a custom message',
      }, HttpStatus.FORBIDDEN, {
        cause: error
      });
    } finally {
      this.logger.log("userData");
    }
  }
}