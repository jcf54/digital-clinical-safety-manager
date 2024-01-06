import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import CreateTeamsModal from './CreateTeamsModal';
import fetchMock from 'fetch-mock';

const meta = {
  title: 'Features/Teams list/Components/Create team modal',
  component: CreateTeamsModal,
} as Meta<typeof CreateTeamsModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    opened: true,
    onClose: () => {alert('close')},
    onSuccess: () => {alert('success')},
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

    fetchMock.mock('end:/api/projects', {
      id: 1,
      name: 'Test Project',
      internalReference: 'test-project',
      team: {
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
      developmentLead: {
        id: 1,
        username: 'memberone',
        firstName: 'Haem Member',
        lastName: 'One',
        email: 'test@test.local'
      },
      createdAt: '2021-08-10T12:00:00Z',
      updatedAt: '2021-08-10T12:00:00Z',
    }, { delay: 250 });

    return (
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<CreateTeamsModal {...args} />} />
        </Routes>
      </MemoryRouter>
    );
  },
}
