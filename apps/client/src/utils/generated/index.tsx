import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
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
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
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
};

export type Alert = {
  __typename?: 'Alert';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  rule: Rule;
  scenario: Scenario;
  status: Scalars['AlertStatus']['output'];
  transactions?: Maybe<Array<Transaction>>;
};

export type AlertsConnection = {
  __typename?: 'AlertsConnection';
  count: Scalars['Int']['output'];
  items: Array<Alert>;
};

export type AlertsConnectionItemsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sorting?: InputMaybe<AlertsConnectionSortingInput>;
};

export type AlertsConnectionSortingInput = {
  createdAt?: InputMaybe<SortingEnum>;
};

export type BulkInsertTransaction = {
  __typename?: 'BulkInsertTransaction';
  success: Scalars['Boolean']['output'];
};

export type CreateRuleInput = {
  isAggregate: Scalars['Boolean']['input'];
  jsonLogic: Scalars['JSON']['input'];
  name: Scalars['String']['input'];
};

export type CreateScenarioInput = {
  isEnabled: Scalars['Boolean']['input'];
  name: Scalars['String']['input'];
  ruleIds: Array<Scalars['ID']['input']>;
};

export type CreateTransactionInput = {
  amount: Scalars['Float']['input'];
  currency?: InputMaybe<Scalars['Currency']['input']>;
  externalId: Scalars['String']['input'];
  metadata?: InputMaybe<Scalars['JSON']['input']>;
  sourceAccount: Scalars['String']['input'];
  targetAccount: Scalars['String']['input'];
};

export type CreateTransactionsInput = {
  transactions: Array<CreateTransactionInput>;
};

export type Mutation = {
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
};

export type MutationCreateRuleArgs = {
  input: CreateRuleInput;
};

export type MutationCreateScenarioArgs = {
  input: CreateScenarioInput;
};

export type MutationCreateTransactionArgs = {
  input: CreateTransactionInput;
};

export type MutationCreateTransactionsArgs = {
  input: CreateTransactionsInput;
};

export type MutationDeleteRuleArgs = {
  id: Scalars['ID']['input'];
};

export type MutationDeleteScenarioArgs = {
  id: Scalars['ID']['input'];
};

export type MutationUpdateAlertArgs = {
  id: Scalars['ID']['input'];
  input: UpdateAlertInput;
};

export type MutationUpdateRuleArgs = {
  id: Scalars['ID']['input'];
  input: UpdateRuleInput;
};

export type MutationUpdateScenarioArgs = {
  id: Scalars['ID']['input'];
  input: UpdateScenarioInput;
};

export type Query = {
  __typename?: 'Query';
  alert: Alert;
  alertsConnection: AlertsConnection;
  rule: Rule;
  rulesConnection: RulesConnection;
  scenario: Scenario;
  scenariosConnection: ScenariosConnection;
  transaction: Transaction;
  transactionsConnection: TransactionsConnection;
};

export type QueryAlertArgs = {
  id: Scalars['ID']['input'];
};

export type QueryAlertsConnectionArgs = {
  ids?: InputMaybe<Array<Scalars['ID']['input']>>;
};

export type QueryRuleArgs = {
  id: Scalars['ID']['input'];
};

export type QueryRulesConnectionArgs = {
  ids?: InputMaybe<Array<Scalars['ID']['input']>>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type QueryScenarioArgs = {
  id: Scalars['ID']['input'];
};

export type QueryScenariosConnectionArgs = {
  ids?: InputMaybe<Array<Scalars['ID']['input']>>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type QueryTransactionArgs = {
  id: Scalars['ID']['input'];
};

export type QueryTransactionsConnectionArgs = {
  amount?: InputMaybe<Scalars['Float']['input']>;
  currency?: InputMaybe<Scalars['Currency']['input']>;
  externalIds?: InputMaybe<
    Array<Scalars['String']['input']>
  >;
  ids?: InputMaybe<Array<Scalars['String']['input']>>;
  sourceAccount?: InputMaybe<Scalars['String']['input']>;
  targetAccount?: InputMaybe<Scalars['String']['input']>;
};

export type Rule = {
  __typename?: 'Rule';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  isAggregate: Scalars['Boolean']['output'];
  jsonLogic: Scalars['JSON']['output'];
  name: Scalars['String']['output'];
  scenarios?: Maybe<Array<Scenario>>;
};

export type RulesConnection = {
  __typename?: 'RulesConnection';
  count: Scalars['Int']['output'];
  items: Array<Rule>;
};

export type RulesConnectionItemsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sorting?: InputMaybe<RulesConnectionSortingInput>;
};

export type RulesConnectionSortingInput = {
  createdAt?: InputMaybe<SortingEnum>;
};

export type Scenario = {
  __typename?: 'Scenario';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  isEnabled?: Maybe<Scalars['Boolean']['output']>;
  name: Scalars['String']['output'];
  rules?: Maybe<Array<Rule>>;
};

export type ScenariosConnection = {
  __typename?: 'ScenariosConnection';
  count: Scalars['Int']['output'];
  items: Array<Scenario>;
};

export type ScenariosConnectionItemsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sorting?: InputMaybe<ScenariosConnectionSortingInput>;
};

export type ScenariosConnectionSortingInput = {
  createdAt?: InputMaybe<SortingEnum>;
};

export enum SortingEnum {
  Asc = 'asc',
  Desc = 'desc',
}

export type Transaction = {
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
};

export type TransactionsConnection = {
  __typename?: 'TransactionsConnection';
  count: Scalars['Int']['output'];
  items: Array<Transaction>;
};

export type TransactionsConnectionItemsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sorting?: InputMaybe<TransactionsConnectionSortingInput>;
};

export type TransactionsConnectionSortingInput = {
  amount?: InputMaybe<SortingEnum>;
  createdAt?: InputMaybe<SortingEnum>;
};

