import { useViewportSize } from '@mantine/hooks';
import React from 'react';
import { useForm } from '@mantine/form';
import { useDispatch } from 'react-redux';

import {
  SimpleGrid,
  Image,
  Container,
  Center,
  TextInput,
  PasswordInput,
  Button,
  Icon,
  Group,
  Anchor
} from 'components';

import * as Actions from '../../actions';

import messages from './messages';
import { LoginFormTypes } from './types';

const NativeLogin = () => {
  const { width } = useViewportSize();
  const dispatch = useDispatch();
  const form = useForm<LoginFormTypes>({
    initialValues: {
      email: '',
      password: ''
    },
    validate: {
      email: value => (/^\S+@\S+$/.test(value) ? null : messages.errors.email),
      password: value => (!value.length ? messages.errors.password : null)
    }
  });

  const handleSubmit = (values: LoginFormTypes) => {
    dispatch(Actions.login(values));
  };

  return (
    <SimpleGrid
      cols={2}
      breakpoints={[{ maxWidth: 600, cols: 1, spacing: 'sm' }]}
      sx={{ height: '100vh', background: '#f6f6f6' }}
    >
      <div>
        <Image
          name="login"
          fit="cover"
          height="100%"
          styles={{ root: { height: '100%' }, figure: { height: '100%' }, imageWrapper: { height: '100%' } }}
        />
      </div>
      <Container sx={{ height: '100%' }}>
        <Center style={{ height: '100%', width: width > 900 ? 400 : '100%' }}>
          <form style={{ width: '100%' }} onSubmit={form.onSubmit(handleSubmit)}>
            <Image mx="auto" name="admin-logo" mb="xl" width={150} />
            <TextInput
              size="md"
              placeholder={messages.email}
              radius="xl"
              icon={<Icon name="user" size="1rem" />}
              {...form.getInputProps('email')}
            />
            <PasswordInput
              size="md"
              placeholder={messages.password}
              radius="xl"
              mt="md"
              icon={<Icon name="lock" size="1rem" />}
              {...form.getInputProps('password')}
            />
            <Group align="center" position="right" mt="xl">
              <Anchor<'a'> sx={{ fontWeight: 500 }} size="sm" href="/forgot-password" color="primary">
                {messages.forgot}
              </Anchor>
            </Group>
            <Button type="submit" size="lg" fullWidth mt="xl" radius="xl">
              {messages.login}
            </Button>
          </form>
        </Center>
      </Container>
    </SimpleGrid>
  );
};

export default NativeLogin;
