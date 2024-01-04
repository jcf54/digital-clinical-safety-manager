import React, { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import useREST from '../../hooks/useREST';
import { UserAuthContext } from '../../app/contexts/UserAuthContext';
import User from '../../types/User';
import { Paper, TextInput, Button, PasswordInput, Container, Title, Alert, Tabs, Space, LoadingOverlay } from '@mantine/core';

type LoginInput = {
  username: string;
  password: string;
}

export type LoginAPIResponse = {
  user: {
    username: string;
    firstName: string;
    lastName: string;
  },
  scopes: string[];
}

type ConfigAPIResponse = {
  ldapDomain: string;
}

const LoginForm = () => {
  const { data, error, loading, submitFn } = useREST<LoginInput, LoginAPIResponse>('POST', '/auth/login/');
  const { data: config, error: configError, submitFn: configSubmitFn } = useREST<null, ConfigAPIResponse>('GET', '/config/');

  useEffect(() => {
    configSubmitFn();
  }, [])

  const { register, handleSubmit, formState: { errors: formErrors } } = useForm<LoginInput>();
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
  }, [data, updateUser, navigate]);

  const usernameProps = register('username');
  const passwordProps = register('password');

  return (
    <Container size={420} my={40}>
      <Title ta="center">
        Digital Clinical Safety Manager
      </Title>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md" pos='relative'>
        <Alert color='red' title='Error' hidden={!configError} mb='md'>
          Error getting application config: {configError?.detail}
        </Alert>

        <Alert color='red' title='Error' hidden={!error} mb='md'>
          Error when authenticating: {error?.detail}
        </Alert>
        
        <Tabs defaultValue='ldap'> 
          <Tabs.List>
            <Tabs.Tab disabled={loading} value="ldap">LDAP user</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value='ldap'>
            <Space h="lg" />
            <LoadingOverlay visible={loading} />
            <form onSubmit={handleSubmit(submitFn)}>
              <TextInput rightSection={<span>{config ? <span>@{config.ldapDomain}</span> : ''}</span>} rightSectionWidth="120px" label="Username" required {...usernameProps} error={formErrors?.username?.message} />
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
