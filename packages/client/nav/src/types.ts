import { RouterConfig } from '@pivot/lib/router';

export interface NavItem<T extends RouterConfig> {
  active: boolean;
  icon?: string;
  route: keyof T;
  text: string;
}
