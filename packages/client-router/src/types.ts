export type Route<T extends RouterConfig = any> = {
  name: keyof T & string;
  hash?: string;
  params?: Record<string, string>;
  search?: Record<string, string>;
};

export type RouterConfig = Record<string, string> & {
  notFound?: string;
};

export interface RouterState {
  route: Route | null;
}
