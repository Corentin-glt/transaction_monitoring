import {
  ArgsType,
  Field,
  ID,
  InputType,
  Int,
  ObjectType,
} from '@nestjs/graphql';
import {
  CurrencyScalar,
  SortingEnum,
} from '@transaction-monitoring/graphql-interface';
import {
  Currency,
  Sorting,
} from '@transaction-monitoring/interface';
import { IsNumber, Min } from 'class-validator';
import GraphQLJSON from 'graphql-type-json';

import { Alert } from '../alerts/alerts.dto';

@ObjectType()
export class Transaction {
  @Field(() => ID)
  public id: string;

  @Field(() => String)
  public sourceAccount: string;

  @Field(() => String)
  public targetAccount: string;

  @Field(() => String)
  public externalId: string;

  @Field(() => Number)
  public amount: number;

  @Field(() => CurrencyScalar)
  public currency: Currency;

  @Field(() => [Alert], { nullable: true })
  public alerts?: Alert[];

  @Field(() => GraphQLJSON, { nullable: true })
  public metadata?: any;

  @Field(() => Date)
  public createdAt: Date;
}

@ObjectType()
export class BulkInsertTransaction {
  @Field(() => String)
  message: string;
}
@InputType()
export class CreateTransactionInput {
  @Field(() => String)
  public sourceAccount: string;

  @Field(() => String)
  public targetAccount: string;

  @Field(() => String)
  public externalId: string;

  @Field(() => Number)
  public amount: number;

  @Field(() => CurrencyScalar, { nullable: true })
  public currency?: Currency;

  @Field(() => GraphQLJSON, { nullable: true })
  public metadata?: any;
}

@InputType()
export class CreateTransactionsInput {
  @Field(() => [CreateTransactionInput])
  public transactions: CreateTransactionInput[];
}

// TRANSACTION CONNECTION
@ObjectType()
export class TransactionsConnection {
  @Field(() => [Transaction])
  items: Transaction[];

  @Field(() => Int)
  count: number;
}

@ArgsType()
export class TransactionsConnectionArgs {
  @Field(() => [String], { nullable: true })
  public ids?: string[];

  @Field(() => String, { nullable: true })
  public sourceAccount?: string;

  @Field(() => String, { nullable: true })
  public targetAccount?: string;

  @Field(() => [String], { nullable: true })
  public externalIds?: string[];

  @Field(() => Number, { nullable: true })
  public amount?: number;

  @Field(() => CurrencyScalar, { nullable: true })
  public currency?: Currency;
}

@InputType()
export class TransactionsConnectionSortingInput {
  @Field(() => SortingEnum, { nullable: true })
  public createdAt?: Sorting;

  @Field(() => SortingEnum, { nullable: true })
  public amount?: Sorting;
}

@ArgsType()
export class TransactionsConnectionItemsArgs {
  @Field(() => Int, { nullable: true })
  @IsNumber()
  @Min(1)
  public limit?: number;

  @Field(() => Int, { nullable: true })
  @IsNumber()
  @Min(0)
  public offset?: number;

  @Field(() => TransactionsConnectionSortingInput, {
    nullable: true,
  })
  public sorting?: TransactionsConnectionSortingInput;
}
