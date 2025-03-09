import { Test, TestingModule } from '@nestjs/testing';
import {
  AlertsDbService,
  ScenariosDbService,
  TransactionsDbService,
} from '@transaction-monitoring/db-driver';
import * as externalMethod from '@transaction-monitoring/interface';

import { ApplyScenarioOnAggregateTransactionsRule } from './applyScenarioOnAggregateTransactions.rule';

jest.mock('@transaction-monitoring/interface');
jest.mock('@transaction-monitoring/db-driver');
jest.mock('@transaction-monitoring/interface');

describe('ApplyScenarioOnAggregateTransactionsRule', () => {
  let service: ApplyScenarioOnAggregateTransactionsRule;
  let scenariosDbService: ScenariosDbService;
  let alertsDbService: AlertsDbService;
  let transactionsDbService: TransactionsDbService;

  beforeEach(async () => {
    const module: TestingModule =
      await Test.createTestingModule({
        providers: [
          ApplyScenarioOnAggregateTransactionsRule,
          ScenariosDbService,
          AlertsDbService,
          TransactionsDbService,
        ],
      }).compile();

    service =
      module.get<ApplyScenarioOnAggregateTransactionsRule>(
        ApplyScenarioOnAggregateTransactionsRule
      );
    scenariosDbService = module.get<ScenariosDbService>(
      ScenariosDbService
    );
    alertsDbService =
      module.get<AlertsDbService>(AlertsDbService);
    transactionsDbService =
      module.get<TransactionsDbService>(
        TransactionsDbService
      );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should apply scenario on aggregate transactions', async () => {
    const lastWeek = new Date();
    lastWeek.setDate(lastWeek.getDate() - 7);
    const mockAggregatePrismaQuery = {
      _sum: {
        amount: true,
      },
      where: {
        AND: [
          { amount: { gt: 1000 } },
          { createdAt: { gt: lastWeek.toISOString() } },
        ],
      },
    };

    const mockJsonLogicOnlyAmountQuery = {
      '>': [{ var: 'amount' }, 1000],
    };

    const jsonLogicToPrismaAggregateSpy = jest
      .spyOn(externalMethod, 'jsonLogicToPrismaAggregate')
      //@ts-expect-error true is a boolean but not for TS and Prisma
      .mockImplementation(() => mockAggregatePrismaQuery);

    const retrieveOnlyAmountFilterSpy = jest
      .spyOn(externalMethod, 'retrieveOnlyAmountFilter')
      .mockImplementation(
        () => mockJsonLogicOnlyAmountQuery
      );

    const mockScenarios = [
      {
        id: 'scenario1',
        isEnabled: true,
        scenarioRules: [
          {
            rule: {
              id: 'rule1',
              isAggregate: true,
              jsonLogic: {
                and: [
                  { '>': [{ var: 'amount' }, 1000] },
                  {
                    '>': [
                      { var: 'createdAt' },
                      lastWeek.toISOString(),
                    ],
                  },
                ],
              },
            },
          },
        ],
      },
    ];

    const mockAggregateResult = {
      _sum: {
        amount: 1500,
      },
    };

    scenariosDbService.getScenarios = jest
      .fn()
      .mockResolvedValue(mockScenarios);
    transactionsDbService.aggregateTransaction = jest
      .fn()
      .mockResolvedValue(mockAggregateResult);
    alertsDbService.createAlert = jest.fn();

    await service.ruleApplyScenarioOnAggregateTransactions_v1();

    expect(
      scenariosDbService.getScenarios
    ).toHaveBeenCalled();

    expect(
      jsonLogicToPrismaAggregateSpy
    ).toHaveBeenCalled();
    expect(retrieveOnlyAmountFilterSpy).toHaveBeenCalled();
    expect(
      transactionsDbService.aggregateTransaction
    ).toHaveBeenCalledWith(mockAggregatePrismaQuery);
    expect(
      alertsDbService.createAlert
    ).toHaveBeenCalledWith({
      scenarioId: 'scenario1',
      ruleId: 'rule1',
    });
  });
});
