import React from 'react';
import ProjectsList from './ProjectsList';
import { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

const meta = {
  title: 'Features/Projects list',
  component: ProjectsList,
} as Meta<typeof ProjectsList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {

  },
  render: (args) => {
    return (
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<ProjectsList {...args} />} />
        </Routes>
      </MemoryRouter>
    );
  },
}
