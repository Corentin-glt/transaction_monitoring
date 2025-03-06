import {
  Currency,
  CurrencyValues,
} from '@transaction-monitoring/interface';

export function displayCurrencyType(type: Currency): {
  symbol: string;
  label: string;
} {
  switch (type) {
    case CurrencyValues.EUROS:
      return {
        label: 'EUR',
        symbol: '€',
      };
    case CurrencyValues.DOLLARS:
      return {
        label: 'USD',
        symbol: '$',
      };
    default:
      return {
        label: 'EUR',
        symbol: '€',
      };
  }
}
