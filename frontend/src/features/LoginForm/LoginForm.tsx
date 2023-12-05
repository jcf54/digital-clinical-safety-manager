import React, { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import useREST from '../../hooks/useREST';
import { UserAuthContext } from '../../app/contexts/UserAuthContext';
import User from '../../types/User';
import { Paper, Text, TextInput, Group, Button, Anchor, PasswordInput, Container, Title, Alert, Tabs, Space, LoadingOverlay } from '@mantine/core';

type LoginInput = {
  username: string;
  password: string;
  loginMethod?: 'local' | 'ldap';
}

export type LoginAPIResponse = {
  user: {
    username: string;
    firstName: string;
    lastName: string;
    isActive: boolean;
  },
  scopes: string[];
}

const LoginForm = () => {
  const { data, error, loading, submitFn } = useREST<LoginInput, LoginAPIResponse>('POST', '/auth/login/');
  const { register, handleSubmit, formState: { errors: formErrors } } = useForm<LoginInput>();
  const [loginMethod, setLoginMethod] = React.useState<'local' | 'ldap'>('local');
  const { updateUser } = useContext(UserAuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (data?.user) {
      const user: User = {
        username: data.user.username,
        firstName: data.user.firstName,
        lastName: data.user.lastName,
        scopes: data.scopes,
      }
      updateUser(user);
      navigate('/', { replace: true });
    }
  }, [data, updateUser, navigate])

  const onLogin = (data: LoginInput) => {
    submitFn({
      ...data,
      loginMethod
    })
  }

  const usernameProps = register('username');
  const passwordProps = register('password');

  return (
    <Container size={420} my={40}>
      <Title ta="center">
        Digital Clinical Safety Manager
      </Title>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md" pos='relative'>
        <Alert color='red' title='Error' hidden={!error} mb='md'>
          {error?.detail}
        </Alert>
        
        <Tabs defaultValue="local-user" value={loginMethod} onChange={(value) => setLoginMethod(value as 'local' | 'ldap')}> 
          <Tabs.List>
            <Tabs.Tab disabled={loading} value="local">Local user</Tabs.Tab>
            <Tabs.Tab disabled={loading} value="ldap">LDAP user</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value='local'>
            <Space h="lg" />
            <LoadingOverlay visible={loading} />
            <form onSubmit={handleSubmit(submitFn)}>
              <TextInput label="Username" required {...usernameProps} error={formErrors?.username?.message} />
              <PasswordInput label="Password" required mt="md" {...passwordProps} error={formErrors?.password?.message} />
              <Group justify="space-between" mt="lg">
                <Anchor component="button" size="sm">
                  Forgot password?
                </Anchor>
              </Group>
              <Button fullWidth mt="lg" type="submit">Sign in</Button>
              <Text c="dimmed" size="sm" ta="center" mt={25}>
                Don't have an account yet?{' '}
                <Anchor size="sm" component="button">
                  Create account
                </Anchor>
              </Text>
            </form>
          </Tabs.Panel>

          <Tabs.Panel value='ldap'>
            <Space h="lg" />
            <LoadingOverlay visible={loading} />
            <form onSubmit={handleSubmit(submitFn)}>
              <TextInput rightSection={<span>@domain.local</span>} rightSectionWidth="120px" label="Username" required {...usernameProps} error={formErrors?.username?.message} />
              <PasswordInput label="Password" required mt="md" {...passwordProps} error={formErrors?.password?.message} />
              <Button fullWidth mt="lg" type="submit">Sign in</Button>
            </form>
          </Tabs.Panel>
        </Tabs>
      </Paper>
    </Container>
  );
};

export default LoginForm;
