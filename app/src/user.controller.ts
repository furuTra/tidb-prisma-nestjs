import { Controller, Get, Param, Post, Body, Put, Delete, HttpException, HttpStatus, Logger, Header } from '@nestjs/common';
import { UserService } from './prisma/user.service';
import { User as UserModel } from '@prisma/client';

@Controller()
export class UserController {
  private readonly logger = new Logger(UserController.name);

  constructor(
    private readonly userService: UserService,
  ) {}

  @Get('users')
  @Header('content-type', 'application/json; charset=UTF-8')
  async getUsers(): Promise<UserModel[]> {
    this.logger.log("getUsers");
    return this.userService.users({});
  }

  @Get('users/:id')
  @Header('content-type', 'application/json; charset=UTF-8')
  async getUserById(@Param('id') id: string): Promise<UserModel> {
    return this.userService.user({ id: Number(id) })
  }

  @Post('user')
  async signupUser(
    @Body() userData: { name?: string; email: string, password: string },
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