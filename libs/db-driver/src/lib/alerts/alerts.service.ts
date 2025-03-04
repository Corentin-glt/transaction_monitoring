import { Injectable } from '@nestjs/common';
import {
  Alert,
  Prisma,
  Rule,
  Transaction,
} from '@prisma/client';

import { PrismaService } from '../prisma.service';

type SortingOptions = Prisma.AlertOrderByWithRelationInput;

interface GetAlertsParams {
  ids?: string[];
}

interface GetAlertsOptions {
  limit?: number;
  offset?: number;
  sorting?: SortingOptions;
}

interface CreateAlertParams {
  ruleId: string;
  transactionId: string;
}

@Injectable()
export class AlertsDbService {
  constructor(
    private readonly prismaService: PrismaService
  ) {}

  #buildWhereParams(
    params: GetAlertsParams
  ): Prisma.AlertWhereInput {
    return {
      id: { in: params.ids },
    };
  }

  #buildOrderedBy(
    params: SortingOptions
  ): Array<Prisma.AlertOrderByWithRelationInput> {
    return Object.entries(params).map(([key, value]) => {
      return {
        [`${key}`]: value,
      };
    });
  }

  async createAlert(
    data: CreateAlertParams
  ): Promise<Alert> {
    return this.prismaService.alert.create({
      data: {
        transactionAlerts: {
          create: {
            transactionId: data.transactionId,
          },
        },
        rule: {
          connect: {
            id: data.ruleId,
          },
        },
      },
    });
  }

  async updateAlert(
    id: string,
    data: Prisma.AlertUpdateInput
  ): Promise<Alert> {
    return this.prismaService.alert.update({
      where: { id },
      data,
    });
  }

  async getAlertById(id: string): Promise<Alert | null> {
    return this.prismaService.alert.findUnique({
      where: {
        id,
      },
    });
  }

  async getAlerts(
    params: GetAlertsParams,
    options?: GetAlertsOptions
  ): Promise<Alert[]> {
    return this.prismaService.alert.findMany({
      where: this.#buildWhereParams(params),
      orderBy:
        options?.sorting &&
        this.#buildOrderedBy(options.sorting),
      take: options?.limit || undefined,
      skip: options?.offset || undefined,
    });
  }

  async getCountAlerts(
    params: GetAlertsParams
  ): Promise<number> {
    return this.prismaService.alert.count({
      where: this.#buildWhereParams(params),
    });
  }

  async getAlertTransactions(
    id: string
  ): Promise<Transaction[]> {
    const alertAlerts =
      await this.prismaService.transactionAlert.findMany({
        where: { alertId: id },
        select: { transaction: true },
      });

    return alertAlerts.map((t) => t.transaction);
  }

  async getAlertRule(id: string): Promise<Rule> {
    const rule = await this.prismaService.alert
      .findUnique({ where: { id } })
      .rule();

    if (!rule) {
      throw new Error(
        'Impossible to find the Rule attached to this Alert'
      );
    }

    return rule;
  }
}
