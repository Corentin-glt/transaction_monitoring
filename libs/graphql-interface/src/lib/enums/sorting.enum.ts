import { registerEnumType } from '@nestjs/graphql';

export enum SortingEnum {
  asc = 'asc',
  desc = 'desc',
}

registerEnumType(SortingEnum, {
  name: 'SortingEnum',
});
