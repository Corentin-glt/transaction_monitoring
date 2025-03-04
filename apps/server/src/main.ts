import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = app.get(ConfigService);
  const port = config.get('PORT') || 3333;
  const environment = config.get('NODE_ENV');

  app.enableCors({
    credentials: true,
    origin: (function () {
      if (environment === 'local') {
        // this will allow the schema to be fetched in Apollo Studio
        return /(localhost)|(https:\/\/studio\.apollographql\.com)$/;
      }
      if (environment === 'production') {
        return /(.*)$/;
      }
      return /(https:\/\/studio\.apollographql\.com)$/;
    })(),
    methods: ['GET', 'POST', 'OPTIONS'],
    preflightContinue: false,
    optionsSuccessStatus: 204,
  });
  await app.listen(port);
  Logger.log(`🚀 Application is running on: http://localhost:${port}/graphql`);
}

bootstrap();
