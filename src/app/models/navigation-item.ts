export interface NavigationItem {
  id: string;
  title?: string; // Optional for dividers
  type: 'item' | 'collapse' | 'divider'; // Added 'divider'
  icon?: string;
  hidden?: boolean;
  url?: string;
  classes?: string;
  groupClasses?: string;
  exactMatch?: boolean;
  external?: boolean;
  target?: boolean;
  breadcrumbs?: boolean;
  children?: NavigationItem[]; // Items under dividers or collapses
  link?: string;
  description?: string;
  path?: string;
  expanded?: boolean;
}
