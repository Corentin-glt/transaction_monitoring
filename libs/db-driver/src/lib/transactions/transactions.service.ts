import { Injectable } from '@nestjs/common';
import {
  Alert,
  CurrencyEnum,
  Prisma,
  Transaction,
} from '@prisma/client';
import { chunk } from 'lodash';

import { AlertEntity } from '../alerts/alerts.service';
import {
  CreateEntityParams,
  PrismaService,
  UpdateEntityParams,
} from '../prisma.service';

type SortingOptions =
  Prisma.TransactionOrderByWithRelationInput;

interface GetTransactionsParams {
  ids?: string[];
  sourceAccount?: string;
  targetAccount?: string;
  externalIds?: string[];
  amount?: number;
  currency?: CurrencyEnum;
}

interface GetTransactionsOptions {
  limit?: number;
  offset?: number;
  sorting?: SortingOptions;
}

interface CreateTransactionParams
  extends Omit<
    CreateEntityParams<Prisma.TransactionCreateInput>,
    'transactionAlerts'
  > {
  alertIds?: string[];
}

type UpdateTransactionParams = Omit<
  UpdateEntityParams<Prisma.TransactionUpdateInput>,
  'transactionAlerts'
>;

export type TransactionEntity = Transaction;

const CHUNK_SIZE = 500;

@Injectable()
export class TransactionsDbService {
  constructor(
    private readonly prismaService: PrismaService
  ) {}

  #buildWhereParams(
    params: GetTransactionsParams
  ): Prisma.TransactionWhereInput {
    return {
      id: { in: params.ids },
      externalId: { in: params.externalIds },
    };
  }

  #buildOrderedBy(
    params: SortingOptions
  ): Array<Prisma.TransactionOrderByWithRelationInput> {
    return Object.entries(params).map(([key, value]) => {
      return {
        [`${key}`]: value,
      };
    });
  }

  async createTransaction(
    data: CreateTransactionParams
  ): Promise<Transaction> {
    return this.prismaService.transaction.create({
      data: {
        sourceAccount: data.sourceAccount,
        targetAccount: data.targetAccount,
        externalId: data.externalId,
        amount: data.amount,
        currency: data.currency,
        metadata: data.metadata,
        transactionAlerts: data.alertIds && {
          createMany: {
            data: data.alertIds.map((alertId) => ({
              alertId,
            })),
          },
        },
      },
    });
  }

  async bulkInsertTransactions(
    data: CreateTransactionParams[]
  ): Promise<{ success: true }> {
    // Divides the transactions into manageable chunks
    // to prevent overwhelming the database with large inserts.
    const transactionDataChunks = chunk(data, CHUNK_SIZE);

    try {
      // Ensures that both the insertion of transactions
      // and their associated alerts are generated.
      await this.prismaService.$transaction(async () => {
        for (const batch of transactionDataChunks) {
          const insertedTransactions =
            await this.prismaService.transaction.createManyAndReturn(
              {
                data: batch.map(
                  ({ alertIds, ...data }) => data
                ),
              }
            );

          // Associates each transaction with its corresponding alertIds
          // to create the transactionAlert entries.
          const transactionAlerts =
            insertedTransactions.flatMap(
              (transaction, index) => {
                const alertIds =
                  batch[index].alertIds || [];

                return alertIds.map((alertId) => ({
                  transactionId: transaction.id,
                  alertId,
                }));
              }
            );

          if (transactionAlerts.length > 0) {
            await this.prismaService.transactionAlert.createMany(
              {
                data: transactionAlerts,
              }
            );
          }
        }
      });

      return { success: true };
    } catch (error) {
      console.error('Bulk insert failed:', error);
      throw new Error('Bulk insert failed');
    }
  }

  async updateTransaction(
    id: string,
    data: UpdateTransactionParams
  ): Promise<Transaction> {
    return this.prismaService.transaction.update({
      where: { id },
      data,
    });
  }

  async getTransactionById(
    id: string
  ): Promise<Transaction | null> {
    return this.prismaService.transaction.findUnique({
      where: {
        id,
      },
    });
  }

  async getTransactions(
    params: GetTransactionsParams,
    options?: GetTransactionsOptions
  ): Promise<Transaction[]> {
    return this.prismaService.transaction.findMany({
      where: this.#buildWhereParams(params),
      orderBy:
        options?.sorting &&
        this.#buildOrderedBy(options.sorting),
      take: options?.limit || undefined,
      skip: options?.offset || undefined,
    });
  }

  async getCountTransactions(
    params: GetTransactionsParams
  ): Promise<number> {
    return this.prismaService.transaction.count({
      where: this.#buildWhereParams(params),
    });
  }

  async getTransactionAlerts(
    id: string
  ): Promise<AlertEntity[]> {
    const transactionAlerts =
      await this.prismaService.transactionAlert.findMany({
        where: { transactionId: id },
        select: {
          alert: {
            include: {
              scenario: true,
              rule: true,
            },
          },
        },
      });

    return transactionAlerts.map((t) => t.alert);
  }

  async aggregateTransaction(
    params: Prisma.TransactionAggregateArgs
  ) {
    return this.prismaService.transaction.aggregate(params);
  }
}
