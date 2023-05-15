import { splitUrl } from './split-url';

describe('splitUrl', () => {
  it('should split a URL with a protocol into the protocol and the rest', () => {
    const url = 'https://www.example.com/path/to/resource';
    const [protocol, rest] = splitUrl(url);
    expect(protocol).toBe('https://');
    expect(rest).toBe('www.example.com/path/to/resource');
  });

  it('should throw an error if the URL has no protocol', () => {
    const url = 'www.example.com/path/to/resource';
    const [protocol, rest] = splitUrl(url);
    expect(protocol).toBe('https://');
    expect(rest).toBe('www.example.com/path/to/resource');
  });

  it('should split a URL with a custom protocol into the protocol and the rest', () => {
    const url = 'my-protocol://www.example.com/path/to/resource';
    const [protocol, rest] = splitUrl(url);
    expect(protocol).toBe('my-protocol://');
    expect(rest).toBe('www.example.com/path/to/resource');
  });

  it('should split a URL with a port number into the protocol and the rest', () => {
    const url = 'https://www.example.com:8080/path/to/resource';
    const [protocol, rest] = splitUrl(url);
    expect(protocol).toBe('https://');
    expect(rest).toBe('www.example.com:8080/path/to/resource');
  });
});
