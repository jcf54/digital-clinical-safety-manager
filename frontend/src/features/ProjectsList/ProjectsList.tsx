import { Button, Table, Group, Pagination, Alert, Loader, LoadingOverlay } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import classes from './ProjectsList.module.css';
import CreateProjectModal from "./components/CreateProjectModal/CreateProjectModal";
import { useEffect, useState } from "react";
import useREST from "../../hooks/useREST";
import Project from "../../types/Project";

const ProjectsList = () => {
  const [addProjectModalOpened, {open: openAddProjectModal, close: closeAddProjectModal}] = useDisclosure();
  const {data: projects, loading: projectsLoading, error: projectsError, submitFn: getProjectsFn} = useREST<null, Project[]>('GET', '/projects/');
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    getProjectsFn();
  }, []);

  return (
    <div>
      { successMessage && <Alert color="green" title="Success creating project" mb="md">{successMessage}</Alert>}
      { projectsError && <Alert color="red" title="Error retrieving projects" mb="md">{projectsError.detail}</Alert>}
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
          {
            projects?.map(project => (
              <Table.Tr key={project.id}>
                <Table.Td className={classes.underlineText}>{project.name}</Table.Td>
                <Table.Td>{project.internalReference}</Table.Td>
                <Table.Td>{project.developmentLead.firstName}&nbsp;{project.developmentLead.lastName}</Table.Td>
                <Table.Td>{project.team.name}</Table.Td>
                <Table.Td>-</Table.Td>
                <Table.Td>-</Table.Td>
                <Table.Td>-</Table.Td>
                <Table.Td>-</Table.Td>
              </Table.Tr>
            ))
          }
        </Table.Tbody>
      </Table>
      <Group justify="center">
        <Pagination total={2} />
      </Group>
      <CreateProjectModal
        opened={addProjectModalOpened}
        onClose={closeAddProjectModal}
        onSuccess={(project) => setSuccessMessage(`${project.name} (${project.internalReference}) created successfully!`)}
      />
    </div>
  )
}
export default ProjectsList;