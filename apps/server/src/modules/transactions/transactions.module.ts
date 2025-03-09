import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import {
  AlertsDbModule,
  ScenariosDbModule,
  TransactionsDbModule,
} from '@transaction-monitoring/db-driver';

import { transcriptionsConsumer } from './transactions.process';
import {
  TransactionConnectionResolver,
  TransactionsResolver,
} from './transactions.resolver';
import { TransactionsService } from './transactions.service';
import { ApplyScenarioOnAggregateTransactionsRule } from '../../rules/applyScenarioOnAggregateTransactions.rule';
import { ApplyScenarioOnBulkTransactionsRule } from '../../rules/applyScenarioOnBulkTransactions.rule';

@Module({
  imports: [
    TransactionsDbModule,
    ScenariosDbModule,
    AlertsDbModule,
    BullModule.registerQueue({
      name: 'transactions',
    }),
  ],
  providers: [
    ApplyScenarioOnBulkTransactionsRule,
    ApplyScenarioOnAggregateTransactionsRule,
    TransactionsResolver,
    TransactionConnectionResolver,
    TransactionsService,
    transcriptionsConsumer,
  ],
})
export class TransactionsModule {}
