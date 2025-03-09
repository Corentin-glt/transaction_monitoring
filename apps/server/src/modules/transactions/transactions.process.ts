import { Processor, WorkerHost } from '@nestjs/bullmq';
import { TransactionsDbService } from '@transaction-monitoring/db-driver';
import { Job } from 'bullmq';

import { ApplyScenarioOnAggregateTransactionsRule } from '../../rules/applyScenarioOnAggregateTransactions.rule';
import { ApplyScenarioOnBulkTransactionsRule } from '../../rules/applyScenarioOnBulkTransactions.rule';

@Processor('transactions')
export class transcriptionsConsumer extends WorkerHost {
  constructor(
    private readonly applyScenariosOnBulkTransactionRules: ApplyScenarioOnBulkTransactionsRule,
    private readonly applyScenariosOnAggregateTransactionRules: ApplyScenarioOnAggregateTransactionsRule,
    private readonly transactionsDbService: TransactionsDbService
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

        await this.applyScenariosOnAggregateTransactionRules.ruleApplyScenarioOnAggregateTransactions_v1();

        console.log(
          `Bulk Transaction processed successfully.`
        );

        return {};
      }
    }
  }
}
