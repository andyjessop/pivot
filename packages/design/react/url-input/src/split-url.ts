export function splitUrl(url: string): [string, string] {
  const protocolEndIndex = url.indexOf('://');
  if (protocolEndIndex === -1) {
    return ['https://', url];
  }

  const protocol = url.substring(0, protocolEndIndex + 3);
  const rest = url.substring(protocolEndIndex + 3);

  return [protocol, rest];
}