export type UpdateAlertInput = {
  status: Scalars['AlertStatus']['input'];
};

export type UpdateRuleInput = {
  isAggregate?: InputMaybe<Scalars['Boolean']['input']>;
  jsonLogic?: InputMaybe<Scalars['JSON']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  scenarioIds?: InputMaybe<
    Array<Scalars['String']['input']>
  >;
};

export type UpdateScenarioInput = {
  isEnabled?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  ruleIds?: InputMaybe<Array<Scalars['ID']['input']>>;
};

export type AlertFragmentFragment = {
  __typename?: 'Alert';
  id: string;
  status: any;
  createdAt: any;
  rule: { __typename?: 'Rule'; id: string; name: string };
  scenario: {
    __typename?: 'Scenario';
    id: string;
    name: string;
  };
  transactions?: Array<{
    __typename?: 'Transaction';
    id: string;
    amount: number;
    currency: any;
    createdAt: any;
    externalId: string;
    metadata?: any | null;
    sourceAccount: string;
    targetAccount: string;
  }> | null;
};

export type AlertQueryVariables = Exact<{
  alertId: Scalars['ID']['input'];
}>;

export type AlertQuery = {
  __typename?: 'Query';
  alert: {
    __typename?: 'Alert';
    id: string;
    status: any;
    createdAt: any;
    rule: { __typename?: 'Rule'; id: string; name: string };
    scenario: {
      __typename?: 'Scenario';
      id: string;
      name: string;
    };
    transactions?: Array<{
      __typename?: 'Transaction';
      id: string;
      amount: number;
      currency: any;
      createdAt: any;
      externalId: string;
      metadata?: any | null;
      sourceAccount: string;
      targetAccount: string;
    }> | null;
  };
};

export type AlertsConnectionQueryVariables = Exact<{
  ids?: InputMaybe<
    Array<Scalars['ID']['input']> | Scalars['ID']['input']
  >;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sorting?: InputMaybe<AlertsConnectionSortingInput>;
}>;

export type AlertsConnectionQuery = {
  __typename?: 'Query';
  alertsConnection: {
    __typename?: 'AlertsConnection';
    count: number;
    items: Array<{
      __typename?: 'Alert';
      id: string;
      status: any;
      createdAt: any;
      rule: {
        __typename?: 'Rule';
        id: string;
        name: string;
      };
      scenario: {
        __typename?: 'Scenario';
        id: string;
        name: string;
      };
      transactions?: Array<{
        __typename?: 'Transaction';
        id: string;
        amount: number;
        currency: any;
        createdAt: any;
        externalId: string;
        metadata?: any | null;
        sourceAccount: string;
        targetAccount: string;
      }> | null;
    }>;
  };
};

export type UpdateAlertMutationVariables = Exact<{
  updateAlertId: Scalars['ID']['input'];
  input: UpdateAlertInput;
}>;

export type UpdateAlertMutation = {
  __typename?: 'Mutation';
  updateAlert: {
    __typename?: 'Alert';
    id: string;
    status: any;
    createdAt: any;
    rule: { __typename?: 'Rule'; id: string; name: string };
    scenario: {
      __typename?: 'Scenario';
      id: string;
      name: string;
    };
    transactions?: Array<{
      __typename?: 'Transaction';
      id: string;
      amount: number;
      currency: any;
      createdAt: any;
      externalId: string;
      metadata?: any | null;
      sourceAccount: string;
      targetAccount: string;
    }> | null;
  };
};

export type RuleFragmentFragment = {
  __typename?: 'Rule';
  id: string;
  name: string;
  jsonLogic: any;
  createdAt: any;
  isAggregate: boolean;
  scenarios?: Array<{
    __typename?: 'Scenario';
    id: string;
    name: string;
  }> | null;
};

export type RuleQueryVariables = Exact<{
  ruleId: Scalars['ID']['input'];
}>;

export type RuleQuery = {
  __typename?: 'Query';
  rule: {
    __typename?: 'Rule';
    id: string;
    name: string;
    jsonLogic: any;
    createdAt: any;
    isAggregate: boolean;
    scenarios?: Array<{
      __typename?: 'Scenario';
      id: string;
      name: string;
    }> | null;
  };
};

export type RulesConnectionQueryVariables = Exact<{
  ids?: InputMaybe<
    Array<Scalars['ID']['input']> | Scalars['ID']['input']
  >;
  name?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sorting?: InputMaybe<RulesConnectionSortingInput>;
}>;

export type RulesConnectionQuery = {
  __typename?: 'Query';
  rulesConnection: {
    __typename?: 'RulesConnection';
    count: number;
    items: Array<{
      __typename?: 'Rule';
      id: string;
      name: string;
      jsonLogic: any;
      createdAt: any;
      isAggregate: boolean;
      scenarios?: Array<{
        __typename?: 'Scenario';
        id: string;
        name: string;
      }> | null;
    }>;
  };
};

export type CreateRuleMutationVariables = Exact<{
  input: CreateRuleInput;
}>;

export type CreateRuleMutation = {
  __typename?: 'Mutation';
  createRule: {
    __typename?: 'Rule';
    id: string;
    name: string;
    jsonLogic: any;
    createdAt: any;
    isAggregate: boolean;
    scenarios?: Array<{
      __typename?: 'Scenario';
      id: string;
      name: string;
    }> | null;
  };
};

export type UpdateRuleMutationVariables = Exact<{
  updateRuleId: Scalars['ID']['input'];
  input: UpdateRuleInput;
}>;

export type UpdateRuleMutation = {
  __typename?: 'Mutation';
  updateRule: {
    __typename?: 'Rule';
    id: string;
    name: string;
    jsonLogic: any;
    createdAt: any;
    isAggregate: boolean;
    scenarios?: Array<{
      __typename?: 'Scenario';
      id: string;
      name: string;
    }> | null;
  };
};

