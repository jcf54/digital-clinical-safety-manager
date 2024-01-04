import { AppShell } from "@mantine/core";
import NavPanel from "../../features/NavPanel/NavPanel";
import ProjectsList from "../../features/ProjectsList/ProjectsList";

const ProjectsListPage = () => {
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
      <AppShell.Main><ProjectsList /></AppShell.Main>
    </AppShell>
  );
};

export default ProjectsListPage;