import { Module } from '@nestjs/common';

import { ScenariosDbService } from './scenarios.service';
import { PrismaModule } from '../prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [ScenariosDbService],
  exports: [ScenariosDbService],
})
export class ScenariosDbModule {}