export type DeleteRuleMutationVariables = Exact<{
  ruleId: Scalars['ID']['input'];
}>;

export type DeleteRuleMutation = {
  __typename?: 'Mutation';
  deleteRule: {
    __typename?: 'Rule';
    id: string;
    name: string;
    jsonLogic: any;
    createdAt: any;
    isAggregate: boolean;
    scenarios?: Array<{
      __typename?: 'Scenario';
      id: string;
      name: string;
    }> | null;
  };
};

export type ScenarioFragmentFragment = {
  __typename?: 'Scenario';
  id: string;
  createdAt: any;
  isEnabled?: boolean | null;
  name: string;
  rules?: Array<{
    __typename?: 'Rule';
    id: string;
    isAggregate: boolean;
    jsonLogic: any;
    name: string;
  }> | null;
};

export type ScenarioQueryVariables = Exact<{
  scenarioId: Scalars['ID']['input'];
}>;

export type ScenarioQuery = {
  __typename?: 'Query';
  scenario: {
    __typename?: 'Scenario';
    id: string;
    createdAt: any;
    isEnabled?: boolean | null;
    name: string;
    rules?: Array<{
      __typename?: 'Rule';
      id: string;
      isAggregate: boolean;
      jsonLogic: any;
      name: string;
    }> | null;
  };
};

export type ScenariosConnectionQueryVariables = Exact<{
  ids?: InputMaybe<
    Array<Scalars['ID']['input']> | Scalars['ID']['input']
  >;
  name?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sorting?: InputMaybe<ScenariosConnectionSortingInput>;
}>;

export type ScenariosConnectionQuery = {
  __typename?: 'Query';
  scenariosConnection: {
    __typename?: 'ScenariosConnection';
    count: number;
    items: Array<{
      __typename?: 'Scenario';
      id: string;
      createdAt: any;
      isEnabled?: boolean | null;
      name: string;
      rules?: Array<{
        __typename?: 'Rule';
        id: string;
        isAggregate: boolean;
        jsonLogic: any;
        name: string;
      }> | null;
    }>;
  };
};

export type CreateScenarioMutationVariables = Exact<{
  input: CreateScenarioInput;
}>;

export type CreateScenarioMutation = {
  __typename?: 'Mutation';
  createScenario: {
    __typename?: 'Scenario';
    id: string;
    createdAt: any;
    isEnabled?: boolean | null;
    name: string;
    rules?: Array<{
      __typename?: 'Rule';
      id: string;
      isAggregate: boolean;
      jsonLogic: any;
      name: string;
    }> | null;
  };
};

export type UpdateScenarioMutationVariables = Exact<{
  updateScenarioId: Scalars['ID']['input'];
  input: UpdateScenarioInput;
}>;

export type UpdateScenarioMutation = {
  __typename?: 'Mutation';
  updateScenario: {
    __typename?: 'Scenario';
    id: string;
    createdAt: any;
    isEnabled?: boolean | null;
    name: string;
    rules?: Array<{
      __typename?: 'Rule';
      id: string;
      isAggregate: boolean;
      jsonLogic: any;
      name: string;
    }> | null;
  };
};

export type DeleteScenarioMutationVariables = Exact<{
  deleteScenarioId: Scalars['ID']['input'];
}>;

export type DeleteScenarioMutation = {
  __typename?: 'Mutation';
  deleteScenario: {
    __typename?: 'Scenario';
    id: string;
    createdAt: any;
    isEnabled?: boolean | null;
    name: string;
    rules?: Array<{
      __typename?: 'Rule';
      id: string;
      isAggregate: boolean;
      jsonLogic: any;
      name: string;
    }> | null;
  };
};

export type TransactionFragmentFragment = {
  __typename?: 'Transaction';
  id: string;
  amount: number;
  currency: any;
  createdAt: any;
  externalId: string;
  metadata?: any | null;
  sourceAccount: string;
  targetAccount: string;
  alerts?: Array<{
    __typename?: 'Alert';
    id: string;
    status: any;
    createdAt: any;
    rule: { __typename?: 'Rule'; id: string; name: string };
    scenario: {
      __typename?: 'Scenario';
      id: string;
      name: string;
    };
  }> | null;
};

export type TransactionQueryVariables = Exact<{
  transactionId: Scalars['ID']['input'];
}>;

export type TransactionQuery = {
  __typename?: 'Query';
  transaction: {
    __typename?: 'Transaction';
    id: string;
    amount: number;
    currency: any;
    createdAt: any;
    externalId: string;
    metadata?: any | null;
    sourceAccount: string;
    targetAccount: string;
    alerts?: Array<{
      __typename?: 'Alert';
      id: string;
      status: any;
      createdAt: any;
      rule: {
        __typename?: 'Rule';
        id: string;
        name: string;
      };
      scenario: {
        __typename?: 'Scenario';
        id: string;
        name: string;
      };
    }> | null;
  };
};

export type TransactionsConnectionQueryVariables = Exact<{
  amount?: InputMaybe<Scalars['Float']['input']>;
  currency?: InputMaybe<Scalars['Currency']['input']>;
  externalIds?: InputMaybe<
    | Array<Scalars['String']['input']>
    | Scalars['String']['input']
  >;
  ids?: InputMaybe<
    | Array<Scalars['String']['input']>
    | Scalars['String']['input']
  >;
  sourceAccount?: InputMaybe<Scalars['String']['input']>;
  targetAccount?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sorting?: InputMaybe<TransactionsConnectionSortingInput>;
}>;

export type TransactionsConnectionQuery = {
  __typename?: 'Query';
  transactionsConnection: {
    __typename?: 'TransactionsConnection';
    count: number;
    items: Array<{
      __typename?: 'Transaction';
      id: string;
      amount: number;
      currency: any;
      createdAt: any;
      externalId: string;
      metadata?: any | null;
      sourceAccount: string;
      targetAccount: string;
      alerts?: Array<{
        __typename?: 'Alert';
        id: string;
        status: any;
        createdAt: any;
        rule: {
          __typename?: 'Rule';
          id: string;
          name: string;
        };
        scenario: {
          __typename?: 'Scenario';
          id: string;
          name: string;
        };
      }> | null;
    }>;
  };
};

