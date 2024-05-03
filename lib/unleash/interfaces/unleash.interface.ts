import { AxiosRequestConfig } from 'axios';

export interface IUnleashConfigurations {
  global?: boolean;
  url: string;
  appName: string;
  instanceId: string;
  http?: AxiosRequestConfig;
}
