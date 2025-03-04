import { Injectable } from '@nestjs/common';
import { TransactionModel } from '@transaction-monitoring/server-interface';

@Injectable()
export class TransactionsService {
  //   constructor() {}

  getTransactionById(id: string): TransactionModel {
    return {
      id,
    };
  }
}
