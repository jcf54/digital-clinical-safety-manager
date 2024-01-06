import { AppShell } from "@mantine/core";
import NavPanel from "../../features/NavPanel/NavPanel";
import TeamsList from "../../features/TeamsList/TeamsList";

const TeamsListPage = () => {
  return (
    <AppShell
      navbar={{
        width: 300,
        breakpoint: 'sm',
      }}
      withBorder={false}
      padding="md"
    >
      <AppShell.Navbar><NavPanel /></AppShell.Navbar>
      <AppShell.Main><TeamsList /></AppShell.Main>
    </AppShell>
  );
};

export default TeamsListPage;