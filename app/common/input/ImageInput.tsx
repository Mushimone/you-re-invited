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
    <>
      <Label htmlFor={name}>{label}</Label>
      <Input type="file" id={name} {...register(name)} />
    </>
  );
}
