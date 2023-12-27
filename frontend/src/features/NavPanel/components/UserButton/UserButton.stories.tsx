import React from 'react';
import UserButton from './UserButton';
import { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Features/Nav panel/Components/User button',
  component: UserButton,
} as Meta<typeof UserButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    avatarUrl: 'https://avatars.githubusercontent.com/u/47789741?v=4',
    name: 'Joe Channing',
    email: 'jcf@test.local'
  },
  render: (args) => {
    return <UserButton {...args} />;
  },
}
