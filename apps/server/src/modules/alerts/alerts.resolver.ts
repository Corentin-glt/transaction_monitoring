import { Inject } from '@nestjs/common';
import {
  Args,
  ID,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
  Subscription,
} from '@nestjs/graphql';
import { RedisPubSub } from 'graphql-redis-subscriptions';

import {
  Alert,
  AlertsConnection,
  AlertsConnectionArgs,
  AlertsConnectionItemsArgs,
  AlertsCreatedSuccess,
  UpdateAlertInput,
} from './alerts.dto';
import { AlertsService } from './alerts.service';
import { PUB_SUB } from '../../pubsub/pubsub.module';
import { Transaction } from '../transactions/transactions.dto';

@Resolver(() => Alert)
export class AlertsResolver {
  constructor(
    private readonly alertsService: AlertsService,
    @Inject(PUB_SUB)
    private readonly pubSubService: RedisPubSub
  ) {}

  @Query(() => Alert)
  async alert(
    @Args('id', { type: () => ID }) id: string
  ): Promise<Alert> {
    return this.alertsService.getAlertById(id);
  }

  @Query(() => AlertsConnection)
  public alertsConnection(
    @Args() args: AlertsConnectionArgs
  ) {
    return {
      ids: args.ids,
    };
  }

  @Mutation(() => Alert)
  async updateAlert(
    @Args('id', { type: () => ID }) id: string,
    @Args('input') input: UpdateAlertInput
  ) {
    return this.alertsService.updateAlert(id, input);
  }

  @ResolveField('transactions')
  transactions(
    @Parent() parent: Alert
  ): Promise<Transaction[]> {
    return this.alertsService.getAlertTransactions(
      parent.id
    );
  }

  @Subscription(() => AlertsCreatedSuccess)
  alertsCreatedSuccess() {
    return this.pubSubService.asyncIterator(
      'alertsCreatedSuccess'
    );
  }
}

@Resolver(AlertsConnection)
export class AlertConnectionResolver {
  constructor(
    private readonly alertsService: AlertsService
  ) {}

  @ResolveField('count')
  count(
    @Parent() parent: AlertsConnectionArgs
  ): Promise<number> {
    return this.alertsService.countAlerts(parent);
  }

  @ResolveField('items')
  items(
    @Parent() parent: AlertsConnectionArgs,
    @Args() args: AlertsConnectionItemsArgs
  ): Promise<Alert[]> {
    return this.alertsService.findAlerts(parent, args);
  }
}
