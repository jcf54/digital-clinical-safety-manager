import { Button, Title, Text, Alert } from "@mantine/core";

const ProjectOverview = () => {
  return (
    <div>
      <Button mb="md" disabled>Download latest documents</Button>
      <Alert color='yellow' title='Action required' mb='md'>
        A change has been made to the project. Please review the changes and approve them.
      </Alert>

      <Title order={2} mt="md">Test project <Text size="xl" display="inline">(PROJ-TEST-01)</Text></Title>
      <Title order={4} mt="sm" mb="md">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus lobortis sed arcu in pharetra. Vestibulum urna nunc, eleifend ut leo sed, vehicula tincidunt enim.</Title>
    </div>
  );
}

export default ProjectOverview;