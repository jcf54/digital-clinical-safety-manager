import React from 'react';
import NavPanel from './NavPanel';
import { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

const meta = {
  title: 'Features/Nav panel',
  component: NavPanel,
} as Meta<typeof NavPanel>;

export default meta;
type Story = StoryObj<typeof meta>;


export const Default: Story = {
  args: {
    onOverview: true,
    onProjects: false,
    onOrganisations: false,
    onSettings: false,
  },
  render: (args) => {
    return (
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<NavPanel {...args} />} />
        </Routes>
      </MemoryRouter>
    );
  },
}
