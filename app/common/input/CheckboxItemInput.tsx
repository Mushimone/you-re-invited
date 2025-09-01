import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ReactNode } from "react";

import { useFormContext, useWatch } from "react-hook-form";

interface IProps {
  text?: ReactNode;
  help?: string;
  name: string;
  disabled?: boolean;
}

export function CheckboxItemInput(props: IProps) {
  const { text, help, name, disabled } = props;

  const { register, setValue } = useFormContext();
  const value = useWatch({ name });
  return (
    <>
      <Label className="hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3 has-[[aria-checked=true]]:border-blue-600 has-[[aria-checked=true]]:bg-blue-50 dark:has-[[aria-checked=true]]:border-blue-900 dark:has-[[aria-checked=true]]:bg-blue-950">
        <Checkbox
          id="toggle-2"
          className="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700"
          {...register(name)}
          checked={value}
          onCheckedChange={(checked) => setValue(name, checked)}
          defaultChecked={value}
          disabled={disabled}
        />
        <div className="grid gap-1.5 font-normal">
          <p className="text-sm leading-none font-medium">{text}</p>
          <p className="text-muted-foreground text-sm">{help}</p>
        </div>
      </Label>
    </>
  );
}
