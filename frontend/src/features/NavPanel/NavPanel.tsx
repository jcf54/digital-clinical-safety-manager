import React, { useContext } from "react";
import { Button, Group, Menu, NavLink, ScrollArea, rem, useMantineColorScheme } from "@mantine/core";
import UserButton from "./components/UserButton/UserButton";
import classes from './NavPanel.module.css';
import { useNavigate } from "react-router-dom";
import { IconDoorExit, IconFolders, IconHome2, IconMoon, IconSettings, IconSun, IconUsersGroup } from "@tabler/icons-react";
import { UserAuthContext } from "../../app/contexts/UserAuthContext";

const NavPanel = () => {
  const navigate = useNavigate();
  const { colorScheme, setColorScheme } = useMantineColorScheme();
  const { user } = useContext(UserAuthContext);
  return (
    <nav className={classes.navbar}>
      <div className={classes.header}>
        <Group justify="space-between">
          {/* Project name */}
          <span>DCSM</span>
          {/* Light/dark mode toggle button */}
          <Button
            onClick={() => setColorScheme(colorScheme === 'dark' ? 'light' : 'dark')}
            variant="outline"
            color="darkgray"
            size="xs"
          >
            {colorScheme === 'dark' ? (
              <IconSun size="1rem" stroke={1.5} />
            ) : (
              <IconMoon size="1rem" stroke={1.5} />
            )}
          </Button>
        </Group>
      </div>

      <ScrollArea className={classes.links}>
        <NavLink
          label="Overview"
          leftSection={<IconHome2 size="1rem" stroke={1.5} />}
          active={location.pathname === '/'}
          onClick={() => navigate('/', {replace: true})}
        />
        <NavLink
          label="Projects"
          leftSection={<IconFolders size="1rem" stroke={1.5} />}
          active={location.pathname.startsWith('/projects')}
        />
        <NavLink
          label="Teams"
          leftSection={<IconUsersGroup size="1rem" stroke={1.5} />}
          active={location.pathname.startsWith('/teams')}
          onClick={() => navigate('/teams', {replace: true})}
        />
        <NavLink
          label="Settings"
          leftSection={<IconSettings size="1rem" stroke={1.5} />}
          active={location.pathname.startsWith('/settings')}
          onClick={() => navigate('/settings/account', {replace: true})}
        />
      </ScrollArea>

      <div className={classes.footer}>
        {/* User menu */}
        <Menu position="right-end" disabled={!user}>
          <Menu.Target>
            <UserButton />
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Label>
              Settings
            </Menu.Label>
            <Menu.Item
              onClick={() => navigate('/settings/account', {replace: true})}
              leftSection={<IconSettings style={{ width: rem(14), height: rem(14) }} />}
            >
              Account settings
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item
              color="red"
              onClick={() => navigate('/logout', {replace: true})}
              leftSection={<IconDoorExit style={{ width: rem(14), height: rem(14) }} />}
            >
              Logout
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </div>
    </nav>
  )
}
export default NavPanel;