export type CreateTransactionsMutationVariables = Exact<{
  input: CreateTransactionsInput;
}>;

export type CreateTransactionsMutation = {
  __typename?: 'Mutation';
  createTransactions: {
    __typename?: 'BulkInsertTransaction';
    success: boolean;
  };
};

export type CreateTransactionMutationVariables = Exact<{
  input: CreateTransactionInput;
}>;

export type CreateTransactionMutation = {
  __typename?: 'Mutation';
  createTransaction: {
    __typename?: 'Transaction';
    id: string;
    amount: number;
    currency: any;
    createdAt: any;
    externalId: string;
    metadata?: any | null;
    sourceAccount: string;
    targetAccount: string;
    alerts?: Array<{
      __typename?: 'Alert';
      id: string;
      status: any;
      createdAt: any;
      rule: {
        __typename?: 'Rule';
        id: string;
        name: string;
      };
      scenario: {
        __typename?: 'Scenario';
        id: string;
        name: string;
      };
    }> | null;
  };
};

export const AlertFragmentFragmentDoc = gql`
  fragment alertFragment on Alert {
    id
    status
    rule {
      id
      name
    }
    scenario {
      id
      name
    }
    transactions {
      id
      amount
      currency
      createdAt
      externalId
      metadata
      sourceAccount
      targetAccount
    }
    createdAt
  }
`;
export const RuleFragmentFragmentDoc = gql`
  fragment ruleFragment on Rule {
    id
    name
    jsonLogic
    createdAt
    isAggregate
    scenarios {
      id
      name
    }
  }
`;
export const ScenarioFragmentFragmentDoc = gql`
  fragment scenarioFragment on Scenario {
    id
    createdAt
    isEnabled
    name
    rules {
      id
      isAggregate
      jsonLogic
      name
    }
  }
`;
export const TransactionFragmentFragmentDoc = gql`
  fragment transactionFragment on Transaction {
    id
    amount
    currency
    createdAt
    externalId
    metadata
    sourceAccount
    targetAccount
    alerts {
      id
      status
      rule {
        id
        name
      }
      scenario {
        id
        name
      }
      createdAt
    }
  }
`;
export const AlertDocument = gql`
  query Alert($alertId: ID!) {
    alert(id: $alertId) {
      ...alertFragment
    }
  }
  ${AlertFragmentFragmentDoc}
`;

/**
 * __useAlertQuery__
 *
 * To run a query within a React component, call `useAlertQuery` and pass it any options that fit your needs.
 * When your component renders, `useAlertQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAlertQuery({
 *   variables: {
 *      alertId: // value for 'alertId'
 *   },
 * });
 */
export function useAlertQuery(
  baseOptions: Apollo.QueryHookOptions<
    AlertQuery,
    AlertQueryVariables
  > &
    (
      | { variables: AlertQueryVariables; skip?: boolean }
      | { skip: boolean }
    )
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<AlertQuery, AlertQueryVariables>(
    AlertDocument,
    options
  );
}
export function useAlertLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    AlertQuery,
    AlertQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    AlertQuery,
    AlertQueryVariables
  >(AlertDocument, options);
}
export function useAlertSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        AlertQuery,
        AlertQueryVariables
      >
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    AlertQuery,
    AlertQueryVariables
  >(AlertDocument, options);
}
export type AlertQueryHookResult = ReturnType<
  typeof useAlertQuery
>;
export type AlertLazyQueryHookResult = ReturnType<
  typeof useAlertLazyQuery
>;
export type AlertSuspenseQueryHookResult = ReturnType<
  typeof useAlertSuspenseQuery
>;
export type AlertQueryResult = Apollo.QueryResult<
  AlertQuery,
  AlertQueryVariables
>;
export const AlertsConnectionDocument = gql`
  query AlertsConnection(
    $ids: [ID!]
    $limit: Int
    $offset: Int
    $sorting: AlertsConnectionSortingInput
  ) {
    alertsConnection(ids: $ids) {
      count
      items(
        limit: $limit
        offset: $offset
        sorting: $sorting
      ) {
        ...alertFragment
      }
    }
  }
  ${AlertFragmentFragmentDoc}
`;

/**
 * __useAlertsConnectionQuery__
 *
 * To run a query within a React component, call `useAlertsConnectionQuery` and pass it any options that fit your needs.
 * When your component renders, `useAlertsConnectionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAlertsConnectionQuery({
 *   variables: {
 *      ids: // value for 'ids'
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *      sorting: // value for 'sorting'
 *   },
 * });
 */
export function useAlertsConnectionQuery(
  baseOptions?: Apollo.QueryHookOptions<
    AlertsConnectionQuery,
    AlertsConnectionQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    AlertsConnectionQuery,
    AlertsConnectionQueryVariables
  >(AlertsConnectionDocument, options);
}
export function useAlertsConnectionLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    AlertsConnectionQuery,
    AlertsConnectionQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    AlertsConnectionQuery,
    AlertsConnectionQueryVariables
  >(AlertsConnectionDocument, options);
}
export function useAlertsConnectionSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        AlertsConnectionQuery,
        AlertsConnectionQueryVariables
      >
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    AlertsConnectionQuery,
    AlertsConnectionQueryVariables
  >(AlertsConnectionDocument, options);
}
export type AlertsConnectionQueryHookResult = ReturnType<
  typeof useAlertsConnectionQuery
>;
export type AlertsConnectionLazyQueryHookResult =
  ReturnType<typeof useAlertsConnectionLazyQuery>;
