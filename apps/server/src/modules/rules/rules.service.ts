import { Injectable } from '@nestjs/common';
import {
  RuleEntity,
  RulesDbService,
} from '@transaction-monitoring/db-driver';
import {
  removeDuplicates,
  RuleModel,
  ScenarioModel,
  Sorting,
} from '@transaction-monitoring/interface';

interface CreateRuleParams {
  name: string;
  isAggregate: boolean;
  jsonLogic: any;
  scenarioIds?: string[];
}

interface UpdateRuleParams {
  name?: string;
  scenarioIds?: string[];
  isAggregate?: boolean;
  jsonLogic?: any;
}

interface FindRulesParams {
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
export class RulesService {
  constructor(
    private readonly rulesDbService: RulesDbService
  ) {}

  #buildFormat(rule: RuleEntity): RuleModel {
    return rule;
  }

  async getRuleById(id: string): Promise<RuleModel> {
    const rule = await this.rulesDbService.getRuleById(id);
    return this.#buildFormat(rule);
  }

  async createRule(params: CreateRuleParams) {
    const rule = await this.rulesDbService.createRule({
      ...params,
      scenarioIds: params.scenarioIds
        ? removeDuplicates(params.scenarioIds)
        : undefined,
    });
    return this.#buildFormat(rule);
  }

  async updateRule(id: string, params: UpdateRuleParams) {
    const rule = await this.rulesDbService.updateRule(id, {
      ...params,
      scenarioIds: params.scenarioIds
        ? removeDuplicates(params.scenarioIds)
        : undefined,
    });
    return this.#buildFormat(rule);
  }

  async findRules(
    params: FindRulesParams,
    options?: FindOptions
  ) {
    const rules = await this.rulesDbService.getRules(
      params,
      options
    );

    return rules.map((t) => this.#buildFormat(t));
  }

  async countRules(params: FindRulesParams) {
    return this.rulesDbService.getCountRules(params);
  }

  async getRuleScenarios(
    id: string
  ): Promise<ScenarioModel[]> {
    return this.rulesDbService.getRuleScenarios(id);
  }

  async deleteRule(id: string): Promise<RuleModel> {
    const rule = await this.rulesDbService.deleteRule(id);
    return this.#buildFormat(rule);
  }
}
