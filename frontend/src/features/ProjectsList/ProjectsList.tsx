import { Button, Table, Group, Pagination } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import classes from './ProjectsList.module.css';
import CreateProjectModal from "./components/CreateProjectModal/CreateProjectModal";

const ProjectsList = () => {
  const [addProjectModalOpened, {open: openAddProjectModal, close: closeAddProjectModal}] = useDisclosure();

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
      <CreateProjectModal opened={addProjectModalOpened} onClose={closeAddProjectModal} />
    </div>
  )
}
export default ProjectsList;