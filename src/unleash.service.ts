import { Inject, Injectable, OnApplicationShutdown } from '@nestjs/common';
import { Unleash } from 'unleash-client';

@Injectable()
export class UnleashService implements OnApplicationShutdown {
  constructor(@Inject('UNLEASH_CLIENT') private readonly unleashClient: Unleash) {}

  isEnabled(toggleName: string): boolean {
    return (this.unleashClient.isEnabled(toggleName));
  }

  getClient(): Unleash {
    return this.unleashClient;
  }

  onApplicationShutdown() {
    this.unleashClient.destroy();
  }
}