export type AlertsConnectionSuspenseQueryHookResult =
  ReturnType<typeof useAlertsConnectionSuspenseQuery>;
export type AlertsConnectionQueryResult =
  Apollo.QueryResult<
    AlertsConnectionQuery,
    AlertsConnectionQueryVariables
  >;
export const UpdateAlertDocument = gql`
  mutation UpdateAlert(
    $updateAlertId: ID!
    $input: UpdateAlertInput!
  ) {
    updateAlert(id: $updateAlertId, input: $input) {
      ...alertFragment
    }
  }
  ${AlertFragmentFragmentDoc}
`;
export type UpdateAlertMutationFn = Apollo.MutationFunction<
  UpdateAlertMutation,
  UpdateAlertMutationVariables
>;

/**
 * __useUpdateAlertMutation__
 *
 * To run a mutation, you first call `useUpdateAlertMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateAlertMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateAlertMutation, { data, loading, error }] = useUpdateAlertMutation({
 *   variables: {
 *      updateAlertId: // value for 'updateAlertId'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateAlertMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateAlertMutation,
    UpdateAlertMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdateAlertMutation,
    UpdateAlertMutationVariables
  >(UpdateAlertDocument, options);
}
export type UpdateAlertMutationHookResult = ReturnType<
  typeof useUpdateAlertMutation
>;
export type UpdateAlertMutationResult =
  Apollo.MutationResult<UpdateAlertMutation>;
export type UpdateAlertMutationOptions =
  Apollo.BaseMutationOptions<
    UpdateAlertMutation,
    UpdateAlertMutationVariables
  >;
export const RuleDocument = gql`
  query Rule($ruleId: ID!) {
    rule(id: $ruleId) {
      ...ruleFragment
    }
  }
  ${RuleFragmentFragmentDoc}
`;

/**
 * __useRuleQuery__
 *
 * To run a query within a React component, call `useRuleQuery` and pass it any options that fit your needs.
 * When your component renders, `useRuleQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRuleQuery({
 *   variables: {
 *      ruleId: // value for 'ruleId'
 *   },
 * });
 */
export function useRuleQuery(
  baseOptions: Apollo.QueryHookOptions<
    RuleQuery,
    RuleQueryVariables
  > &
    (
      | { variables: RuleQueryVariables; skip?: boolean }
      | { skip: boolean }
    )
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<RuleQuery, RuleQueryVariables>(
    RuleDocument,
    options
  );
}
export function useRuleLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    RuleQuery,
    RuleQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<RuleQuery, RuleQueryVariables>(
    RuleDocument,
    options
  );
}
export function useRuleSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        RuleQuery,
        RuleQueryVariables
      >
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    RuleQuery,
    RuleQueryVariables
  >(RuleDocument, options);
}
export type RuleQueryHookResult = ReturnType<
  typeof useRuleQuery
>;
export type RuleLazyQueryHookResult = ReturnType<
  typeof useRuleLazyQuery
>;
export type RuleSuspenseQueryHookResult = ReturnType<
  typeof useRuleSuspenseQuery
>;
export type RuleQueryResult = Apollo.QueryResult<
  RuleQuery,
  RuleQueryVariables
>;
export const RulesConnectionDocument = gql`
  query RulesConnection(
    $ids: [ID!]
    $name: String
    $limit: Int
    $offset: Int
    $sorting: RulesConnectionSortingInput
  ) {
    rulesConnection(ids: $ids, name: $name) {
      count
      items(
        limit: $limit
        offset: $offset
        sorting: $sorting
      ) {
        ...ruleFragment
      }
    }
  }
  ${RuleFragmentFragmentDoc}
`;

/**
 * __useRulesConnectionQuery__
 *
 * To run a query within a React component, call `useRulesConnectionQuery` and pass it any options that fit your needs.
 * When your component renders, `useRulesConnectionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRulesConnectionQuery({
 *   variables: {
 *      ids: // value for 'ids'
 *      name: // value for 'name'
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *      sorting: // value for 'sorting'
 *   },
 * });
 */
export function useRulesConnectionQuery(
  baseOptions?: Apollo.QueryHookOptions<
    RulesConnectionQuery,
    RulesConnectionQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    RulesConnectionQuery,
    RulesConnectionQueryVariables
  >(RulesConnectionDocument, options);
}
export function useRulesConnectionLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    RulesConnectionQuery,
    RulesConnectionQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    RulesConnectionQuery,
    RulesConnectionQueryVariables
  >(RulesConnectionDocument, options);
}
export function useRulesConnectionSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        RulesConnectionQuery,
        RulesConnectionQueryVariables
      >
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    RulesConnectionQuery,
    RulesConnectionQueryVariables
  >(RulesConnectionDocument, options);
}
export type RulesConnectionQueryHookResult = ReturnType<
  typeof useRulesConnectionQuery
>;
export type RulesConnectionLazyQueryHookResult = ReturnType<
  typeof useRulesConnectionLazyQuery
>;
export type RulesConnectionSuspenseQueryHookResult =
  ReturnType<typeof useRulesConnectionSuspenseQuery>;
export type RulesConnectionQueryResult = Apollo.QueryResult<
  RulesConnectionQuery,
  RulesConnectionQueryVariables
>;
export const CreateRuleDocument = gql`
  mutation CreateRule($input: CreateRuleInput!) {
    createRule(input: $input) {
      ...ruleFragment
    }
  }
  ${RuleFragmentFragmentDoc}
`;
export type CreateRuleMutationFn = Apollo.MutationFunction<
  CreateRuleMutation,
  CreateRuleMutationVariables
>;

