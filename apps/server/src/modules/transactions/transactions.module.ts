import { Module } from '@nestjs/common';
import {
  AlertsDbModule,
  ScenariosDbModule,
  TransactionsDbModule,
} from '@transaction-monitoring/db-driver';

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
  ],
  providers: [
    ApplyScenarioOnBulkTransactionsRule,
    ApplyScenarioOnAggregateTransactionsRule,
    TransactionsResolver,
    TransactionConnectionResolver,
    TransactionsService,
  ],
})
export class TransactionsModule {}
