import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EnvironmentVariables } from '@transaction-monitoring/core';
import { RedisPubSub } from 'graphql-redis-subscriptions';

export const PUB_SUB = 'PUB_SUB';

@Global()
@Module({
  imports: [],
  providers: [
    {
      inject: [ConfigService],
      provide: PUB_SUB,
      useFactory: async (
        configService: ConfigService<
          EnvironmentVariables,
          true
        >
      ) =>
        new RedisPubSub({
          connection: {
            host: configService.get('hostRedis'),
            port: configService.get('portRedis'),
          },
        }),
    },
  ],
  exports: [PUB_SUB],
})
export class PubSubModule {}
