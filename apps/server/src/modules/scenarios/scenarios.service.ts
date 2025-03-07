import { Injectable } from '@nestjs/common';
import {
  ScenarioEntity,
  ScenariosDbService,
} from '@transaction-monitoring/db-driver';
import {
  removeDuplicates,
  RuleModel,
  ScenarioModel,
  Sorting,
} from '@transaction-monitoring/interface';

interface CreateScenarioParams {
  name: string;
  isEnabled: boolean;
  ruleIds: string[];
}

interface UpdateScenarioParams {
  name?: string;
  ruleIds?: string[];
  isEnabled?: boolean;
}

interface FindScenariosParams {
  ids?: string[];
  name?: string;
}

interface FindOptions {
  limit?: number;
  offset?: number;
  sorting?: SortingOptions;
}

interface SortingOptions {
  createdAt?: Sorting;
}

@Injectable()
export class ScenariosService {
  constructor(
    private readonly scenariosDbService: ScenariosDbService
  ) {}

  #buildFormat(scenario: ScenarioEntity): ScenarioModel {
    return scenario;
  }

  async getScenarioById(
    id: string
  ): Promise<ScenarioModel> {
    const scenario =
      await this.scenariosDbService.getScenarioById(id);
    return this.#buildFormat(scenario);
  }

  async createScenario(params: CreateScenarioParams) {
    const scenario =
      await this.scenariosDbService.createScenario({
        ...params,
        ruleIds: params.ruleIds
          ? removeDuplicates(params.ruleIds)
          : undefined,
      });
    return this.#buildFormat(scenario);
  }

  async updateScenario(
    id: string,
    params: UpdateScenarioParams
  ) {
    const scenario =
      await this.scenariosDbService.updateScenario(id, {
        ...params,
        ruleIds: params.ruleIds
          ? removeDuplicates(params.ruleIds)
          : undefined,
      });
    return this.#buildFormat(scenario);
  }

  async findScenarios(
    params: FindScenariosParams,
    options?: FindOptions
  ) {
    const scenarios =
      await this.scenariosDbService.getScenarios(
        params,
        options
      );

    return scenarios.map((t) => this.#buildFormat(t));
  }

  async countScenarios(params: FindScenariosParams) {
    return this.scenariosDbService.getCountScenarios(
      params
    );
  }

  async getScenarioRules(id: string): Promise<RuleModel[]> {
    return this.scenariosDbService.getScenarioRules(id);
  }

  async deleteScenario(id: string): Promise<ScenarioModel> {
    const scenario =
      await this.scenariosDbService.deleteScenario(id);
    return this.#buildFormat(scenario);
  }
}
