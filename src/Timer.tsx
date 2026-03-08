import React from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Label } from "@/components/ui/label";

export function Timer() {
  const [, setTick] = React.useState(0);

  React.useEffect(() => {
    const id = setInterval(() => {
      setTick(t => t + 1);
    }, 10);

    return () => clearInterval(id);
  }, []);

  const [searchParams] = useSearchParams();
  const dateParam = searchParams.get("dt");
  const monthParam = searchParams.get("m");
  const dayParam = searchParams.get("d");

  let date: Date;

  if (dateParam) {
    date = new Date(dateParam)
    date.setFullYear((new Date()).getFullYear())
  } else if (monthParam && dayParam) {
    date = new Date((new Date()).getFullYear(), Number.parseInt(monthParam), Number.parseInt(dayParam), 0, 0, 0, 0)
  } else {
    return (<div className="w-[100%] h-[100%] flex flex-col items-center p-5 gap-10 text-neutral-100">
      Error 404 Not found
    </div>)
  }

  if (new Date().getTime() > date!.getTime()){
    date!.setFullYear((new Date()).getFullYear()+1)
  }

  function getTimeRemaining() {

    const now = new Date().getTime();
    const target = date.getTime();

    const diff = (target - now);
    const diff_sec = diff / 1000

    const seconds = Math.floor(diff_sec) % 60;
    const minutes = Math.floor(diff_sec/60) % 60;
    const hours = Math.floor(diff_sec/(60*60)) % 24;
    const days = Math.floor(diff_sec/(60*60*24));
    const ms = diff % 1000

    return { days, hours, minutes, seconds, ms};
  }

  return (<div className="w-[100%] h-[100%] flex flex-col items-center p-5 gap-10 text-neutral-100">
    { date && <>
     <Label className="text-2xl mb-15">Until THE birthday:</Label>
     <Label className="text-white text-4xl">{getTimeRemaining().days} Days</Label>
     <Label className="text-white text-4xl">{getTimeRemaining().hours} Hours</Label>
     <Label className="text-white text-4xl">{getTimeRemaining().minutes} Minutes</Label>
     <Label className="text-white text-4xl">{getTimeRemaining().seconds} Seconds</Label>
     <Label className="text-white text-4xl">{getTimeRemaining().ms} ms</Label>
     </>
    }
  </div>)
}

export default Timer; 