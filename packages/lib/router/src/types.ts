import { service } from './service';

export type Route<T extends RouterConfig, K extends keyof T = keyof T> = {
  hash?: string;
  name: keyof T & string;
  params?: RouteParams<T[K]['path']>;
  search?: Record<string, string>;
};

export type FullRoute<T extends RouterConfig, K extends keyof T = keyof T> = {
  hash: string;
  name: keyof T & string;
  params: RouteParams<T[K]['path']>;
  search: Record<string, string>;
};

export type Link<T extends RouterConfig, K extends keyof T = keyof T> = ({
  children,
  className,
  to,
}: {
  children: React.ReactNode;
  className?: string;
  to: Route<T, K>;
}) => React.ReactElement;

export type RouterConfig = Record<string, RouteConfig> & {
  notFound?: RouteConfig;
};

export interface RouteConfig {
  parent?: string;
  path: string;
}

export interface RouterState<T extends RouterConfig> {
  route: Route<T> | null;
}

export type Router = ReturnType<typeof service>;

/**
 * Utils
 */
type PathSegments<Path extends string> = Path extends `${infer SegmentA}/${infer SegmentB}`
  ? ParamOnly<SegmentA> | PathSegments<SegmentB>
  : ParamOnly<Path>;

type ParamOnly<Segment extends string> = Segment extends `:${infer Param}` ? Param : never;

export type RouteParams<Path extends string> = {
  [Key in PathSegments<Path>]: string;
};
