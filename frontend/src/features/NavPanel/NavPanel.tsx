import React from "react";
import { Code, Group, Menu, NavLink, ScrollArea, Select, rem } from "@mantine/core";
import UserButton from "./components/UserButton/UserButton";
import classes from './NavPanel.module.css';
import { useNavigate } from "react-router-dom";
import { IconDoorExit, IconFolders, IconHome2, IconSettings, IconUsersGroup } from "@tabler/icons-react";

interface NavPanelProps {
  onOverview?: boolean;
  onProjects?: boolean;
  onTeams?: boolean;
  onSettings?: boolean;
}

const NavPanel = ({onOverview, onProjects, onTeams, onSettings}: NavPanelProps) => {
  const navigate = useNavigate();
  return (
    <nav className={classes.navbar}>
      <div className={classes.header}>
        <Group justify="space-between">
          <span>DCSM</span>
          <Code fw={700}>v0.1a</Code>
        </Group>
      </div>

      <ScrollArea className={classes.links}>
        <NavLink
          label="Overview"
          leftSection={<IconHome2 size="1rem" stroke={1.5} />}
          active={onOverview}
          onClick={() => navigate('/', {replace: true})}
        />
        <NavLink
          label="Projects"
          leftSection={<IconFolders size="1rem" stroke={1.5} />}
          active={onProjects}
          onClick={() => navigate('/projects', {replace: true})}
        />
        <NavLink
          label="Teams"
          leftSection={<IconUsersGroup size="1rem" stroke={1.5} />}
          active={onTeams}
          onClick={() => navigate('/teams', {replace: true})}
        />
        <NavLink
          label="Settings"
          leftSection={<IconSettings size="1rem" stroke={1.5} />}
          active={onSettings}
          onClick={() => navigate('/settings/account', {replace: true})}
        />
      </ScrollArea>

      <div className={classes.footer}>
        {/* User menu */}
        <Menu position="right-end" withArrow>
          <Menu.Target>
            <UserButton name="Joe Channing" email="jcf@test.local" avatarUrl="https://avatars.githubusercontent.com/u/47789741?v=4" />
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