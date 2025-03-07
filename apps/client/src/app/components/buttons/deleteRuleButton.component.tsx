import {
  Alert,
  AlertActions,
  AlertDescription,
  AlertTitle,
  Button,
} from '@transaction-monitoring/client-components';
import { FunctionComponent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useDeleteRuleMutation } from '../../../utils/generated';
import { ToastIntent } from '../../../utils/providers/toasts/toastProvider';
import { useToast } from '../../../utils/providers/toasts/toastService';

interface DeleteButtonComponentProps {
  ruleId: string;
}

const DeleteButtonComponent: FunctionComponent<DeleteButtonComponentProps> =
  function ({ ruleId }) {
    const [isOpen, setIsOpen] = useState(false);
    const toast = useToast();
    const navigate = useNavigate();
    const [deleteRule] = useDeleteRuleMutation({
      variables: { ruleId },
      onCompleted() {
        toast.open({
          intent: ToastIntent.SUCCESS,
          title: 'Rule deleted with success',
        });
        navigate('/rules');
      },
      refetchQueries: ['RulesConnection'],
    });

    const handleDelete = () => {
      deleteRule();
      setIsOpen(false);
    };

    return (
      <>
        <Button
          className="hover:cursor-pointer p-1.5 bg-red-950"
          type="button"
          onClick={() => setIsOpen(true)}
        >
          Delete rule
        </Button>
        <Alert
          open={isOpen}
          onClose={setIsOpen}
        >
          <AlertTitle>
            Are you sure you want to delete this rule?
          </AlertTitle>
          <AlertDescription>
            Once rule is deleted, it will be detached from
            the scenario.
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

export default DeleteButtonComponent;
