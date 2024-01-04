import { Button, Modal, TextInput, Group, NativeSelect, Alert, LoadingOverlay } from "@mantine/core";
import { useForm } from '@mantine/form';
import { useCallback, useEffect } from "react";
import useREST from "../../../../hooks/useREST";
import Team from "../../../../types/Team";
import Project from "../../../../types/Project";

interface AddProjectFormValues {
  projectName: string;
  internalReference: string;
  teamId?: string;
  developmentLeadUsername?: string;
}

type CreateProjectModalProps = {
  opened: boolean;
  onClose: () => void;
  onSuccess: (project: Project) => void;
}

const CreateProjectModal = ({ opened, onClose, onSuccess }: CreateProjectModalProps) => {
  // Get the current user's teams from the API
  // We do this here and don't just use the user context
  // because it saves the user having to log out and back in again

  const { data: teams, error: teamsError, loading: teamsLoading, submitFn: getTeamsFn } = useREST<null, Team[]>('GET', '/users/@me/teams');
  const { data: project, error: projectError, loading: projectLoading, submitFn: createProjectFn } = useREST<AddProjectFormValues, Project>('POST', '/projects');

  useEffect(() => {
    getTeamsFn();
  }, []);

  const addProjectForm = useForm<AddProjectFormValues>({
    initialValues: {
      projectName: '',
      internalReference: '',
      teamId: '',
      developmentLeadUsername: '',
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
        teamId: teams[0].id.toString(),
        developmentLeadUsername: teams[0].owner.username.toString(),
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
      teamId?: string;
      developmentLeadUsername?: string;
    } = {};

    if (addProjectForm.values.projectName === '') {
      errors.projectName = 'Project name is required';
    }
    if (addProjectForm.values.internalReference === '') {
      errors.internalReference = 'Internal reference is required';
    }
    if (addProjectForm.values.teamId === '') {
      addProjectForm.setValues({ developmentLeadUsername: '' });
    }

    if (errors.projectName || errors.internalReference || errors.teamId || errors.developmentLeadUsername) {
      addProjectForm.setErrors(errors);
      return;
    }

    createProjectFn(addProjectForm.values);
  }

  const getTeamMembers = useCallback(() => {
    const dropdownOptions: { label: string, value: string }[] = [];

    // If the team isn't set, do nothing
    if (addProjectForm.values.teamId == '') {
      return [{ label: 'Select team...', value: '' }];
    }

    const selectedTeam = teams?.find(
      team => team.id.toString() === addProjectForm.values.teamId
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
  }, [addProjectForm.values.teamId]);

  useEffect(() => {
    if (project) {
      onSuccess(project);
      onClose();
    }
  }, [project])

  return (
    <Modal.Root opened={opened} onClose={onClose}>
      <Modal.Overlay />
      <Modal.Content>
        <Modal.Header>
          <Modal.Title>Add project</Modal.Title>
          <Modal.CloseButton />
        </Modal.Header>
        <Modal.Body>
          <Alert color='red' title='Error retrieving teams' hidden={!teamsError} mb='md'>
            {teamsError?.detail}
          </Alert>
          <Alert color='red' title='Error creating project' hidden={!projectError} mb='md'>
            {projectError?.detail}
          </Alert>
          <div>
            <TextInput
              withAsterisk
              mb="md"
              label="Project name"
              placeholder="My fantastic new project"
              {...addProjectForm.getInputProps('projectName')}
              disabled={teamsLoading || projectLoading}
            />
            <TextInput
              withAsterisk
              mb="md"
              label="Internal project reference"
              placeholder="PROJ-BIGWOW-01"
              {...addProjectForm.getInputProps('internalReference')}
              disabled={teamsLoading || projectLoading}
            />
            <NativeSelect
              label="Team"
              mb="md"
              placeholder="Select team"
              {...addProjectForm.getInputProps('teamId')}
              disabled={teamsLoading || projectLoading}
              data={
                teamsLoading ? [{ value: '', label: 'Loading teams...' }] :
                  (
                    teams?.map(team => (
                      { label: team.name, value: team.id.toString() }
                    ))
                  )
              }
            />
            <NativeSelect
              label="Development lead"
              mb="md"
              placeholder="Select user"
              {...addProjectForm.getInputProps('developmentLeadUsername')}
              data={getTeamMembers()}
              disabled={teamsLoading || projectLoading}
            />
            <Group justify="flex-end">
              <Button
                type="submit"
                variant="light"
                color="blue"
                onClick={() => handleAddProjectSubmit()}
                disabled={teamsLoading || projectLoading}
              >
                Next
              </Button>
            </Group>
          </div>
        </Modal.Body>
      </Modal.Content>
    </Modal.Root>
  )
}
export default CreateProjectModal;