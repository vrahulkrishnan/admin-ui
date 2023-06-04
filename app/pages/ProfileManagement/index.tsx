import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useSelector, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { Box, LoadingIndicator, SimpleGrid, Title, Stack, Typography, Avatar, Button, FileButton } from 'components';
import { useInjectSaga, useInjectReducer } from 'utils';
import { createStyles } from '@mantine/core';

import { imageMap } from '../../.images';

import saga from './saga';
import reducer from './reducer';
import * as Selectors from './selectors';
import { IProfile, ProfileManagementProps } from './types';
import messages from './messages';
import { PasswordResetForm, ProfileUpdateForm } from './containers';
import * as Actions from './actions';

const key = 'profile';
const stateSelector = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  response: Selectors.makeSelectResponse(),
  profileDetails: Selectors.makeSelectProfileDetails(),
  passwordUpdateResponse: Selectors.makeSelectPasswordUpdateResponse()
});

const useStyles = createStyles(() => ({
  input: {
    background: '#f5f5f5',
    borderColor: '#f2f0f0',
    boxShadow: 'none'
  }
}));

export default function ProfileManagement(props: ProfileManagementProps) {
  const { loading, passwordUpdateResponse, response, profileDetails } = useSelector(stateSelector);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string>('');
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  const dispatch = useDispatch();

  const { classes } = useStyles();

  useEffect(() => {
    dispatch(Actions.getProfileDetails());
  }, []);

  const handleProfileUpdate = (values: IProfile) => {
    dispatch(Actions.updateProfileDetails(values));
  };
  const handleImageChange = (file: File) => {
    if (file?.size > 1000000) {
      setError(messages.error.fileSize);
    } else {
      setFile(file);
      setError('');
      dispatch(Actions.updateProfileImage(file));
    }
  };

  const handlePasswordReset = (values: { oldPassword: any; newPassword: any }) => {
    dispatch(Actions.updatePassword({ oldPassword: values.oldPassword, newPassword: values.newPassword }));
  };

  return (
    <>
      <Helmet titleTemplate={messages.title} defaultTitle={messages.title} title={messages.title} />
      <LoadingIndicator visible={loading} />
      <Title order={2} color="#7b7b7b" py={16}>
        {messages.title}
      </Title>
      <Box my="lg" sx={{ width: '90%', backgroundColor: 'transparent' }}>
        <SimpleGrid
          cols={2}
          spacing="xl"
          breakpoints={[
            { maxWidth: 980, cols: 1, spacing: 'md' },
            { maxWidth: 755, cols: 1, spacing: 'sm' },
            { maxWidth: 600, cols: 1, spacing: 'sm' }
          ]}
        >
          <Box sx={theme => ({ backgroundColor: theme.white, borderRadius: theme.defaultRadius, padding: '2rem' })}>
            <Stack
              spacing={0}
              p="lg"
              sx={{ textAlign: 'center', height: '100%', justifyContent: 'center' }}
              align="center"
            >
              <Avatar
                src={
                  file instanceof File
                    ? URL.createObjectURL(file)
                    : profileDetails?.image
                    ? profileDetails?.image?.imageUrl
                    : imageMap['user-pic-png']()
                }
                size={120}
                radius={120}
                mx="auto"
              />
              <Typography align="center" size="md" color="primary" weight={500} mt="md">
                {messages.label.picture}
              </Typography>
              <FileButton onChange={handleImageChange} accept="image/png,image/jpeg">
                {props => (
                  <Button variant="filled" mx="auto" mt="md" {...props}>
                    {messages.button.avatar}
                  </Button>
                )}
              </FileButton>
              {error && (
                <Typography my="xs" sx={theme => ({ color: theme.colors.danger[0] })} size="sm">
                  {error}
                </Typography>
              )}
            </Stack>
          </Box>
          <Stack spacing="xl">
            <div>
              <Typography color="primary" size="sm" weight={500} pb={8}>
                {messages.edit}
              </Typography>
              <Box sx={theme => ({ backgroundColor: theme.white, borderRadius: theme.defaultRadius, padding: '2rem' })}>
                <ProfileUpdateForm
                  response={response}
                  data={profileDetails}
                  onUpdate={handleProfileUpdate}
                  classes={classes}
                />
              </Box>
            </div>
            <div>
              <Typography color="primary" size="sm" weight={500} pb={8}>
                {messages.password}
              </Typography>
              <Box sx={theme => ({ backgroundColor: theme.white, borderRadius: theme.defaultRadius, padding: '2rem' })}>
                <PasswordResetForm response={passwordUpdateResponse} onUpdate={handlePasswordReset} classes={classes} />
              </Box>
            </div>
          </Stack>
        </SimpleGrid>
      </Box>
    </>
  );
}
