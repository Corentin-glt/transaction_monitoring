function mkenum<
  T extends { [index: string]: U },
  U extends string
>(x: T) {
  return x;
}

export const CurrencyValues = {
  DOLLARS: 'DOLLARS',
  EUROS: 'EUROS',
};

const Currency = mkenum(CurrencyValues);
export type Currency = keyof typeof Currency;
