import { Avatar, Group, UnstyledButton, Text, rem } from "@mantine/core"
import { IconChevronRight } from '@tabler/icons-react';
import classes from './UserButton.module.css';
import { forwardRef } from "react";

interface UserButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  avatarUrl: string;
  name: string;
  email: string;
}

const UserButton = forwardRef<HTMLButtonElement, UserButtonProps>(({avatarUrl, name, email, ...args}: UserButtonProps, ref) => {
  return (
    <UnstyledButton ref={ref} {...args} className={classes.user}>
      <Group>
        <Avatar
          src={avatarUrl}
          radius="xl"
        />
        <div style={{ flex: 1 }}>
          <Text size="sm" fw={500}>
            {name}
          </Text>
          <Text c="dimmed" size="xs">
            {email}
          </Text>
        </div>
        <IconChevronRight style={{ width: rem(14), height: rem(14) }} stroke={1.5} />
      </Group>
    </UnstyledButton>
  )
})

export default UserButton;