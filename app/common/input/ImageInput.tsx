import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useFormContext } from "react-hook-form";

interface IProps {
  label: string;
  name: string;
}

export function ImageInput(props: IProps) {
  const { name, label } = props;

  const { register } = useFormContext();

  return (
    <div className="w-full">
      <Label
        htmlFor={name}
        className="mb-1 block text-sm font-bold text-gray-700"
      >
        {label}
      </Label>
      <Input type="file" id={name} {...register(name)} className="bg-white" />
    </div>
  );
}
