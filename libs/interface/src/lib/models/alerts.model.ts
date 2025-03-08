import { AlertStatus } from '../enums';
import { RuleModel } from './rules.model';
import { ScenarioModel } from './scenarios.model';
import { TransactionModel } from './transactions.model';

export interface AlertModel {
  id: string;
  status: AlertStatus;

  scenario: ScenarioModel;
  rule: RuleModel;
  transations?: TransactionModel[];

  createdAt: Date;
  updatedAt?: Date;
}
