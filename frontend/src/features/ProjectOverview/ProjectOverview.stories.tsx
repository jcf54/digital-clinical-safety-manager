import React from 'react';
import ProjectOverview from './ProjectOverview';
import { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

const meta = {
  title: 'Features/Project overview',
  component: ProjectOverview,
} as Meta<typeof ProjectOverview>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {

  },
  render: (args) => {
    return (
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<ProjectOverview {...args} />} />
        </Routes>
      </MemoryRouter>
    );
  },
}
