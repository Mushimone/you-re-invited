import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormContext } from "react-hook-form";

interface IProps {
  label: string;
  name: string;
}
export function TextInput(props: IProps) {
  const { name, label } = props;

  const { register } = useFormContext();

  return (
    <>
      <Label htmlFor="text">{label}</Label>
      <Input type="text" id="text" {...register(name)} />
    </>
  );
}
