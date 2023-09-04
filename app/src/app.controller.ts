import { Controller, Get, Param, Post, Body, Put, Delete, HttpException, HttpStatus, Logger, Header } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  private readonly logger = new Logger(AppController.name);

  constructor(
    private readonly appService: AppService,
  ) {}

  @Get()
  getHello(): string {
    this.logger.log('getHello');
    return this.appService.getHello();
  }

}

