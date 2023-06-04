import { useForm } from '@mantine/form';
import { useSetState, useViewportSize } from '@mantine/hooks';
import {
  Center,
  SimpleGrid,
  Image,
  Icon,
  Typography,
  Button,
  Box,
  Container,
  PasswordInput,
  Popover,
  Progress,
  PasswordRequirement
} from 'components';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

import * as Actions from '../../actions';
import * as Selectors from '../../selectors';

import { getPasswordStrength, validations } from './validations';
import messages from './messages';

const stateSelector = createStructuredSelector({
  userId: Selectors.makeSelectUserId()
});
const ResetPassword = () => {
  const params = useParams() as any;
  const { userId } = useSelector(stateSelector);
  const dispatch = useDispatch();

  const [state, setState] = useSetState<{ popoverOpened: boolean; passwordStrength: number }>({
    popoverOpened: false,
    passwordStrength: 0
  });

  const form = useForm({
    initialValues: {
      password: '',
      confirmPassword: ''
    },
    validate: {
      password: value => (value || state.passwordStrength === 100 ? null : messages.errors.password),
      confirmPassword: (value, values) => (value !== values.password ? messages.errors.confirmPassword : null)
    }
  });

  const checks = validations.map((requirement, index) => (
    <PasswordRequirement key={index} label={requirement.label} meets={requirement.re.test(form.values.password)} />
  ));
  const { width } = useViewportSize();

  const onPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    form.setFieldValue('password', event.target.value);
    setState({ passwordStrength: getPasswordStrength(event.target.value) });
  };

  useEffect(() => {
    if (params?.verificationId) {
      setTimeout(() => {
        dispatch(Actions.forgotPasswordLinkVerify(params?.verificationId));
      });
    }
  }, [params?.verificationId]);

  useEffect(() => {
    return () => {
      dispatch(Actions.resetRedux('error'));
    };
  }, []);

  const handleResetSubmit = values => {
    dispatch(Actions.resetUserPassword({ password: values.confirmPassword, userId: userId }));
  };
  return (
    <SimpleGrid cols={1} sx={{ height: '100vh', background: '#f6f6f6' }}>
      <Container sx={{ height: '100%', width: '100%' }}>
        <Center style={{ height: '100%' }}>
          <Box sx={{ width: width > 600 ? 400 : '100%' }}>
            <Image mx="auto" name="admin-logo" mb="xl" width={150} />
            <Typography align="center" weight={500} color="#7b7b7b" mb="sm">
              {messages.title}
            </Typography>
            <form onSubmit={form.onSubmit(handleResetSubmit)}>
              <Popover
                opened={state.popoverOpened}
                position="bottom"
                withArrow
                width="target"
                trapFocus={false}
                transition="pop-top-left"
              >
                <Popover.Target>
                  <div
                    onFocusCapture={() => setState({ popoverOpened: true })}
                    onBlurCapture={() => setState({ popoverOpened: false })}
                  >
                    <PasswordInput
                      size="md"
                      placeholder={messages.form.password}
                      radius="xl"
                      mt="md"
                      icon={<Icon name="lock" size="1rem" />}
                      {...form.getInputProps('password')}
                      onChange={onPasswordChange}
                    />
                  </div>
                </Popover.Target>
                <Popover.Dropdown>
                  <Progress
                    color={state.passwordStrength > 80 ? 'teal' : state.passwordStrength > 50 ? 'yellow' : 'red'}
                    value={state.passwordStrength}
                    size={5}
                    style={{ marginBottom: 10 }}
                  />
                  <PasswordRequirement
                    label={messages.form.passwordRequirement}
                    meets={form.values.password.length > 5}
                  />
                  {checks}
                </Popover.Dropdown>
              </Popover>

              <PasswordInput
                size="md"
                placeholder={messages.form.confirmPassword}
                radius="xl"
                mt="md"
                icon={<Icon name="lock" size="1rem" />}
                {...form.getInputProps('confirmPassword')}
              />
              <Button size="lg" fullWidth mt="xl" radius="xl" type="submit">
                {messages.form.button}
              </Button>
            </form>
          </Box>
        </Center>
      </Container>
    </SimpleGrid>
  );
};

export default ResetPassword;
