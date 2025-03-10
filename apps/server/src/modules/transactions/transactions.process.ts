import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Inject } from '@nestjs/common';
import { TransactionsDbService } from '@transaction-monitoring/db-driver';
import { Job } from 'bullmq';
import { RedisPubSub } from 'graphql-redis-subscriptions';

import { PUB_SUB } from '../../pubsub/pubsub.module';
import { ApplyScenarioOnAggregateTransactionsRule } from '../../rules/applyScenarioOnAggregateTransactions.rule';
import { ApplyScenarioOnBulkTransactionsRule } from '../../rules/applyScenarioOnBulkTransactions.rule';

@Processor('transactions')
export class transcriptionsConsumer extends WorkerHost {
  constructor(
    private readonly applyScenariosOnBulkTransactionRules: ApplyScenarioOnBulkTransactionsRule,
    private readonly applyScenariosOnAggregateTransactionRules: ApplyScenarioOnAggregateTransactionsRule,
    private readonly transactionsDbService: TransactionsDbService,
    @Inject(PUB_SUB)
    private readonly pubSubService: RedisPubSub
  ) {
    super();
  }
  async process(job: Job<any, any, string>): Promise<any> {
    switch (job.name) {
      case 'bulk': {
        console.log(
          `Processing bulk transactions: ${job.id}`
        );
        const transactionsWithAlertIds =
          await this.applyScenariosOnBulkTransactionRules.ruleApplyScenarioOnBulkTransactions_v1(
            job.data
          );

        await this.transactionsDbService.bulkInsertTransactions(
          transactionsWithAlertIds
        );

        await this.pubSubService.publish(
          'bulkTransactionsSuccess',
          {
            message:
              'Bulk transactions has been applied with success',
          }
        );

        await this.applyScenariosOnAggregateTransactionRules.ruleApplyScenarioOnAggregateTransactions_v1();

        await this.pubSubService.publish(
          'alertsCreatedSuccess',
          {
            message: 'Alerts has been created with success',
          }
        );

        console.log(
          `Bulk Transaction processed successfully.`
        );

        return;
      }
    }
  }
}
