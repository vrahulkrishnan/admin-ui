export interface LinksGroupProps {
  label: string;
  initiallyOpened?: boolean;
  links?: { label: string; href: string }[];
  active?: boolean;
  href: string;
  activeItem?: string;
}
