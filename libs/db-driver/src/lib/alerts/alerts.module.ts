import { Module } from '@nestjs/common';

import { AlertsDbService } from './alerts.service';
import { PrismaModule } from '../prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [AlertsDbService],
  exports: [AlertsDbService],
})
export class AlertsDbModule {}
