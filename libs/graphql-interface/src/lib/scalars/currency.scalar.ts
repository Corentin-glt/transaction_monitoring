import { GraphQLScalarType, Kind } from 'graphql';

const ALLOWED_VALUES = ['EUROS', 'DOLLARS'];

function validate(value: unknown): string | never {
  if (
    typeof value !== 'string' ||
    !ALLOWED_VALUES.includes(value)
  ) {
    throw new Error('invalid uuid');
  }
  return value;
}

export const CurrencyScalar = new GraphQLScalarType({
  name: 'Currency',
  description: 'Currency custom scalar type',
  serialize: (value) => validate(value),
  parseValue: (value) => validate(value),
  parseLiteral(ast) {
    if (ast.kind !== Kind.STRING) {
      throw new Error(
        `Invalid currency value: ${ast}`
      );
    }
    return validate(ast.value);
  },
});
