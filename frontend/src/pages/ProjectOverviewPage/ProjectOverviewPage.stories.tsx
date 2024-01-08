import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { MockUserAuthProvider } from '../../app/contexts/UserAuthContext';
import ProjectOverviewPage from './ProjectOverviewPage';

const meta = {
  title: 'Pages/Project overview',
  component: ProjectOverviewPage,
} as Meta<typeof ProjectOverviewPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {

  },
  render: (args) => {
    return (
      <MockUserAuthProvider>
        <MemoryRouter initialEntries={['/projects/1']}>
          <Routes>
            <Route path="/projects/:id" element={<ProjectOverviewPage {...args} />} />
          </Routes>
        </MemoryRouter>
      </MockUserAuthProvider>
    );
  },
}
