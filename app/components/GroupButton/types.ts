export interface GroupButtonProps {
  left: { label: string; hide?: boolean; onClick?: () => void; type?: 'button' | 'submit' };
  right: { label: string; onClick?: () => void; type?: 'button' | 'submit' };
  size?: 'md' | 'lg';
}
