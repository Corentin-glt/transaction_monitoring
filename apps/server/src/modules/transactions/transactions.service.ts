import { Injectable } from '@nestjs/common';
import {
  TransactionEntity,
  TransactionsDbService,
} from '@transaction-monitoring/db-driver';
import {
  Currency,
  Sorting,
  TransactionModel,
} from '@transaction-monitoring/interface';

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
    private readonly transactionsDbService: TransactionsDbService
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
    //TODO: create a RULE in order to check the scenarios and their rules
    // before creating a new transaction. Then attach their alert
    const transaction =
      await this.transactionsDbService.createTransaction(
        params
      );
    return this.#buildFormat(transaction);
  }

  async bulkInsertTransactions(
    params: CreateTransactionParams[]
  ): Promise<{ success: true }> {
    //TODO: create a RULE in order to check the scenarios and their rules
    // before creating a new transaction. Then attach their alert
    return this.transactionsDbService.bulkInsertTransactions(
      params
    );
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
}
