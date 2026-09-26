// A Vitest unit test for one pure module: js/utils.js. Every function under
// test here is pure (same input, same output, no DOM, no storage, no
// language) — see the comment at the top of utils.js. check.html (Step 16 of
// the walkthrough) tests the same module with no framework at all; this file
// is the "going further" version, using a real test runner instead.
//
// Run: npx vitest run (from this folder, with devDependencies installed).
import { describe, expect, it } from 'vitest';
import { bySchedule, driestDay, fraction, isSemver, nextLesson, toDays, totals } from '../../js/utils.js';

describe('totals', () => {
  it('sums minutes and counts ready lessons', () => {
    const lessons = [
      { minutes: 45, status: 'ready' },
      { minutes: 45, status: 'ready' },
      { minutes: 45, status: 'coming-soon' },
    ];
    expect(totals(lessons)).toEqual({ minutes: 135, ready: 2 });
  });

  it('returns zeros for an empty list', () => {
    expect(totals([])).toEqual({ minutes: 0, ready: 0 });
  });
});

describe('fraction', () => {
  it('divides part by whole', () => {
    expect(fraction(1, 4)).toBe(0.25);
  });

  it('returns 0 instead of dividing by zero', () => {
    expect(fraction(3, 0)).toBe(0);
  });
});

describe('nextLesson', () => {
  it('finds the first ready lesson not yet done', () => {
    const lessons = [
      { id: 'a', status: 'ready' },
      { id: 'b', status: 'ready' },
      { id: 'c', status: 'coming-soon' },
    ];
    expect(nextLesson(lessons, new Set(['a']))?.id).toBe('b');
  });

  it('returns undefined once every ready lesson is done', () => {
    const lessons = [{ id: 'a', status: 'ready' }];
    expect(nextLesson(lessons, new Set(['a']))).toBeUndefined();
  });
});

describe('bySchedule', () => {
  it('orders by day of the week, then by time', () => {
    const sessions = [
      { day: 'Wednesday', time: '19:00' },
      { day: 'Monday', time: '20:00' },
      { day: 'Monday', time: '18:00' },
    ];
    const sorted = [...sessions].sort(bySchedule);
    expect(sorted).toEqual([
      { day: 'Monday', time: '18:00' },
      { day: 'Monday', time: '20:00' },
      { day: 'Wednesday', time: '19:00' },
    ]);
  });
});

describe('toDays', () => {
  it('turns Open-Meteo\'s parallel arrays into one object per day', () => {
    const json = {
      daily: {
        time: ['2026-09-28', '2026-09-29'],
        temperature_2m_max: [24, 22],
        temperature_2m_min: [15, 14],
        precipitation_probability_max: [10, 60],
      },
    };
    expect(toDays(json)).toEqual([
      { date: '2026-09-28', max: 24, min: 15, rain: 10 },
      { date: '2026-09-29', max: 22, min: 14, rain: 60 },
    ]);
  });

  it('returns an empty list when the response has no daily data', () => {
    expect(toDays({})).toEqual([]);
    expect(toDays(null)).toEqual([]);
  });
});

describe('driestDay', () => {
  it('picks the day with the lowest chance of rain', () => {
    const days = [
      { date: 'a', rain: 60 },
      { date: 'b', rain: 10 },
      { date: 'c', rain: 40 },
    ];
    expect(driestDay(days).date).toBe('b');
  });
});

describe('isSemver', () => {
  it('accepts MAJOR.MINOR.PATCH, with an optional pre-release or build part', () => {
    expect(isSemver('1.0.0')).toBe(true);
    expect(isSemver('1.0.0-beta.1')).toBe(true);
    expect(isSemver('1.0.0+build.5')).toBe(true);
  });

  it('rejects anything else', () => {
    expect(isSemver('1.0')).toBe(false);
    expect(isSemver('v1.0.0')).toBe(false);
    expect(isSemver('01.0.0')).toBe(false);
  });
});
