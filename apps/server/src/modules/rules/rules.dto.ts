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
import GraphQLJSON from 'graphql-type-json';

//TODO: Copy/Paste this object type
// once scenario's going to have its resolvers
@ObjectType()
export class Scenario {
  @Field(() => ID)
  public id: string;

  @Field(() => String)
  name: string;
}

@ObjectType()
export class Rule {
  @Field(() => ID)
  public id: string;

  @Field(() => String)
  public name: string;

  @Field(() => [Scenario], { nullable: true })
  public scenarios?: Scenario[];

  @Field(() => GraphQLJSON)
  public jsonLogic: any;

  @Field(() => Boolean)
  public isAggregate: boolean;

  @Field(() => Date)
  public createdAt: Date;
}

@InputType()
export class CreateRuleInput {
  @Field(() => String)
  public name: string;

  @Field(() => GraphQLJSON)
  public jsonLogic: any;

  @Field(() => Boolean)
  public isAggregate: boolean;
}

@InputType()
export class UpdateRuleInput {
  @Field(() => String, { nullable: true })
  public name: string;

  @Field(() => [String], { nullable: true })
  public scenarioIds: string[];
}

// RULES CONNECTION
@ObjectType()
export class RulesConnection {
  @Field(() => [Rule])
  items: Rule[];

  @Field(() => Int)
  count: number;
}

@ArgsType()
export class RulesConnectionArgs {
  @Field(() => [ID], { nullable: true })
  public ids?: string[];

  @Field(() => String, { nullable: true })
  public name?: string;
}

@InputType()
export class RulesConnectionSortingInput {
  @Field(() => SortingEnum, { nullable: true })
  public createdAt?: Sorting;
}

@ArgsType()
export class RulesConnectionItemsArgs {
  @Field(() => Int, { nullable: true })
  @IsNumber()
  @Min(1)
  public limit?: number;

  @Field(() => Int, { nullable: true })
  @IsNumber()
  @Min(0)
  public offset?: number;

  @Field(() => RulesConnectionSortingInput, {
    nullable: true,
  })
  public sorting?: RulesConnectionSortingInput;
}
