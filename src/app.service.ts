import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import config, { IConfig } from './config';

@Injectable()
export class AppService {
  constructor(
    @Inject(config.KEY)
    private configService: ConfigType<() => IConfig>,
  ) {}

  getHello(): string {
    return `Hello from port: ${this.configService.port}`;
  }
}
