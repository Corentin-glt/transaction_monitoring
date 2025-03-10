import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@transaction-monitoring/client-components';
import { FunctionComponent } from 'react';
import { useNavigate } from 'react-router-dom';

import { displayCurrencyType } from '../../../utils/displayCurrency';
import { Transaction } from '../../../utils/generated';

interface TransactionsTableComponentProps {
  transactions: Transaction[];
}

const TransactionsTableComponent: FunctionComponent<TransactionsTableComponentProps> =
  function ({ transactions }) {
    const navigate = useNavigate();
    return (
      <Table
        dense
        className="[--gutter:--spacing(6)] sm:[--gutter:--spacing(8)]"
      >
        <TableHead>
          <TableRow>
            <TableHeader>Source Account</TableHeader>
            <TableHeader>Target Account</TableHeader>
            <TableHeader>External Id</TableHeader>
            <TableHeader>Creation date</TableHeader>
            <TableHeader className="text-right">
              Currency
            </TableHeader>
            <TableHeader className="text-right">
              Amount
            </TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions.map((transaction) => {
            const { label, symbol } = displayCurrencyType(
              transaction.currency
            );
            return (
              <TableRow
                className="hover:cursor-pointer hover:bg-zinc-800"
                key={transaction.id}
                onClick={() =>
                  navigate(
                    `/transactions/${transaction.id}`
                  )
                }
              >
                <TableCell className="font-medium">
                  {transaction.sourceAccount}
                </TableCell>
                <TableCell className="font-medium">
                  {transaction.targetAccount}
                </TableCell>
                <TableCell>
                  {transaction.externalId}
                </TableCell>
                <TableCell className="text-sm">
                  {new Date(
                    transaction.createdAt
                  ).toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </TableCell>
                <TableCell className="text-right tabular-nums">
                  {label}
                </TableCell>
                <TableCell className="text-right tabular-nums">
                  {transaction.amount + ' '}
                  {symbol}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    );
  };

export default TransactionsTableComponent;
