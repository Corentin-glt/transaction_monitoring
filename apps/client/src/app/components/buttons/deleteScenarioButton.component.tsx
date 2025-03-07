import {
  Alert,
  AlertActions,
  AlertDescription,
  AlertTitle,
  Button,
} from '@transaction-monitoring/client-components';
import { FunctionComponent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useDeleteScenarioMutation } from '../../../utils/generated';
import { ToastIntent } from '../../../utils/providers/toasts/toastProvider';
import { useToast } from '../../../utils/providers/toasts/toastService';

interface DeleteScenarioButtonComponentProps {
  scenarioId: string;
}

const DeleteScenarioButtonComponent: FunctionComponent<DeleteScenarioButtonComponentProps> =
  function ({ scenarioId }) {
    const [isOpen, setIsOpen] = useState(false);
    const toast = useToast();
    const navigate = useNavigate();
    const [deleteScenario] = useDeleteScenarioMutation({
      variables: { deleteScenarioId: scenarioId },
      onCompleted() {
        toast.open({
          intent: ToastIntent.SUCCESS,
          title: 'Scenario deleted with success',
        });
        navigate('/scenarios');
      },
      refetchQueries: ['ScenariosConnection', 'RulesConnection'],
    });

    const handleDelete = () => {
      deleteScenario();
      setIsOpen(false);
    };

    return (
      <>
        <Button
          className="hover:cursor-pointer p-1.5 bg-red-950"
          type="button"
          onClick={() => setIsOpen(true)}
        >
          Delete scenario
        </Button>
        <Alert
          open={isOpen}
          onClose={setIsOpen}
        >
          <AlertTitle>
            Are you sure you want to delete this scenario?
          </AlertTitle>
          <AlertDescription>
            Once scenario is deleted, it will be detached
            from the rules.
          </AlertDescription>
          <AlertActions>
            <Button
              className="hover:cursor-pointer p-1.5"
              plain
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </Button>
            <Button
              className="hover:cursor-pointer p-1.5 bg-red-950"
              onClick={handleDelete}
            >
              Delete
            </Button>
          </AlertActions>
        </Alert>
      </>
    );
  };

export default DeleteScenarioButtonComponent;
