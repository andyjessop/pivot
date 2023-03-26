type Arg = string | Record<string, boolean | undefined> | null | undefined;

/**
 * Conditionally join classNames into a single string
 */
export function cx(...args: Arg[]): string {
  let str = '';
  let i = 0;
  let arg: unknown;
  let val;

  while (i < args.length) {
    if ((arg = args[i++])) {
      if (typeof arg === 'string') {
        val = arg;
      } else if (typeof arg === 'object') {
        val = cxMap(arg as Record<string, boolean>);
      }

      if (val) {
        if (str) {
          str += ' ';
        }

        str += val;
      }
    }
  }

  return str;
}

function cxMap(map: Record<string, boolean>): string {
  let str = '';

  for (const [key, value] of Object.entries(map)) {
    if (value) {
      if (str.length) {
        str += ' ';
      }

      str += key;
    }
  }

  return str;
}
