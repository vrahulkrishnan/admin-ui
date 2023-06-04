import * as ReactRouterDom from 'react-router-dom';

export interface AnchorElementProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  element: 'a';
}

export interface ButtonElementProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  element: 'button';
}

export interface LinkElementProps extends ReactRouterDom.LinkProps {
  element: React.ComponentType<ReactRouterDom.LinkProps>;
}

/**
 * @typedef
 * @propName element
 * @en Specifies the underlying semantic HTML element to be used
 * @required
 */
export type InteractiveElementProps = AnchorElementProps | ButtonElementProps | LinkElementProps;

export type NavigationElementProps = AnchorElementProps | LinkElementProps;
