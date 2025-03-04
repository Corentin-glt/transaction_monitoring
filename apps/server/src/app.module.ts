import {
  ApolloDriver,
  ApolloDriverConfig,
} from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { CoreModule } from '@transaction-monitoring/core';

import { GraphQLModuleConfigService } from './graphql.service';
import { TransactionsModule } from './modules/transactions/transactions.module';

const applicationModules = [TransactionsModule];

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
