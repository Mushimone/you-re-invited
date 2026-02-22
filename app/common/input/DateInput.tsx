"use client";
import { useState } from "react";
import { useFormContext, useController } from "react-hook-form";
import { format, parseISO, isValid } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

interface IProps {
  name: string;
  label: string;
}

export function DateInput({ name, label }: IProps) {
  const { control } = useFormContext();
  const { field } = useController({ name, control });
  const [open, setOpen] = useState(false);

  const parsed = field.value ? parseISO(field.value) : null;
  const selected = parsed && isValid(parsed) ? parsed : undefined;

  return (
    <div className="flex flex-col gap-1">
      <Label>{label}</Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "justify-start text-left font-normal",
              !field.value && "text-muted-foreground",
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {selected ? format(selected, "PPP") : "Pick a date"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={selected}
            onSelect={(date) => {
              field.onChange(date ? format(date, "yyyy-MM-dd") : "");
              setOpen(false);
            }}
            captionLayout="dropdown"
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
