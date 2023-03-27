import { Service } from './types';

export function service(): Service {
  return {
    has,
  };

  function has(feature: string) {
    return (window as any).features[feature] === true;
  }
}
