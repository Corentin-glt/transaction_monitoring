import { AlertModel } from './alerts.model';
import { Currency } from '../enums/currency.enum';

export interface TransactionModel {
  id: string;
  sourceAccount: string;
  targetAccount: string;
  externalId: string;
  amount: number;
  currency: Currency;
  metadata?: any;

  alerts?: AlertModel[];

  createdAt: Date;
  updatedAt?: Date;
}
