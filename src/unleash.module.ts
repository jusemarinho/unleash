import { DynamicModule } from '@nestjs/common';
import { IUnleashConfigurations } from './interfaces/unleash.interface';
import { UnleashService } from './unleash.service';
import { initialize, Unleash } from 'unleash-client';

export class UnleashModule {
  static forRoot(config: IUnleashConfigurations): DynamicModule {
    const unleashProvider = {
      provide: 'UNLEASH_CLIENT',
      useFactory: (): Unleash => {
        return initialize({
          url: config.url,
          appName: config.appName,
          customHeaders: { Authorization: config.apiKey },
          strategies: [...(config.strategies || [])],
          bootstrap: config.bootstrap
        });
      },
    };
    return {
      module: UnleashModule,
      global: config.global ?? true,
      providers: [unleashProvider, UnleashService],
      exports: [unleashProvider, UnleashService],
    };
  }
}
