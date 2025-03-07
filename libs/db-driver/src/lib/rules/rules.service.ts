import { Injectable } from '@nestjs/common';
import { Prisma, Rule, Scenario } from '@prisma/client';

import {
  CreateEntityParams,
  PrismaService,
  UpdateEntityParams,
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
  scenarioIds?: string[];
}

interface UpdateRuleParams
  extends Omit<
    UpdateEntityParams<Prisma.RuleUpdateInput>,
    'jsonLogic'
  > {
  scenarioIds?: string[];
}

export type RuleEntity = Rule;

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
        isAggregate: data.isAggregate,
        scenarioRules: data.scenarioIds
          ? {
              createMany: {
                data: data.scenarioIds.map((s) => ({
                  scenarioId: s,
                })),
              },
            }
          : undefined,
      },
    });
  }

  async updateRule(
    id: string,
    data: UpdateRuleParams
  ): Promise<Rule> {
    return this.prismaService.rule.update({
      where: { id },
      data: {
        name: data.name,
        scenarioRules: data.scenarioIds
          ? {
              deleteMany: {},
              createMany: {
                data: data.scenarioIds.map((s) => ({
                  scenarioId: s,
                })),
              },
            }
          : undefined,
      },
    });
  }

  async getRuleById(id: string): Promise<Rule | null> {
    return this.prismaService.rule.findUnique({
      where: {
        id,
      },
    });
  }

  async deleteRule(id: string): Promise<Rule> {
    return this.prismaService.rule.delete({
      where: { id },
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

  async getRuleScenarios(
    id: string
  ): Promise<Scenario[] | null> {
    const scenarioRules = await this.prismaService.rule
      .findUnique({ where: { id } })
      .scenarioRules({ select: { scenario: true } });

    return scenarioRules?.map((s) => s.scenario) || null;
  }
}
