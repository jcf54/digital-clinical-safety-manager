import { Avatar, Group, UnstyledButton, Text, rem } from "@mantine/core"
import { IconChevronRight } from '@tabler/icons-react';
import classes from './UserButton.module.css';
import { forwardRef, ComponentPropsWithoutRef, useContext } from "react";
import { UserAuthContext } from "../../../../app/contexts/UserAuthContext";

const UserButton = forwardRef<HTMLButtonElement, ComponentPropsWithoutRef<'button'>>(({ ...args}: ComponentPropsWithoutRef<'button'>, ref) => {
  const { user } = useContext(UserAuthContext);
  console.log(user);
  return (
    <UnstyledButton ref={ref} {...args} className={classes.user}>
      <Group>
        <Avatar
          src={user?.thumbnailImage}
          radius="xl"
        />
        <div style={{ flex: 1 }}>
          <Text size="sm" fw={500}>
            { user && `${user.firstName} ${user.lastName}` }
            { !user && 'Not logged in'}
          </Text>
          <Text c="dimmed" size="xs">
            {user?.username}
          </Text>
        </div>

        { user && 
          <IconChevronRight style={{ width: rem(14), height: rem(14) }} stroke={1.5} />
        }
      </Group>
    </UnstyledButton>
  )
})

export default UserButton;