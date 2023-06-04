import React, { useEffect, useState } from 'react';
import { Box, createStyles, NavLink } from '@mantine/core';
import { Link, useLocation } from 'react-router-dom';

import { localRedirect } from 'utils';

import { LinksGroupProps } from './types';

const useStyles = createStyles(theme => ({
  control: {
    fontWeight: 600,
    width: '100%',
    color: theme.white,
    fontSize: theme.fontSizes.sm,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.sm,
    borderRadius: 35,
    transition: 'all 200ms ease',
    '&:hover': {
      background: 'linear-gradient(to right, rgba(255,255,255,0.4) 0%,rgba(255,255,255,0) 100%);'
    }
  },
  active: {
    background: 'linear-gradient(to right, rgba(255,255,255,0.4) 0%,rgba(255,255,255,0) 100%);'
  },

  link: {
    fontWeight: 500,
    fontSize: theme.fontSizes.sm,
    paddingBottom: theme.spacing.xs,
    color: 'rgb(255 255 255 / 74%)',
    background: 'none',
    '&:hover': {
      background: 'none',
      textDecoration: 'underline'
    }
  },
  linkActive: {
    textDecoration: 'underline'
  },

  chevron: {
    transition: 'transform 200ms ease'
  }
}));

export default function LinksGroup({ label, links, href, initiallyOpened }: LinksGroupProps) {
  const { classes, cx } = useStyles();
  const hasLinks = Array.isArray(links);
  const { pathname } = useLocation();
  const [activeItem, setActiveItem] = useState(pathname);

  useEffect(() => {
    setActiveItem(pathname);
  }, [pathname]);

  const isActive = (href && activeItem && activeItem.includes(href)) || false;

  const handleChangeActiveItem = (path: string) => {
    localRedirect(path);
    setActiveItem(path);
  };

  const items = (hasLinks ? links : []).map(link => {
    return (
      <NavLink
        component={Link}
        to={link.href}
        className={cx(classes.link, { [classes.linkActive]: pathname === link.href })}
        key={link.label}
        onClick={(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
          event.preventDefault();
          handleChangeActiveItem(link.href);
        }}
        label={link.label}
      />
    );
  });

  return (
    <>
      <Box>
        {hasLinks ? (
          <NavLink
            defaultOpened={initiallyOpened || isActive}
            className={cx(classes.control)}
            label={label}
            childrenOffset={20}
          >
            {hasLinks ? items : null}
          </NavLink>
        ) : (
          <NavLink
            component={Link}
            to={href}
            className={cx(classes.control, { [classes.active]: isActive })}
            label={label}
            onClick={(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
              event.preventDefault();
              handleChangeActiveItem(href);
            }}
          />
        )}
      </Box>
    </>
  );
}
