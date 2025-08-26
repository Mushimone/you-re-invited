import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
interface IProps {
  onChange: (text: string) => void;
  label: string;
}
export const TextInput = ({ onChange, label }: IProps) => {
  return (
    <>
      <Label htmlFor="text">{label}</Label>
      <Input
        id="text"
        type="text"
        onChange={(input) => onChange(input.target.value)}
      />
    </>
  );
};
