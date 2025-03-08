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
  /** AlertStatus custom scalar type */
  AlertStatus: { input: any; output: any };
  /** Currency custom scalar type */
  Currency: { input: any; output: any };
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any };
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: { input: any; output: any };
}

export interface Alert {
  __typename?: 'Alert';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  rule: Rule;
  scenario: Scenario;
  status: Scalars['AlertStatus']['output'];
  transactions?: Maybe<Array<Transaction>>;
}

export interface AlertsConnection {
  __typename?: 'AlertsConnection';
  count: Scalars['Int']['output'];
  items: Array<Alert>;
}

export interface AlertsConnectionItemsArgs {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sorting?: InputMaybe<AlertsConnectionSortingInput>;
}

export interface AlertsConnectionSortingInput {
  createdAt?: InputMaybe<SortingEnum>;
}

export interface BulkInsertTransaction {
  __typename?: 'BulkInsertTransaction';
  success: Scalars['Boolean']['output'];
}

export interface CreateRuleInput {
  isAggregate: Scalars['Boolean']['input'];
  jsonLogic: Scalars['JSON']['input'];
  name: Scalars['String']['input'];
}

export interface CreateScenarioInput {
  isEnabled: Scalars['Boolean']['input'];
  name: Scalars['String']['input'];
  ruleIds: Array<Scalars['ID']['input']>;
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
  createScenario: Scenario;
  createTransaction: Transaction;
  createTransactions: BulkInsertTransaction;
  deleteRule: Rule;
  deleteScenario: Scenario;
  updateAlert: Alert;
  updateRule: Rule;
  updateScenario: Scenario;
}

export interface MutationCreateRuleArgs {
  input: CreateRuleInput;
}

export interface MutationCreateScenarioArgs {
  input: CreateScenarioInput;
}

export interface MutationCreateTransactionArgs {
  input: CreateTransactionInput;
}

export interface MutationCreateTransactionsArgs {
  input: CreateTransactionsInput;
}

export interface MutationDeleteRuleArgs {
  id: Scalars['ID']['input'];
}

export interface MutationDeleteScenarioArgs {
  id: Scalars['ID']['input'];
}

export interface MutationUpdateAlertArgs {
  id: Scalars['ID']['input'];
  input: UpdateAlertInput;
}

export interface MutationUpdateRuleArgs {
  id: Scalars['ID']['input'];
  input: UpdateRuleInput;
}

export interface MutationUpdateScenarioArgs {
  id: Scalars['ID']['input'];
  input: UpdateScenarioInput;
}

export interface Query {
  __typename?: 'Query';
  alert: Alert;
  alertsConnection: AlertsConnection;
  rule: Rule;
  rulesConnection: RulesConnection;
  scenario: Scenario;
  scenariosConnection: ScenariosConnection;
  transaction: Transaction;
  transactionsConnection: TransactionsConnection;
}

export interface QueryAlertArgs {
  id: Scalars['ID']['input'];
}

export interface QueryAlertsConnectionArgs {
  ids?: InputMaybe<Array<Scalars['ID']['input']>>;
}

export interface QueryRuleArgs {
  id: Scalars['ID']['input'];
}

export interface QueryRulesConnectionArgs {
  ids?: InputMaybe<Array<Scalars['ID']['input']>>;
  name?: InputMaybe<Scalars['String']['input']>;
}

export interface QueryScenarioArgs {
  id: Scalars['ID']['input'];
}

export interface QueryScenariosConnectionArgs {
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
  isAggregate: Scalars['Boolean']['output'];
  jsonLogic: Scalars['JSON']['output'];
  name: Scalars['String']['output'];
  scenarios?: Maybe<Array<Scenario>>;
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

export interface Scenario {
  __typename?: 'Scenario';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  isEnabled?: Maybe<Scalars['Boolean']['output']>;
  name: Scalars['String']['output'];
  rules?: Maybe<Array<Rule>>;
}

export interface ScenariosConnection {
  __typename?: 'ScenariosConnection';
  count: Scalars['Int']['output'];
  items: Array<Scenario>;
}

export interface ScenariosConnectionItemsArgs {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sorting?: InputMaybe<ScenariosConnectionSortingInput>;
}

export interface ScenariosConnectionSortingInput {
  createdAt?: InputMaybe<SortingEnum>;
}

export enum SortingEnum {
  Asc = 'asc',
  Desc = 'desc',
}

export interface Transaction {
  __typename?: 'Transaction';
  alerts?: Maybe<Array<Alert>>;
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

export interface UpdateAlertInput {
  status: Scalars['AlertStatus']['input'];
}

export interface UpdateRuleInput {
  isAggregate?: InputMaybe<Scalars['Boolean']['input']>;
  jsonLogic?: InputMaybe<Scalars['JSON']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  scenarioIds?: InputMaybe<
    Array<Scalars['String']['input']>
  >;
}

export interface UpdateScenarioInput {
  isEnabled?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  ruleIds?: InputMaybe<Array<Scalars['ID']['input']>>;
}
