import { Module } from '@nestjs/common';
import { RulesDbModule } from '@transaction-monitoring/db-driver';

import {
  RuleConnectionResolver,
  RulesResolver,
} from './rules.resolver';
import { RulesService } from './rules.service';

@Module({
  imports: [RulesDbModule],
  providers: [
    RulesResolver,
    RuleConnectionResolver,
    RulesService,
  ],
})
export class RulesModule {}
