import { Strategy } from 'unleash-client';
import { BootstrapOptions } from 'unleash-client/lib/repository/bootstrap-provider'

export interface IUnleashConfigurations {
  global?: boolean;
  url: string;
  appName: string;
  apiKey: string;
  strategies?: Strategy[],
  bootstrap?: BootstrapOptions;
}
