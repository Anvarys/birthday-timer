import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import React from "react";
import { Checkbox } from "@/components/ui/checkbox";


export function App() {

  const [date, setDate] = React.useState<Date | undefined>(
    localStorage.getItem("birthday") ? new Date(localStorage.getItem("birthday")!) : new Date()
  )
  const [currentMonth, setCurrentMonth] = React.useState<Date>(
    new Date(new Date().getFullYear(), new Date().getMonth(), 1)
  )
  const [isLocalisedTimeTimer, setIsLocalisedTimeTimer] = React.useState<boolean>(false)

  React.useEffect(() => {
    localStorage.setItem("birthday", date?.toISOString()!)
  })

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
  <div className="flex flex-row gap-4 w-max-2xl justify-center">
  <Checkbox
    checked={isLocalisedTimeTimer}
    onCheckedChange={(v: boolean) => {setIsLocalisedTimeTimer(v)}}
  />
  <Label>Will the timer be changed depending on the timezone of the person who will open it</Label>
  </div>

  <Label className="text-xl">The link to share your birthday timer:</Label>
</div>);
}

export default App;