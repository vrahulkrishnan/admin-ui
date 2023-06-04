import { useForm } from '@mantine/form';
import { useViewportSize } from '@mantine/hooks';
import { Center, SimpleGrid, Image, TextInput, Icon, Typography, Button, Box, Container, Anchor } from 'components';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import * as Actions from '../../actions';
import * as Selectors from '../../selectors';

import messages from './messages';

const stateSelector = createStructuredSelector({
  response: Selectors.makeSelectResponse()
});

const ForgotPassword = () => {
  const { response } = useSelector(stateSelector);
  const dispatch = useDispatch();
  const form = useForm({
    initialValues: {
      emailId: ''
    },
    validate: {
      emailId: value => (/^\S+@\S+$/.test(value) ? null : messages.error.email)
    }
  });

  useEffect(() => {
    if (response) {
      form.reset();
    }
  }, [response]);

  const { width } = useViewportSize();

  useEffect(() => {
    return () => {
      dispatch(Actions.resetRedux('response'));
      dispatch(Actions.resetRedux('error'));
    };
  }, []);

  const { protocol, host } = window.location;

  const handleSubmit = (values: { emailId: any }) => {
    dispatch(
      Actions.forgotPassword({ emailId: values.emailId, verificationLink: `${protocol}//${host}/reset-password` })
    );
  };
  return (
    <SimpleGrid cols={1} sx={{ height: '100vh', background: '#f6f6f6' }}>
      <Container sx={{ height: '100%', width: '100%' }}>
        <Center style={{ height: '100%' }}>
          <Box sx={{ width: width > 600 ? 400 : '100%' }}>
            <Image mx="auto" name="admin-logo" mb="xl" width={150} />
            <Typography align="center" weight={500} color="#7b7b7b" mb="sm">
              {messages.label}
            </Typography>
            <form onSubmit={form.onSubmit(handleSubmit)}>
              <TextInput
                size="md"
                placeholder={messages.placeholder}
                radius="xl"
                icon={<Icon name="user" size="1rem" />}
                {...form.getInputProps('emailId')}
              />
              <Button size="lg" fullWidth mt="xl" radius="xl" type="submit">
                {messages.button}
              </Button>
              <Anchor<'a'>
                my={10}
                sx={{ textAlign: 'center', fontWeight: 500, display: 'block' }}
                size="sm"
                href="/login"
                color="primary"
              >
                {messages.back}
              </Anchor>
            </form>
          </Box>
        </Center>
      </Container>
    </SimpleGrid>
  );
};

export default ForgotPassword;
