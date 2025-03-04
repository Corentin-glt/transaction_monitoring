import { Module } from '@nestjs/common';

import { TransactionsDbService } from './transactions.service';
import { PrismaModule } from '../prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [TransactionsDbService],
  exports: [TransactionsDbService],
})
export class TransactionsDbModule {}
