import { Injectable } from '@nestjs/common';
import {
  Alert,
  AlertStatusEnum,
  Prisma,
  Rule,
  Scenario,
  Transaction,
} from '@prisma/client';

import {
  CreateEntityParams,
  PrismaService,
} from '../prisma.service';

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
  scenarioId: string;
  ruleId: string;
  transactionId?: string;
}

export interface AlertEntity
  extends Omit<Alert, 'ruleId' | 'scenarioId'> {
  rule: Rule;
  scenario: Scenario;
}

interface UpdateAlertParams {
  status: AlertStatusEnum;
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
  ): Promise<AlertEntity> {
    return this.prismaService.alert.create({
      data: {
        transactionAlerts: data.transactionId
          ? {
              create: {
                transactionId: data.transactionId,
              },
            }
          : undefined,
        scenario: {
          connect: {
            id: data.scenarioId,
          },
        },
        rule: {
          connect: {
            id: data.ruleId,
          },
        },
      },
      include: {
        rule: true,
        scenario: true,
      },
    });
  }

  async updateAlert(
    id: string,
    data: UpdateAlertParams
  ): Promise<AlertEntity> {
    return this.prismaService.alert.update({
      where: { id },
      data,
      include: {
        rule: true,
        scenario: true,
      },
    });
  }

  async getAlertById(
    id: string
  ): Promise<AlertEntity | null> {
    return this.prismaService.alert.findUnique({
      where: {
        id,
      },
      include: {
        rule: true,
        scenario: true,
      },
    });
  }

  async getAlerts(
    params: GetAlertsParams,
    options?: GetAlertsOptions
  ): Promise<AlertEntity[]> {
    return this.prismaService.alert.findMany({
      where: this.#buildWhereParams(params),
      orderBy:
        options?.sorting &&
        this.#buildOrderedBy(options.sorting),
      include: {
        rule: true,
        scenario: true,
      },
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
}
