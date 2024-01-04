import React from 'react';
import LoginForm, { LoginAPIResponse } from './LoginForm';
import fetchMock from 'fetch-mock';
import { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

const meta = {
  title: 'Features/Login Form',
  component: LoginForm,
} as Meta<typeof LoginForm>;

export default meta;
type Story = StoryObj<typeof meta>;

const successfulLoginMock: LoginAPIResponse = {
  user: {
    username: 'john.doe5',
    firstName: 'John',
    lastName: 'Doe',
  },
  scopes: ['user'],
};

export const SuccessfulLogin: Story = {
  render: () => {
    fetchMock.restore().mock('end:/api/auth/login/', successfulLoginMock, { delay: 250 });
    fetchMock.mock('end:/api/config/', { ldapDomain: 'example.local' }, { delay: 250 });
    return (
      <MemoryRouter initialEntries={['/login']}>
        <Routes>
          <Route path="/" element={<h1>Logged in!</h1>} />
          <Route path="/login" element={<LoginForm />} />
        </Routes>
      </MemoryRouter>
    );
  },
}

export const UnsuccessfulLogin: Story = {
  render: () => {
    fetchMock.restore().mock('end:/api/auth/login/', {}, { delay: 250, response: {status: 401, body: {detail: 'The username or password provided is incorrect'}}});
    fetchMock.mock('end:/api/config/', { ldapDomain: 'example.local' }, { delay: 250 });
    return (
      <MemoryRouter initialEntries={['/login']}>
        <Routes>
          <Route path="/" element={<h1>Logged in!</h1>} />
          <Route path="/login" element={<LoginForm />} />
        </Routes>
      </MemoryRouter>
    );
  },
}

export const UserNotActiveOrAllowed: Story = {
  render: () => {
    fetchMock.restore().mock('end:/api/auth/login/', {}, { delay: 250, response: {status: 403, body: {detail: 'this user account is not active. Please contact a system administrator'}}});
    fetchMock.mock('end:/api/config/', { ldapDomain: 'example.local' }, { delay: 250 });
    return (
      <MemoryRouter initialEntries={['/login']}>
        <Routes>
          <Route path="/" element={<h1>Logged in!</h1>} />
          <Route path="/login" element={<LoginForm />} />
        </Routes>
      </MemoryRouter>
    );
  },
}

export const HTTPErrorOnLogin: Story = {
  render: () => {
    fetchMock.restore().mock('end:/api/auth/login/', {}, { delay: 250, response: {status: 500, body: {detail: 'an unknown error has occured'}}});
    fetchMock.mock('end:/api/config/', {}, { delay: 250, response: {status: 500, body: {detail: 'an unknown error has occured'}}});
    return (
      <MemoryRouter initialEntries={['/login']}>
        <Routes>
          <Route path="/" element={<h1>Logged in!</h1>} />
          <Route path="/login" element={<LoginForm />} />
        </Routes>
      </MemoryRouter>
    );
  },
}
