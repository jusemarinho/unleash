import { Inject, Injectable } from '@nestjs/common';
import { Unleash } from 'unleash-client';

@Injectable()
export class UnleashService {
  constructor(@Inject('UNLEASH_CLIENT') private readonly unleashClient: Unleash) {}

  async isEnabled(key: string): Promise<boolean> {
    return (await this.unleashClient.isEnabled(key));
  }
}