/**
 * __useCreateRuleMutation__
 *
 * To run a mutation, you first call `useCreateRuleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateRuleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createRuleMutation, { data, loading, error }] = useCreateRuleMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateRuleMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateRuleMutation,
    CreateRuleMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateRuleMutation,
    CreateRuleMutationVariables
  >(CreateRuleDocument, options);
}
export type CreateRuleMutationHookResult = ReturnType<
  typeof useCreateRuleMutation
>;
export type CreateRuleMutationResult =
  Apollo.MutationResult<CreateRuleMutation>;
export type CreateRuleMutationOptions =
  Apollo.BaseMutationOptions<
    CreateRuleMutation,
    CreateRuleMutationVariables
  >;
export const UpdateRuleDocument = gql`
  mutation UpdateRule(
    $updateRuleId: ID!
    $input: UpdateRuleInput!
  ) {
    updateRule(id: $updateRuleId, input: $input) {
      ...ruleFragment
    }
  }
  ${RuleFragmentFragmentDoc}
`;
export type UpdateRuleMutationFn = Apollo.MutationFunction<
  UpdateRuleMutation,
  UpdateRuleMutationVariables
>;

/**
 * __useUpdateRuleMutation__
 *
 * To run a mutation, you first call `useUpdateRuleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateRuleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateRuleMutation, { data, loading, error }] = useUpdateRuleMutation({
 *   variables: {
 *      updateRuleId: // value for 'updateRuleId'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateRuleMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateRuleMutation,
    UpdateRuleMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdateRuleMutation,
    UpdateRuleMutationVariables
  >(UpdateRuleDocument, options);
}
export type UpdateRuleMutationHookResult = ReturnType<
  typeof useUpdateRuleMutation
>;
export type UpdateRuleMutationResult =
  Apollo.MutationResult<UpdateRuleMutation>;
export type UpdateRuleMutationOptions =
  Apollo.BaseMutationOptions<
    UpdateRuleMutation,
    UpdateRuleMutationVariables
  >;
export const DeleteRuleDocument = gql`
  mutation DeleteRule($ruleId: ID!) {
    deleteRule(id: $ruleId) {
      ...ruleFragment
    }
  }
  ${RuleFragmentFragmentDoc}
`;
export type DeleteRuleMutationFn = Apollo.MutationFunction<
  DeleteRuleMutation,
  DeleteRuleMutationVariables
>;

/**
 * __useDeleteRuleMutation__
 *
 * To run a mutation, you first call `useDeleteRuleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteRuleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteRuleMutation, { data, loading, error }] = useDeleteRuleMutation({
 *   variables: {
 *      ruleId: // value for 'ruleId'
 *   },
 * });
 */
export function useDeleteRuleMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteRuleMutation,
    DeleteRuleMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    DeleteRuleMutation,
    DeleteRuleMutationVariables
  >(DeleteRuleDocument, options);
}
export type DeleteRuleMutationHookResult = ReturnType<
  typeof useDeleteRuleMutation
>;
export type DeleteRuleMutationResult =
  Apollo.MutationResult<DeleteRuleMutation>;
export type DeleteRuleMutationOptions =
  Apollo.BaseMutationOptions<
    DeleteRuleMutation,
    DeleteRuleMutationVariables
  >;
export const ScenarioDocument = gql`
  query Scenario($scenarioId: ID!) {
    scenario(id: $scenarioId) {
      ...scenarioFragment
    }
  }
  ${ScenarioFragmentFragmentDoc}
`;

/**
 * __useScenarioQuery__
 *
 * To run a query within a React component, call `useScenarioQuery` and pass it any options that fit your needs.
 * When your component renders, `useScenarioQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useScenarioQuery({
 *   variables: {
 *      scenarioId: // value for 'scenarioId'
 *   },
 * });
 */
export function useScenarioQuery(
  baseOptions: Apollo.QueryHookOptions<
    ScenarioQuery,
    ScenarioQueryVariables
  > &
    (
      | {
          variables: ScenarioQueryVariables;
          skip?: boolean;
        }
      | { skip: boolean }
    )
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    ScenarioQuery,
    ScenarioQueryVariables
  >(ScenarioDocument, options);
}
export function useScenarioLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ScenarioQuery,
    ScenarioQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    ScenarioQuery,
    ScenarioQueryVariables
  >(ScenarioDocument, options);
}
export function useScenarioSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        ScenarioQuery,
        ScenarioQueryVariables
      >
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    ScenarioQuery,
    ScenarioQueryVariables
  >(ScenarioDocument, options);
}
export type ScenarioQueryHookResult = ReturnType<
  typeof useScenarioQuery
>;
export type ScenarioLazyQueryHookResult = ReturnType<
  typeof useScenarioLazyQuery
>;
export type ScenarioSuspenseQueryHookResult = ReturnType<
  typeof useScenarioSuspenseQuery
>;
export type ScenarioQueryResult = Apollo.QueryResult<
  ScenarioQuery,
  ScenarioQueryVariables
>;
export const ScenariosConnectionDocument = gql`
  query ScenariosConnection(
    $ids: [ID!]
    $name: String
    $limit: Int
    $offset: Int
    $sorting: ScenariosConnectionSortingInput
  ) {
    scenariosConnection(ids: $ids, name: $name) {
      count
      items(
        limit: $limit
        offset: $offset
        sorting: $sorting
      ) {
        ...scenarioFragment
      }
    }
  }
  ${ScenarioFragmentFragmentDoc}
`;

/**
 * __useScenariosConnectionQuery__
 *
 * To run a query within a React component, call `useScenariosConnectionQuery` and pass it any options that fit your needs.
 * When your component renders, `useScenariosConnectionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useScenariosConnectionQuery({
 *   variables: {
 *      ids: // value for 'ids'
 *      name: // value for 'name'
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *      sorting: // value for 'sorting'
 *   },
 * });
 */
