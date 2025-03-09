import { Test, TestingModule } from '@nestjs/testing';
import {
  AlertsDbService,
  ScenariosDbService,
} from '@transaction-monitoring/db-driver';
import { apply } from 'json-logic-js';

import { ApplyScenarioOnBulkTransactionsRule } from './applyScenarioOnBulkTransactions.rule';

jest.mock('@transaction-monitoring/db-driver');
jest.mock('json-logic-js', () => ({
  apply: jest.fn(),
}));

describe('ApplyScenarioOnBulkTransactionsRule', () => {
  let service: ApplyScenarioOnBulkTransactionsRule;
  let scenariosDbService: ScenariosDbService;
  let alertsDbService: AlertsDbService;

  beforeEach(async () => {
    const module: TestingModule =
      await Test.createTestingModule({
        providers: [
          ApplyScenarioOnBulkTransactionsRule,
          ScenariosDbService,
          AlertsDbService,
        ],
      }).compile();

    service =
      module.get<ApplyScenarioOnBulkTransactionsRule>(
        ApplyScenarioOnBulkTransactionsRule
      );
    scenariosDbService = module.get<ScenariosDbService>(
      ScenariosDbService
    );
    alertsDbService =
      module.get<AlertsDbService>(AlertsDbService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should apply scenario on bulk transactions', async () => {
    const mockScenarios = [
      {
        id: 'scenario1',
        isEnabled: true,
        scenarioRules: [
          {
            rule: {
              id: 'rule1',
              isAggregate: false,
              jsonLogic: { '>': [{ var: 'amount' }, 1000] },
            },
          },
        ],
      },
    ];

    const mockBulkTransactions = [
      {
        sourceAccount: 'account1',
        targetAccount: 'account2',
        externalId: 'ext1',
        amount: 1500,
        alertIds: [],
      },
      {
        sourceAccount: 'account3',
        targetAccount: 'account4',
        externalId: 'ext2',
        amount: 500,
        alertIds: [],
      },
    ];

    const mockAlert = {
      id: 'alert1',
    };

    scenariosDbService.getScenarios = jest
      .fn()
      .mockResolvedValue(mockScenarios);
    alertsDbService.createAlert = jest
      .fn()
      .mockResolvedValue(mockAlert);
    (apply as jest.Mock).mockImplementation(
      (ruleLogic, transaction) => {
        return transaction.amount > 1000;
      }
    );

    const result =
      await service.ruleApplyScenarioOnBulkTransactions_v1(
        mockBulkTransactions
      );

    expect(
      scenariosDbService.getScenarios
    ).toHaveBeenCalled();
    expect(apply).toHaveBeenCalled();
    expect(
      alertsDbService.createAlert
    ).toHaveBeenCalledWith({
      scenarioId: 'scenario1',
      ruleId: 'rule1',
    });
    expect(result[0].alertIds).toContain('alert1');
    expect(result[1].alertIds).not.toContain('alert1');
  });
});
