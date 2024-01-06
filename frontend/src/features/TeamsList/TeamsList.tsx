import { Button, Table, Group, Pagination, Alert, Loader, LoadingOverlay } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import classes from './TeamsList.module.css';
import CreateTeamsModal from "./components/CreateTeamsModal/CreateTeamsModal";
import { useContext, useEffect, useState } from "react";
import useREST from "../../hooks/useREST";
import Team from "../../types/Team";
import { UserAuthContext } from "../../app/contexts/UserAuthContext";

const TeamsList = () => {
  const [addTeamModalOpened, {open: openAddTeamModal, close: closeAddTeamModal}] = useDisclosure();
  const {data: teams, loading: teamsLoading, error: teamsError, submitFn: getTeamsFn} = useREST<null, Team[]>('GET', '/users/@me/teams');
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    getTeamsFn();
  }, []);

  return (
    <div>
      { successMessage && <Alert color="green" title="Success creating team" mb="md">{successMessage}</Alert>}
      { teamsError && <Alert color="red" title="Error retrieving teams" mb="md">{teamsError.detail}</Alert>}
      
      <Button color="blue" mb="md" onClick={() => openAddTeamModal()}>Create new team</Button>
      <Table highlightOnHover mb="md">
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Name</Table.Th>
            <Table.Th>Owner</Table.Th>
            <Table.Th>Members</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {
            teams?.map(team => (
              <Table.Tr key={team.id}>
                <Table.Td className={classes.underlineText}>{team.name}</Table.Td>
                <Table.Td>{team.owner.firstName} {team.owner.lastName}</Table.Td>
                <Table.Td>{team.members.length}</Table.Td>
              </Table.Tr>
            ))
          }
        </Table.Tbody>
      </Table>
      <Group justify="center">
        <Pagination total={1} />
      </Group>
      <CreateTeamsModal
        opened={addTeamModalOpened}
        onClose={closeAddTeamModal}
        onSuccess={(team) => setSuccessMessage(`${team.name} created successfully!`)}
      />
    </div>
  )
}
export default TeamsList;