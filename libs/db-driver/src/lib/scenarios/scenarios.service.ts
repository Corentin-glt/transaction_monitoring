import { Injectable } from '@nestjs/common';
import { Prisma, Rule, Scenario } from '@prisma/client';

import {
  CreateEntityParams,
  PrismaService,
  UpdateEntityParams,
} from '../prisma.service';

type SortingOptions =
  Prisma.ScenarioOrderByWithRelationInput;

interface GetScenariosParams {
  ids?: string[];
}

interface GetScenariosOptions {
  limit?: number;
  offset?: number;
  sorting?: SortingOptions;
}

interface CreateScenarioParams
  extends Omit<
    CreateEntityParams<Prisma.ScenarioCreateInput>,
    'scenarioRules' | 'alerts'
  > {
  ruleIds: string[];
}

interface UpdateScenarioParams
  extends Omit<
    UpdateEntityParams<Prisma.ScenarioUpdateInput>,
    'scenarioRules' | 'alerts'
  > {
  ruleIds?: string[];
}

export type ScenarioEntity = Scenario;

@Injectable()
export class ScenariosDbService {
  constructor(
    private readonly prismaService: PrismaService
  ) {}

  #buildWhereParams(
    params: GetScenariosParams
  ): Prisma.ScenarioWhereInput {
    return {
      id: { in: params.ids },
    };
  }

  #buildOrderedBy(
    params: SortingOptions
  ): Array<Prisma.ScenarioOrderByWithRelationInput> {
    return Object.entries(params).map(([key, value]) => {
      return {
        [`${key}`]: value,
      };
    });
  }

  async createScenario(
    data: CreateScenarioParams
  ): Promise<Scenario> {
    return this.prismaService.scenario.create({
      data: {
        name: data.name,
        isEnabled: data.isEnabled,
        scenarioRules: {
          createMany: {
            data: data.ruleIds.map((id) => ({
              ruleId: id,
            })),
          },
        },
      },
    });
  }

  async updateScenario(
    id: string,
    data: UpdateScenarioParams
  ): Promise<Scenario> {
    return this.prismaService.scenario.update({
      where: { id },
      data: {
        name: data.name,
        isEnabled: data.isEnabled,
        scenarioRules: data.ruleIds
          ? {
              deleteMany: {},
              createMany: {
                data: data.ruleIds.map((id) => ({
                  ruleId: id,
                })),
              },
            }
          : undefined,
      },
    });
  }

  async getScenarioById(
    id: string
  ): Promise<Scenario | null> {
    return this.prismaService.scenario.findUnique({
      where: {
        id,
      },
    });
  }

  async getScenarios(
    params: GetScenariosParams,
    options?: GetScenariosOptions
  ): Promise<Scenario[]> {
    return this.prismaService.scenario.findMany({
      where: this.#buildWhereParams(params),
      orderBy:
        options?.sorting &&
        this.#buildOrderedBy(options.sorting),
      take: options?.limit || undefined,
      skip: options?.offset || undefined,
    });
  }

  async getCountScenarios(
    params: GetScenariosParams
  ): Promise<number> {
    return this.prismaService.scenario.count({
      where: this.#buildWhereParams(params),
    });
  }

  async getScenarioRules(
    id: string
  ): Promise<Rule[] | null> {
    const scenarioRules = await this.prismaService.scenario
      .findUnique({ where: { id } })
      .scenarioRules({ select: { rule: true } });

    return scenarioRules?.map((s) => s.rule) || null;
  }

  async deleteScenario(id: string): Promise<Scenario> {
    return this.prismaService.scenario.delete({
      where: { id },
    });
  }
}
