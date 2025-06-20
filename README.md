<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) Lib To Communicate With Unleash Feature Toggle.

## Installation

```bash
$ npm install @josemarinho/unleash
```

## Running the app

Once the installation process is complete, we can import the UnleashModule into the root AppModule.

```ts

import { Module } from '@nestjs/common';
import { UnleashModule } from '@josemarinho/unleash';

@Module({
  imports: [
    UnleashModule.forRoot({
      appName: 'app-name',
      url: 'https://unleash-api-url.com',
      apiKey: 'your-api-key',
      strategies: [new ActiveForUserWithEmailStrategy()], // Your custom strategy
      bootstrap: {
        data: [
          {
            name: 'feature-x',
            enabled: true,
            strategies: [],
          },
        ],
        disableBootstrapOverride: true,
      },
      global: false, // default is true
    }),
  ],
})
export class AppModule {}

```

## Custom Strategies

You can define and use custom strategies by extending the Strategy class from unleash-client.
Example from Docs Unleash Client - https://docs.getunleash.io/reference/sdks/node#custom-strategies

``` ts

import { initialize, Strategy } from 'unleash-client';
class ActiveForUserWithEmailStrategy extends Strategy {
  constructor() {
    super('ActiveForUserWithEmail');
  }

  isEnabled(parameters, context) {
    return parameters.emails.indexOf(context.email) !== -1;
  }
}

```


## Utilization

To retrieve feature toggles from Unleash, simply inject the UnleashService into your service or controller and use the available methods.

### ✅ Checking if a feature is enabled

```ts
import { Injectable } from '@nestjs/common';
import { UnleashService } from '@josemarinho/unleash';

@Injectable()
export class AppService {
  constructor(private readonly unleash: UnleashService) {}

  isFeatureEnabled(toggleName: string): boolean {
    return this.unleash.isEnabled(toggleName);
  }
}
```

### 🔍 Accessing the Unleash client directly (optional)

If you need to access advanced methods like getVariant, you can retrieve the internal Unleash client instance:

```ts
getFeatureVariant(toggleName: string) {
  const client = this.unleash.getClient();
  return client.getVariant(toggleName);
}
```

> The UnleashService also handles cleanup automatically on application shutdown to avoid memory leaks.

After your app it's ready to running.