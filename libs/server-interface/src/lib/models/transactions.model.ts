import { AlertModel } from './alerts.model';

enum CurrencyEnum {
  DOLLARS = 'DOLLARS',
  EUROS = 'EUROS',
}

export interface TransactionModel {
  id: string;
  sourceAccount: string;
  targetAccount: string;
  externalId: string;
  amount: number;
  currency: CurrencyEnum;
  metadata: JSON;

  alerts?: AlertModel[];

  createdAt: Date;
  updatedAt?: Date;
}
