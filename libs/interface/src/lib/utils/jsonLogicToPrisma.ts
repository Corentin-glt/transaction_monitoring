import { isEmpty } from 'lodash';

type PrismaFilter = {
  AND?: PrismaFilter[];
  OR?: PrismaFilter[];
  [key: string]: any;
};

type AggregatePrisma = {
  _sum: {
    amount: true;
  };
  where: PrismaFilter;
};

const operatorMapping: { [key: string]: string } = {
  '==': 'equals',
  '!=': 'not',
  '>': 'gt',
  '>=': 'gte',
  '<': 'lt',
  '<=': 'lte',
};

export function jsonLogicToPrismaAggregate(
  jsonLogicRule: any
): AggregatePrisma {
  const filter: PrismaFilter =
    convertJsonLogicToFilterWithoutAmount(jsonLogicRule);
  return {
    _sum: {
      amount: true,
    },
    where: filter,
  };
}

function convertJsonLogicToFilterWithoutAmount(
  jsonLogicRule: any
): PrismaFilter {
  if (jsonLogicRule.and) {
    const filters = jsonLogicRule.and
      .map(convertJsonLogicToFilterWithoutAmount)
      .filter((filter: PrismaFilter) => !isEmpty(filter));
    return filters.length > 0 ? { AND: filters } : {};
  }

  if (jsonLogicRule.or) {
    const filters = jsonLogicRule.or
      .map(convertJsonLogicToFilterWithoutAmount)
      .filter((filter: PrismaFilter) => !isEmpty(filter));
    return filters.length > 0 ? { OR: filters } : {};
  }

  for (const [operator, prismaOperator] of Object.entries(
    operatorMapping
  )) {
    if (jsonLogicRule[operator]) {
      const [value1, value2] = jsonLogicRule[operator];
      const field = value1.var ? value1.var : value2.var;
      let value = value1.var ? value2 : value1;

      if (field === 'amount') {
        return {};
      }

      if (field === 'createdAt') {
        value = new Date(value);
      }

      return {
        [field]: { [prismaOperator]: value },
      };
    }
  }

  throw new Error('Unsupported jsonLogic rule');
}

export function retrieveOnlyAmountFilter(
  jsonLogicRule: any
): any {
  if (jsonLogicRule.and) {
    return jsonLogicRule.and
      .map(retrieveOnlyAmountFilter)
      .filter((filter: PrismaFilter) => !isEmpty(filter));
  }

  if (jsonLogicRule.or) {
   return jsonLogicRule.or
      .map(retrieveOnlyAmountFilter)
      .filter((filter: PrismaFilter) => !isEmpty(filter));
  }

  for (const [operator] of Object.entries(
    operatorMapping
  )) {
    if (jsonLogicRule[operator]) {
      const [value1, value2] = jsonLogicRule[operator];
      const field = value1.var ? value1.var : value2.var;

      if (field === 'amount') {
        return jsonLogicRule;
      }

      return {};
    }
  }

  throw new Error('Unsupported jsonLogic rule');
}
