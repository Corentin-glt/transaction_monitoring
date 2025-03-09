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

import { Scenario } from '../../../utils/generated';

interface ScenariosTableComponentProps {
  scenarios: Scenario[];
}

const ScenariosTableComponent: FunctionComponent<ScenariosTableComponentProps> =
  function ({ scenarios }) {
    const navigate = useNavigate();
    return (
      <Table>
        <TableHead>
          <TableRow>
            <TableHeader>Name</TableHeader>
            <TableHeader>Creation date</TableHeader>
            <TableHeader>Rules</TableHeader>
            <TableHeader className="text-right">
              Enabled
            </TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {scenarios.map((scenario) => {
            return (
              <TableRow
                className="hover:cursor-pointer hover:bg-zinc-800"
                key={scenario.id}
                onClick={() =>
                  navigate(`/scenarios/${scenario.id}`)
                }
              >
                <TableCell className="font-medium">
                  {scenario.name}
                </TableCell>
                <TableCell className="text-sm">
                  {new Date(
                    scenario.createdAt
                  ).toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </TableCell>
                <TableCell>
                  <div className="flex gap-3">
                    {scenario.rules?.map((r) => (
                      <Badge
                        key={r.id}
                        color="emerald"
                      >
                        {r.name}
                      </Badge>
                    )) || '-'}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  {scenario.isEnabled ? 'Yes' : 'No'}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    );
  };

export default ScenariosTableComponent;
