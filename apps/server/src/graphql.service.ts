import { join } from 'path';

import { ApolloServerPluginLandingPageDisabled } from '@apollo/server/plugin/disabled';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { ApolloDriverConfig } from '@nestjs/apollo';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GqlOptionsFactory } from '@nestjs/graphql';
import { EnvironmentVariables } from '@transaction-monitoring/core';

@Injectable()
export class GraphQLModuleConfigService implements GqlOptionsFactory {
  constructor(
    private readonly config: ConfigService<EnvironmentVariables, true>
  ) {}
  createGqlOptions(): ApolloDriverConfig {
    const environment = this.config.get('environment');
    return {
      autoSchemaFile: join(
        process.cwd(),
        './apps/api/src/utils/generated/schema.gql'
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
    };
  }
}
