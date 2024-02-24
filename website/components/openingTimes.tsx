'use client'
import { ReactNode, useState, useEffect } from "react";

interface IDictionary<TValue> {
  [id: string]: TValue;
}

type AnyDigit = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
type OneMaxDigit = 0 | 1;
type FiveMaxDigit = 0 | 1 | 2 | 3 | 4 | 5;

type HourTime = `${OneMaxDigit}${AnyDigit}` | `2${0 | 1 | 2 | 3}`
type MinuteTime = `${FiveMaxDigit}${AnyDigit}`

type HourMinute = `${HourTime}:${MinuteTime}`;

interface IOpeningTimeRange {
  opens: HourMinute;
  closes: HourMinute;
}

type Closed = 'CLOSED';
type AllDay = 'ALL DAY';

type OpeningTime = IOpeningTimeRange | Closed | AllDay;

const openingTimes: IDictionary<OpeningTime> = {
  Monday: "CLOSED",
  Tuesday: { opens: "14:00", closes: "02:00" },
  Wednesday: { opens: "11:00", closes: "23:00" },
  Thursday: { opens: "11:00", closes: "23:00" },
  Friday: { opens: "11:00", closes: "22:00" },
  Saturday: "ALL DAY",
  Sunday: "ALL DAY",
}

function isInRange(t: Date, start:HourMinute, end:HourMinute): boolean {
  const isAfter = (subject: Date, test: Date): boolean => {
    return 0 < subject.getTime() - test.getTime(); 
  }

  const startDate: Date = new Date(t);
  const endDate: Date = new Date(t);
  let hourMinuteSplit: string[] = start.split(':');
  startDate.setHours(Number(hourMinuteSplit[0]));
  startDate.setMinutes(Number(hourMinuteSplit[1]));
  startDate.setSeconds(0);
  hourMinuteSplit = end.split(':');
  endDate.setHours(Number(hourMinuteSplit[0]));
  endDate.setMinutes(Number(hourMinuteSplit[1]));
  endDate.setSeconds(0);

  // if endDate is somehow before startdate, is probably open after midnight
  if (isAfter(startDate, endDate)) endDate.setDate(endDate.getDate() + 1);

  return isAfter(t, startDate) && !isAfter(t, endDate);
}

type dayOffset = -7 | -6 | -5 | -4 | -3 | -2 | -1 | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;

function getWeekDayName(time: Date, offsetDay?: dayOffset) {
  const offsetTime = new Date(time.setDate(time.getDate() + (offsetDay || 0)));
  return offsetTime.toLocaleDateString("en-US", {weekday: 'long'});
}

function isOpen(time: Date): boolean {
  const today: string = getWeekDayName(time);
  const yesterday: string = getWeekDayName(time, -1);

  const openingTimesToday = openingTimes[today];
  if (openingTimesToday === "ALL DAY") {
    return true;
  }
  else if (openingTimesToday === "CLOSED") {
    const openingTimesYesterday = openingTimes[yesterday];
    if(
      openingTimesYesterday !== "ALL DAY" &&
        openingTimesYesterday !== "CLOSED"
    ) {
      return isInRange(time, "00:00", openingTimesYesterday.closes);
    }
    return false;
  }
  return isInRange(time, openingTimesToday.opens, openingTimesToday.closes);
}

function RestaurantStatus(props: {time: Date}) {
  const isopen: boolean = isOpen(props.time);
  return (
    <div className={(isopen ? "bg-green-600" : "bg-red-800" ) + " m-8 py-2 px-5 rounded-lg"}>
      <h1 className='text-2xl'>
        {isopen ? "open" : "closed"}
      </h1>
    </div>
  )
}

function OpeningTimes(props: {time: Date}) {
  const today: string = props.time.toLocaleDateString("en-US", {weekday: 'long'});

  const openingTimesToday = openingTimes[today];
  if(
    openingTimesToday !== "ALL DAY" &&
      openingTimesToday !== "CLOSED"
  ) {
    return (
      <table className="border-zinc-700 border">
        <tbody>
          <tr>
            <td className="pl-4 py-2">
              <p>{today}</p>
            </td>
            <td>
              <pre> - </pre>
            </td>
            <td>
              <p>{(openingTimesToday as IOpeningTimeRange).opens}</p>
            </td>
            <td>
              <pre> to </pre>
            </td>
            <td className="pr-4 py-2">
              <p>{(openingTimesToday as IOpeningTimeRange).closes}</p>
            </td>
          </tr>
        </tbody>
      </table>
    )
  }else {
    return (
      <div>
        <p>{openingTimesToday as string}</p>
      </div>
    )
  }
}

export function OpeningTimesFullDisplay() {
  const [hydrated, setHydrated] = useState(false);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 3000);

    setHydrated(true);

    return () => {
      clearInterval(interval);
    }
  }, [])

  return (
    <div className="m-auto p-8">
      <h1 className='text-2xl text-center'>
        Opening Times today
      </h1>
      {hydrated &&
        <table className="m-auto">
          <tbody>
            <tr>
              <td>
                <OpeningTimes time={time}/>
              </td>
              <td>
                <RestaurantStatus time={time}/>
              </td>
            </tr>
          </tbody>
        </table>
      }
    </div>
  )
}

