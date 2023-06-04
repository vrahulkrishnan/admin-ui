import {
  AppShell,
  Navbar,
  Header,
  Container,
  Image,
  Group,
  ActionIcon,
  Icon,
  Indicator,
  Menu,
  LinksGroup
} from 'components';
import React from 'react';
import { useLocation } from 'react-router-dom';

import { appRoutes, pageRoutes } from 'routes/config';
import { hasLoginAccess } from 'config';
import { localRedirect, isValidPath } from 'utils';

import { imageMap } from '../../../../.images';
import * as Actions from '../../actions';

import { LayoutProps } from './types';
import messages from './messages';

function Layout({ pageTitle, dispatch, ...props }: LayoutProps) {
  const links = appRoutes.map(item => <LinksGroup {...item} key={item.label} />);
  const { pathname } = useLocation();
  const isLoggedIn = hasLoginAccess();
  const hasPath = isValidPath(pathname, pageRoutes);
  let children = <></>;
  if (isLoggedIn) {
    if (hasPath) {
      children = <>{props.children}</>;
    }
  } else {
    localRedirect('/login');
  }

  const handleLogout = () => {
    dispatch(Actions.logout());
  };

  return (
    <AppShell
      padding="md"
      navbar={
        <Navbar
          styles={theme => ({
            root: {
              backgroundColor: theme.colors.primary[5],
              color: theme.white,
              '&:after': {
                content: "''",
                position: 'absolute',
                backgroundImage: `url(${imageMap['sidebar-bg']()})`,
                bottom: 0,
                left: 0,
                width: '100%',
                height: 501,
                zIndex: '-1'
              }
            }
          })}
          width={{ base: 300 }}
          height="100%"
          py={42}
          px="md"
        >
          {links}
        </Navbar>
      }
      header={
        <Header
          height={100}
          p="xs"
          sx={{
            boxShadow:
              '0 1px 3px rgb(0 0 0 / 5%), rgb(0 0 0 / 5%) 0px 20px 25px -5px, rgb(0 0 0 / 4%) 0px 10px 10px -5px'
          }}
        >
          <Container size="xl" fluid sx={{ height: '100%' }}>
            <Group position="apart" align="center" sx={{ height: '100%' }}>
              <Image name="admin-logo" width={200} />
              <Group spacing={36}>
                <Indicator size={8} disabled>
                  <ActionIcon size="sm">
                    <Icon name="bell" />
                  </ActionIcon>
                </Indicator>
                <Menu
                  styles={theme => ({
                    item: {
                      color: '#7a7a7a',
                      fontWeight: theme.other.fontWeight[3],
                      '&:hover': {
                        color: theme.white,
                        background: 'linear-gradient(to left, rgba(235 110 27 / 100%) 0%, rgb(235 110 27 / 10%)  100%)'
                      }
                    }
                  })}
                  withArrow
                  shadow="md"
                  width={180}
                >
                  <Menu.Target>
                    <ActionIcon size="sm">
                      <Icon name="user" />
                    </ActionIcon>
                  </Menu.Target>
                  <Menu.Dropdown>
                    <Menu.Item icon={<Icon name="user" size="16" />} onClick={() => localRedirect('/profile')}>
                      {messages.profile}
                    </Menu.Item>
                    <Menu.Item icon={<Icon name="logout" size="16" />} onClick={handleLogout}>
                      {messages.logout}
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              </Group>
            </Group>
          </Container>
        </Header>
      }
      styles={theme => ({
        main: { backgroundColor: '#f6f6f6' }
      })}
    >
      {children}
    </AppShell>
  );
}

export default Layout;
