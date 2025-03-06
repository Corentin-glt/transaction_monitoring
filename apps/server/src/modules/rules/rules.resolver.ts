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
  CreateRuleInput,
  Rule,
  RulesConnection,
  RulesConnectionArgs,
  RulesConnectionItemsArgs,
  UpdateRuleInput,
} from './rules.dto';
import { RulesService } from './rules.service';

@Resolver(() => Rule)
export class RulesResolver {
  constructor(
    private readonly rulesService: RulesService
  ) {}

  @Query(() => Rule)
  async rule(
    @Args('id', { type: () => ID }) id: string
  ): Promise<Rule> {
    return this.rulesService.getRuleById(id);
  }

  @Query(() => RulesConnection)
  public rulesConnection(
    @Args() args: RulesConnectionArgs
  ) {
    return {
      ids: args.ids,
      name: args.name,
    };
  }

  @Mutation(() => Rule)
  async createRule(@Args('input') input: CreateRuleInput) {
    return this.rulesService.createRule(input);
  }

  @Mutation(() => Rule)
  async updateRule(
    @Args('id', { type: () => ID }) id: string,
    @Args('input') input: UpdateRuleInput
  ) {
    return this.rulesService.updateRule(id, input);
  }

  //TODO: ResolveField of scenarios when it wll be available
}

@Resolver(RulesConnection)
export class RuleConnectionResolver {
  constructor(
    private readonly rulesService: RulesService
  ) {}

  @ResolveField('count')
  count(
    @Parent() parent: RulesConnectionArgs
  ): Promise<number> {
    return this.rulesService.countRules(parent);
  }

  @ResolveField('items')
  items(
    @Parent() parent: RulesConnectionArgs,
    @Args() args: RulesConnectionItemsArgs
  ): Promise<Rule[]> {
    return this.rulesService.findRules(parent, args);
  }
}
