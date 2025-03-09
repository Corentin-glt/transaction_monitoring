import { Injectable } from '@nestjs/common';
import {
  AlertsDbService,
  ScenariosDbService,
  TransactionsDbService,
} from '@transaction-monitoring/db-driver';
import {
  jsonLogicToPrismaAggregate,
  retrieveOnlyAmountFilter,
} from '@transaction-monitoring/interface';
import { apply } from 'json-logic-js';

@Injectable()
export class ApplyScenarioOnAggregateTransactionsRule {
  constructor(
    private readonly scenariosDbService: ScenariosDbService,
    private readonly alertsDbService: AlertsDbService,
    private readonly transactionsDbService: TransactionsDbService
  ) {}

  async ruleApplyScenarioOnAggregateTransactions_v1() {
    const scenarios =
      await this.scenariosDbService.getScenarios(
        {
          isEnabled: true,
        },
        {
          include: {
            scenarioRules: {
              include: {
                rule: true,
              },
            },
          },
        }
      );

    for (const scenario of scenarios) {
      for (const scenarioRule of scenario.scenarioRules) {
        const rule = scenarioRule.rule;
        const ruleLogic = rule.jsonLogic as any;
        if (!rule.isAggregate) {
          continue;
        }

        const prismaQuery =
          jsonLogicToPrismaAggregate(ruleLogic);
        const amountQuery =
          retrieveOnlyAmountFilter(ruleLogic);

        const result =
          await this.transactionsDbService.aggregateTransaction(
            prismaQuery
          );

        if (!result) {
          continue;
        }

        const amount = result._sum.amount;
        const isRespecting = apply(amountQuery, { amount });

        if (isRespecting) {
          await this.alertsDbService.createAlert({
            scenarioId: scenario.id,
            ruleId: rule.id,
          });
        }
      }
    }
  }
}
