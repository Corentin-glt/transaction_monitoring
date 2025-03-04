import { Injectable } from '@nestjs/common';
import {
  Alert,
  Prisma,
  Rule,
  Scenario,
} from '@prisma/client';

import {
  CreateEntityParams,
  PrismaService,
} from '../prisma.service';

type SortingOptions = Prisma.RuleOrderByWithRelationInput;

interface GetRulesParams {
  ids?: string[];
}

interface GetRulesOptions {
  limit?: number;
  offset?: number;
  sorting?: SortingOptions;
}

interface CreateRuleParams
  extends Omit<
    CreateEntityParams<Prisma.RuleCreateInput>,
    'alerts' | 'scenario'
  > {
  scenarioId: string;
}

@Injectable()
export class RulesDbService {
  constructor(
    private readonly prismaService: PrismaService
  ) {}

  #buildWhereParams(
    params: GetRulesParams
  ): Prisma.RuleWhereInput {
    return {
      id: { in: params.ids },
    };
  }

  #buildOrderedBy(
    params: SortingOptions
  ): Array<Prisma.RuleOrderByWithRelationInput> {
    return Object.entries(params).map(([key, value]) => {
      return {
        [`${key}`]: value,
      };
    });
  }

  async createRule(data: CreateRuleParams): Promise<Rule> {
    return this.prismaService.rule.create({
      data: {
        name: data.name,
        jsonLogic: data.jsonLogic,
        scenario: {
          connect: {
            id: data.scenarioId,
          },
        },
      },
    });
  }

  async updateRule(
    id: string,
    data: Prisma.RuleUpdateInput
  ): Promise<Rule> {
    return this.prismaService.rule.update({
      where: { id },
      data,
    });
  }

  async getRuleById(id: string): Promise<Rule | null> {
    return this.prismaService.rule.findUnique({
      where: {
        id,
      },
    });
  }

  async getRules(
    params: GetRulesParams,
    options?: GetRulesOptions
  ): Promise<Rule[]> {
    return this.prismaService.rule.findMany({
      where: this.#buildWhereParams(params),
      orderBy:
        options?.sorting &&
        this.#buildOrderedBy(options.sorting),
      take: options?.limit || undefined,
      skip: options?.offset || undefined,
    });
  }

  async getCountRules(
    params: GetRulesParams
  ): Promise<number> {
    return this.prismaService.rule.count({
      where: this.#buildWhereParams(params),
    });
  }

  async getRuleAlerts(id: string): Promise<Alert[] | null> {
    return this.prismaService.rule
      .findUnique({ where: { id } })
      .alerts();
  }

  async getRuleScenario(id: string): Promise<Scenario> {
    const scenario = await this.prismaService.rule
      .findUnique({ where: { id } })
      .scenario();

    if (!scenario) {
      throw new Error(
        'Impossible to find the Scenario attached to this Rule'
      );
    }

    return scenario;
  }
}