export function useScenariosConnectionQuery(
  baseOptions?: Apollo.QueryHookOptions<
    ScenariosConnectionQuery,
    ScenariosConnectionQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    ScenariosConnectionQuery,
    ScenariosConnectionQueryVariables
  >(ScenariosConnectionDocument, options);
}
export function useScenariosConnectionLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ScenariosConnectionQuery,
    ScenariosConnectionQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    ScenariosConnectionQuery,
    ScenariosConnectionQueryVariables
  >(ScenariosConnectionDocument, options);
}
export function useScenariosConnectionSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        ScenariosConnectionQuery,
        ScenariosConnectionQueryVariables
      >
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    ScenariosConnectionQuery,
    ScenariosConnectionQueryVariables
  >(ScenariosConnectionDocument, options);
}
export type ScenariosConnectionQueryHookResult = ReturnType<
  typeof useScenariosConnectionQuery
>;
export type ScenariosConnectionLazyQueryHookResult =
  ReturnType<typeof useScenariosConnectionLazyQuery>;
export type ScenariosConnectionSuspenseQueryHookResult =
  ReturnType<typeof useScenariosConnectionSuspenseQuery>;
export type ScenariosConnectionQueryResult =
  Apollo.QueryResult<
    ScenariosConnectionQuery,
    ScenariosConnectionQueryVariables
  >;
export const CreateScenarioDocument = gql`
  mutation CreateScenario($input: CreateScenarioInput!) {
    createScenario(input: $input) {
      ...scenarioFragment
    }
  }
  ${ScenarioFragmentFragmentDoc}
`;
export type CreateScenarioMutationFn =
  Apollo.MutationFunction<
    CreateScenarioMutation,
    CreateScenarioMutationVariables
  >;

/**
 * __useCreateScenarioMutation__
 *
 * To run a mutation, you first call `useCreateScenarioMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateScenarioMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createScenarioMutation, { data, loading, error }] = useCreateScenarioMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateScenarioMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateScenarioMutation,
    CreateScenarioMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateScenarioMutation,
    CreateScenarioMutationVariables
  >(CreateScenarioDocument, options);
}
export type CreateScenarioMutationHookResult = ReturnType<
  typeof useCreateScenarioMutation
>;
export type CreateScenarioMutationResult =
  Apollo.MutationResult<CreateScenarioMutation>;
export type CreateScenarioMutationOptions =
  Apollo.BaseMutationOptions<
    CreateScenarioMutation,
    CreateScenarioMutationVariables
  >;
export const UpdateScenarioDocument = gql`
  mutation UpdateScenario(
    $updateScenarioId: ID!
    $input: UpdateScenarioInput!
  ) {
    updateScenario(id: $updateScenarioId, input: $input) {
      ...scenarioFragment
    }
  }
  ${ScenarioFragmentFragmentDoc}
`;
export type UpdateScenarioMutationFn =
  Apollo.MutationFunction<
    UpdateScenarioMutation,
    UpdateScenarioMutationVariables
  >;

/**
 * __useUpdateScenarioMutation__
 *
 * To run a mutation, you first call `useUpdateScenarioMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateScenarioMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateScenarioMutation, { data, loading, error }] = useUpdateScenarioMutation({
 *   variables: {
 *      updateScenarioId: // value for 'updateScenarioId'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateScenarioMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateScenarioMutation,
    UpdateScenarioMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdateScenarioMutation,
    UpdateScenarioMutationVariables
  >(UpdateScenarioDocument, options);
}
export type UpdateScenarioMutationHookResult = ReturnType<
  typeof useUpdateScenarioMutation
>;
export type UpdateScenarioMutationResult =
  Apollo.MutationResult<UpdateScenarioMutation>;
export type UpdateScenarioMutationOptions =
  Apollo.BaseMutationOptions<
    UpdateScenarioMutation,
    UpdateScenarioMutationVariables
  >;
export const DeleteScenarioDocument = gql`
  mutation DeleteScenario($deleteScenarioId: ID!) {
    deleteScenario(id: $deleteScenarioId) {
      ...scenarioFragment
    }
  }
  ${ScenarioFragmentFragmentDoc}
`;
export type DeleteScenarioMutationFn =
  Apollo.MutationFunction<
    DeleteScenarioMutation,
    DeleteScenarioMutationVariables
  >;

/**
 * __useDeleteScenarioMutation__
 *
 * To run a mutation, you first call `useDeleteScenarioMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteScenarioMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteScenarioMutation, { data, loading, error }] = useDeleteScenarioMutation({
 *   variables: {
 *      deleteScenarioId: // value for 'deleteScenarioId'
 *   },
 * });
 */
export function useDeleteScenarioMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteScenarioMutation,
    DeleteScenarioMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    DeleteScenarioMutation,
    DeleteScenarioMutationVariables
  >(DeleteScenarioDocument, options);
}
export type DeleteScenarioMutationHookResult = ReturnType<
  typeof useDeleteScenarioMutation
>;
export type DeleteScenarioMutationResult =
  Apollo.MutationResult<DeleteScenarioMutation>;
export type DeleteScenarioMutationOptions =
  Apollo.BaseMutationOptions<
    DeleteScenarioMutation,
    DeleteScenarioMutationVariables
  >;
export const TransactionDocument = gql`
  query Transaction($transactionId: ID!) {
    transaction(id: $transactionId) {
      ...transactionFragment
    }
  }
  ${TransactionFragmentFragmentDoc}
`;

/**
 * __useTransactionQuery__
 *
 * To run a query within a React component, call `useTransactionQuery` and pass it any options that fit your needs.
 * When your component renders, `useTransactionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTransactionQuery({
 *   variables: {
 *      transactionId: // value for 'transactionId'
 *   },
 * });
 */
