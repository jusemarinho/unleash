import { DynamicModule, Logger } from '@nestjs/common';
import { IUnleashConfigurations } from './interfaces/unleash.interface';
import { HttpModule } from '@nestjs/axios';
import { UnleashService } from './unleash.service';
import { UnleashRepository } from './unleash.repository';

export class UnleashModule {
  static forRoot(config: IUnleashConfigurations): DynamicModule {
    const logger = new Logger('UnleashModule');

    logger.log('UnleashModule dependencies initialized');

    return {
      module: UnleashModule,
      global: !config.global ? true : false,
      imports: [
        HttpModule.register({
          baseURL: config.url,
          headers: {
            'UNLEASH-INSTANCEID': config.instanceId,
            'UNLEASH-APPNAME': config.appName,
            ...config.http?.headers,
          },
        }),
      ],
      providers: [UnleashService, UnleashRepository],
      exports: [UnleashService],
    };
  }
}
