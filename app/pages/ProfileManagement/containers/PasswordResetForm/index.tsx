import { useForm } from '@mantine/form';
import { useSetState } from '@mantine/hooks';
import { Button, Stack, PasswordInput, Group, Popover, Progress, PasswordRequirement } from 'components';
import React from 'react';

import messages from '../../messages';

import { getPasswordStrength, validations } from './validations';

const PasswordResetForm = ({ classes, onUpdate, response }) => {
  const [state, setState] = useSetState<{ popoverOpened: boolean; passwordStrength: number }>({
    popoverOpened: false,
    passwordStrength: 0
  });

  const form = useForm({
    initialValues: {
      oldPassword: '',
      newPassword: '',
      confirmPassword: ''
    },
    validate: {
      oldPassword: value => (value ? null : messages.error.currentPassword),
      newPassword: value => (value || state.passwordStrength === 100 ? null : messages.error.newPassword),
      confirmPassword: (value, values) => (value !== values.newPassword ? messages.error.confirmPassword : null)
    }
  });

  const checks = validations.map((requirement, index) => (
    <PasswordRequirement key={index} label={requirement.label} meets={requirement.re.test(form.values.newPassword)} />
  ));

  const onPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    form.setFieldValue('newPassword', event.target.value);
    setState({ passwordStrength: getPasswordStrength(event.target.value) });
  };
  return (
    <form autoComplete="false" onSubmit={form.onSubmit(onUpdate)}>
      <Stack spacing="lg">
        <PasswordInput
          classNames={{ input: classes.input }}
          placeholder={messages.label.currentPassword}
          {...form.getInputProps('oldPassword')}
        />
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
                classNames={{ input: classes.input }}
                placeholder={messages.label.newPassword}
                {...form.getInputProps('newPassword')}
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
              label={messages.error.passwordRequirement}
              meets={form.values.newPassword.length > 5}
            />
            {checks}
          </Popover.Dropdown>
        </Popover>
        <PasswordInput
          classNames={{ input: classes.input }}
          placeholder={messages.label.confirmPassword}
          {...form.getInputProps('confirmPassword')}
        />
      </Stack>
      <Group position="right">
        <Button type="submit" mt="lg">
          {messages.button.update}
        </Button>
      </Group>
    </form>
  );
};

export default PasswordResetForm;
