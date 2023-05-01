import { getParts } from './get-parts';

const sampleConfig = {
  about: { parent: 'home', path: '/about' },
  home: { path: '/' },
  settings: { parent: 'user', path: '/user/:id/settings' },
  user: { parent: 'users', path: '/user/:id' },
  users: { parent: 'home', path: '/user' },
};

describe('getParts', () => {
  it('should return an empty array if route is not provided', () => {
    const result = getParts(sampleConfig, '');
    expect(result).toEqual([]);
  });

  it('should throw an error for an invalid route', () => {
    expect(() => getParts(sampleConfig, 'invalid')).toThrowError('Invalid route: invalid');
  });

  it('should build correct parts for a top-level route', () => {
    const result = getParts(sampleConfig, 'home');
    expect(result).toEqual([{ route: { name: 'home' } }]);
  });

  it('should build correct parts for a nested route', () => {
    const result = getParts(sampleConfig, 'about');
    expect(result).toEqual([
      { route: { name: 'home' } },
      { route: { name: 'about' }, text: 'about' },
    ]);
  });

  it('should build correct parts for a route with params', () => {
    const result = getParts(sampleConfig, 'user', { id: '42' });
    expect(result).toEqual([
      { route: { name: 'home' } },
      { route: { name: 'users' }, text: 'user' },
      { route: { name: 'user', params: { id: '42' } }, text: ':id' },
    ]);
  });

  it('should build correct parts for a deeply nested route with params', () => {
    const result = getParts(sampleConfig, 'settings', { id: '42' });
    expect(result).toEqual([
      { route: { name: 'home' } },
      { route: { name: 'users' }, text: 'user' },
      { route: { name: 'user', params: { id: '42' } }, text: ':id' },
      { route: { name: 'settings', params: { id: '42' } }, text: 'settings' },
    ]);
  });
});
