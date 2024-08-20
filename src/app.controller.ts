import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  /**
   * Returns a greeting message including the port number.
   * @returns A string containing the greeting message with the port number.
   */
  @ApiTags('health')
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
