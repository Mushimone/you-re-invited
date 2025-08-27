import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useFormContext } from "react-hook-form";

interface IProps {
  label: string;
  bgImage: string;
}

export function ImageInput(props: IProps) {
  const { bgImage, label } = props;

  const { register } = useFormContext();

  return (
    <>
      <Label htmlFor="picture">{label}</Label>
      <Input type="file" id="picture" {...register(bgImage)} />
    </>
  );
}
