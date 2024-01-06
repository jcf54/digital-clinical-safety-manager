import React from 'react';
import TeamsListPage from './TeamsListPage';
import { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import fetchMock from 'fetch-mock';
import { MockUserAuthProvider } from '../../app/contexts/UserAuthContext';

const meta = {
  title: 'Pages/Teams list',
  component: TeamsListPage,
} as Meta<typeof TeamsListPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {

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
        ],
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

    fetchMock.post('end:/api/teams/', {
      id: 1,
      name: 'Test Team',
      internalReference: 'test-team',
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

    fetchMock.get('end:/api/teams/', [
      {
        id: 1,
        name: 'Test team',
        internalReference: 'PROJ-TEST-01',
        developmentLead: {
          username: 'jane.doe',
          firstName: 'Jane',
          lastName: 'Doe',
        },
        team: {
          id: 1,
          name: 'Thingology',
          owner: {
            username: 'jane.doe',
            firstName: 'Jane',
            lastName: 'Doe',
          },
          members: [],
        },
        createdAt: new Date('2021-08-01T00:00:00.000Z'),
        updatedAt: new Date('2021-08-01T00:00:00.000Z'),
      },
      {
        id: 2,
        name: 'Psychological medicine SMS manager',
        internalReference: 'PROJ-PSYMED-3',
        developmentLead: {
          username: 'joseph.channing',
          firstName: 'Joe',
          lastName: 'Channing',
        },
        team: {
          id: 1,
          name: 'Clinical Haematology',
          owner: {
            username: 'joseph.channing',
            firstName: 'Joe',
            lastName: 'Channing',
          },
          members: [],
        },
        createdAt: new Date('2021-08-01T00:00:00.000Z'),
        updatedAt: new Date('2021-08-01T00:00:00.000Z'),
      }
    ], {delay: 250});

    return (
      <MockUserAuthProvider>
        <MemoryRouter initialEntries={['/teams']}>
          <Routes>
            <Route path="/teams" element={<TeamsListPage {...args} />} />
          </Routes>
        </MemoryRouter>
      </MockUserAuthProvider>
    );
  },
}

export const ErrorState: Story = {
  args: {

  },
  render: (args) => {
    fetchMock.reset().get('end:/api/users/@me/teams', {}, { delay: 250, response: {status: 500, body: {detail: 'An unknown error has occured'}}});
    fetchMock.get('end:/api/teams/', {}, { delay: 250, response: {status: 500, body: {detail: 'An unknown error has occured'}}});

    return (
      <MockUserAuthProvider>
        <MemoryRouter initialEntries={['/teams']}>
          <Routes>
            <Route path="/teams" element={<TeamsListPage {...args} />} />
          </Routes>
        </MemoryRouter>
      </MockUserAuthProvider>
    );
  },
}