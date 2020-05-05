export interface AdminMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface Navigation {
  text: string;
  icon: JSX.Element;
  path: string;
}
