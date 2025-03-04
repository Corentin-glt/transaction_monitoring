import { Args, ID, Query, Resolver } from '@nestjs/graphql';

import { Transaction } from './transactions.dto';
import { TransactionsService } from './transactions.service';

@Resolver(() => Transaction)
export class TransactionsResolver {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Query(() => Transaction, { name: 'getTransactions' })
  async getTransactionById(
    @Args('id', { type: () => ID }) id: string
  ): Promise<Transaction> {
    return this.transactionsService.getTransactionById(id);
  }
}
