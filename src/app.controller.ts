import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // TODO: En este controller podrían ir los endpoints de healthcheck (revisar la libería seleccionada).
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
