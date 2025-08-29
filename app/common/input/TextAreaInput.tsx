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
    <div className="w-full">
      <Label
        htmlFor="text"
        className="mb-1 block text-sm font-bold text-gray-700"
      >
        {label}
      </Label>
      <Textarea
        id="text"
        {...register(name)}
        className="bg-white min-h-[100px]"
        rows={5}
      />
    </div>
  );
}
