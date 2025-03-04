import { Injectable } from '@nestjs/common';
import { Alert, Prisma, Transaction } from '@prisma/client';

import {
  CreateEntityParams,
  PrismaService,
  UpdateEntityParams,
} from '../prisma.service';

type SortingOptions =
  Prisma.TransactionOrderByWithRelationInput;

interface GetTransactionsParams {
  ids?: string[];
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

  async getTransactionAlerts(id: string): Promise<Alert[]> {
    const transactionAlerts =
      await this.prismaService.transactionAlert.findMany({
        where: { transactionId: id },
        select: { alert: true },
      });

    return transactionAlerts.map((t) => t.alert);
  }
}
