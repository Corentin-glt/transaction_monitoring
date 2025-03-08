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
import { ApplyScenarioOnBulkTransactionsRule } from '../../rules/applyScenarioOnBulkTransactions.rule';

@Module({
  imports: [
    TransactionsDbModule,
    ScenariosDbModule,
    AlertsDbModule,
  ],
  providers: [
    ApplyScenarioOnBulkTransactionsRule,
    TransactionsResolver,
    TransactionConnectionResolver,
    TransactionsService,
  ],
})
export class TransactionsModule {}
