import { RuleModel } from './rules.model';
import { TransactionModel } from './transactions.model';

enum AlertStatus {
  ACTIVE = 'ACTIVE',
  DONE = 'DONE',
}

export interface AlertModel {
  id: string;
  status: AlertStatus;

  rule: RuleModel;
  transations?: TransactionModel[];

  createdAt: Date;
  updatedAt?: Date;
}
