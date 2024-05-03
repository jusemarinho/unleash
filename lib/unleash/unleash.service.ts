import { Injectable } from '@nestjs/common';
import { UnleashRepository } from './unleash.repository';

@Injectable()
export class UnleashService {
  constructor(private readonly unleashRepository: UnleashRepository) {}

  async isEnabled(key: string): Promise<boolean> {
    return (await this.unleashRepository.get(key)).data.enabled;
  }
}
