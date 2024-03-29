import { isOpen } from '@/utils/openingTimes'
import { exportedForTesting as getCookieTest } from '@/utils/cookie/getCookie';

describe('testing openingTimes module', () => {
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

  test('Should be closed on Thursday 23:00', () => {
    expect(isOpen(new Date("2024-01-04T23:00:00"))).toBe(false);
  });

  test('Should be closed on Friday 02:00', () => {
    expect(isOpen(new Date("2024-01-05T02:00:00"))).toBe(false);
  });
});

describe('testing getCookie util', () => {
  const getCookie = getCookieTest.getFromSemicolonSeperatedString;
  test('looking for "empty" in empty cookie should return undefined', () => {
    expect(getCookie("", "")).toBe(undefined);
  });

  test('looking for "moo" in empty cookie should return undefined', () => {
    expect(getCookie("moo", "")).toBe(undefined);
  });

  test('looking for "moo" in moo=cow cookie should return cow', () => {
    expect(getCookie("moo", "moo=cow")).toBe("cow");
  });

  test('looking for "moo" in miaw=cat; moo=cow cookie should return cow', () => {
    expect(getCookie("moo", "miaw=cat; moo=cow")).toBe("cow");
  });

  test('looking for "moo" in miaw=cat; moo=cow cookie should return cow', () => {
    expect(getCookie("moo", ";miaw=cat; moo=cow;")).toBe("cow");
  });

  test('looking for "squeek" in miaw=cat; squeek=squirrel,mouse; moo=cow cookie should return squirrel,mouse', () => {
    expect(getCookie("squeek", "miaw=cat; squeek=squirrel,mouse; moo=cow")).toBe("squirrel,mouse");
  });
 
  test('looking for "squeek" in miaw=cat; squeek=squirrel=mouse; moo=cow cookie should return squirrel=mouse', () => {
    expect(getCookie("squeek", "miaw=cat; squeek=squirrel=mouse; moo=cow")).toBe("squirrel=mouse");
  });
 
  test('looking for "squeek" in miaw=cat;squeek=squirrel=mouse;moo=cow cookie should return squirrel=mouse', () => {
    expect(getCookie("squeek", "miaw=cat;squeek=squirrel=mouse;moo=cow")).toBe("squirrel=mouse");
  });
 
  test('looking for "squeek" in miaw=cat; squeek=squirrel; squeek=mouse; moo=cow cookie should return squirrel', () => {
    expect(getCookie("squeek", "miaw=cat; squeek=squirrel=mouse; moo=cow")).toBe("squirrel=mouse");
  });
});
