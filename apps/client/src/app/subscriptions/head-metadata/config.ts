import { Route } from '@pivot/client/router';

export const config = {
  notFound: {
    title: () => 'Pivot: Page Not Found',
  },
  project: {
    title: (route: Route) => `Project: ${route.name}`,
  },
  projects: {
    title: () => 'Projects',
  },
} as Record<string, { title: (route: Route) => string }>;
