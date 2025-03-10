import { join } from 'path';

import { ApolloServerPluginLandingPageDisabled } from '@apollo/server/plugin/disabled';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { ApolloDriverConfig } from '@nestjs/apollo';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GqlOptionsFactory } from '@nestjs/graphql';
import { EnvironmentVariables } from '@transaction-monitoring/core';
import {
  AlertStatusScalar,
  CurrencyScalar,
} from '@transaction-monitoring/graphql-interface';
import GraphQLJSON from 'graphql-type-json';

@Injectable()
export class GraphQLModuleConfigService
  implements GqlOptionsFactory
{
  constructor(
    private readonly config: ConfigService<
      EnvironmentVariables,
      true
    >
  ) {}
  createGqlOptions(): ApolloDriverConfig {
    const environment = this.config.get('environment');
    return {
      autoSchemaFile: join(
        process.cwd(),
        './apps/server/src/utils/generated/schema.gql'
      ),
      sortSchema: true,
      // debug: environment !== 'PRODUCTION',
      introspection: environment !== 'production',
      playground: false,
      plugins: [
        environment === 'production'
          ? ApolloServerPluginLandingPageDisabled()
          : ApolloServerPluginLandingPageLocalDefault(),
      ],
      persistedQueries: false,
      context: ({ req, res }) => ({ req, res }),
      buildSchemaOptions: {
        scalarsMap: [
          {
            type: () => 'Currency',
            scalar: CurrencyScalar,
          },
          {
            type: () => 'AlertStatus',
            scalar: AlertStatusScalar,
          },
          {
            type: () => JSON,
            scalar: GraphQLJSON,
          },
        ],
      },
      subscriptions: {
        'graphql-ws': true,
      },
    };
  }
}
