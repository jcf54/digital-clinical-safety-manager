import { Button, Modal, TextInput, Group, NativeSelect, Alert } from "@mantine/core";
import { useForm } from '@mantine/form';
import { useCallback, useEffect } from "react";
import useREST from "../../../../hooks/useREST";
import Team from "../../../../types/Team";
import { add } from "date-fns";

interface AddProjectFormValues {
  projectName: string;
  internalReference: string;
  team?: string;
  developmentLead?: string;
}

type CreateProjectModalProps = {
    opened: boolean;
    onClose: () => void;
}

const CreateProjectModal = ({opened, onClose}: CreateProjectModalProps) => {
  // Get the current user's teams from the API
  // We do this here and don't just use the user context
  // because it saves the user having to log out and back in again

  const { data: teams, error: teamsError, loading: teamsLoading, submitFn: getTeamsFn } = useREST<null, Team[]>('GET', '/users/@me/teams');

  useEffect(() => {
    getTeamsFn();
  }, []);

  const addProjectForm = useForm<AddProjectFormValues>({
    initialValues: {
      projectName: '',
      internalReference: '',
      team: '',
      developmentLead: '',
    },
  });

  useEffect(() => {
    if (opened) {
      addProjectForm.setValues({
        projectName: '',
        internalReference: '',
      });
    }
  }, [opened, teams])

  useEffect(() => {
    if (teams && teams.length > 0) {
      // Set the default team to the first team in the list
      addProjectForm.setValues({
        team: teams[0].id.toString(),
        developmentLead: teams[0].owner.username.toString(),
      });
    }
  }, [teams])

  const handleAddProjectSubmit = () => {
    // Check the form values are all valid
    // If they are not, display error messages to the user
    // If they are valid, move to the next step
    let errors: {
      projectName?: string;
      internalReference?: string;
      team?: string;
      developmentLead?: string;
    } = {};

    if (addProjectForm.values.projectName === '') {
      errors.projectName = 'Project name is required';
    }
    if (addProjectForm.values.internalReference === '') {
      errors.internalReference = 'Internal reference is required';
    }
    if (addProjectForm.values.team === '') {
      addProjectForm.setValues({developmentLead: ''});
    }

    if (errors.projectName || errors.internalReference || errors.team || errors.developmentLead) {
      addProjectForm.setErrors(errors);
      return;
    }

    // If we get here, the form is valid
    // Submit the form!
  }

  const getTeamMembers = useCallback(() => {
    const dropdownOptions: {label: string, value: string}[] = [];

    // If the team isn't set, do nothing
    if (addProjectForm.values.team == '') {
      return [{label: 'Select team...', value: ''}];
    }

    const selectedTeam = teams?.find(
      team => team.id.toString() === addProjectForm.values.team
    );

    // If the team isn't set, do nothing
    if (!selectedTeam) {
      return;
    }

    // Add the team owner and members to the dropdown
    dropdownOptions.push({
      label: selectedTeam?.owner.firstName + ' ' + selectedTeam?.owner.lastName,
      value: selectedTeam?.owner.username.toString(),
    });
  
    selectedTeam.members.forEach(member => {
      dropdownOptions.push({
        label: member.firstName + ' ' + member.lastName,
        value: member.username.toString(),
      });
    });

    return dropdownOptions;
  }, [addProjectForm.values.team]);

  return (
    <Modal.Root opened={opened} onClose={onClose}>
      <Modal.Overlay />
      <Modal.Content>
        <Modal.Header>
          <Modal.Title>Add project</Modal.Title>
          <Modal.CloseButton />
        </Modal.Header>
        <Modal.Body>
        <Alert color='red' title='Error' hidden={!teamsError} mb='md'>
          Error getting teams: {teamsError?.detail}
        </Alert>
        <div>
            <TextInput
              withAsterisk
              mb="md"
              label="Project name"
              placeholder="My fantastic new project"
              {...addProjectForm.getInputProps('projectName')}
            />
            <TextInput
              withAsterisk
              mb="md"
              label="Internal project reference"
              placeholder="PROJ-BIGWOW-01"
              {...addProjectForm.getInputProps('internalReference')}
            />
            <NativeSelect
              label="Team"
              mb="md"
              placeholder="Select team"
              {...addProjectForm.getInputProps('team')}
              data={
                teamsLoading ? [{value: '', label: 'Loading teams...'}] :
                (
                  teams?.map(team => (
                    {label: team.name, value: team.id.toString()}
                  ))
                )
              }
            />
            <NativeSelect
              label="Development lead"
              mb="md"
              placeholder="Select user"
              {...addProjectForm.getInputProps('developmentLead')}
              data={getTeamMembers()}
            />
            <Group justify="flex-end">
            <Button type="submit" variant="light" color="blue" onClick={() => handleAddProjectSubmit()}>Next</Button>
            </Group>
        </div>
        </Modal.Body>
      </Modal.Content>
    </Modal.Root>
  )
}
export default CreateProjectModal;