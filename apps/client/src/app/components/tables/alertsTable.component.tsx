import {
  Badge,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@transaction-monitoring/client-components';
import { FunctionComponent } from 'react';
import { useNavigate } from 'react-router-dom';

import { Alert } from '../../../utils/generated';

interface AlertsTableComponentProps {
  alerts: Alert[];
}

const AlertsTableComponent: FunctionComponent<AlertsTableComponentProps> =
  function ({ alerts }) {
    const navigate = useNavigate();
    return (
      <Table>
        <TableHead>
          <TableRow>
            <TableHeader>Creation date</TableHeader>
            <TableHeader>Scenario</TableHeader>
            <TableHeader>Rule</TableHeader>
            <TableHeader>Transaction</TableHeader>
            <TableHeader className="text-right">
              Status
            </TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {alerts.map((alert) => {
            return (
              <TableRow
                className="hover:cursor-pointer hover:bg-zinc-800"
                key={alert.id}
                onClick={() =>
                  navigate(`/alerts/${alert.id}`)
                }
              >
                <TableCell className="text-sm">
                  {new Date(
                    alert.createdAt
                  ).toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </TableCell>
                <TableCell>
                  <Badge color="lime">
                    {alert.scenario.name}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge color="emerald">
                    {alert.rule.name}
                  </Badge>
                </TableCell>
                {alert.transactions &&
                alert.transactions.length > 0 ? (
                  <TableCell>
                    {alert.transactions.length}{' '}
                    transaction(s) that has been affected
                  </TableCell>
                ) : (
                  '-'
                )}
                <TableCell className="text-right">
                  {alert.status}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    );
  };

export default AlertsTableComponent;
