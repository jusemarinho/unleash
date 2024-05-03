import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { firstValueFrom } from 'rxjs';
import { Experiment } from './interfaces/unleash.response';

@Injectable()
export class UnleashRepository {
  private readonly logger = new Logger('UnleashClient');
  constructor(private readonly http: HttpService) {}

  async get(key: string): Promise<AxiosResponse<Experiment>> {
    this.logger.log(`Getting value of feature toggle ${key}`);
    return await firstValueFrom(this.http.get(`/features/${key}`));
  }
}
