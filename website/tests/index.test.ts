import { exportedForTesting as openingTimesTests } from '@/components/openingTimes'

describe('testing openingTimes module', () => {
  const isOpen = openingTimesTests.isOpen;
  test('Should be closed on Monday 14:00', () => {
    expect(isOpen(new Date("2024-01-01T14:00:00"))).toBe(false);
  });

  test('Should be open on Saturday 14:00', () => {
    expect(isOpen(new Date("2024-01-06T14:00:00"))).toBe(true);
  });

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

  test('Should be closed on Tuesday 01:59', () => {
    expect(isOpen(new Date("2024-01-02T01:59:00"))).toBe(false);
  });

  test('Should be open on Wednesday 22:59', () => {
    expect(isOpen(new Date("2024-01-03T22:59:00"))).toBe(true);
  });

  test('Should be closed on Wednesday 23:00', () => {
    expect(isOpen(new Date("2024-01-03T23:00:00"))).toBe(false);
  });
});
