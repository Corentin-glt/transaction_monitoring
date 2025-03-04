import { Injectable } from '@nestjs/common';
import { Prisma, Scenario } from '@prisma/client';

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

type CreateScenarioParams = Omit<
  CreateEntityParams<Prisma.ScenarioCreateInput>,
  'rules'
>;

type UpdateScenarioParams = Omit<
  UpdateEntityParams<Prisma.ScenarioUpdateInput>,
  'rules'
>;

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
      },
    });
  }

  async updateScenario(
    id: string,
    data: UpdateScenarioParams
  ): Promise<Scenario> {
    return this.prismaService.scenario.update({
      where: { id },
      data,
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
}
