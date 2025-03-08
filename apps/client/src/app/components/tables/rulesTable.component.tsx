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

import { Rule } from '../../../utils/generated';

interface RulesTableComponentProps {
  rules: Rule[];
}

const RulesTableComponent: FunctionComponent<RulesTableComponentProps> =
  function ({ rules }) {
    const navigate = useNavigate();
    return (
      <Table>
        <TableHead>
          <TableRow>
            <TableHeader>Name</TableHeader>
            <TableHeader>Creation date</TableHeader>
            <TableHeader>Scenarios</TableHeader>
            <TableHeader className="text-right">
              Aggregate
            </TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {rules.map((rule) => {
            return (
              <TableRow
                className="hover:cursor-pointer hover:bg-zinc-800"
                key={rule.id}
                onClick={() =>
                  navigate(`/rules/${rule.id}`)
                }
              >
                <TableCell className="font-medium">
                  {rule.name}
                </TableCell>
                <TableCell className="text-sm">
                  {new Date(
                    rule.createdAt
                  ).toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </TableCell>
                <TableCell>
                  <div className="flex gap-3">
                    {rule.scenarios?.map((s) => (
                      <Badge
                        key={s.id}
                        color="lime"
                      >
                        {s.name}
                      </Badge>
                    )) || '-'}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  {rule.isAggregate ? 'Yes' : 'No'}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    );
  };

export default RulesTableComponent;
