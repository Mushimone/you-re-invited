import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useFormContext, useWatch } from "react-hook-form";

interface ICheckboxInputProps {
  children?: React.ReactNode;
  name: string;
  disabled?: boolean;
}

export function CheckboxInput(props: ICheckboxInputProps) {
  const { children, name, disabled } = props;

  const { register, setValue } = useFormContext();
  const value = useWatch({ name });
  return (
    <div className="flex items-center gap-3 align-middle">
      <Checkbox
        id={name}
        {...register(name)}
        checked={value}
        onCheckedChange={(checked) => setValue(name, checked)}
        className="border-gray-400 data-[state=checked]:bg-fuchsia-500 dark:data-[state=checked]:bg-fuchsia-500 data-[state=checked]:border-gray-500"
        disabled={disabled}
        defaultChecked={value}
      />
      <Label htmlFor={name} className="align-middle">
        {children}
      </Label>
    </div>
  );
}
