import { useForm } from '@mantine/form';
import { Button, SimpleGrid, Stack, TextInput } from 'components';
import React, { useEffect } from 'react';

import { IProfile } from '../../types';
import messages from '../../messages';
import { ProfileUpdateFormProps } from './types';

const ProfileUpdateForm = ({ classes, onUpdate, response, data }: ProfileUpdateFormProps) => {
  const form = useForm<IProfile>({
    initialValues: {
      firstName: '',
      lastName: '',
      emailId: '',
      phone: ''
    },
    validate: {
      firstName: value => (value ? null : messages.error.firstName),
      lastName: value => (value ? null : messages.error.lastName),
      emailId: value => (/^\S+@\S+$/.test(value) ? null : messages.error.email)
    }
  });

  useEffect(() => {
    if (data) {
      form.setValues({
        emailId: data.emailId || '',
        firstName: data.firstName || '',
        lastName: data.lastName || '',
        phone: data.phone || ''
      });
    }
  }, [data]);

  return (
    <form onSubmit={form.onSubmit(onUpdate)}>
      <Stack spacing="lg">
        <SimpleGrid
          spacing="lg"
          cols={2}
          breakpoints={[
            { maxWidth: 980, cols: 1, spacing: 'md' },
            { maxWidth: 755, cols: 1, spacing: 'sm' },
            { maxWidth: 600, cols: 1, spacing: 'sm' }
          ]}
        >
          <TextInput
            classNames={{ input: classes.input }}
            placeholder={messages.label.firstName}
            {...form.getInputProps('firstName')}
          />
          <TextInput
            classNames={{ input: classes.input }}
            placeholder={messages.label.lastName}
            {...form.getInputProps('lastName')}
          />
        </SimpleGrid>
        <TextInput
          classNames={{ input: classes.input }}
          placeholder={messages.label.email}
          {...form.getInputProps('emailId')}
        />
        <TextInput
          classNames={{ input: classes.input }}
          placeholder={messages.label.phone}
          {...form.getInputProps('phone')}
        />
      </Stack>
      <Button sx={{ display: 'block', width: 180 }} type="submit" mx="auto" mt="lg">
        {messages.button.submit}
      </Button>
    </form>
  );
};

export default ProfileUpdateForm;
