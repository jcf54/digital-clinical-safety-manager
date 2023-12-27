import { Button, Modal, Table, TextInput, Group, PasswordInput, Pagination, NativeSelect } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useForm } from '@mantine/form';
import classes from './ProjectsList.module.css';
import { useEffect } from "react";

interface AddProjectFormValues {
  projectName: string;
  internalReference: string;
  team?: string;
  developmentLead?: string;
  gitRepositoryUrl: string;
  gitRepositoryUsername: string;
  gitRepositoryPassword: string;
}

const ProjectsList = () => {
  const [addProjectModalOpened, {open: openAddProjectModal, close: closeopenAddProjectModal}] = useDisclosure();

  const addProjectForm = useForm<AddProjectFormValues>({
    initialValues: {
      projectName: '',
      internalReference: '',
      team: '',
      developmentLead: '',
      gitRepositoryUrl: '',
      gitRepositoryUsername: '',
      gitRepositoryPassword: '',
    },
  });

  useEffect(() => {
    if (addProjectModalOpened) {
      addProjectForm.setValues({
        projectName: '',
        internalReference: '',
        team: '',
        developmentLead: '',
        gitRepositoryUrl: '',
        gitRepositoryUsername: '',
        gitRepositoryPassword: '',
      });
    }
  }, [addProjectModalOpened])

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

  return (
    <div>
      <Button color="blue" mb="md" onClick={() => openAddProjectModal()}>Create new project</Button>
      <Table highlightOnHover mb="md">
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Title</Table.Th>
            <Table.Th>Internal reference</Table.Th>
            <Table.Th>Development lead</Table.Th>
            <Table.Th>Team</Table.Th>
            <Table.Th>Unresolved hazards</Table.Th>
            <Table.Th>High priority hazards</Table.Th>
            <Table.Th>Medium priority hazards</Table.Th>
            <Table.Th>Low priority hazards</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          <Table.Tr key='PROJ1'>
            <Table.Td className={classes.underlineText}>Test project</Table.Td>
            <Table.Td>PROJ-TEST-01</Table.Td>
            <Table.Td>Joe Channing</Table.Td>
            <Table.Td>Clinical Haematology</Table.Td>
            <Table.Td>4</Table.Td>
            <Table.Td>3</Table.Td>
            <Table.Td>5</Table.Td>
            <Table.Td>16</Table.Td>
          </Table.Tr>
          <Table.Tr key='PROJ2'>
            <Table.Td className={classes.underlineText}>Psychological medicine SMS manager</Table.Td>
            <Table.Td>PROJ-PSYMED-3</Table.Td>
            <Table.Td>Joe Channing</Table.Td>
            <Table.Td>Clinical Haematology</Table.Td>
            <Table.Td>2</Table.Td>
            <Table.Td>1</Table.Td>
            <Table.Td>3</Table.Td>
            <Table.Td>8</Table.Td>
          </Table.Tr>
        </Table.Tbody>
      </Table>
      <Group justify="center">
        <Pagination total={2} />
      </Group>
      <Modal.Root opened={addProjectModalOpened} onClose={closeopenAddProjectModal}>
        <Modal.Overlay />
        <Modal.Content>
          <Modal.Header>
            <Modal.Title>Add project</Modal.Title>
            <Modal.CloseButton />
          </Modal.Header>
          <Modal.Body>
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
                data={[
                  {value: '', label: 'No team'},
                  {value: '1', label: 'Clinical Haematology'},
                  {value: '2', label: 'Testing Group'},
                ]}
              />
              {
                addProjectForm.values.team && (
                  <NativeSelect
                    label="Development lead"
                    mb="md"
                    placeholder="Select user"
                    {...addProjectForm.getInputProps('developmentLead')}
                    data={[
                      {value: '', label: 'N/A'},
                      {value: '1', label: 'Joe Channing'},
                      {value: '2', label: 'Test User'},
                    ]}
                  />
                )
              }
              <Group justify="flex-end">
                <Button type="submit" variant="light" color="blue" onClick={() => handleAddProjectSubmit()}>Next</Button>
              </Group>
            </div>
          </Modal.Body>
        </Modal.Content>
      </Modal.Root>
    </div>    
  )
}
export default ProjectsList;