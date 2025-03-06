import {
  Args,
  ID,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';

import {
  BulkInsertTransaction,
  CreateTransactionInput,
  CreateTransactionsInput,
  Transaction,
  TransactionsConnection,
  TransactionsConnectionArgs,
  TransactionsConnectionItemsArgs,
} from './transactions.dto';
import { TransactionsService } from './transactions.service';

@Resolver(() => Transaction)
export class TransactionsResolver {
  constructor(
    private readonly transactionsService: TransactionsService
  ) {}

  @Query(() => Transaction)
  async transaction(
    @Args('id', { type: () => ID }) id: string
  ): Promise<Transaction> {
    return this.transactionsService.getTransactionById(id);
  }

  @Query(() => TransactionsConnection)
  public transactionsConnection(
    @Args() args: TransactionsConnectionArgs
  ) {
    return {
      ids: args.ids,
      sourceAccount: args.sourceAccount,
      targetAccount: args.targetAccount,
      externalIds: args.externalIds,
      amount: args.amount,
      currency: args.currency,
    };
  }

  @Mutation(() => Transaction)
  async createTransaction(
    @Args('input') input: CreateTransactionInput
  ) {
    return this.transactionsService.createTransaction(
      input
    );
  }

  @Mutation(() => BulkInsertTransaction)
  async createTransactions(
    @Args('input') input: CreateTransactionsInput
  ) {
    return this.transactionsService.bulkInsertTransactions(
      input.transactions
    );
  }
}
@Resolver(TransactionsConnection)
export class TransactionConnectionResolver {
  constructor(
    private readonly transactionsService: TransactionsService
  ) {}

  @ResolveField('count')
  count(
    @Parent() parent: TransactionsConnectionArgs
  ): Promise<number> {
    return this.transactionsService.countTransactions(
      parent
    );
  }

  @ResolveField('items')
  items(
    @Parent() parent: TransactionsConnectionArgs,
    @Args() args: TransactionsConnectionItemsArgs
  ): Promise<Transaction[]> {
    return this.transactionsService.findTransactions(
      parent,
      args
    );
  }
}
