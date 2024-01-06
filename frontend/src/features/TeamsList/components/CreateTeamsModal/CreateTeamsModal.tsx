import { Button, Modal, TextInput, Group, NativeSelect, Alert, LoadingOverlay } from "@mantine/core";
import { useForm } from '@mantine/form';
import Team from "../../../../types/Team";

interface AddTeamFormValues {
  TeamName: string;
  internalReference: string;
  teamId?: string;
  developmentLeadUsername?: string;
}

type CreateTeamModalProps = {
  opened: boolean;
  onClose: () => void;
  onSuccess: (Team: Team) => void;
}

const CreateTeamModal = ({ opened, onClose, onSuccess }: CreateTeamModalProps) => {
  // Get the current user's teams from the API
  // We do this here and don't just use the user context
  // because it saves the user having to log out and back in again

  const addTeamForm = useForm<AddTeamFormValues>({
    initialValues: {
      TeamName: '',
      internalReference: '',
      teamId: '',
      developmentLeadUsername: '',
    },
  });

  return (
    <Modal.Root opened={opened} onClose={onClose}>
      <Modal.Overlay />
      <Modal.Content>
        <Modal.Header>
          <Modal.Title>Add Team</Modal.Title>
          <Modal.CloseButton />
        </Modal.Header>
        <Modal.Body>
          
        </Modal.Body>
      </Modal.Content>
    </Modal.Root>
  )
}
export default CreateTeamModal;