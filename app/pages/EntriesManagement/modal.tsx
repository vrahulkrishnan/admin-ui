import React from 'react';
import { DateTime } from 'luxon';

import { Modal, Image, Group, Stack, GroupButton, Typography, Anchor } from 'components';
import { DATE_FORMAT } from 'config';

import { EntryModalProps } from './types';

const EntryModal = ({ opened, onClose, data, onAction }: EntryModalProps) => {
  return (
    <Modal size="xl" opened={opened} onClose={onClose} centered title={data.activity.title}>
      <Image radius="lg" src={data.image.imageUrl} />
      <Group position="apart" mt="md">
        <Stack spacing={0}>
          <Typography color="primary" weight={500}>
            {`${data.user.firstName} ${data.user.lastName}`}
          </Typography>
          <Typography color="primary" weight={400}>
            <Anchor<'a'> color="primary" href={`mailto:${data.user.emailId}`}>
              {data.user.emailId}
            </Anchor>
          </Typography>
          <Typography color="primary" size="sm" weight={500}>
            {DateTime.fromJSDate(new Date(data.createdAt)).toFormat(DATE_FORMAT.VIEW)}
          </Typography>
        </Stack>
        {data.status === 'pending' ? (
          <GroupButton
            size="lg"
            left={{
              label: 'Disapprove',
              onClick: () => {
                onAction('rejected', String(data.id));
              }
            }}
            right={{
              label: 'Approve',
              onClick: () => {
                onAction('approved', String(data.id));
              }
            }}
          />
        ) : (
          <Typography sx={{ textTransform: 'capitalize' }} color="primary">
            {data.status}
          </Typography>
        )}
      </Group>
    </Modal>
  );
};

export default EntryModal;
