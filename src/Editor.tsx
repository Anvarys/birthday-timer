import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { CopyIcon } from "@phosphor-icons/react";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";


export function Editor() {

  const [date, setDate] = React.useState<Date | undefined>(
    localStorage.getItem("birthday") ? new Date(localStorage.getItem("birthday")!) : undefined
  )
  const [currentMonth, setCurrentMonth] = React.useState<Date>(
    date ? date : new Date()
  )
  const [isLocalisedTimeTimer, setIsLocalisedTimeTimer] = React.useState<boolean>(false)

  React.useEffect(() => {
    localStorage.setItem("birthday", date?.toISOString()!)
  }, [date])

  function getLink(){
    if (!isLocalisedTimeTimer)  {
      return `timer?dt=${date?.toISOString()}`
    }
    else {
      return `timer?m=${date?.getMonth()}&d=${date?.getDate()}`
    }
  }

return (<div className="w-[100%] h-[100%] flex flex-col items-center p-5 gap-5 text-neutral-100">
  <Label className="text-3xl text-center mb-5">Birthday timer</Label>
  <Label>Create one by first setting your birthday:</Label>
  <Calendar 
    mode="single"
    month={currentMonth}
    onMonthChange={setCurrentMonth}
    selected={date}
    onSelect={setDate}
    className=""
    startMonth={new Date(1967, 0)}
    endMonth={new Date(1967, 11)}
    reverseYears
    formatters={{
      formatCaption: (month) => month.toLocaleString("en-US", { month: "long" })
    }}
  />
  <div className="flex flex-row gap-4 max-w-xl justify-center">
  <Checkbox
    checked={isLocalisedTimeTimer}
    onCheckedChange={(v: boolean) => {setIsLocalisedTimeTimer(v)}}
  />
  <Label className="max-w-xl">Will the timer be changed depending on the timezone of the person who will open it (Ex: if they are one hour ahead of you - their timer will have 1h less if this is turned on)</Label>
  </div>
  { date &&
  <>
    <Label className="text-xl">The link to share your birthday timer:</Label>
    <div className="flex flex-row item-center gap-2 cursor-pointer" onClick={() => {
      navigator.clipboard.writeText(`https://birthday-time.pages.dev/${getLink()}`)
      toast("Copied!")
    }}>
    <span>https://birthday-time.pages.dev/{getLink()}</span>
    <div><CopyIcon /></div>
    </div>
  </>
  }
  <Toaster/>
</div>);
}

export default Editor;