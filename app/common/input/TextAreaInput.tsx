import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useFormContext } from "react-hook-form";

interface IProps {
  label: string;
  name: string;
}

export function TextAreaInput(props: IProps) {
  const { name, label } = props;

  const { register } = useFormContext();

  return (
    <>
      <Label htmlFor="text">{label}</Label>
      <Textarea id="text" {...register(name)} />
    </>
  );
}
