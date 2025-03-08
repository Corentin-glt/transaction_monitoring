import {
  ApolloDriver,
  ApolloDriverConfig,
} from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { CoreModule } from '@transaction-monitoring/core';

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
    ...applicationModules,
  ],
  controllers: [],
})
export class AppModule {}
