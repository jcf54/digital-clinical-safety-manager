import React from 'react';
import TeamsList from './TeamsList';
import { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

const meta = {
  title: 'Features/Teams list',
  component: TeamsList,
} as Meta<typeof TeamsList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {

  },
  render: (args) => {
    return (
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<TeamsList {...args} />} />
        </Routes>
      </MemoryRouter>
    );
  },
}
