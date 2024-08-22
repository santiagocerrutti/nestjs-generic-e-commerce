import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { Observable } from 'rxjs';
import config, { IConfig } from '../../config';

@Injectable()
export class ApikeyGuard implements CanActivate {
  constructor(
    @Inject(config.KEY)
    private configService: ConfigType<() => IConfig>,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    return request.headers['api-key'] === this.configService.clientApiKey;
  }
}
