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

const openingTimes: IDictionary<IOpeningTimeRange | 'CLOSED' | 'ALL DAY'> = {
  Monday: "CLOSED",
  Tuesday: { opens: "14:00", closes: "02:00" },
  Wednesday: { opens: "11:00", closes: "23:00" },
  Thursday: { opens: "11:00", closes: "23:00" },
  Friday: { opens: "11:00", closes: "22:00" },
  Saturday: "ALL DAY",
  Sunday: "ALL DAY",
}

function isInRange(t: Date, start:HourMinute, end:HourMinute) {
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

function RestaurantStatus(props: {time: Date}) {
  const today: string = props.time.toLocaleDateString("en-US", {weekday: 'long'});
  const yesterdayDate = new Date(props.time);
  yesterdayDate.setDate(yesterdayDate.getDate() - 1);
  const yesterday: string = yesterdayDate.toLocaleDateString("en-US", {weekday: 'long'});

  let isOpen: boolean = false;
  if((openingTimes[today] as IOpeningTimeRange).opens !== undefined) {
    isOpen = 
      ((openingTimes[yesterday] as IOpeningTimeRange).opens !== undefined ?
      isInRange(
        props.time,
        "00:00",
        (openingTimes[yesterday] as IOpeningTimeRange).closes
       ) : false)
        ||
        isInRange(
          props.time,
          (openingTimes[today] as IOpeningTimeRange).opens,
          (openingTimes[today] as IOpeningTimeRange).closes
        );
  }else if (openingTimes[today] as string === 'ALL DAY') {
    isOpen = true;
  }

  return (
    <div className={(isOpen ? "bg-green-600" : "bg-red-800" ) + " m-8 py-2 px-5 rounded-lg"}>
      <h1 className='text-2xl'>
        {isOpen ? "open" : "closed"}
      </h1>
    </div>
  )
}

export function OpeningTimes() {
  const [time, setTime] = useState(new Date());
  const today: string = time.toLocaleDateString("en-US", {weekday: 'long'});

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 3000);

    return () => {
      clearInterval(interval);
    }
  }, [])
  let openingTime: ReactNode;

  if((openingTimes[today] as IOpeningTimeRange).opens !== undefined) {
    openingTime =
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
              <p>{(openingTimes[today] as IOpeningTimeRange).opens}</p>
            </td>
            <td>
              <pre> to </pre>
            </td>
            <td className="pr-4 py-2">
              <p>{(openingTimes[today] as IOpeningTimeRange).closes}</p>
            </td>
          </tr>
        </tbody>
      </table>
  }else {
    openingTime =
      <div>
        <p>{openingTimes[today] as string}</p>
      </div>
  }

  return (
    <div className="m-auto p-8">
      <h1 className='text-2xl text-center'>
        Opening Times today
      </h1>
      <table className="m-auto">
        <tbody>
          <tr>
            <td>
              {openingTime}
            </td>
            <td>
              <RestaurantStatus time={time}/>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