export function useTransactionQuery(
  baseOptions: Apollo.QueryHookOptions<
    TransactionQuery,
    TransactionQueryVariables
  > &
    (
      | {
          variables: TransactionQueryVariables;
          skip?: boolean;
        }
      | { skip: boolean }
    )
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    TransactionQuery,
    TransactionQueryVariables
  >(TransactionDocument, options);
}
export function useTransactionLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    TransactionQuery,
    TransactionQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    TransactionQuery,
    TransactionQueryVariables
  >(TransactionDocument, options);
}
export function useTransactionSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        TransactionQuery,
        TransactionQueryVariables
      >
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    TransactionQuery,
    TransactionQueryVariables
  >(TransactionDocument, options);
}
export type TransactionQueryHookResult = ReturnType<
  typeof useTransactionQuery
>;
export type TransactionLazyQueryHookResult = ReturnType<
  typeof useTransactionLazyQuery
>;
export type TransactionSuspenseQueryHookResult = ReturnType<
  typeof useTransactionSuspenseQuery
>;
export type TransactionQueryResult = Apollo.QueryResult<
  TransactionQuery,
  TransactionQueryVariables
>;
export const TransactionsConnectionDocument = gql`
  query TransactionsConnection(
    $amount: Float
    $currency: Currency
    $externalIds: [String!]
    $ids: [String!]
    $sourceAccount: String
    $targetAccount: String
    $limit: Int
    $offset: Int
    $sorting: TransactionsConnectionSortingInput
  ) {
    transactionsConnection(
      amount: $amount
      currency: $currency
      externalIds: $externalIds
      ids: $ids
      sourceAccount: $sourceAccount
      targetAccount: $targetAccount
    ) {
      count
      items(
        limit: $limit
        offset: $offset
        sorting: $sorting
      ) {
        ...transactionFragment
      }
    }
  }
  ${TransactionFragmentFragmentDoc}
`;

/**
 * __useTransactionsConnectionQuery__
 *
 * To run a query within a React component, call `useTransactionsConnectionQuery` and pass it any options that fit your needs.
 * When your component renders, `useTransactionsConnectionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTransactionsConnectionQuery({
 *   variables: {
 *      amount: // value for 'amount'
 *      currency: // value for 'currency'
 *      externalIds: // value for 'externalIds'
 *      ids: // value for 'ids'
 *      sourceAccount: // value for 'sourceAccount'
 *      targetAccount: // value for 'targetAccount'
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *      sorting: // value for 'sorting'
 *   },
 * });
 */
export function useTransactionsConnectionQuery(
  baseOptions?: Apollo.QueryHookOptions<
    TransactionsConnectionQuery,
    TransactionsConnectionQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    TransactionsConnectionQuery,
    TransactionsConnectionQueryVariables
  >(TransactionsConnectionDocument, options);
}
export function useTransactionsConnectionLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    TransactionsConnectionQuery,
    TransactionsConnectionQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    TransactionsConnectionQuery,
    TransactionsConnectionQueryVariables
  >(TransactionsConnectionDocument, options);
}
export function useTransactionsConnectionSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        TransactionsConnectionQuery,
        TransactionsConnectionQueryVariables
      >
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    TransactionsConnectionQuery,
    TransactionsConnectionQueryVariables
  >(TransactionsConnectionDocument, options);
}
export type TransactionsConnectionQueryHookResult =
  ReturnType<typeof useTransactionsConnectionQuery>;
export type TransactionsConnectionLazyQueryHookResult =
  ReturnType<typeof useTransactionsConnectionLazyQuery>;
export type TransactionsConnectionSuspenseQueryHookResult =
  ReturnType<typeof useTransactionsConnectionSuspenseQuery>;
export type TransactionsConnectionQueryResult =
  Apollo.QueryResult<
    TransactionsConnectionQuery,
    TransactionsConnectionQueryVariables
  >;
export const CreateTransactionsDocument = gql`
  mutation CreateTransactions(
    $input: CreateTransactionsInput!
  ) {
    createTransactions(input: $input) {
      success
    }
  }
`;
export type CreateTransactionsMutationFn =
  Apollo.MutationFunction<
    CreateTransactionsMutation,
    CreateTransactionsMutationVariables
  >;

/**
 * __useCreateTransactionsMutation__
 *
 * To run a mutation, you first call `useCreateTransactionsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTransactionsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTransactionsMutation, { data, loading, error }] = useCreateTransactionsMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateTransactionsMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateTransactionsMutation,
    CreateTransactionsMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateTransactionsMutation,
    CreateTransactionsMutationVariables
  >(CreateTransactionsDocument, options);
}
export type CreateTransactionsMutationHookResult =
  ReturnType<typeof useCreateTransactionsMutation>;
export type CreateTransactionsMutationResult =
  Apollo.MutationResult<CreateTransactionsMutation>;
export type CreateTransactionsMutationOptions =
  Apollo.BaseMutationOptions<
    CreateTransactionsMutation,
    CreateTransactionsMutationVariables
  >;
export const CreateTransactionDocument = gql`
  mutation CreateTransaction(
    $input: CreateTransactionInput!
  ) {
    createTransaction(input: $input) {
      ...transactionFragment
    }
  }
  ${TransactionFragmentFragmentDoc}
`;
export type CreateTransactionMutationFn =
  Apollo.MutationFunction<
    CreateTransactionMutation,
    CreateTransactionMutationVariables
  >;

/**
 * __useCreateTransactionMutation__
 *
 * To run a mutation, you first call `useCreateTransactionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTransactionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTransactionMutation, { data, loading, error }] = useCreateTransactionMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateTransactionMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateTransactionMutation,
    CreateTransactionMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateTransactionMutation,
    CreateTransactionMutationVariables
  >(CreateTransactionDocument, options);
}
export type CreateTransactionMutationHookResult =
  ReturnType<typeof useCreateTransactionMutation>;
export type CreateTransactionMutationResult =
  Apollo.MutationResult<CreateTransactionMutation>;
export type CreateTransactionMutationOptions =
  Apollo.BaseMutationOptions<
    CreateTransactionMutation,
    CreateTransactionMutationVariables
  >;
