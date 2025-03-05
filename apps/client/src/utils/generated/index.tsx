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
  /** Currency custom scalar type */
  Currency: { input: any; output: any };
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any };
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: { input: any; output: any };
};

export type BulkInsertTransaction = {
  __typename?: 'BulkInsertTransaction';
  success: Scalars['Boolean']['output'];
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
  createTransaction: Transaction;
  createTransactions: BulkInsertTransaction;
};

export type MutationCreateTransactionArgs = {
  input: CreateTransactionInput;
};

export type MutationCreateTransactionsArgs = {
  input: CreateTransactionsInput;
};

export type Query = {
  __typename?: 'Query';
  getTransactionById: Transaction;
  transactionsConnection: TransactionsConnection;
};

export type QueryGetTransactionByIdArgs = {
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

export enum SortingEnum {
  Asc = 'asc',
  Desc = 'desc',
}

export type Transaction = {
  __typename?: 'Transaction';
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
};

export type GetTransactionByIdQueryVariables = Exact<{
  getTransactionByIdId: Scalars['ID']['input'];
}>;

export type GetTransactionByIdQuery = {
  __typename?: 'Query';
  getTransactionById: {
    __typename?: 'Transaction';
    id: string;
    amount: number;
    currency: any;
    createdAt: any;
    externalId: string;
    metadata?: any | null;
    sourceAccount: string;
    targetAccount: string;
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
  };
};

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
  }
`;
export const GetTransactionByIdDocument = gql`
  query GetTransactionById($getTransactionByIdId: ID!) {
    getTransactionById(id: $getTransactionByIdId) {
      ...transactionFragment
    }
  }
  ${TransactionFragmentFragmentDoc}
`;

/**
 * __useGetTransactionByIdQuery__
 *
 * To run a query within a React component, call `useGetTransactionByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTransactionByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTransactionByIdQuery({
 *   variables: {
 *      getTransactionByIdId: // value for 'getTransactionByIdId'
 *   },
 * });
 */
export function useGetTransactionByIdQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetTransactionByIdQuery,
    GetTransactionByIdQueryVariables
  > &
    (
      | {
          variables: GetTransactionByIdQueryVariables;
          skip?: boolean;
        }
      | { skip: boolean }
    )
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetTransactionByIdQuery,
    GetTransactionByIdQueryVariables
  >(GetTransactionByIdDocument, options);
}
export function useGetTransactionByIdLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetTransactionByIdQuery,
    GetTransactionByIdQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetTransactionByIdQuery,
    GetTransactionByIdQueryVariables
  >(GetTransactionByIdDocument, options);
}
export function useGetTransactionByIdSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        GetTransactionByIdQuery,
        GetTransactionByIdQueryVariables
      >
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    GetTransactionByIdQuery,
    GetTransactionByIdQueryVariables
  >(GetTransactionByIdDocument, options);
}
export type GetTransactionByIdQueryHookResult = ReturnType<
  typeof useGetTransactionByIdQuery
>;
export type GetTransactionByIdLazyQueryHookResult =
  ReturnType<typeof useGetTransactionByIdLazyQuery>;
export type GetTransactionByIdSuspenseQueryHookResult =
  ReturnType<typeof useGetTransactionByIdSuspenseQuery>;
export type GetTransactionByIdQueryResult =
  Apollo.QueryResult<
    GetTransactionByIdQuery,
    GetTransactionByIdQueryVariables
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
