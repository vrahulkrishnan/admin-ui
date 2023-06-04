import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { ResponsiveLine } from '@nivo/line';
import { Divider, Tooltip } from '@mantine/core';

import { useInjectSaga, useInjectReducer } from 'utils';
import { Title, LoadingIndicator, Box, Typography, SimpleGrid, Card, Group } from 'components';

import messages from './messages';
import saga from './saga';
import reducer from './reducer';
import * as Selectors from './selectors';
import * as Actions from './actions';

const key = 'dashboard';
const stateSelector = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  data: Selectors.makeSelectData()
});

export default function DashboardManagement() {
  const dispatch = useDispatch();
  const { loading, data } = useSelector(stateSelector);
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  useEffect(() => {
    dispatch(Actions.getDasboardData());
  }, []);

  return (
    <>
      <Helmet titleTemplate={messages.title} defaultTitle={messages.title} title={messages.title} />
      <LoadingIndicator visible={loading} />
      <Title order={2} color="#7b7b7b" py={16}>
        {messages.title}
      </Title>
      <Typography color="#7b7b7b" size="md" weight={500} mt="md">
        {messages.graphTitle}
      </Typography>
      <Box style={{ width: '100%', height: 300 }}>
        <ResponsiveLine
          margin={{ top: 20, right: 30, bottom: 20, left: 30 }}
          data={[
            {
              id: 'User Count',
              data: data.userRegData || []
            }
          ]}
          xScale={{
            type: 'time',
            format: '%Y-%m-%d',
            useUTC: false,
            precision: 'day'
          }}
          xFormat="time:%Y-%m-%d"
          yScale={{
            type: 'linear',
            stacked: false
          }}
          axisLeft={{
            legend: 'Users',
            legendOffset: 12
          }}
          yFormat=">-.0f"
          enableSlices={false}
          axisBottom={{
            format: '%b %d',
            tickValues: 'every 2 days',
            legend: 'Date',
            legendOffset: -12
          }}
          enablePointLabel={true}
          pointSize={8}
          pointBorderWidth={1}
          pointBorderColor={{
            from: 'color',
            modifiers: [['darker', 0.3]]
          }}
          useMesh={true}
        />
      </Box>
      <SimpleGrid py={4} cols={2}>
        <Card>
          <Typography size="sm" weight={500} color="primary">
            Most performing activities
            {(data.activityData || []).map((item, index) => (
              <Box key={index}>
                <Group py="md" position="apart" spacing={0}>
                  <Tooltip label={item.title}>
                    <Typography lineClamp={1} size="sm" weight={500} color="#7b7b7b" sx={{ width: '60%' }}>
                      {item?.title}
                    </Typography>
                  </Tooltip>
                  <Typography size="sm" weight={500} color="#7b7b7b">
                    {item?.userCount}
                  </Typography>
                </Group>
                <Divider color="#efefef" />
              </Box>
            ))}
          </Typography>
        </Card>
        <Card>
          <Typography size="sm" weight={500} color="primary">
            Most performing Users
          </Typography>
          {(data.userData || []).map((item, index) => (
            <Box key={index}>
              <Group py="md" position="apart" spacing={0}>
                <Tooltip label={`${item.firstName} ${item.lastName}`}>
                  <Typography lineClamp={1} size="sm" weight={500} color="#7b7b7b" sx={{ width: '60%' }}>
                    {`${item?.firstName} ${item?.lastName}`}
                  </Typography>
                </Tooltip>
                <Typography size="sm" weight={500} color="#7b7b7b">
                  {item?.activityCount}
                </Typography>
              </Group>
              <Divider color="#efefef" />
            </Box>
          ))}
        </Card>
      </SimpleGrid>
    </>
  );
}
