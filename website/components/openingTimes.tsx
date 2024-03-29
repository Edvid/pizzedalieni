'use client'
import { useState, useEffect } from "react";
import { isOpen, openingTimes, IOpeningTimeRange} from "@/utils/openingTimes"

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
