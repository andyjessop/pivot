import { humanReadableDate } from './';

describe('humanReadableDate', () => {
  const currentYear = new Date().getFullYear();

  it('should format a date and time in the current year without the year and respect user locale', () => {
    const dateString = `${currentYear}-06-15T12:30:00.000000+00:00`;
    expect(humanReadableDate(dateString, 'en-US')).toBe('Jun 15, 14:30');
  });

  it('should format a date and time not in the current year with the year and respect user locale', () => {
    const dateString = '2022-12-01T08:31:00.000000+00:00';
    expect(humanReadableDate(dateString, 'en-US')).toBe('Dec 1, 2022, 09:31');
  });

  it('should format a date and time in a different locale', () => {
    const dateString = `${currentYear}-06-15T12:30:00.000000+00:00`;
    expect(humanReadableDate(dateString, 'fr-FR')).toBe('15 juin, 14:30');
  });

  it('should throw an error for an invalid date string', () => {
    const invalidDateString = 'invalid-date-string';
    expect(() => humanReadableDate(invalidDateString)).toThrow(
      'Invalid date string provided',
    );
  });

  it('should format a date and time with default locale', () => {
    const dateString = `${currentYear}-06-15T12:30:00.000000+00:00`;
    expect(humanReadableDate(dateString)).toBe('Jun 15, 14:30');
  });
});
