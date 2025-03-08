import { GraphQLScalarType, Kind } from 'graphql';

const ALLOWED_VALUES = ['ACTIVE', 'DONE'];

function validate(value: unknown): string | never {
  if (
    typeof value !== 'string' ||
    !ALLOWED_VALUES.includes(value)
  ) {
    throw new Error('invalid uuid');
  }
  return value;
}

export const AlertStatusScalar = new GraphQLScalarType({
  name: 'AlertStatus',
  description: 'AlertStatus custom scalar type',
  serialize: (value) => validate(value),
  parseValue: (value) => validate(value),
  parseLiteral(ast) {
    if (ast.kind !== Kind.STRING) {
      throw new Error(`Invalid alert status value: ${ast}`);
    }
    return validate(ast.value);
  },
});
