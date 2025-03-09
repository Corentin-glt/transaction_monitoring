import { Inject, Injectable } from '@nestjs/common';
import {
  AlertEntity,
  AlertsDbService,
  ScenariosDbService,
} from '@transaction-monitoring/db-driver';
import { Currency } from '@transaction-monitoring/interface';
import { apply } from 'json-logic-js';

interface BulkTransaction {
  sourceAccount: string;
  targetAccount: string;
  externalId: string;
  amount: number;
  currency?: Currency;
  metadata?: any;
  alertIds?: string[];
}

@Injectable()
export class ApplyScenarioOnBulkTransactionsRule {
  constructor(
    private readonly scenariosDbService: ScenariosDbService,
    private readonly alertsDbService: AlertsDbService
  ) {}

  async ruleApplyScenarioOnBulkTransactions_v1(
    bulkTransactions: BulkTransaction[]
  ) {
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

        if (rule.isAggregate) {
          continue;
        }

        let newAlert: AlertEntity = undefined;

        for (const transaction of bulkTransactions) {
          const isTransactionHasAlertForThisRule = apply(
            ruleLogic,
            transaction
          );

          if (isTransactionHasAlertForThisRule) {
            if (!newAlert) {
              newAlert =
                await this.alertsDbService.createAlert({
                  scenarioId: scenario.id,
                  ruleId: rule.id,
                });
            }
            transaction.alertIds =
              transaction.alertIds || [];
            transaction.alertIds.push(newAlert.id);
          }
        }
      }
    }

    return bulkTransactions;
  }
}
