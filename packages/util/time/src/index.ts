export function relativeTime(time: number | string) {
  const timestamp = typeof time === 'string' ? +new Date(time) : time;
  const delta = Math.round((+new Date() - timestamp) / 1000);

  const minute = 60;
  const hour = minute * 60;
  const day = hour * 24;
  const week = day * 7;

  let ret: string;

  if (delta < 30) {
    ret = 'just now';
  } else if (delta < minute) {
    ret = `${delta} seconds ago`;
  } else if (delta < 2 * minute) {
    ret = 'a minute ago';
  } else if (delta < hour) {
    ret = `${Math.floor(delta / minute)} minutes ago`;
  } else if (Math.floor(delta / hour) === 1) {
    ret = '1 hour ago';
  } else if (delta < day) {
    ret = `${Math.floor(delta / hour)} hours ago`;
  } else if (delta < day * 2) {
    ret = 'yesterday';
  } else if (delta < week) {
    ret = `${Math.floor(delta / day)} days ago`;
  } else if (Math.floor(delta / week) === 1) {
    ret = '1 week ago';
  } else {
    ret = `${Math.floor(delta / week)} weeks ago`;
  }

  return ret;
}

export async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function humanReadableDate(dateString: string, userLocale = 'en-US'): string {
  const currentDate = new Date();
  const inputDate = new Date(dateString);

  if (isNaN(inputDate.valueOf())) {
    throw new Error('Invalid date string provided');
  }

  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  };

  if (inputDate.getFullYear() !== currentDate.getFullYear()) {
    options.year = 'numeric';
  }

  const formatter = new Intl.DateTimeFormat(userLocale, options);

  return formatter.format(inputDate);
}
