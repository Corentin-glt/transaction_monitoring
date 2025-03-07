import {
  Args,
  ID,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';

import {
  CreateScenarioInput,
  Scenario,
  ScenariosConnection,
  ScenariosConnectionArgs,
  ScenariosConnectionItemsArgs,
  UpdateScenarioInput,
} from './scenarios.dto';
import { ScenariosService } from './scenarios.service';
import { Rule } from '../rules/rules.dto';

@Resolver(() => Scenario)
export class ScenariosResolver {
  constructor(
    private readonly scenariosService: ScenariosService
  ) {}

  @Query(() => Scenario)
  async scenario(
    @Args('id', { type: () => ID }) id: string
  ): Promise<Scenario> {
    return this.scenariosService.getScenarioById(id);
  }

  @Query(() => ScenariosConnection)
  public scenariosConnection(
    @Args() args: ScenariosConnectionArgs
  ) {
    return {
      ids: args.ids,
      name: args.name,
    };
  }

  @Mutation(() => Scenario)
  async createScenario(
    @Args('input') input: CreateScenarioInput
  ) {
    return this.scenariosService.createScenario(input);
  }

  @Mutation(() => Scenario)
  async updateScenario(
    @Args('id', { type: () => ID }) id: string,
    @Args('input') input: UpdateScenarioInput
  ) {
    return this.scenariosService.updateScenario(id, input);
  }

  @Mutation(() => Scenario)
  async deleteScenario(
    @Args('id', { type: () => ID }) id: string
  ) {
    return this.scenariosService.deleteScenario(id);
  }

  @ResolveField('rules')
  async rules(@Parent() parent: Scenario): Promise<Rule[]> {
    return this.scenariosService.getScenarioRules(
      parent.id
    );
  }
}

@Resolver(ScenariosConnection)
export class ScenarioConnectionResolver {
  constructor(
    private readonly scenariosService: ScenariosService
  ) {}

  @ResolveField('count')
  count(
    @Parent() parent: ScenariosConnectionArgs
  ): Promise<number> {
    return this.scenariosService.countScenarios(parent);
  }

  @ResolveField('items')
  items(
    @Parent() parent: ScenariosConnectionArgs,
    @Args() args: ScenariosConnectionItemsArgs
  ): Promise<Scenario[]> {
    return this.scenariosService.findScenarios(
      parent,
      args
    );
  }
}
