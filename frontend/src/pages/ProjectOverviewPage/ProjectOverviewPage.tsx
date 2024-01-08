import { AppShell } from "@mantine/core";
import ProjectOverview from "../../features/ProjectOverview/ProjectOverview";
import NavPanel from "../../features/NavPanel/NavPanel";

const ProjectOverviewPage = () => {
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
      <AppShell.Main><ProjectOverview /></AppShell.Main>
    </AppShell>
  );
};

export default ProjectOverviewPage;