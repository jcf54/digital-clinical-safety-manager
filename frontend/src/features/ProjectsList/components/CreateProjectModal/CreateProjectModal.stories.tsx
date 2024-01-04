import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import CreateProjectModal from './CreateProjectModal';
import fetchMock from 'fetch-mock';

const meta = {
  title: 'Features/Projects list/Components/Create project modal',
  component: CreateProjectModal,
} as Meta<typeof CreateProjectModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    opened: true,
    onClose: () => {},
  },
  render: (args) => {
    fetchMock.restore().mock('end:/api/users/@me/teams', [
      {
        id: 1,
        name: 'Clinical Haematology',
        owner: {
          id: 1,
          username: 'owner',
          firstName: 'Haem Owner',
          lastName: 'User',
          email: 'test@test.local'
        },
        members: [
          {
            id: 1,
            username: 'memberone',
            firstName: 'Haem Member',
            lastName: 'One',
            email: 'test@test.local'
          },
          {
            id: 2,
            username: 'test.user',
            firstName: 'Haem Member',
            lastName: 'Two',
            email: 'test@test.local'
          }
        ]
      },
      {
        id: 2,
        name: 'Oncology',
        owner: {
          id: 1,
          username: 'owner',
          firstName: 'Onc Owner',
          lastName: 'User',
          email: 'test@test.local'
        },
        members: [
          {
            id: 1,
            username: 'memberone',
            firstName: 'Onc Member',
            lastName: 'One',
            email: 'test@test.local'
          },
          {
            id: 2,
            username: 'test.user',
            firstName: 'Onc Member',
            lastName: 'Two',
            email: 'test@test.local'
          }
        ]
      }
    ], { delay: 250 });

    return (
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<CreateProjectModal {...args} />} />
        </Routes>
      </MemoryRouter>
    );
  },
}
