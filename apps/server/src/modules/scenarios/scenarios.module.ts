import { Module } from '@nestjs/common';
import { ScenariosDbModule } from '@transaction-monitoring/db-driver';

import {
  ScenarioConnectionResolver,
  ScenariosResolver,
} from './scenarios.resolver';
import { ScenariosService } from './scenarios.service';

@Module({
  imports: [ScenariosDbModule],
  providers: [
    ScenariosResolver,
    ScenarioConnectionResolver,
    ScenariosService,
  ],
})
export class ScenariosModule {}
