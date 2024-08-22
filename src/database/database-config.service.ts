import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import config, { IConfig } from 'src/config';
import { ProductSchema } from 'src/products/product.schema';

@Injectable()
export class DatabaseConfigService implements TypeOrmOptionsFactory {
  constructor(
    @Inject(config.KEY)
    private configService: ConfigType<() => IConfig>,
  ) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.configService.postgresHost,
      port: this.configService.postgresPort,
      username: this.configService.postgresUser,
      password: this.configService.postgresPassword,
      database: this.configService.postgresDb,
      entities: [ProductSchema],
      // This is to automatically create/update models in the DB according to the definition
      // DO NOT use in this Production
      // synchronize: true,
    };
  }
}
