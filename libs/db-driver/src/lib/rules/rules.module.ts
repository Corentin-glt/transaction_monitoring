import { Module } from '@nestjs/common';

import { RulesDbService } from './rules.service';
import { PrismaModule } from '../prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [RulesDbService],
  exports: [RulesDbService],
})
export class RulesDbModule {}
