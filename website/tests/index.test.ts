import { exportedForTesting as openingTimesTests } from '@/components/openingTimes'

describe('testing openingTimes module', () => {
  const isOpen = openingTimesTests.isOpen;
  test('Should be open on Tuesday 14:01', () => {
    expect(isOpen(new Date("2024-01-02T14:01:00"))).toBe(true);
  });

  test('Should be open on Tuesday 14:00', () => {
    expect(isOpen(new Date("2024-01-02T14:00:00"))).toBe(true);
  });

  test('Should be open on Wednesday 01:59', () => {
    expect(isOpen(new Date("2024-01-03T01:59:00"))).toBe(true);
  });

  test('Should be closed on Wednesday 02:00', () => {
    expect(isOpen(new Date("2024-01-03T02:00:00"))).toBe(false);
  });
});
