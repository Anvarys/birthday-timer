import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import React from "react";
import { Checkbox } from "@/components/ui/checkbox";


export function Editor() {

  const [date, setDate] = React.useState<Date | undefined>(
    localStorage.getItem("birthday") ? new Date(localStorage.getItem("birthday")!) : new Date()
  )
  const [currentMonth, setCurrentMonth] = React.useState<Date>(
    new Date(2008, new Date().getMonth(), 1, 0, 0, 0, 0)
  )
  const [isLocalisedTimeTimer, setIsLocalisedTimeTimer] = React.useState<boolean>(false)

  React.useEffect(() => {
    localStorage.setItem("birthday", date?.toISOString()!)
  })

  function getLink(){
    if (!isLocalisedTimeTimer)  {
      return `/timer?d=${date?.toISOString()}`
    }
    else {
      const newDate = date
      newDate
    }
  }

return (<div className="w-[100%] h-[100%] flex flex-col items-center p-5 gap-5 text-neutral-100">
  <Label className="text-3xl text-center mb-5">Birthday timer</Label>
  <Label>Create one by first setting your birthday date:</Label>
  <Calendar 
    mode="single"
    month={currentMonth}
    onMonthChange={setCurrentMonth}
    selected={date}
    onSelect={setDate}
    className=""
  />
  <div className="flex flex-row gap-4 max-w-xl justify-center">
  <Checkbox
    checked={isLocalisedTimeTimer}
    onCheckedChange={(v: boolean) => {setIsLocalisedTimeTimer(v)}}
  />
  <Label className="max-w-xl">Will the timer be changed depending on the timezone of the person who will open it (So if they are one hour ahead of you their timer will have 1h less if this is turned on)</Label>
  </div>

  <Label className="text-xl">The link to share your birthday timer:</Label>
  <div>
  <p>{getLink()}</p>
  </div>
</div>);
}

export default Editor;