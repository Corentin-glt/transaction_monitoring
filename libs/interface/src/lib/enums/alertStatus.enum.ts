function mkenum<
  T extends { [index: string]: U },
  U extends string
>(x: T) {
  return x;
}

export const AlertStatusValues = {
  ACTIVE: 'ACTIVE',
  DONE: 'DONE',
};

const AlertStatus = mkenum(AlertStatusValues);
export type AlertStatus = keyof typeof AlertStatus;
