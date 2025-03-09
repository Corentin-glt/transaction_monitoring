import {
  ApolloClient,
  createHttpLink,
  FieldPolicy,
  from,
  InMemoryCache,
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import {
  getMainDefinition,
  isReference,
  Reference,
} from '@apollo/client/utilities';
import {
  GraphQLError,
  GraphQLFormattedError,
} from 'graphql';
import { createClient } from 'graphql-ws';

import { toastsVar } from './utils/cache';
import { ToastIntent } from './utils/providers/toasts/toastProvider';

const httpLink = createHttpLink({
  uri: `${import.meta.env.VITE_SERVER_ENDPOINT}/graphql`,
});

const wsLink = new GraphQLWsLink(
  createClient({
    url: `${import.meta.env.VITE_SERVER_WS}/graphql`,
  })
);

const createNewErrorMessage = (params: {
  message: string;
  intent: ToastIntent;
  title: string;
}) => {
  const toasts = toastsVar();
  const id = Date.now();
  toastsVar([...toasts, { id, ...params }]);
  setTimeout(
    () =>
      toastsVar(toasts.filter((toast) => toast.id !== id)),
    5000
  );
};

const defaultError = (
  graphQLError: GraphQLError | GraphQLFormattedError
) => {
  return createNewErrorMessage({
    intent: ToastIntent.ERROR,
    title: 'Face to an error',
    message: graphQLError.message,
  });
};

const errorLink = onError(
  ({ graphQLErrors, networkError, operation }) => {
    if (graphQLErrors) {
      for (const graphQLError of graphQLErrors) {
        const definition = getMainDefinition(
          operation.query
        );
        if (definition.name?.value === 'Me') continue;
        defaultError(graphQLError);
      }
    }

    if (networkError) {
      createNewErrorMessage({
        intent: ToastIntent.ERROR,
        title: 'We lose connection',
        message: 'Please to try again later.',
      });
    }
  }
);

type KeyArgs = FieldPolicy['keyArgs'];
/** A basic field policy that uses offset arg to splice
 * the incoming data into the existing array.
 * @see https://github.com/apollographql/apollo-client/blob/8e92be3e8b791187d8557fccd30ffc82feac5cd4/src/utilities/policies/pagination.ts#L27
 */
function offsetPagination<T = Reference>(
  keyArgs: KeyArgs = false,
  offsetKey = 'offset',
  options = { shouldRead: false }
): FieldPolicy<T[]> {
  const { shouldRead } = options;
  return {
    keyArgs,
    merge(existing, incoming, { args, canRead }) {
      if (!args) return incoming;

      let items = existing ? existing.slice(0) : [];
      items = shouldRead
        ? items.filter(
            (item) => isReference(item) && canRead(item)
          )
        : items;

      const offset = args[offsetKey] ?? 0;
      for (let i = 0; i < incoming.length; ++i) {
        items[offset + i] = incoming[i];
      }

      return items;
    },
  };
}

const client = new ApolloClient({
  link: from([errorLink, httpLink, wsLink]),
  cache: new InMemoryCache({
    typePolicies: {
      TransactionsConnection: {
        fields: {
          items: {
            ...offsetPagination(),
            read(existing, { args }) {
              if (!args) return existing;
              const offset = args.offset || 0;
              const limit = args.limit || existing?.length;

              return (
                existing &&
                existing.slice(offset, offset + limit)
              );
            },
          },
        },
      },

      RulesConnection: {
        fields: {
          items: {
            ...offsetPagination(),
            read(existing, { args }) {
              if (!args) return existing;
              const offset = args.offset || 0;
              const limit = args.limit || existing?.length;

              return (
                existing &&
                existing.slice(offset, offset + limit)
              );
            },
          },
        },
      },

      ScenariosConnection: {
        fields: {
          items: {
            ...offsetPagination(),
            read(existing, { args }) {
              if (!args) return existing;
              const offset = args.offset || 0;
              const limit = args.limit || existing?.length;

              return (
                existing &&
                existing.slice(offset, offset + limit)
              );
            },
          },
        },
      },

      AlertsConnection: {
        fields: {
          items: {
            ...offsetPagination(),
            read(existing, { args }) {
              if (!args) return existing;
              const offset = args.offset || 0;
              const limit = args.limit || existing?.length;

              return (
                existing &&
                existing.slice(offset, offset + limit)
              );
            },
          },
        },
      },

      Query: {
        fields: {
          transaction(_, { args, toReference }) {
            if (!args) return null;
            return toReference({
              __typename: 'Transaction',
              id: args.id,
            });
          },
          rule(_, { args, toReference }) {
            if (!args) return null;
            return toReference({
              __typename: 'Rule',
              id: args.id,
            });
          },
          scenario(_, { args, toReference }) {
            if (!args) return null;
            return toReference({
              __typename: 'Scenario',
              id: args.id,
            });
          },
        },
      },
    },
  }),
});

export default client;
