import React from 'react';
import ProjectsListPage from './ProjectsListPage';
import { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

const meta = {
  title: 'Pages/Projects list',
  component: ProjectsListPage,
} as Meta<typeof ProjectsListPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {

  },
  render: (args) => {
    return (
      <MemoryRouter initialEntries={['/projects']}>
        <Routes>
          <Route path="/projects" element={<ProjectsListPage {...args} />} />
        </Routes>
      </MemoryRouter>
    );
  },
}
