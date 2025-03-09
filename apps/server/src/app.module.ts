import {
  ApolloDriver,
  ApolloDriverConfig,
} from '@nestjs/apollo';
import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import {
  CoreModule,
  EnvironmentVariables,
} from '@transaction-monitoring/core';

import { GraphQLModuleConfigService } from './graphql.service';
import { AlertsModule } from './modules/alerts/alerts.module';
import { RulesModule } from './modules/rules/rules.module';
import { ScenariosModule } from './modules/scenarios/scenarios.module';
import { TransactionsModule } from './modules/transactions/transactions.module';

const applicationModules = [
  TransactionsModule,
  RulesModule,
  ScenariosModule,
  AlertsModule,
];

@Module({
  imports: [
    CoreModule,
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useClass: GraphQLModuleConfigService,
    }),
    BullModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (
        configService: ConfigService<
          EnvironmentVariables,
          true
        >
      ) => ({
        connection: {
          host: configService.get('hostRedis'),
          port: configService.get('portRedis'),
        },
      }),
    }),
    ...applicationModules,
  ],
  controllers: [],
})
export class AppModule {}
