import {
  ArgsType,
  Field,
  ID,
  InputType,
  Int,
  ObjectType,
} from '@nestjs/graphql';
import { SortingEnum } from '@transaction-monitoring/graphql-interface';
import { Sorting } from '@transaction-monitoring/interface';
import { IsNumber, Min } from 'class-validator';

import { Rule } from '../rules/rules.dto';

@ObjectType()
export class Scenario {
  @Field(() => ID)
  public id: string;

  @Field(() => String)
  public name: string;

  @Field(() => Boolean, { nullable: true })
  public isEnabled?: boolean;

  @Field(() => [Rule], { nullable: true })
  public rules?: Rule[];

  @Field(() => Date)
  public createdAt: Date;
}

@InputType()
export class CreateScenarioInput {
  @Field(() => String)
  public name: string;

  @Field(() => Boolean)
  public isEnabled: boolean;

  @Field(() => [ID], { nullable: true })
  public ruleIds?: string[];
}

@InputType()
export class UpdateScenarioInput {
  @Field(() => String, { nullable: true })
  public name?: string;

  @Field(() => Boolean, { nullable: true })
  public isEnabled?: boolean;

  @Field(() => [ID], { nullable: true })
  public ruleIds?: string[];
}

// RULES CONNECTION
@ObjectType()
export class ScenariosConnection {
  @Field(() => [Scenario])
  items: Scenario[];

  @Field(() => Int)
  count: number;
}

@ArgsType()
export class ScenariosConnectionArgs {
  @Field(() => [ID], { nullable: true })
  public ids?: string[];

  @Field(() => String, { nullable: true })
  public name?: string;
}

@InputType()
export class ScenariosConnectionSortingInput {
  @Field(() => SortingEnum, { nullable: true })
  public createdAt?: Sorting;
}

@ArgsType()
export class ScenariosConnectionItemsArgs {
  @Field(() => Int, { nullable: true })
  @IsNumber()
  @Min(1)
  public limit?: number;

  @Field(() => Int, { nullable: true })
  @IsNumber()
  @Min(0)
  public offset?: number;

  @Field(() => ScenariosConnectionSortingInput, {
    nullable: true,
  })
  public sorting?: ScenariosConnectionSortingInput;
}
