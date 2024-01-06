import { Button, Table, Group, Pagination, Alert, Loader, LoadingOverlay, NavLink } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import classes from './ProjectsList.module.css';
import CreateProjectModal from "./components/CreateProjectModal/CreateProjectModal";
import { useEffect, useState } from "react";
import useREST from "../../hooks/useREST";
import Project from "../../types/Project";
import { IconAlertTriangle, IconCheck, IconExclamationCircle, IconExclamationMark, IconNotification } from "@tabler/icons-react";

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
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {
            projects?.map(project => (
              <Table.Tr key={project.id}>
                <Table.Td className={classes.underlineText}>
                  <NavLink
                    label={project.name}
                    p={0}
                    leftSection={project.id === 1 ? <IconCheck size={20} color="green" /> : <IconAlertTriangle size={20} color="red" />}
                    className={classes.noHoverBackground}
                  />
                </Table.Td>
                <Table.Td>{project.internalReference}</Table.Td>
                <Table.Td>{project.developmentLead.firstName}&nbsp;{project.developmentLead.lastName}</Table.Td>
                <Table.Td>{project.team.name}</Table.Td>
              </Table.Tr>
            ))
          }
        </Table.Tbody>
      </Table>
      <Group justify="center">
        <Pagination total={1} />
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