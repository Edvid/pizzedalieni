interface IDictionary<TValue> {
  [id: string]: TValue;
}

type AnyDigit = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
type OneMaxDigit = 0 | 1;
type FiveMaxDigit = 0 | 1 | 2 | 3 | 4 | 5;

type HourTime = `${OneMaxDigit}${AnyDigit}` | `2${0 | 1 | 2 | 3}`
type MinuteTime = `${FiveMaxDigit}${AnyDigit}`

type HourMinute = `${HourTime}:${MinuteTime}`;

export interface IOpeningTimeRange {
  opens: HourMinute;
  closes: HourMinute;
}

type Closed = 'CLOSED';
type AllDay = 'ALL DAY';

type OpeningTime = IOpeningTimeRange | Closed | AllDay;

export const openingTimes: IDictionary<OpeningTime> = {
  Monday: "CLOSED",
  Tuesday: { opens: "14:00", closes: "02:00" },
  Wednesday: { opens: "11:00", closes: "23:00" },
  Thursday: { opens: "11:00", closes: "23:00" },
  Friday: { opens: "11:00", closes: "22:00" },
  Saturday: "ALL DAY",
  Sunday: "ALL DAY",
}

function DateSetHourMinute(date: Date, hourMinute: HourMinute) {
  const dat = new Date(date)
  const [hourPart, minutePart]: number[] = hourMinute.split(':').map(part => Number(part));
  dat.setHours(hourPart);
  dat.setMinutes(minutePart);
  dat.setSeconds(0);
  return dat;
}

function isInRange(t: HourMinute, start:HourMinute, end:HourMinute): boolean {
  const date = new Date("1980-01-01"); 

  const tTime: Date = DateSetHourMinute(date, t);
  const startTime: Date = DateSetHourMinute(date, start);
  const endTime: Date = DateSetHourMinute(date, end);

  if (startTime > endTime) endTime.setDate(endTime.getDate() + 1);

  return tTime >= startTime && tTime < endTime;
}

type dayOffset = -7 | -6 | -5 | -4 | -3 | -2 | -1 | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;

function getWeekDayName(time: Date, offsetDay?: dayOffset) {
  const offsetTime = new Date(time);
  offsetTime.setDate(time.getDate() + (offsetDay || 0));
  return offsetTime.toLocaleDateString("en-US", {weekday: 'long'});
}

export function isOpen(now: Date): boolean {
  const today: string = getWeekDayName(now);
  const yesterday: string = getWeekDayName(now, -1);
  const hourMinuteNow: HourMinute = `${now.getHours()}:${now.getMinutes()}` as HourMinute;

  var inRangeOfTodaysOpeningTimes,inRangeOfYesterdaysOpeningTimes: boolean = false;

  //todaychecks
  const openingTimesToday = openingTimes[today];
  if (openingTimesToday === "ALL DAY") {
    return true;
  }
  else if (openingTimesToday === "CLOSED") {
    inRangeOfTodaysOpeningTimes = false;
  }
  else {
    inRangeOfTodaysOpeningTimes = isInRange(hourMinuteNow, openingTimesToday.opens, openingTimesToday.closes);
    if(inRangeOfTodaysOpeningTimes) return true;
  }
  //yesterday checks
  const openingTimesYesterday = openingTimes[yesterday];
  if(
    openingTimesYesterday !== "ALL DAY" &&
      openingTimesYesterday !== "CLOSED"
  ) {
    // If yesterday, the closing time is less than its opening time,
    // Check for "bleed" into today
    if (openingTimesYesterday.closes < openingTimesYesterday.opens) {
      inRangeOfYesterdaysOpeningTimes = isInRange(hourMinuteNow, "00:00", openingTimesYesterday.closes);
    }
  }
  return inRangeOfTodaysOpeningTimes || inRangeOfYesterdaysOpeningTimes;
}
