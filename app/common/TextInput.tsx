import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface IProps {
  value?: string;
  onChange: (text: string) => void;
  label: string;
}
export function TextInput(props: IProps) {
  const { value, onChange, label } = props;

  return (
    <>
      <Label htmlFor="text">{label}</Label>
      <Input
        id="text"
        type="text"
        onChange={(input) => onChange(input.target.value)}
        value={value}
      />
    </>
  );
}
