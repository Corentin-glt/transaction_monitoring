import { ScenarioModel } from './scenarios.model';
import { TransactionModel } from './transactions.model';

enum AlertStatus {
  ACTIVE = 'ACTIVE',
  DONE = 'DONE',
}

export interface AlertModel {
  id: string;
  status: AlertStatus;

  scenario: ScenarioModel;
  transations?: TransactionModel[];

  createdAt: Date;
  updatedAt?: Date;
}
