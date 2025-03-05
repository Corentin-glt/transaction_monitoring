function mkenum<
  T extends { [index: string]: U },
  U extends string
>(x: T) {
  return x;
}

export const SortingValues = {
  asc: 'asc',
  desc: 'desc',
};

const Sorting = mkenum(SortingValues);
export type Sorting = keyof typeof Sorting;
