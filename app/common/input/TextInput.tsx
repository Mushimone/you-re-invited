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
    <div className="w-full">
      <Label
        htmlFor="text"
        className="mb-1 block text-sm font-bold text-gray-700"
      >
        {label}
      </Label>
      <Input type="text" id="text" className="bg-white" {...register(name)} />
    </div>
  );
}
