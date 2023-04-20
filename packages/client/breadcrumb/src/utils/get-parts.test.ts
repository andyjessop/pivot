import { getParts } from './get-parts';

const sampleConfig = {
  home: { path: '/' },
  about: { path: '/about', parent: 'home' },
  users: { path: '/user', parent: 'home' },
  user: { path: '/user/:id', parent: 'users' },
  settings: { path: '/user/:id/settings', parent: 'user' },
};

describe('getParts', () => {
  it('should return an empty array if route is not provided', () => {
    const result = getParts(sampleConfig, '');
    expect(result).toEqual([]);
  });

  it('should throw an error for an invalid route', () => {
    expect(() => getParts(sampleConfig, 'invalid')).toThrowError(
      'Invalid route: invalid',
    );
  });

  it('should build correct parts for a top-level route', () => {
    const result = getParts(sampleConfig, 'home');
    expect(result).toEqual([{ route: { name: 'home' } }]);
  });

  it('should build correct parts for a nested route', () => {
    const result = getParts(sampleConfig, 'about');
    expect(result).toEqual([
      { route: { name: 'home' } },
      { text: 'about', route: { name: 'about' } },
    ]);
  });

  it('should build correct parts for a route with params', () => {
    const result = getParts(sampleConfig, 'user', { id: '42' });
    expect(result).toEqual([
      { route: { name: 'home' } },
      { text: 'user', route: { name: 'users' } },
      { text: ':id', route: { name: 'user', params: { id: '42' } } },
    ]);
  });

  it('should build correct parts for a deeply nested route with params', () => {
    const result = getParts(sampleConfig, 'settings', { id: '42' });
    expect(result).toEqual([
      { route: { name: 'home' } },
      { text: 'user', route: { name: 'users' } },
      { text: ':id', route: { name: 'user', params: { id: '42' } } },
      { text: 'settings', route: { name: 'settings', params: { id: '42' } } },
    ]);
  });
});
