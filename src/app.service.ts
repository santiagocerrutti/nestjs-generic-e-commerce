import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import config, { IConfig } from './config';

@Injectable()
export class AppService {
  constructor(
    @Inject(config.KEY)
    private configService: ConfigType<() => IConfig>,
  ) {}

  /**
   * Returns a greeting message including the port number.
   * @returns A string containing the greeting message with the port number.
   */
  getHello(): string {
    return `Hello from port: ${this.configService.port}`;
  }
}
