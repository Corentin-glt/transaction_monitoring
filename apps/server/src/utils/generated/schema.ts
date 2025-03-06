export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<
  T,
  K
> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends
        | ' $fragmentName'
        | '__typename'
        ? T[P]
        : never;
    };
/** All built-in and custom scalars, mapped to their actual values */
export interface Scalars {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  /** Currency custom scalar type */
  Currency: { input: any; output: any };
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any };
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: { input: any; output: any };
}

export interface BulkInsertTransaction {
  __typename?: 'BulkInsertTransaction';
  success: Scalars['Boolean']['output'];
}

export interface CreateRuleInput {
  jsonLogic: Scalars['JSON']['input'];
  name: Scalars['String']['input'];
}

export interface CreateTransactionInput {
  amount: Scalars['Float']['input'];
  currency?: InputMaybe<Scalars['Currency']['input']>;
  externalId: Scalars['String']['input'];
  metadata?: InputMaybe<Scalars['JSON']['input']>;
  sourceAccount: Scalars['String']['input'];
  targetAccount: Scalars['String']['input'];
}

export interface CreateTransactionsInput {
  transactions: Array<CreateTransactionInput>;
}

export interface Mutation {
  __typename?: 'Mutation';
  createRule: Rule;
  createTransaction: Transaction;
  createTransactions: BulkInsertTransaction;
  updateRule: Rule;
}

export interface MutationCreateRuleArgs {
  input: CreateRuleInput;
}

export interface MutationCreateTransactionArgs {
  input: CreateTransactionInput;
}

export interface MutationCreateTransactionsArgs {
  input: CreateTransactionsInput;
}

export interface MutationUpdateRuleArgs {
  id: Scalars['ID']['input'];
  input: UpdateRuleInput;
}

export interface Query {
  __typename?: 'Query';
  rule: Rule;
  rulesConnection: RulesConnection;
  transaction: Transaction;
  transactionsConnection: TransactionsConnection;
}

export interface QueryRuleArgs {
  id: Scalars['ID']['input'];
}

export interface QueryRulesConnectionArgs {
  ids?: InputMaybe<Array<Scalars['ID']['input']>>;
  name?: InputMaybe<Scalars['String']['input']>;
}

export interface QueryTransactionArgs {
  id: Scalars['ID']['input'];
}

export interface QueryTransactionsConnectionArgs {
  amount?: InputMaybe<Scalars['Float']['input']>;
  currency?: InputMaybe<Scalars['Currency']['input']>;
  externalIds?: InputMaybe<
    Array<Scalars['String']['input']>
  >;
  ids?: InputMaybe<Array<Scalars['String']['input']>>;
  sourceAccount?: InputMaybe<Scalars['String']['input']>;
  targetAccount?: InputMaybe<Scalars['String']['input']>;
}

export interface Rule {
  __typename?: 'Rule';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  jsonLogic: Scalars['JSON']['output'];
  name: Scalars['String']['output'];
}

export interface RulesConnection {
  __typename?: 'RulesConnection';
  count: Scalars['Int']['output'];
  items: Array<Rule>;
}

export interface RulesConnectionItemsArgs {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sorting?: InputMaybe<RulesConnectionSortingInput>;
}

export interface RulesConnectionSortingInput {
  createdAt?: InputMaybe<SortingEnum>;
}

export enum SortingEnum {
  Asc = 'asc',
  Desc = 'desc',
}

export interface Transaction {
  __typename?: 'Transaction';
  amount: Scalars['Float']['output'];
  createdAt: Scalars['DateTime']['output'];
  currency: Scalars['Currency']['output'];
  externalId: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  metadata?: Maybe<Scalars['JSON']['output']>;
  sourceAccount: Scalars['String']['output'];
  targetAccount: Scalars['String']['output'];
}

export interface TransactionsConnection {
  __typename?: 'TransactionsConnection';
  count: Scalars['Int']['output'];
  items: Array<Transaction>;
}

export interface TransactionsConnectionItemsArgs {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sorting?: InputMaybe<TransactionsConnectionSortingInput>;
}

export interface TransactionsConnectionSortingInput {
  amount?: InputMaybe<SortingEnum>;
  createdAt?: InputMaybe<SortingEnum>;
}

export interface UpdateRuleInput {
  name?: InputMaybe<Scalars['String']['input']>;
  scenarioIds?: InputMaybe<
    Array<Scalars['String']['input']>
  >;
}
