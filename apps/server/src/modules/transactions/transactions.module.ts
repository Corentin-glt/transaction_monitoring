import { Module } from '@nestjs/common';
import { TransactionsDbModule } from '@transaction-monitoring/db-driver';

import {
  TransactionConnectionResolver,
  TransactionsResolver,
} from './transactions.resolver';
import { TransactionsService } from './transactions.service';

@Module({
  imports: [TransactionsDbModule],
  providers: [
    TransactionsResolver,
    TransactionConnectionResolver,
    TransactionsService,
  ],
})
export class TransactionsModule {}
