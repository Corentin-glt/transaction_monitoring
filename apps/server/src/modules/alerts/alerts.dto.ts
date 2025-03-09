import {
  ArgsType,
  Field,
  ID,
  InputType,
  Int,
  ObjectType,
} from '@nestjs/graphql';
import {
  AlertStatusScalar,
  SortingEnum,
} from '@transaction-monitoring/graphql-interface';
import {
  AlertStatus,
  Sorting,
} from '@transaction-monitoring/interface';
import { IsNumber, Min } from 'class-validator';

import { Rule } from '../rules/rules.dto';
import { Scenario } from '../scenarios/scenarios.dto';
import { Transaction } from '../transactions/transactions.dto';

@ObjectType()
export class Alert {
  @Field(() => ID)
  public id: string;

  @Field(() => AlertStatusScalar)
  public status: AlertStatus;

  @Field(() => Scenario)
  public scenario: Scenario;

  @Field(() => Rule)
  public rule: Rule;

  @Field(() => [Transaction], { nullable: true })
  public transactions?: Transaction[];

  @Field(() => Date)
  public createdAt: Date;
}

@ObjectType()
export class AlertsCreatedSuccess {
  @Field(() => String)
  message: string;
}

@InputType()
export class UpdateAlertInput {
  @Field(() => AlertStatusScalar)
  public status: AlertStatus;
}

// RULES CONNECTION
@ObjectType()
export class AlertsConnection {
  @Field(() => [Alert])
  items: Alert[];

  @Field(() => Int)
  count: number;
}

@ArgsType()
export class AlertsConnectionArgs {
  @Field(() => [ID], { nullable: true })
  public ids?: string[];
}

@InputType()
export class AlertsConnectionSortingInput {
  @Field(() => SortingEnum, { nullable: true })
  public createdAt?: Sorting;
}

@ArgsType()
export class AlertsConnectionItemsArgs {
  @Field(() => Int, { nullable: true })
  @IsNumber()
  @Min(1)
  public limit?: number;

  @Field(() => Int, { nullable: true })
  @IsNumber()
  @Min(0)
  public offset?: number;

  @Field(() => AlertsConnectionSortingInput, {
    nullable: true,
  })
  public sorting?: AlertsConnectionSortingInput;
}
