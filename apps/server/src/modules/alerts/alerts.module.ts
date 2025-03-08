import { Module } from '@nestjs/common';
import { AlertsDbModule } from '@transaction-monitoring/db-driver';

import {
  AlertConnectionResolver,
  AlertsResolver,
} from './alerts.resolver';
import { AlertsService } from './alerts.service';

@Module({
  imports: [AlertsDbModule],
  providers: [
    AlertsResolver,
    AlertConnectionResolver,
    AlertsService,
  ],
})
export class AlertsModule {}
