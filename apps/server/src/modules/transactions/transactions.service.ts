import { InjectQueue } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import {
  TransactionEntity,
  TransactionsDbService,
} from '@transaction-monitoring/db-driver';
import {
  AlertModel,
  Currency,
  Sorting,
  TransactionModel,
} from '@transaction-monitoring/interface';
import { Queue } from 'bullmq';

import { ApplyScenarioOnAggregateTransactionsRule } from '../../rules/applyScenarioOnAggregateTransactions.rule';
import { ApplyScenarioOnBulkTransactionsRule } from '../../rules/applyScenarioOnBulkTransactions.rule';

interface CreateTransactionParams {
  sourceAccount: string;
  targetAccount: string;
  externalId: string;
  amount: number;
  currency?: Currency;
  metadata?: any;
}

interface FindTransactionsParams {
  ids?: string[];
  sourceAccount?: string;
  targetAccount?: string;
  externalIds?: string[];
  amount?: number;
  currency?: Currency;
}

interface FindOptions {
  limit?: number;
  offset?: number;
  sorting?: SortingOptions;
}

interface SortingOptions {
  createdAt?: Sorting;
  amount?: Sorting;
}

@Injectable()
export class TransactionsService {
  constructor(
    private readonly transactionsDbService: TransactionsDbService,
    private readonly applyScenariosOnBulkTransactionRules: ApplyScenarioOnBulkTransactionsRule,
    private readonly applyScenariosOnAggregateTransactionRules: ApplyScenarioOnAggregateTransactionsRule,
    @InjectQueue('transactions')
    private readonly transactionQueue: Queue
  ) {}

  #buildFormat(
    transaction: TransactionEntity
  ): TransactionModel {
    return transaction;
  }

  async getTransactionById(
    id: string
  ): Promise<TransactionModel> {
    const transaction =
      await this.transactionsDbService.getTransactionById(
        id
      );
    return this.#buildFormat(transaction);
  }

  async createTransaction(params: CreateTransactionParams) {
    const transactionsWithAlertIds =
      await this.applyScenariosOnBulkTransactionRules.ruleApplyScenarioOnBulkTransactions_v1(
        [params]
      );

    const transaction =
      await this.transactionsDbService.createTransaction(
        transactionsWithAlertIds[0]
      );

    await this.applyScenariosOnAggregateTransactionRules.ruleApplyScenarioOnAggregateTransactions_v1();

    return this.#buildFormat(transaction);
  }

  async bulkInsertTransactions(
    params: CreateTransactionParams[]
  ): Promise<{ message: string }> {
    await this.transactionQueue.add('bulk', params, {
      attempts: 3,
      removeOnComplete: true,
    });

    return { message: 'Transaction processing started' };
  }

  async findTransactions(
    params: FindTransactionsParams,
    options?: FindOptions
  ) {
    const transactions =
      await this.transactionsDbService.getTransactions(
        params,
        options
      );

    return transactions.map((t) => this.#buildFormat(t));
  }

  async countTransactions(params: FindTransactionsParams) {
    return this.transactionsDbService.getCountTransactions(
      params
    );
  }

  async getTransactionAlerts(
    id: string
  ): Promise<AlertModel[]> {
    return this.transactionsDbService.getTransactionAlerts(
      id
    );
  }
}
